// Shared helpers for the research-and-update workflow.
// index.html stays the source of truth; everything here reads it (and, in
// apply.js, edits individual JS literals inside it) without reformatting.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO = path.resolve(__dirname, '..');
const RESEARCH = path.join(REPO, 'research');

// Paths that never ship as map content. Everything else in the repo is
// treated as published and must be reproducible by tools/apply.js.
const NON_PUBLISHED = [/^research\//, /^tools\//, /^\.vercelignore$/];
const isPublished = f => !NON_PUBLISHED.some(re => re.test(f));

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = iso => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };

// ---- small utilities --------------------------------------------------------
function stable(v) {
  if (Array.isArray(v)) return `[${v.map(stable).join(',')}]`;
  if (v && typeof v === 'object') return `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}:${stable(v[k])}`).join(',')}}`;
  return JSON.stringify(v);
}
const hash = v => crypto.createHash('sha256').update(typeof v === 'string' ? v : stable(v)).digest('hex').slice(0, 12);
const readJSON = (f, dflt) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : dflt);
const writeJSON = (f, v) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(v, null, 2) + '\n'); };
const today = () => new Date().toISOString().slice(0, 10);
const norm = s => String(s).replace(/\s+/g, ' ').trim().toLowerCase();

// ---- JS literal scanning ----------------------------------------------------
// Minimal scanner for the object/array literals in index.html: understands
// '...', "...", `...` strings with backslash escapes, and nested {} / [].
function skipString(src, i) {
  const q = src[i];
  for (i++; i < src.length; i++) {
    if (src[i] === '\\') { i++; continue; }
    if (src[i] === q) return i + 1;
  }
  throw new Error('unterminated string');
}
function matchClose(src, open) {
  let depth = 0;
  for (let i = open; i < src.length;) {
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') { i = skipString(src, i); continue; }
    if (c === '{' || c === '[') depth++;
    if (c === '}' || c === ']') { depth--; if (depth === 0) return i + 1; }
    i++;
  }
  throw new Error('unbalanced literal');
}
// Top-level `key: value` spans of the object literal starting at `open` ('{').
function props(src, open) {
  const end = matchClose(src, open) - 1;
  const out = {};
  let i = open + 1;
  while (i < end) {
    while (i < end && /[\s,]/.test(src[i])) i++;
    if (i >= end) break;
    const km = /^([A-Za-z_$][\w$]*|'[^']*'|"[^"]*")\s*:\s*/.exec(src.slice(i, i + 200));
    if (!km) throw new Error(`cannot parse key at ${i}: ${src.slice(i, i + 40)}`);
    const key = km[1].replace(/^['"]|['"]$/g, '');
    const keyStart = i;
    i += km[0].length;
    const valueStart = i;
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') i = skipString(src, i);
    else if (c === '{' || c === '[') i = matchClose(src, i);
    else { while (i < end && !/[,\s}]/.test(src[i])) i++; }
    out[key] = { keyStart, valueStart, valueEnd: i };
  }
  out.__end = end;
  return out;
}
function jsString(value, quote) {
  if (quote === "'") return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
  return JSON.stringify(value);
}
function literal(value, oldLiteral) {
  if (typeof value === 'number') return String(value);
  const q = oldLiteral && oldLiteral[0] === "'" ? "'" : (oldLiteral ? '"' : "'");
  return jsString(value, q);
}

// ---- reading the map ----------------------------------------------------------
function readIndex(root = REPO) { return fs.readFileSync(path.join(root, 'index.html'), 'utf8'); }

function evalConst(src, name, closer) {
  const re = new RegExp(`const ${name} = (\\${closer === ']' ? '[' : '{'}[\\s\\S]*?\\n\\${closer});`);
  const m = src.match(re);
  if (!m) throw new Error(`could not find ${name}`);
  return { value: eval(`(${m[1]})`), start: m.index + m[0].indexOf(m[1]), text: m[1] };
}
function ldBlocks(src) {
  const out = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(src))) out.push(JSON.parse(m[1]));
  return out;
}
function loadMap(root = REPO) {
  const src = readIndex(root);
  const ENTITIES = evalConst(src, 'ENTITIES', ']');
  const EDGES = evalConst(src, 'EDGES', ']');
  return {
    src,
    entities: ENTITIES.value,
    entitiesStart: ENTITIES.start,
    edges: EDGES.value,
    edgesStart: EDGES.start,
    categories: evalConst(src, 'CATEGORIES', ']').value,
    gaps: evalConst(src, 'GAP_SUMMARIES', '}').value,
    ld: ldBlocks(src),
  };
}
function entitySpan(src, id) {
  const ents = src.indexOf('const ENTITIES = [');
  const edges = src.indexOf('const EDGES = [');
  const re = new RegExp(`\\{ id: '${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`, 'g');
  re.lastIndex = ents;
  const m = re.exec(src);
  if (!m || m.index > edges) return null;
  return { start: m.index, end: matchClose(src, m.index) };
}

