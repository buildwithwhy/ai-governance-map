#!/usr/bin/env node
// Generate llms.txt and llms-full.txt from index.html so the page is
// crawlable / ingestable by LLMs and agents that don't execute JS.
// Re-run after content changes.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function extract(varName) {
  const re = new RegExp(`const ${varName} = (\\[[\\s\\S]*?\\n\\]);`);
  const m = html.match(re);
  if (!m) throw new Error(`could not find ${varName}`);
  return eval(`(${m[1]})`);
}

const CATEGORIES = extract('CATEGORIES');
const ENTITIES = extract('ENTITIES');
const EDGES = extract('EDGES');

const JUR_LABEL = { us:'US Federal', uss:'US State', eu:'European Union', uk:'United Kingdom', cn:'China', as:'Asia (other)', mu:'Multilateral', co:'Corporate / global' };
const POW_LABEL = { 1:'Voluntary', 2:'Soft / advisory', 3:'Hard law, weak enforcement', 4:'Binding with penalties' };
const STATUS_LABEL = { active:'In force', phasing:'Phasing in', proposed:'Proposed', revoked:'Revoked' };
const LAYERS = {
  1: { name: 'International', desc: 'Multilateral norms and summits' },
  2: { name: 'National regulation', desc: 'Statutes, executive orders, agencies' },
  3: { name: 'Sub-national', desc: 'US states acting where federal regulation is absent' },
  4: { name: 'Industry voluntary', desc: 'Cross-firm commitments and codes' },
  5: { name: 'Corporate self-governance', desc: 'Frontier safety frameworks at each lab' },
  6: { name: 'Infrastructure', desc: 'Regulators, AISIs, evaluators, compute controls' },
};

const SITE_URL = 'https://ai-governance-map.buildwithwhy.com';
const AUTHOR_SITE = 'https://buildwithwhy.com';
const AUTHOR_EMAIL = 'buildwithwhy@gmail.com';
const UPDATED = '9 May 2026';

// ---- llms-full.txt ---------------------------------------------------------
let full = '';
full += `# Frontier AI Governance Map\n\n`;
full += `By Yuyu Shen\n`;
full += `Personal site: ${AUTHOR_SITE}\n`;
full += `Contact: ${AUTHOR_EMAIL}\n`;
full += `Web version: ${SITE_URL}\n`;
full += `Updated: ${UPDATED}\n\n`;

full += `## Overview\n\n`;
full += `An interactive map of frontier AI governance: six layers across the rows, METR's nine common elements as an orthogonal filter. Each mechanism is mapped to its layer (who acts) and to which of METR's elements it covers (what it addresses). The empty cells of the orthogonal coverage view are as informative as the filled ones.\n\n`;
full += `The map organises by *who acts*, not *what they regulate*: the EU AI Act sits in Layer 2 (statute), the EU AI Office in Layer 6 (the institution enforcing it).\n\n`;

full += `## Stats\n\n`;
const counts = { voluntary: 0, binding: 0 };
for (const e of ENTITIES) {
  if (e.pow <= 2) counts.voluntary++;
  if (e.pow === 4) counts.binding++;
}
full += `- ${ENTITIES.length} mechanisms mapped\n`;
full += `- ${counts.voluntary} voluntary or norm-only\n`;
full += `- ${counts.binding} binding with penalties\n`;
full += `- ${CATEGORIES.length} coverage categories\n\n`;

full += `## Layers\n\n`;
for (const i of [1,2,3,4,5,6]) {
  full += `- **Layer ${i} — ${LAYERS[i].name}**: ${LAYERS[i].desc}\n`;
}
full += `\n`;

full += `## Coverage categories (METR's nine common elements)\n\n`;
full += `Source: https://metr.org/common-elements\n\n`;
for (const cat of CATEGORIES) {
  full += `- **${cat.name}**: ${cat.desc}\n`;
}
full += `\n`;

full += `## Mechanisms\n\n`;
for (const layer of [1,2,3,4,5,6]) {
  full += `### Layer ${layer} — ${LAYERS[layer].name}\n\n`;
  for (const e of ENTITIES.filter(x => x.layer === layer)) {
    full += `#### ${e.name}\n\n`;
    full += `- Jurisdiction: ${JUR_LABEL[e.jur]}\n`;
    full += `- Enforceability: ${POW_LABEL[e.pow]}\n`;
    full += `- Status: ${STATUS_LABEL[e.status]}\n`;
    if (e.link) full += `- Primary source: ${e.link}\n`;
    full += `\n`;
    full += `${e.desc}\n\n`;
    if (e.context) full += `${e.context}\n\n`;
    if (e.cov && Object.keys(e.cov).length > 0) {
      full += `**Coverage:**\n\n`;
      for (const cat of CATEGORIES) {
        if (e.cov[cat.id]) {
          full += `- *${cat.name}*: ${e.cov[cat.id]}\n`;
        }
      }
      full += `\n`;
    }
    const conns = EDGES
      .filter(edge => edge.a === e.id || edge.b === e.id)
      .map(edge => {
        const otherId = edge.a === e.id ? edge.b : edge.a;
        const other = ENTITIES.find(x => x.id === otherId);
        return { name: other ? other.name : otherId, rel: edge.rel };
      });
    if (conns.length) {
      full += `**Connections:**\n\n`;
      for (const c of conns) full += `- → ${c.name}: ${c.rel}\n`;
      full += `\n`;
    }
    full += `---\n\n`;
  }
}

