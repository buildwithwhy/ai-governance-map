#!/usr/bin/env node
// Apply approved proposals from research/ledger.json to the map.
//
//   node tools/apply.js [--date YYYY-MM-DD] [--dry-run]
//       Apply every accepted, unapplied proposal (the exact approved version),
//       update derived counts/dates, run build-llms.js, write a manifest to
//       research/applied/ and mark the proposals applied.
//   node tools/apply.js --manifest research/applied/X.json --root DIR
//       Replay a manifest onto another checkout (used by check.js --guard).
//
// Only literal values inside index.html (and exact text in other files) are
// edited; formatting elsewhere is untouched.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const L = require('./lib');

// ---- operations ---------------------------------------------------------------
const HEADER = ['link', 'name', 'layer', 'jur', 'pow', 'status'];
const val = lit => eval(`(${lit})`);
const same = (a, b) => L.stable(a === undefined ? null : a) === L.stable(b === undefined ? null : b);

function splice(src, start, end, text) { return src.slice(0, start) + text + src.slice(end); }
function mustEntity(src, id) {
  const span = L.entitySpan(src, id);
  if (!span) throw new Error(`entity '${id}' not found`);
  return span;
}
// Remove a property (and its separator) from an object literal.
function dropProp(src, p, key) {
  const keys = Object.keys(p).filter(k => k !== '__end');
  const i = keys.indexOf(key);
  if (i < keys.length - 1) return splice(src, p[key].keyStart, p[keys[i + 1]].keyStart, '');
  const prevEnd = i > 0 ? p[keys[i - 1]].valueEnd : p[key].keyStart;
  return splice(src, prevEnd, p[key].valueEnd, '');
}
function serializeEntity(e) {
  const head = ['id', ...HEADER].filter(k => e[k] !== undefined && e[k] !== null)
    .map(k => `${k}: ${L.literal(e[k], typeof e[k] === 'string' ? "'" : null)}`).join(', ');
  const lines = [`  { ${head},`, `    desc: ${JSON.stringify(e.desc)},`];
  if (e.context) lines.push(`    context: ${JSON.stringify(e.context)},`);
  const cov = Object.entries(e.cov || {});
  if (!cov.length) lines.push('    cov: {} },');
  else lines.push('    cov: {', cov.map(([k, v]) => `      ${k}: ${JSON.stringify(v)}`).join(',\n'), '    } },');
  return lines.join('\n');
}

