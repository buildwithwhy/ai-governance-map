// Records a research batch produced by a research subagent (or by hand) through
// the ordinary research.js commands, one at a time, so the ledger files are never
// written concurrently. Every source is fetched by the tool itself (or recorded
// from a saved copy with its hash), and every quoted passage must appear in the
// retrieved text: passages that cannot be found are rejected, and so is anything
// that relies on them. Usage: node tools/research.js ingest FILE.json --run RUN [--dry-run]
//
// Batch shape (keys are local to the file; the tool maps them to S-/P- ids):
// { "sources":   [{ "key", "url", "type", "title", "publisher", "dates": {k: v},
//                   "local_copy"?, "via"?, "note"?,
//                   "passages": [{ "key", "locator", "text", "observation"? }] }],
//   "proposals": [{ "key", ...proposal fields (RUNBOOK §2.4),
//                   "evidence": [{ "source": key, "passage": key, "stance", "supports" }],
//                   "revise"?: "P-xxxx" }],
//   "checks":    [{ "items": [ids] | "entry:x:*", "outcome", "sources": [keys], "note",
//                   "missing"?, "proposals"?: [keys or P-ids], "conflicting"?: [keys], "disagreement"? }],
//   "discovery": [{ area, summary, queries, limits, candidates: [{ ..., sources: [keys], proposal: key }] }] }
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const L = require('./lib');

const CLI = path.join(__dirname, 'research.js');
const SRC = path.join(L.RESEARCH, 'sources.json');
const CACHE = path.join(L.RESEARCH, '.cache');

function rs(args) {
  const r = spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });
  return { ok: r.status === 0, out: `${r.stdout || ''}${r.stderr || ''}`.trim() };
}
const norm = s => String(s).normalize('NFKC').toLowerCase().replace(/[​-‏⁠﻿­]/g, '').replace(/[^\p{L}\p{N}]+/gu, '');
// Quoted text is split at ellipses and [editorial insertions]; every remaining
// segment must occur in the retrieved text (letters and digits only, so line
// breaks, hyphenation, quotes and spacing differences do not matter). Layout
// noise is tolerated in three passes: PDF drop capitals are reattached, bill
// line numbers are ignored (digit-free comparison), and as a last resort a
// segment whose word 4-grams are at least 85% present is accepted as an
// APPROXIMATE match, which the log lists for a human check (a single inserted
// "not" could pass that test, so approximate matches are never trusted blind).
const fixDropCaps = t => {
  const lines = t.split('\n'); const out = [];
  for (const l of lines) {
    const m = l.trim().match(/^([A-Z])$/);
    if (m && out.length) { let i = out.length - 1; while (i > 0 && !out[i].trim()) i--; out[i] = out[i].replace(/^(\s*)/, `$1${m[1]}`); continue; }
    out.push(l);
  }
  return out.join('\n');
};
const words = s => String(s).normalize('NFKC').toLowerCase().replace(/[\u200b-\u200f\u2060\ufeff\u00ad]/g, '').split(/[^\p{L}\p{N}]+/u).filter(Boolean);
const grams = (w, n = 4) => { const g = []; for (let i = 0; i + n <= w.length; i++) g.push(w.slice(i, i + n).join(' ')); return g; };
function verifyDetail(text, sources) {
  const texts = (Array.isArray(sources) ? sources : [sources]).flatMap(t => [t, fixDropCaps(t)]);
  const T = texts.map(norm); const Td = T.map(x => x.replace(/\p{N}/gu, ''));
  const G = new Set(texts.flatMap(t => grams(words(fixDropCaps(t)))));
  const raw = String(text).split(/…|\.\.\.|\[[^\]]*\]/).filter(x => norm(x).length >= 8);
  if (!raw.length) return { ok: false, why: 'no quotable segment of 8+ letters outside [brackets]' };
  let approx = false;
  for (const seg of raw) {
    const n = norm(seg);
    if (T.some(x => x.includes(n))) continue;
    const nd = n.replace(/\p{N}/gu, '');
    if (nd.length >= 20 && Td.some(x => x.includes(nd))) continue;
    const g = grams(words(seg));
    const hit = g.length >= 3 ? g.filter(x => G.has(x)).length / g.length : 0;
    if (hit >= 0.85) { approx = true; continue; }
    return { ok: false, why: `not found in the retrieved text: "${n.slice(0, 70)}"${g.length >= 3 ? ` (best 4-gram overlap ${Math.round(hit * 100)}%)` : ''}` };
  }
  return { ok: true, approx };
}
const verify = (text, sources) => { const r = verifyDetail(text, sources); return r.ok ? null : r.why; };
// For a PDF, also compare against pdftotext's reading-order output (tables in
// -layout mode interleave columns).
function sourceTexts(txtPath) {
  const out = [fs.readFileSync(txtPath, 'utf8')];
  const raw = txtPath.replace(/\.txt$/, '.raw');
  try { if (fs.existsSync(raw) && fs.readFileSync(raw).slice(0, 4).toString() === '%PDF') out.push(require('child_process').execFileSync('pdftotext', [raw, '-']).toString()); } catch (e) { /* layout text only */ }
  return out;
}
const tmpFile = obj => { const f = path.join(os.tmpdir(), `ingest-${process.pid}-${Math.random().toString(36).slice(2)}.json`); fs.writeFileSync(f, JSON.stringify(obj)); return f; };