full += `## Sources\n\n`;
full += `International AI Safety Report (Feb 2026), METR Common Elements of Frontier AI Safety Policies (Dec 2025), Brundage Substack, EU AI Act and AI Office documentation, California SB 53 / TFAIA, NY RAISE Act (signed Dec 19 2025; chapter amendments Mar 27 2026; effective Jan 1 2027), Trump Executive Orders 14179 and 14365, Korea AI Basic Act (in force Jan 22 2026), India AI Impact Summit New Delhi Declaration.\n\n`;
full += `## Notes\n\n`;
full += `The orthogonal coverage analysis applies METR's nine elements (originally a taxonomy of corporate safety frameworks) to the full set of mechanisms. Some mappings are stretches — flagged in the per-entity notes. Errors are mine.\n`;

fs.writeFileSync(path.join(ROOT, 'llms-full.txt'), full);

// ---- llms.txt --------------------------------------------------------------
let llms = '';
llms += `# Frontier AI Governance Map\n\n`;
llms += `> Interactive map of frontier AI governance covering six layers (international, national, sub-national, industry voluntary, corporate self-governance, infrastructure) and METR's nine common elements as an orthogonal filter. ${UPDATED} snapshot; ${ENTITIES.length} mechanisms across the stack with primary-source links, descriptions, and connections.\n\n`;
llms += `By Yuyu Shen\n`;
llms += `Personal site: ${AUTHOR_SITE}\n`;
llms += `Contact: ${AUTHOR_EMAIL}\n`;
llms += `Web version: ${SITE_URL}\n\n`;

llms += `## Documents\n\n`;
llms += `- [Full content as markdown](${SITE_URL}/llms-full.txt) — every mechanism with description, context, primary source, coverage notes, and connections (${ENTITIES.length} mechanisms, ${EDGES.length} relationships)\n`;
llms += `- [Web version](${SITE_URL}) — interactive HTML\n\n`;

llms += `## Conceptual structure\n\n`;
llms += `**Layers** organise by *who acts*:\n\n`;
for (const i of [1,2,3,4,5,6]) {
  llms += `- Layer ${i} — ${LAYERS[i].name}: ${LAYERS[i].desc}\n`;
}
llms += `\n**Coverage categories** (METR's nine common elements, applied as orthogonal filter):\n\n`;
for (const cat of CATEGORIES) {
  llms += `- ${cat.name}: ${cat.desc}\n`;
}

fs.writeFileSync(path.join(ROOT, 'llms.txt'), llms);

// ---- data.json -------------------------------------------------------------
// Machine-readable export for AI agents and downstream tooling.
const data = {
  $schema: 'https://ai-governance-map.buildwithwhy.com/data.schema.json',
  name: 'Frontier AI Governance Map',
  description: 'Interactive map of frontier AI governance: 39 mechanisms across six layers, with METR\'s nine common elements as an orthogonal filter.',
  version: '2026.05.09',
  updated: '2026-05-09',
  url: SITE_URL,
  repository: 'https://github.com/buildwithwhy/ai-governance-map',
  license: 'CC-BY-4.0',
  citation: 'https://metr.org/common-elements',
  creator: {
    name: 'Yuyu Shen',
    url: AUTHOR_SITE,
    email: AUTHOR_EMAIL,
  },
  stats: {
    mechanisms: ENTITIES.length,
    edges: EDGES.length,
    voluntary_or_norm_only: ENTITIES.filter(e => e.pow <= 2).length,
    binding_with_penalties: ENTITIES.filter(e => e.pow === 4).length,
    categories: CATEGORIES.length,
    layers: 6,
  },
  layers: Object.entries(LAYERS).map(([n, l]) => ({ number: Number(n), name: l.name, description: l.desc })),
  categories: CATEGORIES.map(c => ({ id: c.id, name: c.name, description: c.desc })),
  labels: {
    jurisdiction: JUR_LABEL,
    enforceability: POW_LABEL,
    status: STATUS_LABEL,
  },
  entities: ENTITIES.map(e => ({
    id: e.id,
    name: e.name,
    layer: e.layer,
    layer_name: LAYERS[e.layer].name,
    jurisdiction: e.jur,
    jurisdiction_name: JUR_LABEL[e.jur],
    enforceability: e.pow,
    enforceability_name: POW_LABEL[e.pow],
    status: e.status,
    status_name: STATUS_LABEL[e.status],
    primary_source: e.link || null,
    description: e.desc,
    context: e.context || null,
    coverage: e.cov || {},
  })),
  edges: EDGES.map(edge => ({ from: edge.a, to: edge.b, relationship: edge.rel })),
};
fs.writeFileSync(path.join(ROOT, 'data.json'), JSON.stringify(data, null, 2));

console.log(`wrote llms.txt (${llms.length} chars), llms-full.txt (${full.length} chars), data.json (${JSON.stringify(data).length} chars)`);
