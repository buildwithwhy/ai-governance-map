#!/usr/bin/env node
// Research ledger CLI. Claude runs these commands during a run and when
// recording the maintainer's decisions from conversation; nobody needs to edit
// the JSON files by hand. See research/RUNBOOK.md.
//
//   inventory [--entry ID] | deps ENTITY
//   run start RUN --label TEXT [--partial] [--entries a,b] [--scope TEXT]
//   run discovery RUN FILE.json            append a discovery log entry
//   run highlights RUN FILE.json           summary bullets (JSON array of strings) shown first in the report
//   run finish RUN [--usage TEXT]
//   source fetch URL [--type primary|secondary|repo] [--title T] [--publisher P] [--run RUN]
//   source add URL --status ok|blocked|error --via webfetch|manual|repo [--type ..] [--title ..] [--run RUN]
//   source passage SID --locator TEXT --text TEXT
//   source dates SID key=YYYY-MM-DD ...     (published, adopted, signed, in_force, applies_from, effective, ...)
//   check RUN --items ID[,ID|entry:X:*] --outcome changed|no_change|unresolved|inaccessible
//         [--sources S-1,S-2] [--proposals P-1] --note TEXT
//         [--conflicting S-1,S-2]   (with unresolved: sources that disagree)
//         [--tiebreak S-3 | --recheck]  (required to close an item with a recorded conflict)
//   propose FILE.json [--run RUN]           new proposal (deduplicated against the ledger)
//   revise PID FILE.json [--run RUN] [--reopen]
//   decide PID accept|reject|defer --version N [--note TEXT] [--until YYYY-MM-DD]
//         [--override-conflict "reason"]   maintainer's explicit call on an unresolved conflict
//   edit PID FILE.json --note TEXT          maintainer-authored wording; recorded as accepted
//   list [--status S] | show PID
//   report RUN                              write research/runs/RUN/report.md
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const L = require('./lib');
const { applyOps } = require('./apply');

const R = L.RESEARCH;
const F = {
  ledger: path.join(R, 'ledger.json'),
  sources: path.join(R, 'sources.json'),
  checks: path.join(R, 'checks.json'),
  run: id => path.join(R, 'runs', id, 'run.json'),
  runChecks: id => path.join(R, 'runs', id, 'checks.json'),
  report: id => path.join(R, 'runs', id, 'report.md'),
  cache: path.join(R, '.cache'),
};
const OUTCOMES = {
  changed: 'Change supported',
  no_change: 'No material change found in the checked sources',
  unresolved: 'Unresolved or conflicting evidence',
  inaccessible: 'Source inaccessible',
  not_checked: 'Not checked',
};
const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const die = m => { console.error(m); process.exit(1); };
const ledger = () => L.readJSON(F.ledger, { next: 1, proposals: [] });
const sources = () => L.readJSON(F.sources, { next: 1, sources: {} });
const checks = () => L.readJSON(F.checks, { items: {} });

function parseArgs(argv) {
  const pos = []; const o = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const k = argv[i].slice(2);
      if (i + 1 < argv.length && !argv[i + 1].startsWith('--')) o[k] = argv[++i]; else o[k] = true;
    } else pos.push(argv[i]);
  }
  return { pos, o };
}
const list = s => (s ? String(s).split(',').map(x => x.trim()).filter(Boolean) : []);

// ---- sources ------------------------------------------------------------------
function findSource(db, url) { return Object.entries(db.sources).find(([, s]) => s.url === url); }
function upsertSource(url, meta) {
  const db = sources();
  let hit = findSource(db, url);
  if (!hit) {
    const id = `S-${String(db.next++).padStart(4, '0')}`;
    db.sources[id] = { url, title: null, publisher: null, type: null, dates: {}, fetches: [], passages: [] };
    hit = [id, db.sources[id]];
  }
  const [id, s] = hit;
  for (const k of ['title', 'publisher', 'type']) if (meta[k]) s[k] = meta[k];
  if (meta.fetch) { s.fetches.push(meta.fetch); s.fetches = s.fetches.slice(-5); }
  L.writeJSON(F.sources, db);
  return [id, s];
}
const lastFetch = s => s.fetches[s.fetches.length - 1];
const accessible = s => !!lastFetch(s) && lastFetch(s).status === 'ok';