const OPS = {
  set_field(src, op) {
    if (op.field === 'id' || op.field === 'cov') throw new Error('use add_entity / set_cov');
    const span = mustEntity(src, op.entity);
    const p = L.props(src, span.start);
    if (p[op.field]) {
      const old = src.slice(p[op.field].valueStart, p[op.field].valueEnd);
      if (!same(val(old), op.from)) throw new Error(`stale: ${op.entity}.${op.field} no longer matches 'from'`);
      if (op.to === null) return dropProp(src, p, op.field);
      return splice(src, p[op.field].valueStart, p[op.field].valueEnd, L.literal(op.to, old));
    }
    if (op.from !== null && op.from !== undefined) throw new Error(`stale: ${op.entity}.${op.field} is absent`);
    if (HEADER.includes(op.field)) {
      const at = p.name ? p.name.keyStart : p.id.valueEnd + 2;
      return splice(src, at, at, `${op.field}: ${L.literal(op.to, "'")}, `);
    }
    return splice(src, p.cov.keyStart, p.cov.keyStart, `${op.field}: ${JSON.stringify(op.to)},\n    `);
  },
  set_cov(src, op, map) {
    const span = mustEntity(src, op.entity);
    const p = L.props(src, span.start);
    const c = L.props(src, p.cov.valueStart);
    const keys = Object.keys(c).filter(k => k !== '__end');
    if (c[op.cat]) {
      const old = src.slice(c[op.cat].valueStart, c[op.cat].valueEnd);
      if (!same(val(old), op.from)) throw new Error(`stale: ${op.entity}.cov.${op.cat} no longer matches 'from'`);
      if (op.to === null) return dropProp(src, c, op.cat);
      return splice(src, c[op.cat].valueStart, c[op.cat].valueEnd, L.literal(op.to, old));
    }
    if (op.from !== null && op.from !== undefined) throw new Error(`stale: ${op.entity}.cov.${op.cat} is absent`);
    if (!map.categories.some(x => x.id === op.cat)) throw new Error(`unknown category ${op.cat}`);
    const order = map.categories.map(x => x.id);
    const next = keys.find(k => order.indexOf(k) > order.indexOf(op.cat));
    const line = `${op.cat}: ${JSON.stringify(op.to)}`;
    if (next) return splice(src, c[next].keyStart, c[next].keyStart, `${line},\n      `);
    if (!keys.length) return splice(src, p.cov.valueStart, p.cov.valueEnd, `{\n      ${line}\n    }`);
    const last = c[keys[keys.length - 1]].valueEnd;
    return splice(src, last, last, `,\n      ${line}`);
  },
  add_entity(src, op, map) {
    const e = op.entity;
    if (map.entities.some(x => x.id === e.id)) throw new Error(`entity '${e.id}' already exists`);
    const anchor = op.after || [...map.entities].reverse().find(x => x.layer === e.layer)?.id;
    if (!anchor) throw new Error('add_entity needs `after` when the layer is empty');
    const span = mustEntity(src, anchor);
    if (src[span.end] !== ',') throw new Error('unexpected entity separator');
    return splice(src, span.end + 1, span.end + 1, '\n' + serializeEntity(e));
  },
  add_edge(src, op, map) {
    if (map.edges.some(d => (d.a === op.a && d.b === op.b) || (d.a === op.b && d.b === op.a))) throw new Error(`edge ${op.a}|${op.b} exists`);
    const open = src.indexOf('[', src.indexOf('const EDGES = ['));
    const close = L.matchClose(src, open) - 1;
    const last = src.lastIndexOf('}', close);
    return splice(src, last + 1, last + 1, `,\n  { a: '${op.a}', b: '${op.b}', rel: ${L.jsString(op.rel, "'")} }`);
  },
  set_edge(src, op) { return edgeEdit(src, op, (s, p, old) => splice(s, p.rel.valueStart, p.rel.valueEnd, L.literal(op.to, old))); },
  remove_edge(src, op) {
    return edgeEdit(src, op, (s, p, old, start, end) => {
      const lineStart = s.lastIndexOf('\n', start);
      if (s[end] === ',') return splice(s, lineStart, end + 1, '');
      const prevComma = s.lastIndexOf(',', lineStart);
      return splice(s, prevComma, end, '');
    });
  },
};
function edgeEdit(src, op, fn) {
  const re = new RegExp(`\\{ a: '${op.a}', b: '${op.b}'`);
  const from = src.indexOf('const EDGES = [');
  const m = re.exec(src.slice(from));
  if (!m) throw new Error(`edge ${op.a}|${op.b} not found (direction matters)`);
  const start = from + m.index;
  const p = L.props(src, start);
  const old = src.slice(p.rel.valueStart, p.rel.valueEnd);
  if (op.from !== undefined && !same(val(old), op.from)) throw new Error(`stale: edge ${op.a}|${op.b} rel no longer matches 'from'`);
  return fn(src, p, old, start, L.matchClose(src, start));
}

