# Scope

Two separate lists govern each run:

- **A. Verification inventory — automatic.** Every item currently on the map is checked: entries and their claims, coverage assignments and notes, connections, gap summaries, FAQ answers, layer and footer text, category definitions, counts, dates and generated files. It is generated from `index.html` (`node tools/research.js inventory`), so it grows and shrinks with the map. No total is hardcoded.
- **B. Discovery monitoring — explicit, changed only by maintainer decision.** These are the places searched each run for *new* mechanisms (below). A significant find outside B becomes a **proposed coverage addition**. Accepting it adds the entry to list A, so it is verified from then on, but it does **not** add its jurisdiction or institution type to B. Expanding B is a separate decision recorded in this file.

The map keeps all six layers and its breadth beyond legislation: treaties, summits, institutes, regulators, evaluators, compute controls, voluntary codes and lab frameworks are all in scope.

Extracted from the data at commit `9166869` (49 entries). Re-extract with `node tools/research.js inventory`.

## B1. Jurisdictions monitored for national-level discovery

These are the jurisdictions with at least one national-level entry of their own:

| Jurisdiction | Entries today | `jur` code |
|---|---|---|
| United States (federal) | us-eo14179, us-action, us-preempt, us-frontier-access-eo, caisi, us-ftc, bis, nist-rmf | `us` |
| European Union | eu-aia, eu-aio, gpai-cop | `eu` |
| United Kingdom | uk-bill, uk-aisi, uk-ofcom, uk-ico | `uk` |
| China | cn-genai, cn-ai-law | `cn` |
| South Korea | kr-ai | `as` |
| Japan | jp-ai, jp-sectors | `as` |
| Singapore | imda | `as` |
| Australia | au-esafety | `as` |

**Represented only inside multi-country entries; no national discovery:** France (INESIA), Canada, Kenya and India. They appear as members in `aisi-net` and `other-aisis`, and India also as host in `ai-summits` and `delhi-commit`. Their mentions are verified as part of those entries. Brazil, Taiwan and other unrepresented jurisdictions are not monitored.

## B2. Sub-national (Layer 3): US-focused

- **Represented states: California, Colorado, New York, Texas** (ca-sb53, co-aia, ny-raise, tx-raiga, and co-doi in Layer 4). Discovery covers new AI statutes, significant amendments, repeal or replacement, and implementing rules.
- **Other US states:** discovery covers frontier/GPAI-specific statutes only, such as SB 53 or RAISE analogues, enacted or passed by the legislature. General AI bills in other states are not monitored.
- Non-US sub-national governments are not monitored.

## B3. Institutions monitored

| Type | Monitored (existing entries) | Discovery within type |
|---|---|---|
| Multilateral bodies and processes (L1, L5) | International AI Safety Report (aisr), AISI Network (aisi-net), AI summit series (ai-summits), OECD (oecd), Council of Europe (coe-ai), UNESCO (unesco), G7 Hiroshima Process (hiroshima), Seoul and Delhi commitments | New instruments *from these bodies/processes* (e.g. a new summit's commitments, a new OECD instrument with a frontier/GPAI bearing) |
| AI safety and security institutes, AI offices (L4) | uk-aisi, caisi, eu-aio, other-aisis | New institutes or statutory powers in B1 jurisdictions |
| Independent evaluators and NGOs (L4) | METR, Apollo Research, AVERI, CAIS, Frontier Security Institute | New *mechanisms* from these bodies (e.g. a formal evaluation regime adopted by governments or labs). New organisations only as proposed additions with evidence of a governance role |
| Sector and general regulators (L4) | uk-ofcom, uk-ico, us-ftc, au-esafety, co-doi, imda, jp-sectors | A specific AI rule, code or enforcement action from regulators in B1/B2 jurisdictions |
| Compute and export controls (L4) | bis | Changes to US controls on advanced chips or model weights; equivalents in B1 jurisdictions |
| Standards frameworks (L4) | nist-rmf | Updates to NIST AI RMF profiles |
| Industry and multistakeholder bodies (L5) | Frontier Model Forum (fmf), Partnership on AI (pai), EU GPAI Code (gpai-cop) | New cross-firm commitments or codes from these bodies |

**Standards bodies, UN bodies, courts and insurers** are not monitored by default. One can enter as a proposed coverage addition only when there is a **specific, evidenced mechanism** that materially bears on frontier/general-purpose AI governance, for example a published standard used for regulatory compliance, a UN body with an adopted mandate, a court ruling that binds a frontier developer, or an insurance product or requirement that conditions frontier deployment. An organisation is never added merely because it discusses AI.

## B4. Labs monitored (Layer 6)

Anthropic (rsp), OpenAI (prep), Google DeepMind (fsf), Meta (meta-faif) and xAI (xai-rmf). Each run checks their frontier safety frameworks and directly related governance documents: new versions, compliance frameworks published under SB 53 or the EU Code, and governance-body changes. Other developers' frameworks are not monitored. A significant one, such as a developer newly in scope of SB 53 or RAISE, may be raised as a proposed addition.

## B5. Categories

METR's nine common elements remain the coverage lens for `cov` notes. They are **not** the inclusion rule: a mechanism can qualify with few or no coverage notes if it meets RUBRIC §1.

## C. Relevance tiers (draft for review)

Existing general regulators and general AI instruments are retained. The tier records *how* each bears on frontier/GPAI governance. It is a research-side annotation and is not shown on the map.

- **Direct:** contains provisions or functions specifically aimed at frontier or general-purpose models or their developers.
- **Contextual:** general AI or sector governance that applies to frontier developers, or that sets the surrounding norms.

| Tier | Entries |
|---|---|
| Direct | aisr, aisi-net, ai-summits, eu-aia, us-action, us-preempt, us-frontier-access-eo, cn-genai, uk-bill, kr-ai, ca-sb53, ny-raise, eu-aio, uk-aisi, caisi, other-aisis, metr, apollo, averi, cais, fsi, bis, seoul-commit, hiroshima, gpai-cop, fmf, delhi-commit, rsp, prep, fsf, meta-faif, xai-rmf |
| Contextual | oecd, coe-ai, unesco, us-eo14179, cn-ai-law, jp-ai, co-aia, tx-raiga, uk-ofcom, uk-ico, us-ftc, au-esafety, co-doi, imda, jp-sectors, nist-rmf, pai |

**Flagged for review, not for removal.** The baseline audit will raise each of these as a question:
- **co-doi:** an insurance-sector rule set with no GPAI-specific obligations.
- **jp-sectors:** an aggregate of ministries rather than a specific mechanism.
- **tx-raiga and co-aia:** general or algorithmic-discrimination statutes. The current enforceability classification also needs checking (see RUBRIC §4).
- **us-eo14179:** tiered contextual, but it revoked the earlier frontier-reporting EO, so direct may be more accurate.

## Change log

- 2026-10-08: initial scope drafted from the data and the maintainer's decisions. The maintainer has not yet confirmed the B1 boundary or the B2 rule for other US states.