function ingest(file, o) {
  if (!file || !o.run) { console.error('usage: ingest FILE.json --run RUN [--dry-run]'); process.exit(1); }
  const batch = L.readJSON(path.resolve(file));
  const dry = !!o['dry-run'];
  const log = { file, run: o.run, sources: {}, passages: {}, proposals: {}, failures: [], observations: [], approximate: [], checks: 0, discovery: 0 };
  const fail = (what, why) => { log.failures.push({ what, why }); console.log(`REJECTED ${what}: ${why}`); };
  const srcId = {}; const pasId = {}; const okSrc = new Set(); const badPas = new Set();

  for (const s of batch.sources || []) {
    let db = L.readJSON(SRC);
    let hit = Object.entries(db.sources).find(([, x]) => x.url === s.url);
    const last = hit && hit[1].fetches[hit[1].fetches.length - 1];
    const meta = ['--type', s.type || 'primary', ...(s.title ? ['--title', s.title] : []), ...(s.publisher ? ['--publisher', s.publisher] : []), '--run', o.run];
    const txtPath = path.join(CACHE, `${L.hash(s.url)}.txt`);
    const fresh = last && last.status === 'ok' && last.run === o.run && fs.existsSync(txtPath);
    if (!fresh) {
      const r = s.local_copy
        ? rs(['source', 'add', s.url, '--status', 'ok', '--via', s.via || 'saved copy', '--file', s.local_copy, '--note', s.note || 'copy saved by a research subagent', ...meta])
        : rs(['source', 'fetch', s.url, ...meta]);
      if (!r.ok) { fail(`source ${s.key}`, r.out); continue; }
      db = L.readJSON(SRC); hit = Object.entries(db.sources).find(([, x]) => x.url === s.url);
    }
    if (!hit) { fail(`source ${s.key}`, 'not registered'); continue; }
    const [sid, rec] = hit; srcId[s.key] = sid; log.sources[s.key] = sid;
    const lf = rec.fetches[rec.fetches.length - 1];
    if (lf.status !== 'ok' || !fs.existsSync(txtPath)) {
      console.log(`${sid} ${s.url}: ${lf.status}${s.local_copy ? '' : ' (pass local_copy to use a saved copy)'}`);
      for (const p of s.passages || []) { badPas.add(`${s.key}#${p.key}`); }
      if ((s.passages || []).length) fail(`passages of ${s.key}`, `source not retrieved (${lf.status})`);
      continue;
    }
    okSrc.add(s.key);
    const text = sourceTexts(txtPath);
    if (!dry && s.dates && Object.keys(s.dates).length) rs(['source', 'dates', sid, ...Object.entries(s.dates).map(([k, v]) => `${k}=${v}`)]);
    for (const p of s.passages || []) {
      const k = `${s.key}#${p.key}`;
      const body = p.observation ? `[Observation, not a quotation] ${p.text}` : p.text;
      if (!p.observation) {
        const v = verifyDetail(p.text, text);
        if (!v.ok) { badPas.add(k); fail(`passage ${k} (${sid}, ${p.locator})`, v.why); continue; }
        if (v.approx) { log.approximate.push({ key: k, sid, locator: p.locator, text: p.text }); console.log(`APPROXIMATE ${k} (${sid}, ${p.locator}) — check by hand`); }
      }
      else log.observations.push({ key: k, sid, locator: p.locator, text: p.text });
      if (dry) { pasId[k] = `${sid}#?`; continue; }
      const same = (L.readJSON(SRC).sources[sid].passages || []).find(x => x.locator === p.locator && x.text === body);
      if (same) { pasId[k] = same.id; continue; }
      const r = rs(['source', 'passage', sid, '--locator', p.locator, '--text', body]);
      if (r.ok) pasId[k] = r.out.split('\n').pop().trim(); else { badPas.add(k); fail(`passage ${k}`, r.out); }
    }
    Object.assign(log.passages, Object.fromEntries(Object.entries(pasId).filter(([k]) => k.startsWith(`${s.key}#`))));
  }
  if (dry) { report(log, file, true); return; }

  const mapEv = (ev, where) => {
    const out = [];
    for (const e of ev || []) {
      // Evidence may also cite a source and passage already in the registry (S-xxxx, S-xxxx#n).
      if (/^S-\d{4}$/.test(e.source)) {
        const rec = L.readJSON(SRC).sources[e.source];
        if (!rec) throw new Error(`${where}: no registered source ${e.source}`);
        if (e.passage && !rec.passages.some(x => x.id === e.passage)) throw new Error(`${where}: no registered passage ${e.passage}`);
        out.push({ ...e }); continue;
      }
      const k = `${e.source}#${e.passage}`;
      if (e.passage && (badPas.has(k) || !pasId[k])) throw new Error(`${where}: evidence passage ${k} was rejected or is unknown`);
      if (!srcId[e.source]) throw new Error(`${where}: evidence source ${e.source} is unknown`);
      out.push({ ...e, source: srcId[e.source], ...(e.passage ? { passage: pasId[k] } : {}) });
    }
    return out;
  };
  const propId = {};
  for (const p of batch.proposals || []) {
    try {
      const body = { ...p, evidence: mapEv(p.evidence, `proposal ${p.key}`) };
      if (p.conflict_resolution) body.conflict_resolution = { ...p.conflict_resolution, evidence: mapEv(p.conflict_resolution.evidence, `proposal ${p.key} resolution`) };
      delete body.key; delete body.revise;
      const r = p.revise ? rs(['revise', p.revise, tmpFile(body), '--run', o.run]) : rs(['propose', tmpFile(body), '--run', o.run]);
      if (!r.ok) { fail(`proposal ${p.key}`, r.out); continue; }
      const id = p.revise || (r.out.match(/P-\d{4}/) || [])[0];
      propId[p.key] = id; log.proposals[p.key] = id; console.log(r.out.split('\n')[0]);
    } catch (e) { fail(`proposal ${p.key}`, e.message); }
  }
  for (const c of batch.checks || []) {
    const items = Array.isArray(c.items) ? c.items.join(',') : c.items;
    const srcs = (c.sources || []).map(k => srcId[k] || k);
    const unknown = (c.sources || []).filter(k => !srcId[k] && !/^S-\d{4}$/.test(k));
    if (unknown.length) { fail(`check ${items}`, `unknown sources ${unknown.join(', ')}`); continue; }
    const props = (c.proposals || []).map(k => propId[k] || (/^P-\d{4}$/.test(k) ? k : null));
    if (props.includes(null)) { fail(`check ${items}`, 'refers to a proposal that was not recorded'); continue; }
    const args = ['check', o.run, '--items', items, '--outcome', c.outcome, '--note', c.note || ''];
    if (srcs.length) args.push('--sources', srcs.join(','));
    if (props.length) args.push('--proposals', props.join(','));
    if (c.missing) args.push('--missing', c.missing);
    if (c.conflicting) args.push('--conflicting', c.conflicting.map(k => srcId[k] || k).join(','), '--disagreement', c.disagreement || '');
    const r = rs(args);
    if (r.ok) log.checks++; else fail(`check ${items}`, r.out);
  }
  for (const d of batch.discovery || []) {
    const body = { ...d, candidates: (d.candidates || []).map(c => ({ ...c, sources: (c.sources || []).map(k => srcId[k] || k), ...(c.proposal ? { proposal: propId[c.proposal] || c.proposal } : {}) })) };
    const r = rs(['run', 'discovery', o.run, tmpFile(body)]);
    if (r.ok) log.discovery++; else fail(`discovery ${d.area}`, r.out);
  }
  report(log, file, false);
}
function report(log, file, dry) {
  fs.writeFileSync(`${file}.ingest${dry ? '-dry' : ''}.json`, JSON.stringify(log, null, 2));
  console.log(`\n${dry ? 'DRY RUN — ' : ''}sources ${Object.keys(log.sources).length} · passages ${Object.keys(log.passages).length} · proposals ${Object.keys(log.proposals).length} · checks ${log.checks} · discovery ${log.discovery} · observations ${log.observations.length} · approximate ${log.approximate.length} · rejected ${log.failures.length}`);
  console.log(`log: ${file}.ingest${dry ? '-dry' : ''}.json`);
}
module.exports = { ingest, verify, verifyDetail, sourceTexts, norm };

