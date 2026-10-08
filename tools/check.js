#!/usr/bin/env node
// Consistency validator for the map. It checks structure and internal
// consistency only; it says nothing about whether the research is right.
//
//   node tools/check.js                 validate the working tree
//   node tools/check.js --guard <ref>   also prove that every published-file
//                                       change since <ref> is reproduced by
//                                       replaying the approved-proposal manifests
//                                       added since <ref> (tools/apply.js)
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const L = require('./lib');

const errors = []; const warnings = [];
const err = (code, msg) => errors.push({ code, msg });
const warn = (code, msg) => warnings.push({ code, msg });

function structural(root) {
  const map = L.loadMap(root);
  const src = map.src;
  const labels = name => eval(`(${src.match(new RegExp(`const ${name} = (\\{[^\\n]*\\});`))[1]})`);
  const JUR = labels('JUR_LABEL'); const POW = labels('POW_LABEL'); const STATUS = labels('STATUS_LABEL');
  const cats = new Set(map.categories.map(c => c.id));
  const ids = new Set();
  for (const e of map.entities) {
    if (ids.has(e.id)) err('duplicate-id', `duplicate entity id ${e.id}`);
    ids.add(e.id);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(e.id)) err('bad-id', `bad id '${e.id}'`);
    for (const f of ['name', 'desc']) if (!e[f] || typeof e[f] !== 'string') err('missing-field', `${e.id}: missing ${f}`);
    if (![1, 2, 3, 4, 5, 6].includes(e.layer)) err('bad-layer', `${e.id}: layer ${e.layer}`);
    if (!(e.jur in JUR)) err('bad-jur', `${e.id}: jur ${e.jur}`);
    if (!(e.pow in POW)) err('bad-pow', `${e.id}: pow ${e.pow}`);
    if (!(e.status in STATUS)) err('bad-status', `${e.id}: status ${e.status}`);
    if (!e.link) warn(`missing-link:${e.id}`, `${e.id}: no source link`);
    else { try { new URL(e.link); } catch { err('bad-link', `${e.id}: invalid URL ${e.link}`); } }
    for (const k of Object.keys(e.cov || {})) {
      if (!cats.has(k)) err('bad-cov', `${e.id}: unknown coverage category ${k}`);
      if (!e.cov[k]) err('empty-cov', `${e.id}: empty coverage note ${k}`);
    }
  }
  const pairs = new Set();
  for (const d of map.edges) {
    if (!ids.has(d.a) || !ids.has(d.b)) err('dangling-edge', `edge ${d.a}|${d.b} references a missing entity`);
    if (d.a === d.b) err('self-edge', `edge ${d.a}|${d.b}`);
    const k = [d.a, d.b].sort().join('|');
    if (pairs.has(k)) err('duplicate-edge', `duplicate edge ${k}`);
    pairs.add(k);
    if (!d.rel) err('empty-edge', `edge ${d.a}|${d.b} has no relationship text`);
  }
  for (const e of map.entities) if (!map.edges.some(d => d.a === e.id || d.b === e.id)) warn(`isolated:${e.id}`, `${e.id} has no connections`);
  for (const k of Object.keys(map.gaps)) if (!cats.has(k)) err('bad-gap', `gap summary for unknown category ${k}`);
  for (const c of cats) if (!map.gaps[c]) warn(`missing-gap:${c}`, `no gap summary for ${c}`);

  // build-llms.js duplicates some page constants; they must agree.
  const build = fs.readFileSync(path.join(root, 'build-llms.js'), 'utf8');
  const bJur = eval(`(${build.match(/const JUR_LABEL = (\{[^\n]*\});/)[1]})`);
  if (L.stable(bJur) !== L.stable(JUR)) err('label-mismatch', 'JUR_LABEL differs between index.html and build-llms.js');
  const bLayers = eval(`(${build.match(/const LAYERS = (\{[\s\S]*?\n\});/)[1]})`);
  const subs = L.staticTexts(src);
  for (const n of [1, 2, 3, 4, 5, 6]) {
    if (bLayers[n].desc !== subs[`text:layer-${n}:subtitle`]) err('layer-desc-mismatch', `Layer ${n} subtitle differs between index.html ('${subs[`text:layer-${n}:subtitle`]}') and build-llms.js ('${bLayers[n].desc}')`);
  }
  return map;
}

function derived(root, map) {
  const counts = L.derivedCounts(map);
  for (const [file, re, key] of L.COUNT_SITES) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    const found = [...text.matchAll(re)].map(m => Number(m[1]));
    if (!found.length) err('count-site-missing', `${file}: no match for ${key} count pattern ${re}`);
    for (const n of found) if (n !== counts[key]) err('count-mismatch', `${file}: ${key} shows ${n}, data has ${counts[key]}`);
  }
  const data = JSON.parse(fs.readFileSync(path.join(root, 'data.json'), 'utf8'));
  const m = /(\d+) mechanisms/.exec(data.description || '');
  if (m && Number(m[1]) !== counts.mechanisms) err('data-description-count', `data.json description says ${m[1]} mechanisms; data has ${counts.mechanisms} (hardcoded in build-llms.js)`);
  const dates = L.contentDates(root);
  const iso = new Set(dates.map(d => (d.kind === 'iso' ? d.value : d.kind === 'dot' ? d.value.replace(/\./g, '-') : null)).filter(Boolean));
  const long = new Set(dates.filter(d => d.kind === 'long').map(d => d.value));
  if (iso.size !== 1 || [...long].some(v => v !== L.longDate([...iso][0]))) err('date-mismatch', `content dates disagree: ${dates.map(d => `${d.file}=${d.value}`).join(', ')}`);
  if (dates.length !== L.DATE_SITES.length + 3) warn('date-sites', `expected ${L.DATE_SITES.length + 3} date sites, found ${dates.length}`); // sitemap has 4 lastmods
}

