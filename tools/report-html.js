// Renders a run's review as one self-contained HTML page (the maintainer reviews
// it as a private web page instead of downloading report.md). It reads exactly
// the same ledger, sources and checks as `research.js report`, so the two never
// disagree. Usage: node tools/research.js report RUN --html [FILE]
const fs = require('fs');
const L = require('./lib');
const Rz = require('./research');

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Inline markdown used in highlights, notes and questions: **bold**, `code`, links.
const md = s => esc(s)
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
const link = (url, text) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(text || url)}</a>`;
const fmtVal = v => (v === null || v === undefined ? '' : typeof v === 'string' ? v : JSON.stringify(v));

const EV_TONE = { verified: 'good', 'internal-consistency': 'info', 'needs-research': 'warn', 'needs-source-access': 'warn', disputed: 'bad' };
const EV_SHORT = { verified: 'Verified externally', 'internal-consistency': 'Internal consistency only', 'needs-research': 'Needs research', 'needs-source-access': 'Needs source access', disputed: 'Disputed' };
const chip = (text, tone) => `<span class="chip chip-${tone}">${esc(text)}</span>`;

function changeLabel(c) {
  if (c.op === 'set_field') return [`${c.entity}`, c.field];
  if (c.op === 'set_cov') return [`${c.entity}`, `coverage · ${c.cat}`];
  if (c.op === 'set_edge') return [`${c.a} ↔ ${c.b}`, 'connection'];
  if (c.op === 'add_edge') return [`${c.a} ↔ ${c.b}`, 'new connection'];
  if (c.op === 'remove_edge') return [`${c.a} ↔ ${c.b}`, 'remove connection'];
  if (c.op === 'replace_text') return [c.file, c.count > 1 ? `page text (${c.count}×)` : 'page text'];
  if (c.op === 'remove_entity') return [c.entity, 'remove entry'];
  return [c.entity?.id || '', c.op];
}
function renderChange(c, inv) {
  if (c.op === 'add_entity') {
    const e = c.entity;
    const cov = Object.entries(e.cov || {}).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('');
    return `<div class="change"><div class="change-head"><code>${esc(e.id)}</code><span>new entry · Layer ${e.layer} · ${esc(e.jur)} · pow ${e.pow} · ${esc(e.status)}</span></div>
      <div class="new-entry"><p class="entry-name">${esc(e.name)}</p>${e.link ? `<p class="small">${link(e.link)}</p>` : ''}
      <p>${esc(e.desc)}</p>${e.context ? `<p>${esc(e.context)}</p>` : ''}${cov ? `<dl class="cov">${cov}</dl>` : ''}</div></div>`;
  }
  const [target, what] = changeLabel(c);
  const from = c.op === 'remove_edge' ? inv.byId[`edge:${c.a}|${c.b}`]?.value ?? c.from : c.op === 'add_edge' ? null : c.from;
  const to = c.op === 'add_edge' ? c.rel : ['remove_edge', 'remove_entity'].includes(c.op) ? null : c.to;
  return `<div class="change"><div class="change-head"><code>${esc(target)}</code><span>${esc(what)}</span></div>
    <div class="diff"><div class="was"><span class="diff-label">Now</span>${from == null || from === '' ? '<p class="absent">(absent)</p>' : `<p>${esc(fmtVal(from))}</p>`}</div>
    <div class="will"><span class="diff-label">Proposed</span>${to == null ? '<p class="absent">(removed)</p>' : `<p>${esc(fmtVal(to))}</p>`}</div></div></div>`;
}
function renderEvidence(ev, db) {
  const s = db.sources[ev.source];
  if (!s) return '';
  const f = Rz.lastFetch(s) || {};
  const pas = ev.passage ? s.passages.find(p => p.id === ev.passage) : null;
  const dates = Object.entries(s.dates || {}).map(([k, v]) => `${k} ${v}`).join(' · ');
  const stance = ev.stance === 'contradicts' ? chip('contradicts', 'bad') : '';
  return `<li class="ev"><div class="ev-head"><code>${esc(ev.source)}</code> ${link(s.url, s.title || s.url)} ${stance}</div>
    <div class="ev-meta">${esc(s.type || 'source')} · ${esc(Rz.accessLabel(f))} · retrieved ${esc(f.date || '—')}${dates ? ` · ${esc(dates)}` : ''}</div>
    ${pas ? `<blockquote><span class="loc">${esc(pas.locator)}</span>${esc(pas.text)}</blockquote>` : ''}
    ${ev.supports ? `<div class="ev-sup">Supports: ${esc(ev.supports)}</div>` : ''}</li>`;
}
// Response controls for a card awaiting a decision. Answers are saved to the
// page's db (collection "responses", one document per proposal version) and
// read back by Claude with the ArtifactData tool (RUNBOOK §5).
function respondForm(p, v) {
  const letters = v.changes.length ? [] : [...new Set([...(v.question || '').matchAll(/\(([a-e])\)/g)].map(m => m[1]))];
  const choices = v.options ? [...v.options.map(op => [`option-${op.key}`, `Option ${op.key}: ${op.label}${v.recommended === op.key ? ' (recommended)' : ''}`]), ['other', 'Other answer'], ['defer', 'Defer']]
    : v.changes.length
    ? [['accept', 'Yes, accept'], ['accept-with-changes', 'Accept with changes'], ['reject', 'Reject'], ['defer', 'Defer'], ['other', 'Other']]
    : [...letters.map(l => [`option-${l}`, `Option ${l}`]), ...(/recommend/i.test(`${v.question || ''} ${v.rationale || ''}`) ? [['recommendation', 'Go with your recommendation']] : []), ['other', 'Other answer'], ['defer', 'Defer']];
  const key = `${p.id}-v${v.v}`;
  return `<form class="respond" data-key="${esc(key)}" data-pid="${esc(p.id)}" data-ver="${v.v}" data-hash="${esc(v.hash)}">
    <fieldset><legend>Your response to ${esc(p.id)} v${v.v}</legend>
    <div class="r-choices">${choices.map(([val, label]) => `<button type="button" class="r-choice" data-choice="${val}" aria-pressed="false">${esc(label)}</button>`).join('')}</div>
    <label class="r-label" for="r-${esc(key)}-note">Note or wording changes (optional for a plain yes)</label>
    <textarea id="r-${esc(key)}-note" class="r-note" rows="2" placeholder="e.g. accept, but say 'commits to' instead of 'requires'"></textarea>
    <div class="r-actions"><button type="submit" class="r-save" disabled>Save response</button><span class="r-status" role="status">Not answered yet.</span></div>
    </fieldset></form>`;
}
function renderProposal(p, inv, db, ctx) {
  const v = Rz.latest(p); const d = p.decision; const ev = L.evidenceStatus(p, db);
  const type = v.kind === 'flag' ? 'question' : v.kind;
  const prev = p.versions.length > 1 ? p.versions[p.versions.length - 2] : null;
  const decided = d.status !== 'pending' ? `${d.status} v${d.v} · ${d.date}` : 'awaiting your decision';
  const cs = L.conflictStatus(v, db);
  const r = v.conflict_resolution;
  const ko = Object.entries(v.knock_on_notes || {});
  const parts = [];
  if (prev) parts.push(`<p class="note">Revised from v${prev.v}: ${prev.hash === v.hash ? 'same wording, so an existing approval carries over' : 'wording changed, so it needs a fresh decision'}.</p>`);
  if (ev.missing.length) parts.push(`<p class="callout warn"><strong>Still missing:</strong> ${md(ev.missing.join('; '))}</p>`);
  if (ctx.held) parts.push(`<p class="callout info"><strong>Held:</strong> ${md(ctx.held)}</p>`);
  const changeHtml = v.changes.length ? `<h4>Change</h4>${v.changes.map(c => renderChange(c, inv)).join('')}` : '';
  if (changeHtml && !ctx.reply) parts.push(changeHtml);
  if (v.why) parts.push(`<h4>Why it matters</h4><p>${md(v.why)}</p>`);
  if (v.rationale) parts.push(`<h4>Reasoning</h4><p>${md(v.rationale)}</p>`);
  if (cs.conflict) parts.push(cs.resolved
    ? `<div class="callout info"><strong>Conflicting evidence, resolved (${esc(L.RESOLUTION_BASES[r.basis])}).</strong><p>${md(r.disagreement)}</p><p>${md(r.explanation)}</p></div>`
    : `<div class="callout bad"><strong>Conflicting evidence, not resolved:</strong> ${esc(cs.reason)}</div>`);
  if (v.uncertainty) parts.push(`<h4>Uncertainty</h4><p>${md(v.uncertainty)}</p>`);
  if ((v.unverified_carryover || []).length) parts.push(`<h4>Carried over, not re-verified</h4><ul>${v.unverified_carryover.map(x => `<li>${md(x)}</li>`).join('')}</ul>`);
  if (v.evidence.length) parts.push(`<h4>Evidence</h4><ul class="evs">${v.evidence.map(e => renderEvidence(e, db)).join('')}</ul>`);
  if (ko.length) parts.push(`<h4>Related map text checked</h4><ul class="ko">${ko.map(([k, n]) => `<li><code>${esc(k)}</code> ${md(n)}</li>`).join('')}</ul>`);
  const links = [(p.research || {}).linked?.length ? `Linked: ${p.research.linked.join(', ')}` : '', (p.research || {}).apply_together?.length ? `Applied together with: ${p.research.apply_together.filter(x => x !== p.id).join(', ')}` : ''].filter(Boolean).join(' · ');
  if (links) parts.push(`<p class="small muted">${esc(links)}</p>`);
  if (p.decision_log.length || d.note) parts.push(`<p class="small muted">Decision record: ${md([...p.decision_log.map(x => `${x.status}${x.v ? ` v${x.v}` : ''} ${x.date || ''}${x.note ? ` (${x.note})` : ''}`), d.status !== 'pending' && d.note ? `${d.status} v${d.v} ${d.date} (${d.note})` : ''].filter(Boolean).join('; '))}</p>`);
  return `<article class="prop" id="${esc(p.id)}">
    <header class="prop-head"><span class="pid">${esc(p.id)} <span class="ver">v${v.v}</span></span>
      <span class="chips">${chip(type, 'plain')}${chip(EV_SHORT[ev.status] || ev.status, EV_TONE[ev.status] || 'plain')}</span></header>
    <h3>${md(v.title)}</h3>
    <p class="status-line">${esc(decided)}${p.applied ? ` · applied ${esc(p.applied.date)} (${esc(p.applied.manifest.split('/').pop())})` : ''}</p>
    ${v.question ? `<p class="question"><strong>Question for you:</strong> ${md(v.question)}</p>` : ''}
    ${ctx.reply && changeHtml ? `<div class="prop-change">${changeHtml}</div>` : ''}
    ${ctx.reply && v.options ? `<div class="prop-change"><h4>Options</h4>${v.options.map(op => `<div class="opt"><p class="opt-head"><strong>Option ${esc(op.key)}</strong> ${md(op.label)}${v.recommended === op.key ? ' <span class="chip chip-good">recommended</span>' : ''}</p>${op.changes.length ? op.changes.map(c => renderChange(c, inv)).join('') : '<p class="small muted">No change to the map.</p>'}</div>`).join('')}</div>` : ''}
    ${ctx.reply ? respondForm(p, v) : ''}
    <details${ctx.open ? ' open' : ''}><summary>${ctx.reply ? 'Why, evidence and sources' : 'Details, evidence and exact wording'}</summary><div class="prop-body">${parts.join('')}</div></details>
  </article>`;
}


// Where a proposal belongs on the page: the layer of the entry it edits, or page text.
function groupOf(p, inv) {
  const v = Rz.latest(p); const c = v.changes[0];
  const layerName = { 1: 'Layer 1 · International', 2: 'Layer 2 · National regulation', 3: 'Layer 3 · US states', 4: 'Layer 4 · Infrastructure', 5: 'Layer 5 · Industry voluntary', 6: 'Layer 6 · Lab frameworks' };
  let id = null;
  if (c) id = typeof c.entity === 'string' ? c.entity : c.entity && c.entity.id ? c.entity.id : c.a || null;
  if (!id) {
    // Questions carry no edits: find the entry they are about by id, then by name, in the title and question.
    const text = `${v.title} ${v.question || ''}`;
    const idIn = t => inv.map.entities.find(e => new RegExp(`(^|[^a-z0-9-])${e.id.replace(/-/g, '\\-')}([^a-z0-9-]|$)`).test(t));
    const byName = inv.map.entities.filter(e => e.name && v.title.includes(e.name)).sort((a, b) => b.name.length - a.name.length)[0];
    const kw = [['Category definitions', '-'], ['lab compliance frameworks', 'rsp'], ['UK AI Bill', 'uk-bill'], ['jp-sectors', 'jp-sectors'], ['Colorado Division of Insurance', 'co-doi'], ['Colorado SB 26-189', 'co-aia'], ['TRAIGA', 'tx-raiga'], ['Hiroshima', 'hiroshima'], ['CoE AI Convention', 'coe-ai'], ['AISI Network', 'aisi-net'], ['AI Action Plan', 'us-action'], ['EO 14179', 'us-eo14179'], ['EU AI Act', 'eu-aia']].find(([k]) => v.title.includes(k));
    const t1 = idIn(v.title); const t2 = idIn(text);
    id = (kw && kw[1]) || (byName && byName.id) || (t1 && t1.id) || (t2 && t2.id) || null;
  }
  const e = id && (inv.map.entities.find(x => x.id === id) || (c && c.op === 'add_entity' ? c.entity : null));
  if (e) return [e.layer, layerName[e.layer]];
  return [7, 'Page text, FAQ and categories'];
}
function build(id) {
  const run = L.readJSON(Rz.F.run(id)); if (!run) throw new Error(`no run ${id}`);
  const inv = L.buildInventory(); const db = Rz.sources(); const lg = Rz.ledger(); const all = Rz.checks();
  const per = L.readJSON(Rz.F.runChecks(id), {});
  const { held } = require('./apply').eligibility(lg, db);
  const heldIds = new Set(held.map(h => h.id)); const heldWhy = Object.fromEntries(held.map(h => [h.id, h.reason]));
  const B = { decide: [], research: [], 'awaiting-apply': [], applied: [], closed: [] };
  for (const p of lg.proposals) B[Rz.bucketOf(p, db, heldIds, L.today())].push(p);
  const ids = Object.keys(per); const recs = ids.map(i => per[i]);
  const okR = r => ['changed', 'no_change'].includes(r.outcome);
  const n = f => recs.filter(f).length;
  const extOk = n(r => r.scope !== 'internal' && okR(r)); const intOk = n(r => r.scope === 'internal' && okR(r));
  const unres = n(r => r.outcome === 'unresolved'); const inacc = n(r => r.outcome === 'inaccessible');
  const total = inv.items.length;
  const everExt = inv.items.filter(i => all.items[i.id]?.last_success && all.items[i.id].last_success.scope !== 'internal').length;
  const entriesInRun = [...new Set(ids.filter(i => i.startsWith('entry:')).map(i => i.split(':')[1]))];
  const usedSources = [...new Set(recs.flatMap(r => r.sources))];
  const contentDate = (L.contentDates().find(d => d.kind === 'iso') || {}).value;
  const pct = Math.round((everExt / total) * 1000) / 10;

  const groupsOfDecide = {};
  for (const p of B.decide) { const [n, label] = groupOf(p, inv); (groupsOfDecide[n] = groupsOfDecide[n] || { label, items: [] }).items.push(p); }
  const decideOrder = Object.keys(groupsOfDecide).sort((a, b) => a - b);
  const slug = n => `decide-g${n}`;
  const decideBody = () => decideOrder.map(n => `<h3 class="grp-head" id="${slug(n)}">${esc(groupsOfDecide[n].label)} <span class="count">${groupsOfDecide[n].items.length}</span></h3>${groupsOfDecide[n].items.map(p => renderProposal(p, inv, db, { reply: true })).join('')}`).join('');
  const section = (key, anchor, title, lead, items, ctxFn, empty) => key === 'decide' && items.length ? `<section id="${anchor}" class="sec">
    <div class="sec-head"><h2>${title}</h2><span class="count">${items.length}</span></div>${lead ? `<p class="lead">${lead}</p>` : ''}${decideBody()}</section>` : `<section id="${anchor}" class="sec">
    <div class="sec-head"><h2>${title}</h2><span class="count">${items.length}</span></div>${lead ? `<p class="lead">${lead}</p>` : ''}
    ${items.length ? items.map(p => renderProposal(p, inv, db, ctxFn(p))).join('') : `<p class="empty">${empty}</p>`}</section>`;

  const groups = {};
  for (const i of ids.filter(i => ['unresolved', 'inaccessible'].includes(per[i].outcome))) {
    const k = `${per[i].outcome}|${per[i].note}|${per[i].sources.join(',')}`; (groups[k] = groups[k] || []).push(i);
  }
  const gaps = Object.entries(groups).map(([k, items]) => {
    const r = per[items[0]];
    return `<div class="gap"><div class="gap-head">${chip(Rz.OUTCOMES[r.outcome], r.outcome === 'inaccessible' ? 'bad' : 'warn')} <span class="small muted">${items.length} item${items.length > 1 ? 's' : ''}</span></div>
      <p class="items">${items.map(i => `<code>${esc(i)}</code>`).join(' ')}</p><p>${md(r.note)}</p>
      ${r.missing ? `<p><strong>Still missing:</strong> ${md(r.missing)}</p>` : ''}
      <p class="small muted">Sources: ${r.sources.map(s => `${esc(s)} (${esc(Rz.accessLabel(Rz.lastFetch(db.sources[s])))})`).join(', ')}</p></div>`;
  }).join('');

  const discovery = (run.discovery || []).map(d => `<details class="disc"><summary>${esc(d.area)}</summary><div class="disc-body">
    <p>${md(d.summary || '')}</p>
    ${d.candidates?.length ? `<div class="tablewrap"><table><thead><tr><th>Candidate</th><th>Result</th><th>Reason</th></tr></thead><tbody>${d.candidates.map(c => `<tr><td>${esc(c.name)}</td><td>${esc(c.result)}${c.proposal ? ` <code>${esc(c.proposal)}</code>` : ''}</td><td>${md(c.reason || '')}</td></tr>`).join('')}</tbody></table></div>` : ''}
    ${d.queries?.length ? `<p class="small muted">Searched / opened: ${d.queries.map(esc).join(' · ')}</p>` : ''}
    ${d.limits ? `<p class="small"><strong>Limits:</strong> ${md(d.limits)}</p>` : ''}</div></details>`).join('');

  const srcRows = usedSources.concat(Object.keys(db.sources).filter(s => !usedSources.includes(s) && (db.sources[s].fetches || []).some(f => f.run === id)))
    .map(s => { const src = db.sources[s]; const f = Rz.lastFetch(src) || {}; const bad = f.status !== 'ok';
      return `<tr><td><code>${esc(s)}</code></td><td>${link(src.url, src.title || src.url)}</td><td>${esc(src.type || '')}</td><td class="${bad ? 'bad-t' : ''}">${esc(Rz.accessLabel(f))}</td><td class="num">${esc(f.date || '')}</td></tr>`; }).join('');

  const checked = ids.filter(i => okR(per[i]) && per[i].scope !== 'internal');
  const notChecked = inv.map.entities.filter(e => !entriesInRun.includes(e.id)).map(e => e.id);

  return `<title>Governance Map Review</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500&display=swap">
