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

module.exports = {
  REPO, RESEARCH, isPublished, hash, stable, readJSON, writeJSON, today, norm, longDate,
  skipString, matchClose, props, literal, jsString,
  readIndex, loadMap, entitySpan, staticTexts, ldBlocks,
  buildInventory, dependents, derivedCounts, contentDates, writeDerived, COUNT_SITES, DATE_SITES, dateForm,
};