function generated(root) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gm-gen-'));
  try {
    for (const f of ['index.html', 'build-llms.js']) fs.copyFileSync(path.join(root, f), path.join(tmp, f));
    execFileSync(process.execPath, ['build-llms.js'], { cwd: tmp, stdio: 'pipe' });
    for (const f of ['llms.txt', 'llms-full.txt', 'data.json']) {
      if (fs.readFileSync(path.join(tmp, f), 'utf8') !== fs.readFileSync(path.join(root, f), 'utf8')) err('generated-out-of-sync', `${f} differs from a fresh build-llms.js run`);
    }
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
}

function ldJson(root) {
  try { L.ldBlocks(L.readIndex(root)); } catch (e) { err('bad-jsonld', `JSON-LD does not parse: ${e.message}`); }
}

// ---- guard -------------------------------------------------------------------------
const git = (...a) => execFileSync('git', a, { cwd: L.REPO, maxBuffer: 64 << 20 }).toString();
function guard(base) {
  const changed = new Set([
    ...git('diff', '--name-only', base).split('\n'),
    ...git('ls-files', '--others', '--exclude-standard').split('\n'),
  ].filter(Boolean));
  const published = [...changed].filter(L.isPublished);
  const baseManifests = new Set(git('ls-tree', '-r', '--name-only', base, '--', 'research/applied').split('\n').filter(Boolean));
  const manifests = fs.existsSync(path.join(L.REPO, 'research/applied'))
    ? fs.readdirSync(path.join(L.REPO, 'research/applied')).map(f => `research/applied/${f}`).filter(f => !baseManifests.has(f)).sort()
    : [];
  if (!published.length && !manifests.length) return console.log(`guard: no published files changed since ${base}`);
  if (!manifests.length) return err('guard-unapproved', `published files changed since ${base} without an approved-proposal manifest: ${published.join(', ')}`);

  // Rebuild the published tree from <base> + manifests and compare byte for byte.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gm-guard-'));
  try {
    execFileSync('sh', ['-c', `git archive ${base} | tar -x -C ${tmp}`], { cwd: L.REPO });
    const apply = path.join(L.REPO, 'tools', 'apply.js');
    for (const m of manifests) execFileSync(process.execPath, [apply, '--manifest', path.join(L.REPO, m), '--root', tmp], { stdio: 'pipe' });
    const tracked = new Set([...git('ls-files').split('\n'), ...changed].filter(Boolean).filter(L.isPublished));
    for (const f of tracked) {
      const a = path.join(tmp, f); const b = path.join(L.REPO, f);
      const ea = fs.existsSync(a); const eb = fs.existsSync(b);
      if (ea !== eb || (ea && !fs.readFileSync(a).equals(fs.readFileSync(b)))) err('guard-mismatch', `${f} does not match the replay of ${manifests.join(', ')} on ${base}`);
    }
    if (!errors.some(e => e.code.startsWith('guard'))) console.log(`guard: ${published.length} published file(s) changed; all reproduced exactly from ${manifests.join(', ')}`);
  } catch (e) {
    err('guard-replay-failed', String(e.stderr || e.message).trim());
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
}

// ---- main -------------------------------------------------------------------------------
const args = process.argv.slice(2);
const root = L.REPO;
try {
  const map = structural(root);
  derived(root, map);
  generated(root);
  ldJson(root);
} catch (e) { err('parse', e.message); }
const gi = args.indexOf('--guard');
if (gi >= 0) guard(args[gi + 1] || 'origin/main');

// Known issues tracked by an open proposal are reported, not failed.
const ledger = L.readJSON(path.join(L.RESEARCH, 'ledger.json'), { proposals: [] });
const tracked = code => ledger.proposals.find(p => !p.applied && !['rejected', 'withdrawn'].includes(p.decision.status) && (p.resolves_checks || []).includes(code));
const known = errors.filter(e => tracked(e.code));
const real = errors.filter(e => !tracked(e.code));
for (const e of real) console.log(`ERROR ${e.code}: ${e.msg}`);
for (const e of known) console.log(`KNOWN ${e.code}: ${e.msg} (tracked by ${tracked(e.code).id})`);
for (const w of warnings) console.log(`warn  ${w.code}: ${w.msg}`);
console.log(`${real.length} error(s), ${known.length} known issue(s), ${warnings.length} warning(s)`);
process.exit(real.length ? 1 : 0);