function htmlToText(html) {
  return html
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|div|li|h\d|tr|section|article|br)>|<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&#x27;|&rsquo;|&lsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
    .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n\n').trim();
}
function fetchSource(url, o) {
  fs.mkdirSync(F.cache, { recursive: true });
  const key = L.hash(url);
  const raw = path.join(F.cache, `${key}.raw`);
  const fetch = { date: L.today(), at: now(), run: o.run || null, via: 'curl', status: 'error' };
  try {
    const out = execFileSync('curl', ['-sS', '-L', '--max-time', '45', '-A', 'Mozilla/5.0 (research; ai-governance-map)',
      '-o', raw, '-w', '%{http_code}\t%{url_effective}\t%{content_type}', url], { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
    const [code, finalUrl, ctype] = out.split('\t');
    fetch.http = Number(code); fetch.final_url = finalUrl; fetch.content_type = ctype;
    fetch.status = fetch.http >= 200 && fetch.http < 300 ? 'ok' : `http_${code}`;
  } catch (e) {
    const err = String(e.stderr || e.message);
    fetch.status = /CONNECT tunnel failed, response 403|EGRESS|blocked/i.test(err) ? 'blocked' : 'error';
    fetch.error = err.trim().slice(0, 200);
  }
  let txtPath = null;
  if (fetch.status === 'ok') {
    const buf = fs.readFileSync(raw);
    fetch.sha256 = require('crypto').createHash('sha256').update(buf).digest('hex').slice(0, 16);
    fetch.bytes = buf.length;
    txtPath = path.join(F.cache, `${key}.txt`);
    if (/pdf/i.test(fetch.content_type || '') || buf.slice(0, 4).toString() === '%PDF') {
      execFileSync('pdftotext', ['-layout', raw, txtPath]);
    } else fs.writeFileSync(txtPath, htmlToText(buf.toString('utf8')));
  }
  const [id, s] = upsertSource(url, { ...o, fetch });
  const prev = s.fetches.length > 1 ? s.fetches[s.fetches.length - 2] : null;
  const changed = prev && prev.sha256 && fetch.sha256 ? (prev.sha256 === fetch.sha256 ? 'unchanged since last fetch' : 'content changed since last fetch') : '';
  console.log(`${id} ${fetch.status}${fetch.http ? ` (HTTP ${fetch.http})` : ''} ${url} ${changed}`);
  if (txtPath) console.log(`text: ${path.relative(L.REPO, txtPath)}`);
  return id;
}

// ---- checks ---------------------------------------------------------------------
function expandItems(inv, spec) {
  const out = [];
  for (const s of list(spec)) {
    if (s.endsWith('*')) {
      const pre = s.slice(0, -1);
      const m = inv.items.filter(i => i.id.startsWith(pre) || i.id === pre.replace(/:$/, '')).map(i => i.id);
      if (!m.length) die(`no inventory items match ${s}`);
      out.push(...m);
    } else {
      if (!inv.byId[s]) die(`unknown inventory item ${s}`);
      out.push(s);
    }
  }
  return [...new Set(out)];
}
function recordCheck(run, o) {
  if (!OUTCOMES[o.outcome] || o.outcome === 'not_checked') die(`--outcome must be one of changed|no_change|unresolved|inaccessible`);
  if (!o.note) die('--note is required');
  const inv = L.buildInventory();
  const items = expandItems(inv, o.items);
  const srcIds = list(o.sources);
  const db = sources();
  for (const sid of srcIds) if (!db.sources[sid]) die(`unknown source ${sid}`);
  if (['changed', 'no_change'].includes(o.outcome)) {
    const ok = srcIds.filter(sid => accessible(db.sources[sid]));
    if (!ok.length) die(`outcome '${o.outcome}' needs at least one source that was actually retrieved (status ok). A blocked source is not a successful check — use --outcome inaccessible.`);
  }
  if (o.outcome === 'changed' && !list(o.proposals).length) die('outcome changed needs --proposals');
  const entry = { run, date: L.today(), outcome: o.outcome, sources: srcIds, proposals: list(o.proposals), note: o.note };
  if (o.conflicting) {
    if (o.outcome !== 'unresolved') die('--conflicting goes with --outcome unresolved');
    const c = list(o.conflicting);
    for (const sid of c) if (!db.sources[sid]) die(`unknown source ${sid}`);
    if (c.length < 2) die('--conflicting needs the (at least two) sources that disagree');
    entry.conflict = { sources: c, at: now() };
  }
  const prior = checks().items;
  if (['changed', 'no_change'].includes(o.outcome)) {
    // An item with an open conflict needs a double check or a third source to close.
    const open = items.map(id => prior[id]?.last_attempt?.conflict).filter(c => c && !c.resolved);
    for (const c of open) {
      if (o.tiebreak) {
        const t = db.sources[o.tiebreak] || die(`unknown source ${o.tiebreak}`);
        const sides = new Set(c.sources.map(s => L.hostOf(db.sources[s].url)));
        if (!accessible(t)) die(`tiebreak ${o.tiebreak} was not retrieved successfully`);
        if (sides.has(L.hostOf(t.url))) die(`tiebreak ${o.tiebreak} is from the same host as a conflicting source; a third source must be independent`);
        if (!srcIds.includes(o.tiebreak)) srcIds.push(o.tiebreak);
        entry.conflict_resolved = { how: 'third source', source: o.tiebreak, conflict: c.sources };
      } else if (o.recheck) {
        const stale = c.sources.filter(s => !db.sources[s].fetches.some(f => f.status === 'ok' && f.at > c.at));
        if (stale.length) die(`double check incomplete: ${stale.join(', ')} not successfully re-fetched since the conflict was recorded (${c.at})`);
        entry.conflict_resolved = { how: 'double check', conflict: c.sources };
      } else die(`these items have an open conflict (${c.sources.join(' vs ')}): re-read the conflicting sources (--recheck) or add a third independent source (--tiebreak S-x)`);
    }
  }
  const all = checks(); const per = L.readJSON(F.runChecks(run), {});
  for (const id of items) {
    const rec = { ...entry, hash: inv.byId[id].hash };
    per[id] = rec;
    all.items[id] = all.items[id] || {};
    all.items[id].last_attempt = rec;
    if (['changed', 'no_change'].includes(o.outcome)) all.items[id].last_success = rec;
  }
  L.writeJSON(F.checks, all); L.writeJSON(F.runChecks(run), per);
  console.log(`recorded ${o.outcome} for ${items.length} item(s)`);
}

// ---- proposals --------------------------------------------------------------------
const changeHash = changes => L.hash(changes);
function fingerprint(changes) {
  return L.hash(changes.map(c => ({ ...c, from: undefined, to: c.to === undefined ? undefined : (typeof c.to === 'string' ? L.norm(c.to) : c.to) })));
}
function targetsOf(changes) {
  const t = [];
  for (const c of changes) {
    if (c.op === 'set_field') t.push(['desc', 'context'].includes(c.field) ? `entry:${c.entity}:${c.field}` : `entry:${c.entity}`);
    else if (c.op === 'set_cov') {
      t.push(`entry:${c.entity}:cov:${c.cat}`);
      if (c.from === null || c.to === null) t.push(`entry:${c.entity}:cov`);
    } else if (c.op === 'add_entity') t.push(`new:${c.entity.id}`);
    else if (/edge/.test(c.op)) t.push(`edge:${c.a}|${c.b}`);
    else if (c.op === 'replace_text') t.push(`text:${c.file}:${L.hash(c.from)}`);
  }
  return [...new Set(t)];
}
// Dry-run the changes on a scratch copy of the published files.
function validateChanges(changes) {
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'gm-'));
  for (const f of ['index.html', 'build-llms.js', 'sitemap.xml']) fs.copyFileSync(path.join(L.REPO, f), path.join(tmp, f));
  for (const c of changes) if (c.op === 'replace_text' && !fs.existsSync(path.join(tmp, c.file))) fs.copyFileSync(path.join(L.REPO, c.file), path.join(tmp, c.file));
  try { applyOps(tmp, changes); } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
}
function knockOn(changes) {
  const inv = L.buildInventory();
  const ents = new Set();
  for (const c of changes) {
    if (c.entity) ents.add(typeof c.entity === 'string' ? c.entity : c.entity.id);
    if (c.a) { ents.add(c.a); ents.add(c.b); }
  }
  const own = targetsOf(changes);
  return [...new Set([...ents].filter(e => inv.map.entities.some(x => x.id === e)).flatMap(e => L.dependents(inv, e)))].filter(i => !own.includes(i));
}
function makeVersion(input, v, run, author) {
  const changes = input.changes || [];
  if (changes.length) validateChanges(changes);
  const db = sources();
  for (const ev of input.evidence || []) {
    if (!ev.source || !db.sources[ev.source]) die(`evidence source must be a registered S-id (got ${ev.source})`);
    if (ev.stance && !['supports', 'contradicts'].includes(ev.stance)) die(`evidence stance must be supports|contradicts`);
    if (ev.role && !['recheck', 'tiebreak'].includes(ev.role)) die(`evidence role must be recheck|tiebreak`);
    if (ev.role && !ev.passage) die(`${ev.role} evidence needs a recorded passage`);
  }
  return {
    v, created: now(), run: run || null, author,
    title: input.title, kind: input.kind || (changes.some(c => c.op === 'add_entity') ? 'addition' : changes.length ? 'change' : 'flag'),
    changes, why: input.why || null, rationale: input.rationale || null, evidence: input.evidence || [],
    uncertainty: input.uncertainty || null, confidence: input.confidence || null,
    question: input.question || null, knock_on_notes: input.knock_on_notes || {},
    knock_on: knockOn(changes), hash: changeHash(changes),
  };
}
const latest = p => p.versions[p.versions.length - 1];