<style>
/* Layout: a single reading column (decisions first), sticky section nav, cards only for proposals. Tokens follow the map's own design system. */
:root {
  --bg: #FBFAF7; --card: #FFFFFF; --soft: #F1EFE8; --fg: #1A1A19; --fg2: #5F5E5A; --fg3: #888780;
  --line: rgba(26,26,25,0.10); --line2: rgba(26,26,25,0.20); --accent: #0C447C;
  --good-bg: #E3F1E6; --good-fg: #1F5A2E; --info-bg: #E6F1FB; --info-fg: #0C447C;
  --warn-bg: #FAEEDA; --warn-fg: #633806; --bad-bg: #F9E2DE; --bad-fg: #7A2417;
  --sans: 'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --serif: 'Instrument Serif', ui-serif, Georgia, serif;
  --mono: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg: #16161A; --card: #1E1E22; --soft: #2A2A2E; --fg: #EDEBE2; --fg2: #B4B2A9; --fg3: #8C8A82;
  --line: rgba(255,255,250,0.10); --line2: rgba(255,255,250,0.20); --accent: #B5D4F4;
  --good-bg: #183A22; --good-fg: #A8DDB5; --info-bg: #042C53; --info-fg: #B5D4F4;
  --warn-bg: #412402; --warn-fg: #FAC775; --bad-bg: #4A1810; --bad-fg: #F4B4A8; color-scheme: dark; } }
:root[data-theme="dark"] {
  --bg: #16161A; --card: #1E1E22; --soft: #2A2A2E; --fg: #EDEBE2; --fg2: #B4B2A9; --fg3: #8C8A82;
  --line: rgba(255,255,250,0.10); --line2: rgba(255,255,250,0.20); --accent: #B5D4F4;
  --good-bg: #183A22; --good-fg: #A8DDB5; --info-bg: #042C53; --info-fg: #B5D4F4;
  --warn-bg: #412402; --warn-fg: #FAC775; --bad-bg: #4A1810; --bad-fg: #F4B4A8; color-scheme: dark; }
* { box-sizing: border-box; }
body { background: var(--bg); color: var(--fg); font: 15px/1.6 var(--sans); padding: 0 16px; }
.wrap { max-width: 860px; margin: 0 auto; padding-block: 28px 64px; }
a { color: var(--accent); text-underline-offset: 2px; overflow-wrap: anywhere; }
a:focus-visible, summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
code { font: 0.86em var(--mono); background: var(--soft); padding: 0.05em 0.35em; border-radius: 4px; overflow-wrap: anywhere; }
h1, h2, h3 { text-wrap: balance; }
.eyebrow { font: 500 12px var(--mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg3); margin: 0; }
h1 { font: 400 clamp(30px, 5vw, 42px)/1.1 var(--serif); margin: 6px 0 10px; }
.meta { color: var(--fg2); font-size: 13px; margin: 0; }
.banner { margin: 18px 0 0; padding: 10px 14px; border-radius: 8px; background: var(--warn-bg); color: var(--warn-fg); font-size: 14px; }
nav.tabs { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5; background: var(--bg); border-bottom: 1px solid var(--line); margin: 22px 0 0; padding: 8px 0; display: flex; gap: 6px 14px; flex-wrap: wrap; font-size: 13px; }
nav.tabs a { color: var(--fg2); text-decoration: none; white-space: nowrap; }
nav.tabs a:hover { color: var(--fg); }
nav.tabs .n { font-family: var(--mono); color: var(--fg3); margin-left: 3px; }
.summary { margin: 26px 0 0; display: grid; gap: 10px; padding: 0; list-style: none; }
.summary li { padding-left: 14px; border-left: 2px solid var(--line2); max-width: 72ch; }
.stats { margin: 26px 0 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.stat { background: var(--card); padding: 12px 14px; min-width: 0; }
.stat .v { font: 500 22px var(--sans); font-variant-numeric: tabular-nums; }
.stat .l { font-size: 12px; color: var(--fg2); line-height: 1.35; }
.coverage { margin: 14px 0 0; font-size: 13px; color: var(--fg2); }
.bar { height: 6px; background: var(--soft); border-radius: 3px; margin-top: 6px; overflow: hidden; }
.bar span { display: block; height: 100%; background: var(--accent); }
.sec { margin-top: 44px; scroll-margin-top: 56px; }
.sec-head { display: flex; align-items: baseline; gap: 10px; border-bottom: 1px solid var(--line2); padding-bottom: 6px; }
h2 { font: 400 28px/1.15 var(--serif); margin: 0; }
.count { font: 500 13px var(--mono); color: var(--fg3); }
.lead { color: var(--fg2); margin: 10px 0 0; max-width: 72ch; }
.empty { color: var(--fg3); font-style: italic; }
.prop { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 16px 18px; margin-top: 14px; scroll-margin-top: 56px; }
.prop-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; }
.pid { font: 500 13px var(--mono); color: var(--fg2); }
.ver { color: var(--fg3); }
.chips { display: flex; gap: 6px; flex-wrap: wrap; }
.chip { font: 500 11.5px var(--sans); padding: 2px 8px; border-radius: 99px; letter-spacing: 0.01em; white-space: nowrap; }
.chip-good { background: var(--good-bg); color: var(--good-fg); } .chip-info { background: var(--info-bg); color: var(--info-fg); }
.chip-warn { background: var(--warn-bg); color: var(--warn-fg); } .chip-bad { background: var(--bad-bg); color: var(--bad-fg); }
.chip-plain { background: var(--soft); color: var(--fg2); }
.prop h3 { font: 600 16.5px/1.35 var(--sans); margin: 8px 0 2px; }
.status-line { font-size: 13px; color: var(--fg3); margin: 0; }
.question { background: var(--info-bg); color: var(--info-fg); padding: 10px 12px; border-radius: 8px; margin: 12px 0 0; }
.reply { font-size: 13px; color: var(--fg2); margin: 10px 0 0; }
details > summary { cursor: pointer; color: var(--accent); font-size: 13.5px; margin-top: 12px; list-style-position: inside; }
.prop-body { border-top: 1px solid var(--line); margin-top: 10px; padding-top: 4px; }
.prop-body h4 { font: 500 11.5px var(--mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg3); margin: 18px 0 6px; }
.prop-body p { margin: 6px 0; max-width: 72ch; }
.note, .small { font-size: 13px; } .muted { color: var(--fg3); }
.callout { padding: 10px 12px; border-radius: 8px; font-size: 14px; }
.callout.warn { background: var(--warn-bg); color: var(--warn-fg); } .callout.info { background: var(--info-bg); color: var(--info-fg); } .callout.bad { background: var(--bad-bg); color: var(--bad-fg); }
.change { border: 1px solid var(--line); border-radius: 8px; margin: 8px 0; overflow: hidden; }
.change-head { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; padding: 6px 10px; background: var(--soft); font-size: 12.5px; color: var(--fg2); }
.change-head code { background: transparent; padding: 0; color: var(--fg); }
.diff { display: grid; grid-template-columns: 1fr 1fr; }
.diff > div { padding: 8px 10px; min-width: 0; font-size: 14px; }
.diff .was { color: var(--fg2); border-right: 1px solid var(--line); }
.diff .will { background: color-mix(in srgb, var(--good-bg) 45%, transparent); }
.diff p { margin: 2px 0 0; }
.diff-label { font: 500 11px var(--mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--fg3); }
.absent { color: var(--fg3); font-style: italic; }
@media (max-width: 640px) { .diff { grid-template-columns: 1fr; } .diff .was { border-right: 0; border-bottom: 1px solid var(--line); } }
.new-entry { padding: 8px 12px; font-size: 14px; } .entry-name { font-weight: 600; margin: 0; }
dl.cov { display: grid; grid-template-columns: max-content 1fr; gap: 4px 12px; margin: 8px 0 0; }
dl.cov dt { font: 500 12px var(--mono); color: var(--fg3); padding-top: 2px; } dl.cov dd { margin: 0; min-width: 0; }
ul.evs, ul.ko { padding: 0; list-style: none; margin: 0; display: grid; gap: 10px; }
.ev-head { font-size: 14px; } .ev-meta, .ev-sup { font-size: 12.5px; color: var(--fg3); }
blockquote { margin: 6px 0 0; padding: 6px 10px; border-left: 2px solid var(--line2); color: var(--fg2); font-size: 13.5px; }
.loc { display: block; font: 500 11.5px var(--mono); color: var(--fg3); margin-bottom: 2px; }
ul.ko li { font-size: 13.5px; }
.gap { border-top: 1px solid var(--line); padding: 12px 0; } .gap p { margin: 6px 0; max-width: 72ch; }
.gap .items { line-height: 1.9; }
details.disc { border-top: 1px solid var(--line); padding: 10px 0; }
details.disc > summary { color: var(--fg); font-weight: 500; font-size: 15px; margin: 0; }
.disc-body { padding-top: 6px; }
.tablewrap { overflow-x: auto; margin: 8px 0; }
table { border-collapse: collapse; width: 100%; font-size: 13.5px; }
th, td { text-align: left; vertical-align: top; padding: 6px 8px; border-bottom: 1px solid var(--line); }
th { font: 500 11.5px var(--mono); text-transform: uppercase; letter-spacing: 0.05em; color: var(--fg3); }
td.num { font-variant-numeric: tabular-nums; white-space: nowrap; } td.bad-t { color: var(--bad-fg); }
.todo { margin: 22px 0 0; padding: 14px 16px; border-radius: 12px; background: var(--info-bg); color: var(--info-fg); }
.todo h2 { font: 400 24px/1.2 var(--serif); margin: 0 0 6px; }
.todo ol { margin: 0; padding-left: 20px; display: grid; gap: 8px; }
.todo a { color: inherit; font-weight: 500; }
.todo code { background: color-mix(in srgb, var(--card) 55%, transparent); }
.todo-q { display: block; font-size: 13.5px; opacity: 0.9; margin-top: 2px; }
.todo .small { margin: 10px 0 0; }
.respond { margin: 14px 0 0; }
.respond fieldset { border: 1px solid var(--line2); border-radius: 10px; padding: 10px 12px 12px; margin: 0; min-width: 0; }
.respond legend { font: 500 11.5px var(--mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg3); padding: 0 4px; }
.r-choices { display: flex; flex-wrap: wrap; gap: 6px; }
.r-choice { font: 500 13.5px var(--sans); color: var(--fg); background: var(--card); border: 1px solid var(--line2); border-radius: 99px; padding: 5px 12px; cursor: pointer; }
.r-choice:hover { border-color: var(--accent); }
.r-choice[aria-pressed="true"] { background: var(--accent); border-color: var(--accent); color: var(--bg); }
.r-choice:focus-visible, .r-save:focus-visible, .r-note:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.r-label { display: block; font-size: 12.5px; color: var(--fg2); margin: 10px 0 4px; }
.r-note { width: 100%; font: 14px/1.45 var(--sans); color: var(--fg); background: var(--bg); border: 1px solid var(--line2); border-radius: 8px; padding: 7px 9px; resize: vertical; }
.r-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; margin-top: 8px; }
.r-save { font: 500 13.5px var(--sans); background: var(--fg); color: var(--bg); border: 0; border-radius: 8px; padding: 6px 14px; cursor: pointer; }
.r-save:disabled { opacity: 0.45; cursor: default; }
.r-status { font-size: 12.5px; color: var(--fg3); }
.r-status.saved { color: var(--good-fg); }
.r-status.err { color: var(--bad-fg); }
button:disabled, textarea:disabled { cursor: not-allowed; }
.grp-head { font: 500 13px var(--mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg2); margin: 28px 0 0; padding-top: 6px; scroll-margin-top: 56px; }
.prop-change { margin-top: 10px; }
.prop-change h4 { font: 500 11.5px var(--mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg3); margin: 0 0 6px; }
.todo-groups { margin: 0; padding-left: 18px; display: grid; gap: 4px; }
.todo-n { font: 500 12.5px var(--mono); }
.todo-q-n { font-size: 12.5px; opacity: 0.85; }
.opt { border-top: 1px solid var(--line); padding-top: 8px; margin-top: 8px; }
.opt-head { margin: 0 0 6px; font-size: 14px; }
.send { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; margin-top: 10px; }
footer { margin-top: 48px; font-size: 12.5px; color: var(--fg3); border-top: 1px solid var(--line); padding-top: 12px; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
html { scroll-behavior: smooth; }
</style>
<div class="wrap">
  <header>
    <p class="eyebrow">Frontier AI Governance Map · research review</p>
    <h1>${esc(run.label)}</h1>
    <p class="meta">Run <code>${esc(run.id)}</code> · ${esc((run.started_at || '').slice(0, 10))}${run.finished_at ? ` · finished ${esc(run.finished_at.slice(11, 16))} UTC` : ''} · page generated from the research ledger</p>
    ${run.partial ? `<p class="banner"><strong>Partial run.</strong> ${entriesInRun.length} of ${inv.map.entities.length} entries attempted. This is not a baseline audit; everything else is not checked.</p>` : ''}
  </header>
  <nav class="tabs" aria-label="Sections">
    <a href="#decide">Ready for your decision<span class="n">${B.decide.length}</span></a>
    <a href="#research">Research or access required<span class="n">${B.research.length}</span></a>
    <a href="#accepted">Accepted, awaiting application<span class="n">${B['awaiting-apply'].length}</span></a>
    <a href="#applied">Applied<span class="n">${B.applied.length}</span></a>
    <a href="#gaps">Gaps<span class="n">${unres + inacc}</span></a>
    <a href="#discovery">Discovery</a><a href="#sources">Sources</a>
  </nav>
  ${B.decide.length ? `<aside class="todo" aria-labelledby="todo-h"><h2 id="todo-h">Your decisions (${B.decide.length})</h2>${B.decide.length > 12 ? `<ul class="todo-groups">${decideOrder.map(n => `<li><a href="#${slug(n)}">${esc(groupsOfDecide[n].label)}</a> <span class="todo-n" data-group="${n}">${groupsOfDecide[n].items.length}</span>${groupsOfDecide[n].items.filter(p => !Rz.latest(p).changes.length).length ? ` <span class="todo-q-n">(${groupsOfDecide[n].items.filter(p => !Rz.latest(p).changes.length).length} questions)</span>` : ''}</li>`).join('')}</ul>` : `<ol>${B.decide.map(p => { const v = Rz.latest(p); return `<li><a href="#${esc(p.id)}"><code>${esc(p.id)} v${v.v}</code> ${md(v.title)}</a>${v.question ? `<span class="todo-q">${md(v.question)}</span>` : ''}</li>`; }).join('')}</ol>`}<p class="small"><strong id="r-count">Answered 0 of ${B.decide.length}.</strong> Answer in each card below, then send them to Claude with the button. You can answer some now and the rest later; each answer is saved and tied to the exact version shown.</p><div class="send"><button type="button" id="send-claude" class="r-save" data-run="${esc(run.id)}" disabled>Send my answers to Claude</button><span id="send-status" class="r-status" role="status">Checking whether Claude can receive them…</span></div></aside>` : `<aside class="todo"><h2>Your decisions</h2><p>Nothing needs a decision right now.</p></aside>`}
  <ul class="summary">${(run.highlights || []).map(h => `<li>${md(h)}</li>`).join('')}</ul>
  <div class="stats" role="list">
    <div class="stat" role="listitem"><div class="v">${ids.length}</div><div class="l">items attempted, ${entriesInRun.length} entries</div></div>
    <div class="stat" role="listitem"><div class="v">${extOk}</div><div class="l">verified against outside sources</div></div>
    <div class="stat" role="listitem"><div class="v">${intOk}</div><div class="l">internal consistency checks (map vs itself)</div></div>
    <div class="stat" role="listitem"><div class="v">${unres + inacc}</div><div class="l">not verified (${unres} unresolved, ${inacc} inaccessible)</div></div>
  </div>
  <div class="coverage"><strong>Whole map:</strong> ${everExt} of ${total} inventory items (${pct}%) have ever been verified against outside sources. The public date (${esc(contentDate)}) marks the latest applied release, not a full audit.<div class="bar" aria-hidden="true"><span style="width:${pct}%"></span></div></div>

  ${section('decide', 'decide', 'Ready for your decision', 'Decisions bind to the version shown. Reply in the session in plain language.', B.decide, () => ({ reply: true, open: true }), 'Nothing needs a decision.')}
  ${section('research', 'research', 'Research or access required', `No editorial decision is needed until the evidence is in.${unres + inacc ? ` Separately, ${unres + inacc} checked items did not verify in this run; they are under <a href="#gaps">Gaps</a>.` : ''}`, B.research, () => ({}), 'No proposals are waiting on evidence.')}
  ${section('awaiting-apply', 'accepted', 'Accepted and awaiting application', '', B['awaiting-apply'], p => ({ held: heldWhy[p.id] }), 'Nothing is waiting to be applied.')}
  ${section('applied', 'applied', 'Applied', 'On the PR branch; the guard reproduces the published diff from these manifests.', B.applied, () => ({}), 'Nothing applied yet.')}

  <section id="gaps" class="sec"><div class="sec-head"><h2>Unresolved gaps</h2><span class="count">${unres + inacc}</span></div>
    <p class="lead">Checked items that did not verify in this run, with exactly what is missing.</p>${gaps || '<p class="empty">None.</p>'}</section>
  <section id="discovery" class="sec"><div class="sec-head"><h2>Discovery log</h2><span class="count">${(run.discovery || []).length}</span></div>${discovery || '<p class="empty">No discovery in this run.</p>'}</section>
  <section id="sources" class="sec"><div class="sec-head"><h2>Coverage and sources</h2></div>
    <details class="disc"><summary>Items verified against outside sources in this run (${checked.length})</summary><div class="disc-body"><p class="items">${checked.map(i => `<code>${esc(i)}</code>`).join(' ')}</p></div></details>
    <details class="disc"><summary>Entries not checked in this run (${notChecked.length})</summary><div class="disc-body"><p class="items">${notChecked.map(i => `<code>${esc(i)}</code>`).join(' ')}</p></div></details>
    <details class="disc"><summary>Sources used or fetched in this run</summary><div class="disc-body"><div class="tablewrap"><table><thead><tr><th>ID</th><th>Source</th><th>Type</th><th>Access</th><th>Date</th></tr></thead><tbody>${srcRows}</tbody></table></div></div></details>
  </section>
  <footer>Generated by <code>tools/research.js report ${esc(id)} --html</code> from <code>research/ledger.json</code>, <code>sources.json</code> and <code>checks.json</code>. The Markdown version is <code>research/runs/${esc(id)}/report.md</code>. Usage: ${md(run.usage || 'not recorded')}</footer>
</div>
<script>
(function () {
  var forms = Array.prototype.slice.call(document.querySelectorAll('form.respond'));
  if (!forms.length) return;
  var byKey = {};
  forms.forEach(function (f) { byKey[f.dataset.key] = f; });
  function pick(f, choice) {
    f.dataset.choice = choice || '';
    f.querySelectorAll('.r-choice').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.choice === choice)); });
  }
  function status(f, text, cls) { var s = f.querySelector('.r-status'); s.textContent = text; s.className = 'r-status' + (cls ? ' ' + cls : ''); }
  function count() {
    var n = forms.filter(function (f) { return f.dataset.saved === '1'; }).length;
    var el = document.getElementById('r-count'); if (el) el.textContent = 'Answered ' + n + ' of ' + forms.length + '.';
  }
  function label(f, choice) { var b = f.querySelector('.r-choice[data-choice="' + choice + '"]'); return b ? b.textContent : choice; }
  function when(iso) { try { return new Date(iso).toLocaleString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch (e) { return iso; } }
  forms.forEach(function (f) {
    f.querySelectorAll('.r-choice').forEach(function (b) {
      b.addEventListener('click', function () { pick(f, b.dataset.choice); f.querySelector('.r-save').disabled = !f.dataset.ready; status(f, f.dataset.ready ? 'Not saved yet.' : 'Connecting…'); });
    });
    f.querySelector('.r-note').addEventListener('input', function () { if (f.dataset.choice && f.dataset.ready) { f.querySelector('.r-save').disabled = false; status(f, 'Not saved yet.'); } });
    f.querySelector('.r-save').disabled = true;
  });
  function offline(msg) {
    forms.forEach(function (f) { f.querySelectorAll('button, textarea').forEach(function (el) { el.disabled = true; }); status(f, msg, 'err'); });
  }
  if (!window.claude || !window.claude.use) { offline('Responses can only be saved on the review page in Claude. Reply in the session instead.'); return; }
  Promise.all([window.claude.use('db'), window.claude.use('user')]).then(function (caps) {
    var db = caps[0], user = caps[1];
    if (!db) { offline('Saving responses is not available in this view. Reply in the Claude session instead.'); return; }
    var col = db.collection('responses');
    var uidP = user && user.id ? user.id().catch(function () { return null; }) : Promise.resolve(null);
    forms.forEach(function (f) {
      f.dataset.ready = '1';
      if (f.dataset.saved !== '1') status(f, f.dataset.choice ? 'Not saved yet.' : 'Not answered yet.');
      if (f.dataset.choice) f.querySelector('.r-save').disabled = false;
      f.addEventListener('submit', function (ev) {
        ev.preventDefault();
        if (!f.dataset.choice) return;
        var btn = f.querySelector('.r-save'); btn.disabled = true; status(f, 'Saving…');
        uidP.then(function (uid) {
          return col.doc(f.dataset.key).set({
            proposal: f.dataset.pid, version: Number(f.dataset.ver), change_hash: f.dataset.hash,
            choice: f.dataset.choice, choice_label: label(f, f.dataset.choice),
            note: f.querySelector('.r-note').value.trim(), updated_at: new Date().toISOString(), by: uid || null
          });
        }).then(function () { /* the snapshot below confirms it */ }, function (e) {
          btn.disabled = false;
          var code = e && e.code;
          status(f, code === 'invalid_argument' ? 'You can view this page but not save responses. Reply in the session instead.' : 'Could not save (' + (code || 'error') + '). Try again, or reply in the session.', 'err');
        });
      });
    });
    col.onSnapshot(function (snap) {
      snap.docs.forEach(function (d) {
        var f = byKey[d.id]; if (!f) return;
        var r = d.data() || {};
        if (r.change_hash && r.change_hash !== f.dataset.hash) return;
        pick(f, r.choice);
        var note = f.querySelector('.r-note');
        if (document.activeElement !== note) note.value = r.note || '';
        f.dataset.saved = '1';
        f.querySelector('.r-save').disabled = true;
        status(f, 'Saved: ' + (r.choice_label || r.choice) + ' · ' + when(r.updated_at) + (d.metadata && d.metadata.hasPendingWrites ? ' (sending…)' : ''), 'saved');
      });
      count();
    }, function () { offline('The response store stopped responding. Reload the page, or reply in the session.'); });
  }).catch(function () { offline('Saving responses is not available in this view. Reply in the Claude session instead.'); });
})();
(function () {
  // "Send my answers to Claude": posts a page comment sent to Claude, which wakes the
  // Claude session watching this page. Answers themselves are already saved in the page's store.
  var btn = document.getElementById('send-claude'); var st = document.getElementById('send-status');
  if (!btn) return;
  function say(t, cls) { st.textContent = t; st.className = 'r-status' + (cls ? ' ' + cls : ''); }
  var fallback = 'Your answers are saved. If the button is unavailable, tell Claude in the session, or the next weekly run will read them first.';
  if (!window.claude || !window.claude.use) { say(fallback); return; }
  window.claude.use('comments').then(function (c) {
    if (!c || !c.sendToClaude || !c.canSendToClaude) { say(fallback); return; }
    function refresh() {
      return c.canSendToClaude().then(function (state) {
        if (state === 'available') { btn.disabled = false; say('Ready to send.'); }
        else { btn.disabled = true; say(state === 'no_session' ? 'No Claude session is listening right now. ' + fallback : fallback); }
      }, function () { btn.disabled = true; say(fallback); });
    }
    refresh();
    btn.addEventListener('click', function () {
      var n = (document.getElementById('r-count') || {}).textContent || '';
      btn.disabled = true; say('Sending…');
      c.anchorFor(btn).then(function (anchor) {
        return c.sendToClaude({ anchor: anchor, text: 'Responses ready on the review page (run ' + btn.dataset.run + '). ' + n + ' Please record them, apply what I accepted, and update the page.' });
      }).then(function () { say('Sent. Claude will reply in the comment thread and update this page.', 'saved'); }, function (e) {
        var code = e && e.code;
        if (code === 'consent_required') { btn.disabled = false; say('Allow the page to comment for you, then press the button again. Your answers are saved either way.', 'err'); }
        else if (code === 'claude_unavailable') { refresh(); say('Claude could not receive it right now. ' + fallback, 'err'); }
        else { say('Could not send (' + (code || 'error') + '). ' + fallback, 'err'); }
      });
    });
  }, function () { say(fallback); });
})();
</script>
`;
}

function write(id, file) {
  fs.writeFileSync(file, build(id));
  console.error(`html: ${file}`);
}
module.exports = { build, write };