// Apply a list of change operations to the files under `root`.
function applyOps(root, ops) {
  const touched = new Set();
  for (const op of ops) {
    if (op.op === 'replace_text') {
      const f = path.join(root, op.file);
      const text = fs.readFileSync(f, 'utf8');
      const n = text.split(op.from).length - 1;
      const want = op.count || 1;
      if (n !== want) throw new Error(`replace_text in ${op.file}: expected ${want} occurrence(s) of 'from', found ${n}`);
      fs.writeFileSync(f, text.split(op.from).join(op.to));
      touched.add(op.file);
      continue;
    }
    if (!OPS[op.op]) throw new Error(`unknown op ${op.op}`);
    const map = L.loadMap(root);
    const next = OPS[op.op](map.src, op, map);
    fs.writeFileSync(path.join(root, 'index.html'), next);
    verifyOp(L.loadMap(root), op);
    touched.add('index.html');
  }
  return [...touched];
}
// Re-parse and confirm the edit did exactly what the operation says.
function verifyOp(map, op) {
  const e = id => map.entities.find(x => x.id === id);
  const edge = () => map.edges.find(d => d.a === op.a && d.b === op.b);
  const ok = {
    set_field: () => same(e(op.entity)?.[op.field], op.to),
    set_cov: () => same(e(op.entity)?.cov?.[op.cat], op.to),
    add_entity: () => same(e(op.entity.id), op.entity),
    add_edge: () => edge()?.rel === op.rel,
    set_edge: () => edge()?.rel === op.to,
    remove_edge: () => !edge(),
  }[op.op]();
  if (!ok) throw new Error(`post-check failed for ${op.op} ${JSON.stringify(op).slice(0, 120)}`);
}

// ---- proposals ------------------------------------------------------------------
const ledgerPath = root => path.join(root, 'research', 'ledger.json');
function approvedVersion(p) {
  const d = p.decision;
  if (!d || d.status !== 'accepted') return null;
  const v = p.versions.find(x => x.v === d.v);
  return v && v.hash === d.hash ? v : null;
}

function build(root) { execFileSync(process.execPath, ['build-llms.js'], { cwd: root, stdio: 'pipe' }); }

function replay(manifestFile, root) {
  const manifest = L.readJSON(manifestFile);
  const ledger = L.readJSON(path.join(L.REPO, 'research', 'ledger.json'));
  const ops = [];
  for (const ref of manifest.proposals) {
    const p = ledger.proposals.find(x => x.id === ref.id);
    const v = p && p.versions.find(x => x.v === ref.v);
    if (!v || v.hash !== ref.hash) throw new Error(`${ref.id} v${ref.v}: not in ledger or hash mismatch`);
    const appr = p.decision && p.decision.status === 'accepted' && p.decision.v === ref.v && p.decision.hash === ref.hash;
    if (!appr) throw new Error(`${ref.id} v${ref.v}: approval does not match this version`);
    ops.push(...v.changes);
  }
  applyOps(root, ops);
  L.writeDerived(root, { date: manifest.date });
  build(root);
}

function main() {
  const args = process.argv.slice(2);
  const opt = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
  const root = path.resolve(opt('--root') || L.REPO);
  if (opt('--manifest')) { replay(opt('--manifest'), root); return console.log('replayed', opt('--manifest')); }

  const date = opt('--date') || L.today();
  const dry = args.includes('--dry-run');
  const ledger = L.readJSON(ledgerPath(root), { proposals: [] });
  const todo = ledger.proposals.filter(p => !p.applied && approvedVersion(p) && approvedVersion(p).changes.length);
  if (!todo.length) return console.log('nothing approved to apply');
  console.log(`applying ${todo.length} proposal(s): ${todo.map(p => `${p.id} v${p.decision.v}`).join(', ')}`);
  if (dry) return;

  const touched = applyOps(root, todo.flatMap(p => approvedVersion(p).changes));
  const derived = L.writeDerived(root, { date });
  build(root);
  const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root }).toString().trim();
  let name = `research/applied/${date}.json`;
  for (let n = 2; fs.existsSync(path.join(root, name)); n++) name = `research/applied/${date}-${n}.json`;
  L.writeJSON(path.join(root, name), {
    date, base_commit: head,
    proposals: todo.map(p => ({ id: p.id, v: p.decision.v, hash: p.decision.hash })),
  });
  for (const p of todo) p.applied = { manifest: name, date };
  L.writeJSON(ledgerPath(root), ledger);
  console.log(`edited: ${[...new Set([...touched, ...derived])].join(', ')}; regenerated llms.txt, llms-full.txt, data.json`);
  console.log(`manifest: ${name}  — verify with: node tools/check.js --guard origin/main`);
}

if (require.main === module) {
  try { main(); } catch (e) { console.error('apply failed:', e.message); process.exit(1); }
}
module.exports = { applyOps, approvedVersion, serializeEntity };