function propose(file, o) {
  const input = L.readJSON(file);
  if (!input.title) die('proposal needs a title');
  const db = ledger();
  const fp = fingerprint(input.changes || []);
  const dup = db.proposals.find(p => (input.changes || []).length && p.fingerprint === fp);
  if (dup) die(`duplicate of ${dup.id} (${dup.decision.status}). Use 'revise ${dup.id}' (add --reopen for a rejected one with new evidence).`);
  const overlap = db.proposals.filter(p => !p.applied && !['rejected', 'superseded'].includes(p.decision.status) && targetsOf(latest(p).changes).some(t => targetsOf(input.changes || []).includes(t)));
  const id = `P-${String(db.next++).padStart(4, '0')}`;
  const ver = makeVersion(input, 1, o.run, 'claude');
  db.proposals.push({
    id, fingerprint: fp, targets: targetsOf(ver.changes), resolves_checks: input.resolves_checks || [],
    versions: [ver], decision: { status: 'pending', v: null, hash: null, date: null, note: null }, decision_log: [], applied: null,
  });
  L.writeJSON(F.ledger, db);
  console.log(`${id} v1 created (${ver.kind}, change-hash ${ver.hash})`);
  if (overlap.length) console.log(`warning: overlaps open proposal(s) ${overlap.map(p => p.id).join(', ')} on the same target`);
}
function getP(db, id) { return db.proposals.find(p => p.id === id) || die(`no proposal ${id}`); }
function logDecision(p) { if (p.decision.status !== 'pending' || p.decision.note) p.decision_log.push({ ...p.decision }); }