// Read-only pre-check for a batch, safe to run while other batches are being
// prepared: verifies passages against the saved copy each source names
// (`local_copy`, or `checked_copy` for a copy used only for this check), that
// item ids exist, that proposal edits apply to the current map, and that every
// key resolves. Nothing is fetched and nothing in research/ is written.
function validate(file) {
  const Rz = require('./research');
  const batch = L.readJSON(path.resolve(file));
  const inv = L.buildInventory();
  const errs = []; const warns = []; const approx = [];
  const srcKeys = new Set(); const pasKeys = new Set(); const propKeys = new Set();
  const toText = f => { const b = fs.readFileSync(f); if (b.slice(0, 4).toString() === '%PDF') { const cp = require('child_process'); return [cp.execFileSync('pdftotext', ['-layout', f, '-']).toString(), cp.execFileSync('pdftotext', [f, '-']).toString()]; } return [Rz.htmlToText(b.toString('utf8'))]; };
  for (const s of batch.sources || []) {
    if (!s.key || !s.url) { errs.push(`source without key/url: ${JSON.stringify(s).slice(0, 80)}`); continue; }
    if (srcKeys.has(s.key)) errs.push(`duplicate source key ${s.key}`); srcKeys.add(s.key);
    const copy = s.local_copy || s.checked_copy;
    let texts = null;
    if (copy && fs.existsSync(copy)) { try { texts = toText(copy); } catch (e) { errs.push(`source ${s.key}: cannot read ${copy}: ${e.message}`); } }
    else if ((s.passages || []).some(p => !p.observation)) warns.push(`source ${s.key}: no saved copy, so its passages are checked only at ingest`);
    for (const p of s.passages || []) {
      pasKeys.add(`${s.key}#${p.key}`);
      if (!p.locator || !p.text) errs.push(`passage ${s.key}#${p.key}: locator and text are required`);
      if (String(p.text).split(/\s+/).length > 75) warns.push(`passage ${s.key}#${p.key}: over 60 words`);
      if (texts && !p.observation) { const v = verifyDetail(p.text, texts); if (!v.ok) errs.push(`passage ${s.key}#${p.key} (${p.locator}): ${v.why}`); else if (v.approx) approx.push(`${s.key}#${p.key}`); }
    }
  }
  const reg = L.readJSON(SRC).sources;
  const evOk = (ev, where) => { for (const e of ev || []) { if (/^S-\d{4}$/.test(e.source)) { if (!reg[e.source]) errs.push(`${where}: no registered source ${e.source}`); else if (e.passage && !reg[e.source].passages.some(x => x.id === e.passage)) errs.push(`${where}: no registered passage ${e.passage}`); continue; } if (!srcKeys.has(e.source)) errs.push(`${where}: unknown source key ${e.source}`); if (e.passage && !pasKeys.has(`${e.source}#${e.passage}`)) errs.push(`${where}: unknown passage ${e.source}#${e.passage}`); if (e.stance && !['supports', 'contradicts'].includes(e.stance)) errs.push(`${where}: stance must be supports|contradicts`); } };
  for (const p of batch.proposals || []) {
    const w = `proposal ${p.key}`;
    if (!p.key || propKeys.has(p.key)) errs.push(`${w}: missing or duplicate key`); propKeys.add(p.key);
    if (!p.title) errs.push(`${w}: title required`);
    if (!(p.evidence || []).length) errs.push(`${w}: evidence required`);
    evOk(p.evidence, w);
    if (p.conflict_resolution) evOk(p.conflict_resolution.evidence, `${w} resolution`);
    if ((p.changes || []).length) { try { Rz.validateChanges(p.changes); } catch (e) { errs.push(`${w}: ${e.message}`); } }
    else if (!p.question) errs.push(`${w}: a proposal without changes must ask a question`);
  }
  const OUT = ['changed', 'no_change', 'unresolved', 'inaccessible'];
  for (const c of batch.checks || []) {
    const items = Array.isArray(c.items) ? c.items : String(c.items).split(',');
    const w = `check ${items.slice(0, 2).join(',')}${items.length > 2 ? '…' : ''}`;
    for (const it of items) {
      if (it.endsWith('*')) { const pre = it.slice(0, -1); if (!inv.items.some(i => i.id.startsWith(pre) || i.id === pre.replace(/:$/, ''))) errs.push(`${w}: no items match ${it}`); }
      else if (!inv.byId[it]) errs.push(`${w}: unknown item ${it}`);
    }
    if (!OUT.includes(c.outcome)) errs.push(`${w}: outcome must be one of ${OUT.join('|')}`);
    if (!c.note) errs.push(`${w}: note required`);
    if (['unresolved', 'inaccessible'].includes(c.outcome) && !c.missing) errs.push(`${w}: missing required`);
    if (c.outcome === 'changed' && !(c.proposals || []).length) errs.push(`${w}: changed needs proposals`);
    for (const k of c.sources || []) if (!srcKeys.has(k) && !/^S-\d{4}$/.test(k)) errs.push(`${w}: unknown source ${k}`);
    for (const k of c.proposals || []) if (!propKeys.has(k) && !/^P-\d{4}$/.test(k)) errs.push(`${w}: unknown proposal ${k}`);
    if (['changed', 'no_change'].includes(c.outcome) && !(c.sources || []).length) errs.push(`${w}: a successful outcome needs sources`);
  }
  const covered = new Set();
  for (const c of batch.checks || []) for (const it of (Array.isArray(c.items) ? c.items : String(c.items).split(','))) {
    if (it.endsWith('*')) { const pre = it.slice(0, -1); inv.items.filter(i => i.id.startsWith(pre) || i.id === pre.replace(/:$/, '')).forEach(i => covered.add(i.id)); } else covered.add(it);
  }
  console.log(`sources ${srcKeys.size} · passages ${pasKeys.size} · proposals ${propKeys.size} · checks ${(batch.checks || []).length} (${covered.size} items) · discovery ${(batch.discovery || []).length}`);
  for (const a of approx) console.log(`APPROXIMATE ${a} — make sure the quotation is exact`);
  for (const x of warns) console.log(`warn  ${x}`);
  for (const x of errs) console.log(`ERROR ${x}`);
  console.log(errs.length ? `${errs.length} error(s): fix them before handing the batch back` : 'batch is valid');
  if (errs.length) process.exitCode = 1;
  return covered;
}
module.exports.validate = validate;