// Static explanatory text in the page, keyed by stable inventory ids.
function staticTexts(src) {
  const out = {};
  const layer = /<div class="band-lbl" data-tooltip="([^"]*)"[^>]*>\s*<div class="ord">Layer (\d)<\/div><h2>([^<]*)<\/h2><p>([^<]*)<\/p>/g;
  let m;
  while ((m = layer.exec(src))) {
    out[`text:layer-${m[2]}:tooltip`] = m[1];
    out[`text:layer-${m[2]}:subtitle`] = m[4];
  }
  const foot = src.match(/<p>(Sources: [^<]*)<\/p>/);
  if (foot) out['text:footer-sources'] = foot[1];
  const note = src.match(/<p>(The orthogonal coverage analysis[^<]*)<\/p>/);
  if (note) out['text:footer-note'] = note[1];
  const gap = src.match(/<p id="gap-body">([^<]*)<\/p>/);
  if (gap) out['text:gap-default'] = gap[1];
  const intro = src.match(/<p class="intro">([^<]*)<\/p>/);
  if (intro) out['text:intro'] = intro[1];
  return out;
}

// ---- inventory --------------------------------------------------------------
// Every checkable unit of the map, with a content hash so a later run can tell
// whether the text it checked has since changed.
function aliasesFor(e, extra) {
  const base = [e.name, e.name.replace(/\s*\(.*?\)\s*/g, '')];
  return [...new Set([...base, ...(extra[e.id] || [])].filter(a => a && a.length > 2))];
}
// Word-boundary match; acronyms (no lowercase letters) are case-sensitive.
function mentions(text, aliases) {
  return aliases.some(a => {
    const esc = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^\\w])${esc}(?![\\w])`, /[a-z]/.test(a) ? 'i' : '').test(text);
  });
}
function buildInventory(root = REPO) {
  const map = loadMap(root);
  const extra = readJSON(path.join(root, 'research', 'aliases.json'), {});
  const items = [];
  const add = (id, kind, value, refs = []) => items.push({ id, kind, value, hash: hash(value), refs });

  for (const e of map.entities) {
    add(`entry:${e.id}`, 'entry-meta', { name: e.name, layer: e.layer, jur: e.jur, pow: e.pow, status: e.status, link: e.link || null }, [e.id]);
    add(`entry:${e.id}:desc`, 'entry-claim', e.desc, [e.id]);
    if (e.context) add(`entry:${e.id}:context`, 'entry-claim', e.context, [e.id]);
    add(`entry:${e.id}:cov`, 'coverage-set', Object.keys(e.cov || {}).sort(), [e.id]);
    for (const [cat, note] of Object.entries(e.cov || {})) add(`entry:${e.id}:cov:${cat}`, 'coverage-note', note, [e.id]);
  }
  for (const d of map.edges) add(`edge:${d.a}|${d.b}`, 'connection', d.rel, [d.a, d.b]);

  // Narrative text: refs found by alias matching (heuristic — "may need reconsideration").
  const narrative = [];
  for (const [cat, g] of Object.entries(map.gaps)) narrative.push([`gap:${cat}`, 'gap-summary', `${g.title}\n${g.body}`]);
  const faq = map.ld.find(b => b['@type'] === 'FAQPage');
  for (const q of (faq ? faq.mainEntity : [])) {
    const slug = q.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);
    narrative.push([`faq:${slug}`, 'faq', `${q.name}\n${q.acceptedAnswer.text}`]);
  }
  for (const [id, text] of Object.entries(staticTexts(map.src))) narrative.push([id, 'page-text', text]);
  for (const c of map.categories) narrative.push([`category:${c.id}`, 'category-definition', `${c.name}: ${c.desc}`]);
  for (const name of ['JUR_LABEL', 'POW_LABEL', 'STATUS_LABEL']) {
    const m = map.src.match(new RegExp(`const ${name} = (\\{[^\\n]*\\});`));
    if (m) add(`label:${name.split('_')[0].toLowerCase()}`, 'label', eval(`(${m[1]})`));
  }
  const mentioned = text => map.entities.filter(e => mentions(text, aliasesFor(e, extra))).map(e => e.id);
  for (const [id, kind, text] of narrative) add(id, kind, text, mentioned(text));
  // Entry text that mentions *other* entries also depends on them.
  for (const i of items) {
    if (i.kind === 'entry-claim' || i.kind === 'coverage-note') i.refs = [...new Set([...i.refs, ...mentioned(i.value)])];
  }
  // Counts, dates and generated files are checked mechanically by tools/check.js.
  add('derived:counts', 'derived', derivedCounts(map));
  add('derived:dates', 'derived', contentDates(root));
  add('derived:generated', 'derived', 'llms.txt, llms-full.txt, data.json in sync with build-llms.js');
  return { map, items, byId: Object.fromEntries(items.map(i => [i.id, i])) };
}
// Items that may need reconsideration when an entry changes.
function dependents(inv, entityId) {
  return inv.items.filter(i => i.refs.includes(entityId) && !i.id.startsWith(`entry:${entityId}`)).map(i => i.id);
}

// ---- derived values (counts, dates) -------------------------------------------
function derivedCounts(map) {
  return {
    mechanisms: map.entities.length,
    voluntary: map.entities.filter(e => e.pow === 1).length,
    binding: map.entities.filter(e => e.pow === 4).length,
    categories: map.categories.length,
  };
}
// Every hand-maintained location of a count. [file, regex, countKey]; the regex's
// first group is the number.
const COUNT_SITES = [
  ['index.html', /(?<=Interactive map of )(\d+)(?= frontier AI governance mechanisms)/g, 'mechanisms'],
  ['index.html', /(?<=<div class="num">)(\d+)(?=<\/div><div class="lbl">mechanisms mapped)/g, 'mechanisms'],
  ['index.html', /(?<=<div class="num">)(\d+)(?=<\/div><div class="lbl">voluntary or norm-only)/g, 'voluntary'],
  ['index.html', /(?<=<div class="num">)(\d+)(?=<\/div><div class="lbl">binding with penalties)/g, 'binding'],
  ['index.html', /(?<=<div class="num">)(\d+)(?=<\/div><div class="lbl">coverage categories)/g, 'categories'],
];
// Every hand-maintained location of the content date ("approved content update").
const DATE_SITES = [
  ['index.html', /(?<=<time datetime=")(\d{4}-\d{2}-\d{2})(?=">)/g, 'iso'],
  ['index.html', /(?<=<time datetime="\d{4}-\d{2}-\d{2}">)([^<]+)(?=<\/time>)/g, 'long'],
  ['index.html', /(?<="dateModified": ")(\d{4}-\d{2}-\d{2})(?=")/g, 'iso'],
  ['index.html', /(?<="version": ")(\d{4}\.\d{2}\.\d{2})(?=")/g, 'dot'],
  ['sitemap.xml', /(?<=<lastmod>)(\d{4}-\d{2}-\d{2})(?=<\/lastmod>)/g, 'iso'],
  ['build-llms.js', /(?<=const UPDATED = ')([^']+)(?=';)/g, 'long'],
  ['build-llms.js', /(?<=version: ')(\d{4}\.\d{2}\.\d{2})(?=')/g, 'dot'],
  ['build-llms.js', /(?<=updated: ')(\d{4}-\d{2}-\d{2})(?=')/g, 'iso'],
];
const dateForm = (iso, kind) => (kind === 'iso' ? iso : kind === 'dot' ? iso.replace(/-/g, '.') : longDate(iso));

function contentDates(root = REPO) {
  const found = [];
  for (const [file, re, kind] of DATE_SITES) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    for (const m of text.matchAll(re)) found.push({ file, kind, value: m[1] });
  }
  return found;
}
// Rewrite every count/date site. Returns list of files changed.
function writeDerived(root, { date } = {}) {
  const counts = derivedCounts(loadMap(root));
  const changed = new Set();
  const edit = (file, fn) => {
    const p = path.join(root, file);
    const before = fs.readFileSync(p, 'utf8');
    const after = fn(before);
    if (after !== before) { fs.writeFileSync(p, after); changed.add(file); }
  };
  for (const [file, re, key] of COUNT_SITES) edit(file, t => t.replace(re, String(counts[key])));
  if (date) for (const [file, re, kind] of DATE_SITES) edit(file, t => t.replace(re, dateForm(date, kind)));
  return [...changed];
}

// ---- evidence rules (RUBRIC §7, §7a) -----------------------------------------------
// Publisher domain (registrable domain). Used only as a *signal* about
// independence, never as proof: one publisher can use several domains and
// several publishers can share one (e.g. gov.uk).
function hostOf(url) {
  let h;
  try { h = new URL(url).hostname.toLowerCase().replace(/^www\./, ''); } catch { return String(url); }
  const p = h.split('.');
  const twoLevel = p.length > 2 && /^[a-z]{2}$/.test(p[p.length - 1]) && /^(co|com|gov|org|ac|edu|net|go|or|ne|gob|govt)$/.test(p[p.length - 2]);
  return p.slice(twoLevel ? -3 : -2).join('.');
}
const fetchedOk = s => !!s && s.fetches.length > 0 && s.fetches[s.fetches.length - 1].status === 'ok';
// The underlying account a source repeats (its own id unless `derived_from` is
// recorded, e.g. several articles summarising one press release).
const accountsOf = (id, db) => new Set([id, ...((db.sources[id] && db.sources[id].derived_from) || [])]);
const shareAccount = (a, b, db) => [...accountsOf(a, db)].some(x => accountsOf(b, db).has(x));

// A conflict is resolved only by a recorded resolution that names the specific
// disagreement, a basis, inspected passages and an explanation. A third source
// does not settle anything just by existing.
const RESOLUTION_BASES = {
  'authoritative-text': 'the authoritative (official/legal) text settles it',
  'correction-or-superseding-version': 'a documented correction or superseding version',
  'different-date': 'the sources describe different dates or versions',
  'different-scope': 'the sources describe different scopes',
  'different-definition': 'the sources use different definitions',
  'misreading-on-recheck': 'on re-reading, the source does not say what it was taken to say',
};
function validateResolution(r, sides, db) {
  const problems = []; const signals = [];
  if (!r) return { problems: ['no resolution recorded'], signals };
  if (!r.disagreement) problems.push('state the specific disagreement');
  if (!r.explanation) problems.push('explain why the evidence resolves it');
  if (!RESOLUTION_BASES[r.basis]) problems.push(`basis must be one of: ${Object.keys(RESOLUTION_BASES).join(', ')}`);
  const ev = r.evidence || [];
  if (!ev.length) problems.push('cite the inspected passages that resolve it');
  for (const e of ev) {
    const s = db.sources[e.source];
    if (!s) { problems.push(`unknown source ${e.source}`); continue; }
    if (!fetchedOk(s)) problems.push(`${e.source} was not retrieved successfully`);
    if (!e.passage || !s.passages.some(p => p.id === e.passage)) problems.push(`${e.source}: cite a recorded passage`);
  }
  const evSources = [...new Set(ev.map(e => e.source))];
  if (r.basis === 'authoritative-text' && !evSources.some(id => db.sources[id] && db.sources[id].type === 'primary')) problems.push('authoritative-text needs a primary (official) source');
  if (/^different-/.test(r.basis || '') && evSources.length < 2) problems.push(`${r.basis} needs passages from the sources on each side`);
  if (r.basis === 'misreading-on-recheck') {
    for (const side of sides.filter(x => x.stance === 'contradicts')) {
      if (!ev.some(e => e.source === side.source && e.passage !== side.passage)) problems.push(`re-read ${side.source} and cite the fresh passage`);
    }
  }
  // Signals, not gates: shared publisher domain or shared underlying account.
  const sideIds = [...new Set(sides.map(x => x.source))];
  for (const id of evSources) {
    for (const side of sideIds) {
      if (id === side) continue;
      if (db.sources[id] && db.sources[side] && hostOf(db.sources[id].url) === hostOf(db.sources[side].url)) signals.push(`${id} and ${side} share publisher domain ${hostOf(db.sources[id].url)}`);
      if (shareAccount(id, side, db)) signals.push(`${id} and ${side} repeat the same underlying account`);
    }
  }
  return { problems, signals };
}
function corroborationSignals(evidence, db) {
  const sup = [...new Set(evidence.filter(e => e.stance !== 'contradicts').map(e => e.source))];
  const out = [];
  for (let i = 0; i < sup.length; i++) for (let j = i + 1; j < sup.length; j++) {
    if (shareAccount(sup[i], sup[j], db)) out.push(`${sup[i]} and ${sup[j]} repeat the same underlying account — not independent corroboration`);
  }
  return out;
}
// ver: a proposal version (evidence + optional conflict_resolution).
function conflictStatus(ver, db) {
  const evidence = ver.evidence || [];
  const against = evidence.filter(e => e.stance === 'contradicts');
  const signals = corroborationSignals(evidence, db);
  if (!against.length) return { conflict: false, resolved: true, signals };
  const { problems, signals: rs } = validateResolution(ver.conflict_resolution, evidence, db);
  const resolved = !problems.length;
  return {
    conflict: true, resolved, signals: [...signals, ...rs],
    basis: resolved ? ver.conflict_resolution.basis : null,
    reason: resolved ? null : `conflicting evidence (${[...new Set(against.map(a => a.source))].join(', ')}): ${problems.join('; ')}`,
  };
}

// Evidence status is separate from the editorial decision. Only these statuses
// let an accepted proposal be applied without an explicit maintainer override.
const EVIDENCE_STATUSES = {
  'verified': 'Verified against inspected external sources',
  'internal-consistency': 'Internal consistency only (the map checked against itself)',
  'needs-research': 'Further research required',
  'needs-source-access': 'Source access required',
  'disputed': 'Disputed (unresolved conflicting evidence)',
};
const APPLICABLE = new Set(['verified', 'internal-consistency']);
function evidenceStatus(p, db) {
  const ver = p.versions[p.versions.length - 1];
  const r = p.research || {};
  const cs = conflictStatus(ver, db);
  if (!cs.resolved) return { status: 'disputed', missing: [cs.reason, ...(r.missing || [])], signals: cs.signals };
  return { status: r.status || 'needs-research', missing: r.missing || (r.status ? [] : ['evidence status not yet assessed']), signals: cs.signals, note: r.note || null };
}

module.exports = {
  hostOf, fetchedOk, conflictStatus, validateResolution, RESOLUTION_BASES, EVIDENCE_STATUSES, APPLICABLE, evidenceStatus,
  REPO, RESEARCH, isPublished, hash, stable, readJSON, writeJSON, today, norm, longDate,
  skipString, matchClose, props, literal, jsString,
  readIndex, loadMap, entitySpan, staticTexts, ldBlocks,
  buildInventory, dependents, derivedCounts, contentDates, writeDerived, COUNT_SITES, DATE_SITES, dateForm,
};