function revise(id, file, o, author = 'claude') {
  const db = ledger(); const p = getP(db, id);
  if (p.applied) die(`${id} is already applied; open a new proposal instead`);
  const prev = latest(p);
  const input = { ...prev, ...L.readJSON(file) };
  const ver = makeVersion(input, prev.v + 1, o.run, author);
  p.versions.push(ver);
  p.fingerprint = fingerprint(ver.changes);
  p.targets = targetsOf(ver.changes);
  if (input.resolves_checks) p.resolves_checks = input.resolves_checks;
  const substantive = ver.hash !== prev.hash;
  if (author === 'claude' && (substantive || o.reopen) && p.decision.status !== 'pending') {
    logDecision(p);
    p.decision = { status: 'pending', v: null, hash: null, date: L.today(), note: substantive ? `v${ver.v}: wording changed — needs renewed approval` : 'reopened with new evidence' };
  } else if (author === 'claude' && !substantive && p.decision.status === 'accepted') {
    p.decision.v = ver.v; // evidence/rationale-only revision keeps the approval of identical changes
  }
  L.writeJSON(F.ledger, db);
  console.log(`${id} v${ver.v} (${substantive ? 'substantive: change-hash ' + ver.hash : 'non-substantive'}) — decision: ${p.decision.status}`);
  return [db, p, ver];
}
// RUBRIC §7a: conflicting evidence blocks acceptance until double-checked or
// settled by a third independent source, unless the maintainer overrides with a reason.
function conflictGate(ver, accepting, o) {
  const st = L.conflictStatus(ver.evidence, sources());
  if (!accepting || st.resolved) return null;
  if (typeof o['override-conflict'] === 'string') return o['override-conflict'];
  die(`cannot accept: ${st.reason}. Record the double check or third source with 'revise', or pass --override-conflict "<maintainer's reason>".`);
}
function decide(id, action, o) {
  const map = { accept: 'accepted', reject: 'rejected', defer: 'deferred', withdraw: 'withdrawn', supersede: 'superseded' };
  if (!map[action]) die('action must be accept|reject|defer|withdraw|supersede');
  const db = ledger(); const p = getP(db, id); const cur = latest(p);
  if (p.applied) die(`${id} is already applied`);
  const v = Number(o.version);
  if (!v) die('--version is required: decisions bind to an exact proposal version');
  if (v !== cur.v) die(`${id} is now at v${cur.v}; the decision was given for v${v}. Show the maintainer v${cur.v} before recording it.`);
  if (action === 'accept' && !cur.changes.length) die(`${id} has no changes to apply (flag/question). Record the answer with --note and 'defer', 'reject' or 'withdraw', or revise it into a concrete change.`);
  const override = conflictGate(cur, action === 'accept', o);
  logDecision(p);
  p.decision = { status: map[action], v: cur.v, hash: cur.hash, date: L.today(), note: o.note || null, revisit_after: o.until || null, edited: false, ...(override ? { conflict_override: override } : {}) };
  L.writeJSON(F.ledger, db);
  console.log(`${id} v${cur.v} → ${map[action]}${o.until ? ` (revisit after ${o.until})` : ''}`);
}
function edit(id, file, o) {
  const input = { ...latest(getP(ledger(), id)), ...L.readJSON(file) };
  const override = conflictGate(input, true, o);
  const [db, p, ver] = revise(id, file, o, 'user');
  logDecision(p);
  p.decision = { status: 'accepted', v: ver.v, hash: ver.hash, date: L.today(), note: o.note || 'edited by maintainer', revisit_after: null, edited: true, ...(override ? { conflict_override: override } : {}) };
  L.writeJSON(F.ledger, db);
  console.log(`${id} v${ver.v} (maintainer edit) → accepted`);
}

// ---- runs ------------------------------------------------------------------------------
function runCmd(sub, id, o, extra) {
  const f = F.run(id);
  const run = L.readJSON(f, null);
  if (sub === 'start') {
    if (run) die(`run ${id} exists`);
    L.writeJSON(f, { id, label: o.label || id, partial: !!o.partial, started_at: now(), finished_at: null, scope: { entries: list(o.entries), note: o.scope || null }, discovery: [], usage: null });
    return console.log(`run ${id} started`);
  }
  if (!run) die(`no run ${id}`);
  if (sub === 'discovery') { run.discovery.push(L.readJSON(extra)); L.writeJSON(f, run); return console.log('discovery log appended'); }
  if (sub === 'highlights') { run.highlights = L.readJSON(extra); L.writeJSON(f, run); return console.log(`${run.highlights.length} highlight(s) set`); }
  if (sub === 'finish') { run.finished_at = now(); run.usage = o.usage || null; L.writeJSON(f, run); return console.log(`run ${id} finished`); }
  die('run start|discovery|highlights|finish');
}

// ---- report --------------------------------------------------------------------------
const q = s => String(s).split('\n').map(l => `> ${l}`).join('\n');
const clip = (s, n = 220) => (String(s).length > n ? String(s).slice(0, n - 1) + '…' : String(s));
const fmtVal = v => (v === null || v === undefined ? '_(absent)_' : typeof v === 'string' ? v : JSON.stringify(v));

function renderChange(c, inv) {
  const lines = [];
  const cur = (label, from, to) => {
    lines.push(`- **${label}**`, '', '  Current:', '', q(fmtVal(from)).replace(/^/gm, '  '), '', '  Proposed:', '', q(fmtVal(to)).replace(/^/gm, '  '), '');
  };
  if (c.op === 'set_field') cur(`\`${c.entity}\` · ${c.field}`, c.from, c.to);
  else if (c.op === 'set_cov') cur(`\`${c.entity}\` · coverage · ${c.cat}`, c.from, c.to);
  else if (c.op === 'set_edge') cur(`connection \`${c.a}\` ↔ \`${c.b}\``, c.from, c.to);
  else if (c.op === 'add_edge') cur(`new connection \`${c.a}\` ↔ \`${c.b}\``, null, c.rel);
  else if (c.op === 'remove_edge') cur(`remove connection \`${c.a}\` ↔ \`${c.b}\``, inv.byId[`edge:${c.a}|${c.b}`]?.value, null);
  else if (c.op === 'replace_text') cur(`\`${c.file}\`${c.count > 1 ? ` (${c.count} occurrences)` : ''}`, c.from, c.to);
  else if (c.op === 'add_entity') {
    const e = c.entity;
    lines.push(`- **New entry \`${e.id}\`** — ${e.name} · Layer ${e.layer} · jur \`${e.jur}\` · pow ${e.pow} · ${e.status} · ${e.link || '(no link)'}`, '', q(e.desc), '');
    if (e.context) lines.push(q(e.context), '');
    for (const [k, v] of Object.entries(e.cov || {})) lines.push(`  - _${k}_: ${v}`);
    lines.push('');
  }
  return lines.join('\n');
}
function renderEvidence(ev, db) {
  const s = db.sources[ev.source];
  if (!s) return `- ${ev.note || JSON.stringify(ev)}`;
  const f = lastFetch(s) || {};
  const dates = Object.entries(s.dates || {}).map(([k, v]) => `${k} ${v}`).join(', ');
  const pas = ev.passage ? s.passages.find(p => p.id === ev.passage) : null;
  const out = [`- **${ev.source}** ${s.title || s.url} — <${s.url}>`,
    `  ${s.type || 'source'} · retrieved ${f.date || '—'} · access: ${f.status || 'not fetched'}${dates ? ` · ${dates}` : ''}`];
  if (pas) out.push(`  ${pas.locator}:`, q(pas.text).replace(/^/gm, '  '));
  if (ev.supports) out.push(`  _Supports:_ ${ev.supports}`);
  return out.join('\n');
}
function renderProposal(p, inv, db) {
  const v = latest(p);
  const d = p.decision;
  const out = [`### ${p.id} v${v.v} — ${v.title}`, '',
    `\`${v.kind}\` · confidence: ${v.confidence || '—'} · change-hash \`${v.hash}\` · decision: **${d.status}**${d.status !== 'pending' ? ` (v${d.v}, ${d.date})` : ''}${d.revisit_after ? ` · revisit after ${d.revisit_after}` : ''}`, ''];
  if (p.versions.length > 1) {
    const prev = p.versions[p.versions.length - 2];
    out.push(`_Revised from v${prev.v} (${prev.hash === v.hash ? 'same change wording; evidence/notes updated' : 'wording changed'})._`, '');
  }
  if (v.changes.length) out.push('**Change**', '', ...v.changes.map(c => renderChange(c, inv)));
  if (v.question) out.push(`**Question for you:** ${v.question}`, '');
  if (v.why) out.push(`**Why it matters:** ${v.why}`, '');
  if (v.rationale) out.push(`**Reasoning:** ${v.rationale}`, '');
  if (v.evidence.length) out.push('**Evidence**', '', ...v.evidence.map(e => renderEvidence(e, db)), '');
  const cs = L.conflictStatus(v.evidence, db);
  if (cs.conflict) out.push(cs.resolved ? `**Conflicting evidence — resolved** by ${cs.how}.` : `**⚠ Conflicting evidence — not resolved:** ${cs.reason}. Cannot be accepted until then.`, '');
  if (v.uncertainty) out.push(`**Uncertainty:** ${v.uncertainty}`, '');
  const ko = v.knock_on.filter(i => !i.startsWith('entry:') || v.knock_on_notes[i]);
  const koEntries = v.knock_on.filter(i => i.startsWith('entry:') && !v.knock_on_notes[i]);
  if (ko.length || koEntries.length) {
    out.push('**May need reconsideration if accepted**', '');
    for (const i of ko) {
      const it = inv.byId[i];
      out.push(`- \`${i}\`${v.knock_on_notes[i] ? ` — **${v.knock_on_notes[i]}**` : ''}${it ? `: ${clip(typeof it.value === 'string' ? it.value.replace(/\n/g, ' — ') : JSON.stringify(it.value), 180)}` : ''}`);
    }
    if (koEntries.length) out.push(`- Entry text that mentions the affected entries: ${koEntries.map(i => `\`${i}\``).join(', ')}`);
    out.push('');
  }
  if (p.decision_log.length) out.push(`_History:_ ${p.decision_log.map(x => `${x.status}${x.v ? ` v${x.v}` : ''} ${x.date || ''}${x.note ? ` (${x.note})` : ''}`).join('; ')}`, '');
  return out.join('\n');
}
function report(id) {
  const run = L.readJSON(F.run(id)) || die(`no run ${id}`);
  const inv = L.buildInventory();
  const db = sources(); const lg = ledger(); const all = checks();
  const per = L.readJSON(F.runChecks(id), {});
  const today = L.today();
  const open = lg.proposals.filter(p => !p.applied && (p.decision.status === 'pending' || (p.decision.status === 'deferred' && (!p.decision.revisit_after || p.decision.revisit_after <= today))));
  const changes = open.filter(p => latest(p).kind === 'change');
  const additions = open.filter(p => latest(p).kind === 'addition');
  const flags = open.filter(p => latest(p).kind === 'flag');
  const decided = lg.proposals.filter(p => p.decision.status !== 'pending' && !(open.includes(p)));
  const runIds = Object.keys(per);
  const counts = {}; for (const r of Object.values(per)) counts[r.outcome] = (counts[r.outcome] || 0) + 1;
  const total = inv.items.length;
  const everOk = inv.items.filter(i => all.items[i.id]?.last_success).length;
  const okCurrent = inv.items.filter(i => all.items[i.id]?.last_success?.hash === i.hash).length;
  const elapsed = run.finished_at ? Math.round((Date.parse(run.finished_at) - Date.parse(run.started_at)) / 60000) : null;
  const usedSources = [...new Set(Object.values(per).flatMap(r => r.sources))];
  const failures = usedSources.filter(s => db.sources[s] && !accessible(db.sources[s]));
  const entriesInRun = [...new Set(runIds.filter(i => i.startsWith('entry:')).map(i => i.split(':')[1]))];
  const contentDate = (L.contentDates().find(d => d.kind === 'iso') || {}).value;

  const appliedP = lg.proposals.filter(p => p.applied);
  const awaitingApply = decided.filter(p => p.decision.status === 'accepted' && !p.applied);
  const st = k => decided.filter(p => p.decision.status === k).length;
  const typeOf = p => (latest(p).kind === 'flag' ? 'question' : latest(p).kind);
  const cell = t => String(t).replace(/\|/g, '\\|');
  const conflictMark = p => (L.conflictStatus(latest(p).evidence, db).resolved ? '' : ' ⚠ conflict');

  const o = [];
  o.push(`# Review report — ${run.label}`, '');
  if (run.partial) o.push(`> **PARTIAL RUN.** ${entriesInRun.length} of ${inv.map.entities.length} entries checked. This is not a baseline audit; everything else is *not checked*.`, '');

  o.push('## Summary', '');
  for (const h of run.highlights || []) o.push(`- ${h}`);
  if ((run.highlights || []).length) o.push('');
  o.push(
    `- **Checked:** ${runIds.length} items across ${entriesInRun.length} of ${inv.map.entities.length} entries. ${Object.entries(counts).map(([k, v]) => `${OUTCOMES[k]}: ${v}`).join(' · ') || '—'}.`,
    `- **Proposals:** ${open.length} awaiting your decision · ${awaitingApply.length} accepted, not yet applied · ${appliedP.length} applied · ${st('rejected')} rejected · ${st('deferred')} deferred.`,
    `- **Sources:** ${usedSources.length} used, ${failures.length} could not be retrieved${failures.length ? ' (see §2)' : ''}.`,
    `- **Map:** content last updated ${contentDate}. ${everOk} of ${total} inventory items have ever been successfully checked (${okCurrent} against their current text).`,
    `- **Run:** \`${run.id}\` · ${run.started_at} → ${run.finished_at ? `${run.finished_at} (${elapsed} min)` : 'not finished'} · usage/cost: ${run.usage || 'not available in this session'}.`, '');

  o.push('## Decisions', '', '### Awaiting your decision', '');
  if (open.length) {
    o.push('| ID | Ver | Type | Proposal | Confidence |', '|---|---|---|---|---|');
    for (const p of [...changes, ...additions, ...flags]) o.push(`| ${p.id} | v${latest(p).v} | ${typeOf(p)}${conflictMark(p)} | ${cell(latest(p).title)} | ${latest(p).confidence || '—'} |`);
    o.push('', 'Reply in conversation, e.g. “accept P-0002 v1”, “edit P-0003: use …”, “reject P-0004 — reason”, “defer P-0005 until 2026-12-01”. Decisions bind to the version shown; a substantive revision comes back for renewed approval. Details in §1.', '');
  } else o.push('_Nothing awaiting a decision._', '');
  o.push('### Decided', '');
  if (decided.length) {
    o.push('| ID | Ver | Decision | Date | Status | Proposal |', '|---|---|---|---|---|---|');
    for (const p of decided) {
      const d = p.decision;
      const status = p.applied ? `applied (${p.applied.manifest.split('/').pop()})` : d.status === 'accepted' ? 'awaiting apply' : d.revisit_after ? `revisit after ${d.revisit_after}` : '—';
      o.push(`| ${p.id} | v${d.v ?? '—'} | ${d.status}${d.edited ? ' (your edit)' : ''}${d.conflict_override ? ' (conflict override)' : ''} | ${d.date || '—'} | ${status} | ${cell(latest(p).title)} |`);
    }
    o.push('');
  } else o.push('_None yet._', '');

  o.push('## 1. Proposal details — awaiting decision', '');
  if (!open.length) o.push('_None._', '');
  for (const [label, ps] of [['Changes to existing items', changes], ['New candidates', additions], ['Questions requiring your judgment', flags]]) {
    if (!ps.length) continue;
    o.push(`### ${label}`, '', ps.map(p => renderProposal(p, inv, db)).join('\n---\n\n'), '');
  }

  const unresolved = runIds.filter(i => ['unresolved', 'inaccessible'].includes(per[i].outcome));
  o.push('## 2. Unresolved items and failures', '');
  if (!unresolved.length && !failures.length) o.push('_None._', '');
  const groups = {};
  for (const i of unresolved) { const k = `${per[i].outcome}|${per[i].note}|${per[i].sources.join(',')}`; (groups[k] = groups[k] || []).push(i); }
  for (const [k, items] of Object.entries(groups)) {
    const [outcome, note, srcs] = k.split('|');
    o.push(`- **${OUTCOMES[outcome]}** — ${items.length} item(s): ${items.map(i => `\`${i}\``).join(', ')}`, `  ${note}`);
    const cf = per[items[0]].conflict;
    if (cf) o.push(`  **Conflict:** ${cf.sources.join(' vs ')} — next step: double check these sources, then consult a third independent source if they still disagree.`);
    for (const s of list(srcs)) { const src = db.sources[s]; const f = lastFetch(src) || {}; o.push(`  - ${s} <${src.url}> — ${f.status || 'not fetched'}${f.http ? ` HTTP ${f.http}` : ''} on ${f.date || '—'}`); }
  }
  o.push('');

  o.push('## 3. Discovery log', '');
  if (!run.discovery.length) o.push('_No discovery searches in this run._', '');
  for (const d of run.discovery) {
    o.push(`### ${d.area}`, '', d.summary || '', '');
    if (d.queries?.length) o.push(`Searches: ${d.queries.map(x => `“${x}”`).join('; ')}`, '');
    if (d.candidates?.length) {
      o.push('| Candidate | Result | Reason | Sources |', '|---|---|---|---|');
      for (const c of d.candidates) o.push(`| ${c.name} | ${c.result}${c.proposal ? ` (${c.proposal})` : ''} | ${c.reason} | ${(c.sources || []).join(', ')} |`);
      o.push('');
    }
    if (d.limits) o.push(`_Limits:_ ${d.limits}`, '');
  }

  o.push('## 4. Proposal details — decided (audit trail)', '');
  o.push(decided.length ? decided.map(p => renderProposal(p, inv, db)).join('\n---\n\n') : '_None yet._', '');

  o.push('## Appendix A — checked, no material change', '');
  const nochange = runIds.filter(i => per[i].outcome === 'no_change');
  if (!nochange.length) o.push('_None._', '');
  const byNote = {};
  for (const i of nochange) { const k = `${per[i].note}|${per[i].sources.join(',')}`; (byNote[k] = byNote[k] || []).push(i); }
  for (const [k, items] of Object.entries(byNote)) {
    const [note, srcs] = k.split('|');
    o.push(`- ${items.map(i => `\`${i}\``).join(', ')}`, `  ${note} — sources: ${list(srcs).map(s => `${s} <${db.sources[s].url}>`).join('; ')}`);
  }
  o.push('', '## Appendix B — not checked in this run', '');
  const notChecked = inv.map.entities.filter(e => !entriesInRun.includes(e.id)).map(e => e.id);
  o.push(`Entries (${notChecked.length}): ${notChecked.map(i => `\`${i}\``).join(', ') || '—'}`, '');
  const otherKinds = inv.items.filter(i => !i.id.startsWith('entry:') && !per[i.id]).map(i => i.id);
  o.push(`Other inventory items not checked (${otherKinds.length}): connections, gap summaries, FAQ answers, page text and category definitions not listed above.`, '');
  o.push('## Appendix C — sources used', '');
  for (const s of usedSources) { const src = db.sources[s]; const f = lastFetch(src) || {}; o.push(`- ${s} ${src.title || ''} <${src.url}> — ${src.type || 'source'} · ${f.status || 'not fetched'} ${f.date || ''}${f.sha256 ? ` · sha256:${f.sha256}` : ''}`); }
  const text = o.join('\n') + '\n';
  fs.writeFileSync(F.report(id), text);
  console.log(text);
}

// ---- main --------------------------------------------------------------------------------
function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const { pos, o } = parseArgs(rest);
  switch (cmd) {
    case 'inventory': {
      const inv = L.buildInventory();
      for (const i of inv.items.filter(x => !o.entry || x.id.startsWith(`entry:${o.entry}`))) console.log(`${i.id}\t${i.kind}\t${i.hash}\trefs:${i.refs.join(',')}`);
      return console.log(`${inv.items.length} items total`);
    }
    case 'deps': return console.log(L.dependents(L.buildInventory(), pos[0]).join('\n'));
    case 'run': return runCmd(pos[0], pos[1], o, pos[2]);
    case 'source': {
      const [sub, a] = pos;
      if (sub === 'fetch') return fetchSource(a, o);
      if (sub === 'add') {
        if (!o.status || !o.via) die('--status and --via are required');
        const [id] = upsertSource(a, { ...o, fetch: { date: L.today(), at: now(), run: o.run || null, via: o.via, status: o.status, note: o.note || null } });
        return console.log(`${id} ${o.status} ${a}`);
      }
      if (sub === 'passage') {
        const db = sources(); const s = db.sources[a] || die(`no source ${a}`);
        if (!o.locator || !o.text) die('--locator and --text are required');
        if (!accessible(s)) die(`${a} was not retrieved successfully; a passage cannot be recorded from it`);
        const pid = `${a}#${s.passages.length + 1}`;
        s.passages.push({ id: pid, locator: o.locator, text: o.text, retrieved: lastFetch(s).date });
        L.writeJSON(F.sources, db); return console.log(pid);
      }
      if (sub === 'dates') {
        const db = sources(); const s = db.sources[a] || die(`no source ${a}`);
        for (const kv of pos.slice(2)) { const [k, v] = kv.split('='); s.dates[k] = v; }
        L.writeJSON(F.sources, db); return console.log(JSON.stringify(s.dates));
      }
      return die('source fetch|add|passage|dates');
    }
    case 'check': return recordCheck(pos[0], o);
    case 'propose': return propose(pos[0], o);
    case 'revise': return revise(pos[0], pos[1], o);
    case 'decide': return decide(pos[0], pos[1], o);
    case 'edit': return edit(pos[0], pos[1], o);
    case 'list': {
      for (const p of ledger().proposals.filter(x => !o.status || x.decision.status === o.status)) {
        const v = latest(p); console.log(`${p.id} v${v.v} [${p.decision.status}${p.applied ? ', applied' : ''}] ${v.kind}: ${v.title}`);
      }
      return;
    }
    case 'show': {
      const p = getP(ledger(), pos[0]);
      return console.log(renderProposal(p, L.buildInventory(), sources()));
    }
    case 'report': return report(pos[0]);
    default: console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 26).join('\n').replace(/^\/\/ ?/gm, ''));
  }
}
main();
