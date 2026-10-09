# Review report — Partial trial 1 — 5 entries across Layers 2, 5, 6

> **PARTIAL RUN.** 5 of 49 entries checked. This is not a baseline audit; everything else is *not checked*.

## Summary

- **Blocked by network policy.** Every EU, US federal and Chinese primary source was unreachable; only anthropic.com loaded. The EU AI Act, EU GPAI Code, US Frontier AI Access EO and China AI Law could not be verified, and stay as they are.
- **Anthropic RSP was out of date.** The current version is v3.4 (8 Jul 2026), not v3.0, and the map missed the 2026 accountability additions (Risk Reports, external review, new LTBT powers). The Seoul → RSP connection had the chronology reversed.
- **Internal fixes:** data.json said 39 mechanisms (actually 49). The FAQ conflated binding laws with binding mechanisms. Australia was labelled 'Asia (other)'. The Layer 2 subtitle said 'agencies'.
- **Leads awaiting source access (unverified):** the EU Digital Omnibus may have moved high-risk deadlines to Dec 2027 / Aug 2028; the Frontier AI Access EO may be voluntary, with the NSA rather than CAISI designating models; China's AI Law still has no verifiable source.
- **Your decisions:** P-0001 to P-0009 accepted on 9 Oct. P-0010 (RSP v3 ASL and pause wording) stays open until the policy text is readable.

- **Checked:** 63 items across 5 of 49 entries. Source inaccessible: 31 · Unresolved or conflicting evidence: 18 · No material change found in the checked sources: 6 · Change supported: 8.
- **Proposals:** 1 awaiting your decision · 9 accepted, not yet applied · 0 applied · 0 rejected · 0 deferred.
- **Sources:** 24 used, 20 could not be retrieved (see §2).
- **Map:** content last updated 2026-06-06. 14 of 511 inventory items have ever been successfully checked (14 against their current text).
- **Run:** `2026-10-08-trial1` · 2026-10-08T17:01:01Z → 2026-10-08T17:06:57Z (6 min) · usage/cost: not available in this session.

## Decisions

### Awaiting your decision

| ID | Ver | Type | Proposal | Confidence |
|---|---|---|---|---|
| P-0010 | v1 | question | Anthropic RSP v3 restructuring: ASL and pause wording may be outdated | medium |

Reply in conversation, e.g. “accept P-0002 v1”, “edit P-0003: use …”, “reject P-0004 — reason”, “defer P-0005 until 2026-12-01”. Decisions bind to the version shown; a substantive revision comes back for renewed approval. Details in §1.

### Decided

| ID | Ver | Decision | Date | Status | Proposal |
|---|---|---|---|---|---|
| P-0001 | v1 | accepted | 2026-10-09 | awaiting apply | Derive the data.json description count instead of hardcoding "39" |
| P-0002 | v1 | accepted | 2026-10-09 | awaiting apply | FAQ: separate 'binding laws' from 'binding mechanisms' |
| P-0003 | v1 | accepted | 2026-10-09 | awaiting apply | Relabel jurisdiction code `as` from 'Asia (other)' to 'Asia-Pacific (other)' |
| P-0004 | v1 | accepted | 2026-10-09 | awaiting apply | Layer 2 subtitle: 'agencies' → 'framework acts' |
| P-0005 | v1 | accepted | 2026-10-09 | awaiting apply | Anthropic RSP: current version is v3.4 (Jul 2026), revised 8× since v1.0 |
| P-0006 | v1 | accepted | 2026-10-09 | awaiting apply | Anthropic RSP · Updating policies: revision history and change-log commitment |
| P-0007 | v1 | accepted | 2026-10-09 | awaiting apply | Anthropic RSP · Accountability: Risk Reports, external review, LTBT powers |
| P-0008 | v1 | accepted | 2026-10-09 | awaiting apply | Connection Seoul commitments ↔ Anthropic RSP: fix chronology |
| P-0009 | v1 | accepted | 2026-10-09 | awaiting apply | New connection NY RAISE ↔ Anthropic RSP (Frontier Compliance Framework) |

## 1. Proposal details — awaiting decision

### Questions requiring your judgment

### P-0010 v1 — Anthropic RSP v3 restructuring: ASL and pause wording may be outdated

`flag` · confidence: medium · change-hash `4f53cda18c2b` · decision: **pending**

**Question for you:** Recommended: defer until the policy text can be read (the www-cdn.anthropic.com PDF is blocked), then propose exact rewording of rsp context, thresholds, security, mitigations and halting together. Alternatively, should I soften the halting note now from the v3.1 clarification alone?

**Why it matters:** Several RSP statements may describe the pre-v3 policy. They feed the FAQ answer on lab frameworks and the halting and deployment-mitigation gap summaries ('Every lab framework includes it').

**Reasoning:** The accessible sources show the following. (1) v3 'outlines two sets of mitigations': those Anthropic plans to pursue regardless of others, and an industry-wide capabilities-to-mitigations map. (2) The Frontier Safety Roadmap contains 'public goals', not 'hard commitments'. (3) v3.1 clarifies that Anthropic 'remain[s] free to take measures such as pausing … even if not required by the RSP'. (4) v3-era model reports describe RSP 'threat models' such as CB-2 rather than ASLs. The map says 'currently up to ASL-3', 'Anthropic commits to pause development or deployment if mitigations are insufficient', and 'Capability thresholds trigger required safeguards'.

**Evidence**

- **S-0007** https://www.anthropic.com/news/responsible-scaling-policy-v3 — <https://www.anthropic.com/news/responsible-scaling-policy-v3>
  primary · retrieved 2026-10-08 · access: ok · published 2026-02-24
  1. Separating our plans as a company from our recommendations for the industry:
  > Our RSP now outlines two sets of mitigations: first, the mitigations that we plan to pursue regardless of what others do; and second, an ambitious capabilities-to-mitigations map that, we believe, would help adequately manage the risks from advanced AI if implemented across the AI industry.
  _Supports:_ Two-tier structure
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-08 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Update log, April 2, 2026 (v3.1):
  > We now clarify that, even if not required by the RSP, we remain free to take measures such as pausing the development of our AI systems in any circumstances in which we deem them appropriate.
  _Supports:_ Pausing clarification
- **S-0011** Anthropic Transparency Hub — <https://www.anthropic.com/transparency>
  primary · retrieved 2026-10-08 · access: ok
  Model reports, Claude Opus 4.7 — RSP evaluations:
  > Chemical and biological weapons threat model 2 (CB-2) covers models that can significantly help moderately resourced expert-backed teams create and deploy chemical or biological weapons …
  _Supports:_ Threat-model framing
- **S-0007** https://www.anthropic.com/news/responsible-scaling-policy-v3 — <https://www.anthropic.com/news/responsible-scaling-policy-v3>
  primary · retrieved 2026-10-08 · access: ok · published 2026-02-24
  Assessing our theory of change:
  > We activated ASL-3 safeguards for relevant models in May 2025
  _Supports:_ ASL-3 safeguards activated May 2025 (implementation)

**Uncertainty:** Conflicting signals. A pause may still be required in specific v3 circumstances; only the policy text can settle it.


## 2. Unresolved items and failures

- **Source inaccessible** — 10 item(s): `entry:eu-aia`, `entry:eu-aia:context`, `entry:eu-aia:cov`, `entry:eu-aia:cov:thresh`, `entry:eu-aia:cov:eval`, `entry:eu-aia:cov:elicit`, `entry:eu-aia:cov:sec`, `entry:eu-aia:cov:mit`, `entry:eu-aia:cov:acct`, `entry:eu-aia:cov:update`
  Commission AI Act page and EUR-Lex text both blocked by the environment's network policy; nothing about the EU AI Act could be checked against a source.
  - S-0001 <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai> — blocked on 2026-10-08
  - S-0002 <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng> — blocked on 2026-10-08
- **Unresolved or conflicting evidence** — 2 item(s): `entry:eu-aia:desc`, `entry:eu-aia:cov:timing`
  LEAD (unverified): search results say the 'Digital Omnibus on AI', Regulation (EU) 2026/1744, entered into force 27 Jul 2026 and moved Annex III high-risk application to 2 Dec 2027 and Annex I to 2 Aug 2028. The map says 'high-risk system rules Aug 2027'. Secondary reports disagree on Article 50 timing. None of these pages could be opened; primary sources blocked. No proposal until the Official Journal text is inspected.
  - S-0001 <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai> — blocked on 2026-10-08
  - S-0002 <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng> — blocked on 2026-10-08
  - S-0017 <https://www.lewissilkin.com/insights/2026/07/27/the-digital-omnibus-on-ai-enters-into-force-today-102nedo> — search_result_only on 2026-10-08
  - S-0018 <https://www.addleshawgoddard.com/en/insights/insights-briefings/2026/technology/eu-ai-act-ai-omnibus-formally-adopted/> — search_result_only on 2026-10-08
  - S-0019 <https://www.gibsondunn.com/eu-ai-act-omnibus-agreement> — search_result_only on 2026-10-08
- **Source inaccessible** — 12 item(s): `entry:gpai-cop`, `entry:gpai-cop:desc`, `entry:gpai-cop:context`, `entry:gpai-cop:cov`, `entry:gpai-cop:cov:thresh`, `entry:gpai-cop:cov:eval`, `entry:gpai-cop:cov:elicit`, `entry:gpai-cop:cov:sec`, `entry:gpai-cop:cov:mit`, `entry:gpai-cop:cov:halt`, `entry:gpai-cop:cov:acct`, `entry:gpai-cop:cov:update`
  Commission Code page blocked. Leads from search only: signatory list reportedly updated 23 Apr 2026; AI Office 'Signatory Taskforce' first met 30 Jan 2026; GPAI enforcement powers from 2 Aug 2026. Current map signatory statements (Anthropic/OpenAI/Google all three chapters, xAI safety chapter only, Meta declined) are consistent with search snippets but unverified.
  - S-0003 <https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai> — blocked on 2026-10-08
  - S-0026 <https://casrai.org/guides/eu-ai-act-gpai-code-of-practice> — search_result_only on 2026-10-08
- **Unresolved or conflicting evidence** — 3 item(s): `entry:us-frontier-access-eo`, `entry:us-frontier-access-eo:desc`, `edge:us-frontier-access-eo|caisi`
  LEAD (unverified, partly conflicting with the map): search results describe the order as 'Promoting Advanced Artificial Intelligence Innovation and Security' (signed 2 Jun 2026, published 5 Jun), a VOLUNTARY pre-release framework (up to 30 days), with models designated by the NSA Director via a classified cyber benchmark. The search summary found no CAISI role in the order text, which conflicts with the connection 'EO designates CAISI to administer national-security reviews'. A separate report says CAISI was told to pause public model reports. Candidate replacement link: govinfo DCPD-202600376 (unopened).
  - S-0004 <https://www.npr.org/2026/06/02/nx-s1-5844347/ai-safety-trump-executive-order> — blocked on 2026-10-08
  - S-0012 <https://www.govinfo.gov/content/pkg/DCPD-202600376/html/DCPD-202600376.htm> — blocked on 2026-10-08
  - S-0020 <https://www.lw.com/en/insights/2026/06/president-trump-signs-executive-order-establishing-ai-cybersecurity-and-frontier-model-framework> — search_result_only on 2026-10-08
  - S-0021 <https://finsights.cooley.com/ai-executive-order-creates-voluntary-framework-for-frontier-models-advances-critical-infrastructure-cybersecurity/> — search_result_only on 2026-10-08
  - S-0022 <https://aiweekly.co/alerts/white-house-tells-caisi-to-halt-public-ai-model-reports> — search_result_only on 2026-10-08
- **Source inaccessible** — 5 item(s): `entry:us-frontier-access-eo:context`, `entry:us-frontier-access-eo:cov`, `entry:us-frontier-access-eo:cov:eval`, `entry:us-frontier-access-eo:cov:timing`, `entry:us-frontier-access-eo:cov:acct`
  The map's only source is an NPR article (secondary), and it is blocked. The official text (govinfo DCPD-202600376) and whitehouse.gov are blocked too.
  - S-0004 <https://www.npr.org/2026/06/02/nx-s1-5844347/ai-safety-trump-executive-order> — blocked on 2026-10-08
  - S-0012 <https://www.govinfo.gov/content/pkg/DCPD-202600376/html/DCPD-202600376.htm> — blocked on 2026-10-08
  - S-0016 <https://www.whitehouse.gov/presidential-actions/> — blocked on 2026-10-08
- **Unresolved or conflicting evidence** — 8 item(s): `entry:cn-ai-law`, `entry:cn-ai-law:desc`, `entry:cn-ai-law:context`, `entry:cn-ai-law:cov`, `entry:cn-ai-law:cov:thresh`, `entry:cn-ai-law:cov:eval`, `entry:cn-ai-law:cov:mit`, `entry:cn-ai-law:cov:acct`
  MISSING LINK INVESTIGATED; no source assigned and status not changed. Official sites: npc.gov.cn returned HTTP 403, gov.cn blocked. Leads from search only: (1) the State Council 2026 Legislative Work Plan (11 May 2026) reportedly says comprehensive AI legislation will be 'accelerated', without saying whether as an NPC law or a State Council regulation; (2) the March 2026 NPCSC work report reportedly commits to 'step up research' on AI legislation; (3) a Cybersecurity Law amendment adding an AI article reportedly took effect 1 Jan 2026. Item (3) is a possible separate mechanism or context for cn-genai. One secondary page claims a second reading in Q4 2025; it conflicts with the others and is treated as unreliable.
  - S-0014 <http://www.npc.gov.cn/> — http_403 HTTP 403 on 2026-10-08
  - S-0015 <https://www.gov.cn/> — blocked on 2026-10-08
  - S-0023 <https://www.chinaiplawupdate.com/?p=4093> — search_result_only on 2026-10-08
  - S-0024 <https://www.akingump.com/en/insights/ai-law-and-regulation-tracker/China's-Legislative-Plan-for-AI-Law> — search_result_only on 2026-10-08
  - S-0025 <https://www.caixinglobal.com/2025-10-29/china-amends-cybersecurity-law-to-add-first-ever-ai-clause-102376988.html> — search_result_only on 2026-10-08
- **Unresolved or conflicting evidence** — 5 item(s): `entry:rsp:context`, `entry:rsp:cov:thresh`, `entry:rsp:cov:sec`, `entry:rsp:cov:mit`, `entry:rsp:cov:halt`
  Accessible pages signal a v3 restructuring (two tiers of mitigations; non-binding roadmap goals; pause 'even if not required'; threat-model framing). The policy text that would settle ASL and pause wording is blocked. See flag P-0010.
  - S-0005 <https://www.anthropic.com/responsible-scaling-policy> — ok HTTP 200 on 2026-10-08
  - S-0007 <https://www.anthropic.com/news/responsible-scaling-policy-v3> — ok HTTP 200 on 2026-10-08
  - S-0011 <https://www.anthropic.com/transparency> — ok HTTP 200 on 2026-10-08
  - S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf> — blocked on 2026-10-08
  - S-0008 <https://www.anthropic.com/responsible-scaling-policy/rsp-v3-0> — blocked on 2026-10-08
- **Source inaccessible** — 4 item(s): `entry:rsp:cov`, `entry:rsp:cov:eval`, `entry:rsp:cov:elicit`, `entry:rsp:cov:timing`
  Claims about evaluation methods, elicitation (incl. METR and UK AISI participation) and timing need the policy text and system cards; policy PDF and HTML both blocked.
  - S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf> — blocked on 2026-10-08
  - S-0008 <https://www.anthropic.com/responsible-scaling-policy/rsp-v3-0> — blocked on 2026-10-08

## 3. Discovery log

### EU (jurisdiction, B1) — new mechanisms and institutions since June 2026

I ran web searches for EU AI Act amendments, new codes of practice, guidelines and AI Office mechanisms. The search tool worked, but every candidate's primary source (digital-strategy.ec.europa.eu, eur-lex.europa.eu) and every secondary page was blocked. So these are leads only: nothing here is verified, and nothing is proposed.

Searches: “EU AI Act digital omnibus delay high-risk obligations 2026”; “European Commission AI Act new guidelines code of practice August September 2026”; “GPAI Code of Practice signatories update 2026 AI Office”

| Candidate | Result | Reason | Sources |
|---|---|---|---|
| Digital Omnibus on AI — Regulation (EU) 2026/1744 | lead — update to existing entry (eu-aia); source inaccessible | An amending regulation. Reported in force 27 Jul 2026, moving the high-risk dates. Would change eu-aia (desc, timing), and probably eu-aio and the gap and FAQ text that mention Aug 2026/2027. Probably not a separate entry. | S-0017, S-0018, S-0019 |
| Code of Practice on marking and labelling AI-generated content (Art. 50) | lead — possible new entry (L5, eu); source inaccessible | A voluntary code linked to the Article 50 transparency duties for generative AI providers. Would qualify under RUBRIC §1 if adopted. Secondary sources disagree on the dates (draft 5 Mar or 8 May 2026; final 10 Jun 2026?). |  |
| Commission guidelines on Article 50 (draft, May 2026) | lead — context for the code above | Interpretive guidance rather than a separate mechanism; would be noted in the code's or eu-aia's context. |  |
| AI Office GPAI Code 'Signatory Taskforce' (first met 30 Jan 2026) | screened out as a separate entry; lead for gpai-cop context | An implementation forum of an existing mechanism. | S-0026 |
| GPAI enforcement powers applying from 2 Aug 2026 | lead — update to existing entries (eu-aia, eu-aio) | A date that has passed since the snapshot. The map's FAQ says the AI Office's 'full enforcement powers activate in August 2026'. That wording may need a tense change once verified. | S-0026 |

_Limits:_ No primary source was opened, so absence of other candidates means nothing. This search must be repeated once network access is fixed.

### Anthropic (lab, B4) — new governance documents and mechanisms

I read the RSP page, the v3 announcement, the Frontier Safety Roadmap and the Transparency Hub on anthropic.com. The policy PDF (www-cdn.anthropic.com), the HTML policy text and the Trust Center were blocked.

Searches: “anthropic.com/responsible-scaling-policy (update log)”; “anthropic.com/news/responsible-scaling-policy-v3”; “anthropic.com/responsible-scaling-policy/roadmap”; “anthropic.com/transparency”

| Candidate | Result | Reason | Sources |
|---|---|---|---|
| RSP v3.0–v3.4 (Feb–Jul 2026) | update to existing entry (P-0005, P-0006, P-0007, P-0010) | Version, accountability and revision-history changes. | S-0005, S-0007 |
| Frontier Safety Roadmap (Feb 2026) | screened out as a separate entry; part of rsp | Created by RSP v3 and described as 'public goals', not commitments. It belongs in the rsp entry, not in a new one. Folded into P-0010's follow-up. | S-0009, S-0007 |
| Risk Reports (Feb and Aug 2026) | update to existing entry (P-0007) | Implementation evidence under RSP v3; recorded in P-0007. | S-0005 |
| RSP Noncompliance Reporting and Anti-Retaliation Policy (updated Mar 2026) | screened out — minor; note for baseline | An internal compliance policy tied to the RSP. It could be added to the rsp accountability note later. Not material enough for a separate entry. | S-0005 |
| Frontier Compliance Framework | new connection proposed; document inaccessible (P-0009) | Anthropic's compliance document for SB 53, RAISE and the EU Code. Evidence of the relationship, not a separate mechanism; it supports the new RAISE↔RSP connection. | S-0007, S-0010 |
| Transparency Hub | screened out | A publication channel (model reports), not a governance mechanism. Useful as implementation evidence. | S-0011 |

_Limits:_ The policy text itself was not read. Other labs were not searched; that is outside this trial.

## 4. Proposal details — decided (audit trail)

### P-0001 v1 — Derive the data.json description count instead of hardcoding "39"

`change` · confidence: high · change-hash `107760cab70a` · decision: **accepted** (v1, 2026-10-09)

**Change**

- **`build-llms.js`**

  Current:

  > description: 'Interactive map of frontier AI governance: 39 mechanisms across six layers, with METR\'s nine common elements as an orthogonal filter.',

  Proposed:

  > description: `Interactive map of frontier AI governance: ${ENTITIES.length} mechanisms across six layers, with METR's nine common elements as an orthogonal filter.`,

**Why it matters:** The published data.json says 39 mechanisms while the map has 49. The number was typed by hand in build-llms.js, so it would drift again after every addition.

**Reasoning:** Generator fix, not a content judgment. After apply, data.json's description reads the live entry count.

**Evidence**

- **S-0027** Map repository at f9d3e56 (index.html, build-llms.js, data.json) — <https://github.com/buildwithwhy/ai-governance-map/tree/f9d3e56>
  repo · retrieved 2026-10-08 · access: ok
  build-llms.js line 150:
  > description: 'Interactive map of frontier AI governance: 39 mechanisms across six layers, …' — while ENTITIES has 49 entries; data.json therefore says 39.
  _Supports:_ The hardcoded value and the actual count

**Uncertainty:** None on the fact. The only visible effect is the data.json description string.

---

### P-0002 v1 — FAQ: separate 'binding laws' from 'binding mechanisms'

`change` · confidence: medium · change-hash `f1314dccf8ec` · decision: **accepted** (v1, 2026-10-09)

**Change**

- **`index.html`**

  Current:

  > Eight binding instruments in this map carry penalty regimes: the EU AI Act (up to €35M or 7% of global revenue), China's GenAI Measures, Korea's AI Basic Act (~$21k per violation), California SB 53 (up to $1M per violation), the Colorado AI Act, the NY RAISE Act ($1M/$3M), Texas TRAIGA, and US BIS export controls. Most are phasing in; several face active federal preemption challenges in the United States.

  Proposed:

  > Five AI laws in this map are classed as binding with penalties: the EU AI Act (up to €35M or 7% of global revenue), China's GenAI Measures, Korea's AI Basic Act (~$21k per violation), California SB 53 (up to $1M per violation) and the NY RAISE Act ($1M/$3M). The map's wider 'binding with penalties' count also includes US BIS export controls and five regulators enforcing binding law (the EU AI Office, UK Ofcom, the UK ICO, Australia's eSafety Commissioner and the Colorado Division of Insurance). The Colorado AI Act and Texas TRAIGA are binding statutes the map classes as hard law with weak enforcement. Several US state laws face active federal preemption challenges.

**Question for you:** Do you agree that 'binding laws' (L2/L3 statutes with pow 4) and 'binding mechanisms' (all pow-4 entries) should be distinguished like this? The alternative is to keep the FAQ list and reclassify Colorado and Texas as pow 4, which needs the statutes checked in the baseline audit.

**Why it matters:** The FAQ says eight binding instruments while the stats tile says 11. The two use different definitions, and the FAQ names Colorado and Texas as penalty-bearing although the map classes both as pow 3. Search engines and LLMs ingest this FAQ (FAQPage JSON-LD).

**Reasoning:** Established first that the terms differ. The stats tile counts every pow-4 entry (laws, regulators, export controls); the FAQ question asks about laws. The rewrite keeps the existing penalty figures and aligns the list with the map's own classifications.

**Evidence**

- **S-0027** Map repository at f9d3e56 (index.html, build-llms.js, data.json) — <https://github.com/buildwithwhy/ai-governance-map/tree/f9d3e56>
  repo · retrieved 2026-10-08 · access: ok
  index.html FAQ JSON-LD vs stats block:
  > FAQ: 'Eight binding instruments in this map carry penalty regimes: … the Colorado AI Act, … Texas TRAIGA, and US BIS export controls.' Stats tile: 11 'binding with penalties' (= entries with pow 4). co-aia and tx-raiga have pow 3; pow-4 entries also include eu-aio, uk-ofcom, uk-ico, au-esafety, co-doi.
  _Supports:_ The FAQ list versus the pow values and stats tile

**Uncertainty:** Only the structure changes. The penalty figures (€35M/7%, ~$21k, $1M, $1M/$3M) and the 'phasing in' statement were not re-verified this run because their sources were blocked. I dropped 'Most are phasing in' rather than restate an unchecked status claim. If the EU Digital Omnibus lead is confirmed, the EU AI Act timing elsewhere will change, though not this sentence.

---

### P-0003 v1 — Relabel jurisdiction code `as` from 'Asia (other)' to 'Asia-Pacific (other)'

`change` · confidence: high · change-hash `d6753348364d` · decision: **accepted** (v1, 2026-10-09)

**Change**

- **`index.html`**

  Current:

  > as:'Asia (other)'

  Proposed:

  > as:'Asia-Pacific (other)'

- **`index.html`**

  Current:

  > <span class="sw j-as"></span>Other Asia</span>

  Proposed:

  > <span class="sw j-as"></span>Other Asia-Pacific</span>

- **`build-llms.js`**

  Current:

  > as:'Asia (other)'

  Proposed:

  > as:'Asia-Pacific (other)'

**Question for you:** `other-aisis` (Singapore, Japan, France, Korea, Canada, Australia, Kenya, India) is still mislabelled under either name. Leave it, or move it to `mu` (Multilateral)? Moving it would change that chip's colour. I have not proposed that move.

**Why it matters:** Australia's eSafety Commissioner is coloured and described as 'Asia (other)'. That label also appears in llms-full.txt and data.json for every `as` entry.

**Reasoning:** A label-only change. The code `as`, its colour, the lens and all filtering behaviour stay as they are, and no entry moves.

**Evidence**

- **S-0027** Map repository at f9d3e56 (index.html, build-llms.js, data.json) — <https://github.com/buildwithwhy/ai-governance-map/tree/f9d3e56>
  repo · retrieved 2026-10-08 · access: ok
  index.html JUR_LABEL / au-esafety / other-aisis:
  > JUR_LABEL as: 'Asia (other)'. au-esafety (Australia eSafety Commissioner) has jur 'as'. other-aisis (desc: 'Singapore …, Japan …, France (INESIA), Korea, Canada, Australia, Kenya, India') has jur 'as'.
  _Supports:_ au-esafety and other-aisis use `as`

**Uncertainty:** None on the facts. The wording is a style choice; 'Asia-Pacific (other)' is the smallest accurate change.

---

### P-0004 v1 — Layer 2 subtitle: 'agencies' → 'framework acts'

`change` · confidence: high · change-hash `a3579e1ac559` · decision: **accepted** (v1, 2026-10-09)

**Change**

- **`index.html`**

  Current:

  > <h2>National regulation</h2><p>Statutes, executive orders, agencies</p>

  Proposed:

  > <h2>National regulation</h2><p>Statutes, executive orders, framework acts</p>

- **`build-llms.js`**

  Current:

  > desc: 'Statutes, executive orders, agencies'

  Proposed:

  > desc: 'Statutes, executive orders, framework acts'

**Why it matters:** The subtitle contradicts the map's own organising rule: agencies sit in Layer 4, the Layer 2 tooltip says so, and so does the FAQ on Layer 2 vs 4. It also flows into llms.txt, llms-full.txt and data.json.

**Reasoning:** The proposed wording is taken from the Layer 2 tooltip ('statutes, executive orders, framework acts').

**Evidence**

- **S-0027** Map repository at f9d3e56 (index.html, build-llms.js, data.json) — <https://github.com/buildwithwhy/ai-governance-map/tree/f9d3e56>
  repo · retrieved 2026-10-08 · access: ok
  index.html Layer 2 band vs tooltip and FAQ:
  > Subtitle: 'Statutes, executive orders, agencies'. Tooltip: 'The laws themselves — statutes, executive orders, framework acts. The institutions that implement and enforce them sit in Layer 4.' No Layer 2 entry is an agency.
  _Supports:_ Subtitle vs tooltip; no Layer 2 entry is an agency

**Uncertainty:** None.

---

### P-0005 v1 — Anthropic RSP: current version is v3.4 (Jul 2026), revised 8× since v1.0

`change` · confidence: high · change-hash `727ae2c001cc` · decision: **accepted** (v1, 2026-10-09)

**Change**

- **`rsp` · desc**

  Current:

  > Responsible Scaling Policy (v3.0, Feb 2026). AI Safety Levels. Capability thresholds trigger required safeguards. Updated ~4× since 2023.

  Proposed:

  > Responsible Scaling Policy (v3.4, effective Jul 2026; rewritten as v3.0 in Feb 2026). AI Safety Levels. Capability thresholds trigger required safeguards. Revised 8× since v1.0 (Sep 2023).

**Why it matters:** The map names a version superseded four times since the June snapshot, and understates the revision count (8, not ~4).

**Reasoning:** Anthropic's policy page lists versions 1.0, 2.0, 2.1, 2.2, 3.0, 3.1, 3.2, 3.3 and 3.4, with effective dates.

**Evidence**

- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-08 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Current and Prior Versions:
  > Version 3.4 and redline (effective July 8, 2026) · Version 3.3 (effective May 26, 2026) · Version 3.2 (effective April 29, 2026) · Version 3.1 (effective April 2, 2026) · Version 3.0 (effective February 24, 2026) · Version 2.2 (effective May 14, 2025) · Version 2.1 (effective March 31, 2025) · Version 2.0 (effective October 15, 2024) · Version 1.0 (effective September 19, 2023)
  _Supports:_ Version list and effective dates
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-08 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Update log, February 24, 2026 / April 2, 2026:
  > Version 3.0 is a comprehensive rewrite of the RSP. … [changes] will be logged both on this page and in a changelog in the policy document itself.
  _Supports:_ v3.0 was a comprehensive rewrite

**Uncertainty:** 'AI Safety Levels. Capability thresholds trigger required safeguards.' is left as is but is NOT verified against v3.4: the policy text (PDF) was blocked, and the accessible sources suggest v3 restructured this (see P-0010).

**May need reconsideration if accepted**

- `edge:ca-sb53|rsp`: SB 53 codifies the published-framework norm Anthropic exemplified
- `edge:seoul-commit|rsp`: Seoul commitments triggered RSP's first public version
- `edge:gpai-cop|rsp`: Anthropic signed all three chapters
- `edge:fmf|rsp`: Anthropic is an FMF founding member
- `edge:metr|rsp`: METR conducts capability evaluations for Anthropic
- `edge:apollo|rsp`: Apollo evaluates Anthropic models for scheming
- `edge:uk-aisi|rsp`: UK AISI tested Anthropic models pre-deployment
- `gap:mit`: The most-covered category, and the most ambiguous — Almost every binding regulation covers deployment mitigations in some form — content marking, refusals, monitoring, anti-discri…
- `faq:which-ai-labs-have-published-frontier-safety-fra` — **describes the RSP as 'with AI Safety Levels' — depends on P-0010**: Which AI labs have published frontier safety frameworks? — Five major labs have published frontier safety frameworks at Layer 6 of this map: Anthropic (Responsible Scaling Policy,…
- `faq:what-is-sandbagging-in-ai-safety`: What is sandbagging in AI safety? — Sandbagging is when an AI model intentionally underperforms during safety evaluations — strategically scoring lower than its true capability so…
- Entry text that mentions the affected entries: `entry:ca-sb53:cov:thresh`, `entry:gpai-cop:desc`, `entry:fmf:desc`, `entry:fmf:cov:eval`, `entry:prep:cov:thresh`, `entry:fsf:context`, `entry:fsf:cov:thresh`, `entry:fsf:cov:timing`, `entry:fsf:cov:sec`, `entry:fsf:cov:halt`, `entry:fsf:cov:acct`, `entry:fsf:cov:update`, `entry:meta-faif:cov:thresh`, `entry:meta-faif:cov:sec`, `entry:metr:context`, `entry:metr:cov:eval`, `entry:apollo:cov:elicit`

---

### P-0006 v1 — Anthropic RSP · Updating policies: revision history and change-log commitment

`change` · confidence: high · change-hash `abad9e4a9415` · decision: **accepted** (v1, 2026-10-09)

**Change**

- **`rsp` · coverage · update**

  Current:

  > RSP updated ~4× since 2023, formalising new evaluations, refining ASL definitions, and incorporating external evaluator findings. The update cadence itself is part of the published commitment.

  Proposed:

  > Revised eight times since v1.0 (Sep 2023), most recently v3.4 (Jul 2026); v3.0 (Feb 2026) was a comprehensive rewrite, and later updates revised capability thresholds (v3.3, v3.4) and LTBT oversight (v3.2). Anthropic commits to logging every change on the policy page and in a changelog in the policy document.

**Why it matters:** Same stale count as the description; the note also asserted things about updates that aren't supported by what was checked ('incorporating external evaluator findings').

**Reasoning:** Rewritten only from the policy page's update log. The commitment is stated as a commitment.

**Evidence**

- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-08 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Current and Prior Versions:
  > Version 3.4 and redline (effective July 8, 2026) · Version 3.3 (effective May 26, 2026) · Version 3.2 (effective April 29, 2026) · Version 3.1 (effective April 2, 2026) · Version 3.0 (effective February 24, 2026) · Version 2.2 (effective May 14, 2025) · Version 2.1 (effective March 31, 2025) · Version 2.0 (effective October 15, 2024) · Version 1.0 (effective September 19, 2023)
  _Supports:_ Versions and dates
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-08 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Update log, February 24, 2026 / April 2, 2026:
  > Version 3.0 is a comprehensive rewrite of the RSP. … [changes] will be logged both on this page and in a changelog in the policy document itself.
  _Supports:_ Rewrite; change-log commitment
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-08 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Update log, April 29, 2026:
  > Version 3.2 of our RSP authorizes the LTBT to request external review of Risk Reports, gives the LTBT the power to approve our selection of external reviewers, and formalizes a requirement that we provide the LTBT with regular briefings.
  _Supports:_ v3.2 LTBT changes

**Uncertainty:** Removes the clause 'incorporating external evaluator findings'. That clause may still be true; I only lacked evidence for it. Say if you prefer to keep it.

**May need reconsideration if accepted**

- `edge:ca-sb53|rsp`: SB 53 codifies the published-framework norm Anthropic exemplified
- `edge:seoul-commit|rsp`: Seoul commitments triggered RSP's first public version
- `edge:gpai-cop|rsp`: Anthropic signed all three chapters
- `edge:fmf|rsp`: Anthropic is an FMF founding member
- `edge:metr|rsp`: METR conducts capability evaluations for Anthropic
- `edge:apollo|rsp`: Apollo evaluates Anthropic models for scheming
- `edge:uk-aisi|rsp`: UK AISI tested Anthropic models pre-deployment
- `gap:mit`: The most-covered category, and the most ambiguous — Almost every binding regulation covers deployment mitigations in some form — content marking, refusals, monitoring, anti-discri…
- `faq:which-ai-labs-have-published-frontier-safety-fra`: Which AI labs have published frontier safety frameworks? — Five major labs have published frontier safety frameworks at Layer 6 of this map: Anthropic (Responsible Scaling Policy,…
- `faq:what-is-sandbagging-in-ai-safety`: What is sandbagging in AI safety? — Sandbagging is when an AI model intentionally underperforms during safety evaluations — strategically scoring lower than its true capability so…
- Entry text that mentions the affected entries: `entry:ca-sb53:cov:thresh`, `entry:gpai-cop:desc`, `entry:fmf:desc`, `entry:fmf:cov:eval`, `entry:prep:cov:thresh`, `entry:fsf:context`, `entry:fsf:cov:thresh`, `entry:fsf:cov:timing`, `entry:fsf:cov:sec`, `entry:fsf:cov:halt`, `entry:fsf:cov:acct`, `entry:fsf:cov:update`, `entry:meta-faif:cov:thresh`, `entry:meta-faif:cov:sec`, `entry:metr:context`, `entry:metr:cov:eval`, `entry:apollo:cov:elicit`

---

### P-0007 v1 — Anthropic RSP · Accountability: Risk Reports, external review, LTBT powers

`change` · confidence: high · change-hash `43032f62a608` · decision: **accepted** (v1, 2026-10-09)

**Change**

- **`rsp` · coverage · acct**

  Current:

  > Board oversight (Long-Term Benefit Trust); public publication of the framework, evaluation results, and any escalations. Subjected to external scrutiny in EU GPAI Code drafting and California SB 53.

  Proposed:

  > Board oversight (Long-Term Benefit Trust); public publication of the framework, evaluation results, and any escalations. Since v3.0 (Feb 2026) Anthropic commits to publishing redacted Risk Reports every 3–6 months (published Feb and Aug 2026), with external review in certain circumstances; v3.2 (Apr 2026) lets the LTBT request external review and approve the choice of reviewers. Subjected to external scrutiny in EU GPAI Code drafting and California SB 53.

**Why it matters:** These are the main accountability mechanisms added in 2026, and the map omits them.

**Reasoning:** Commitment (reports every 3–6 months; external review in certain circumstances) is kept separate from implementation evidence (two redacted reports published, Feb and Aug 2026). Anthropic said in Feb 2026 that external review was not yet required and was being piloted.

**Evidence**

- **S-0007** https://www.anthropic.com/news/responsible-scaling-policy-v3 — <https://www.anthropic.com/news/responsible-scaling-policy-v3>
  primary · retrieved 2026-10-08 · access: ok · published 2026-02-24
  3. Risk Reports and external review:
  > Risk Reports will be published online (with some redactions) every 3-6 months. The new RSP also requires external review of Risk Reports in certain circumstances. … Although our current models do not yet require external review, we are already running pilots
  _Supports:_ Risk Report cadence and external-review requirement
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-08 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Risk Reports:
  > Redacted Risk Report August 2026 · Redacted Risk Report February 2026
  _Supports:_ Two published Risk Reports
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-08 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Update log, April 29, 2026:
  > Version 3.2 of our RSP authorizes the LTBT to request external review of Risk Reports, gives the LTBT the power to approve our selection of external reviewers, and formalizes a requirement that we provide the LTBT with regular briefings.
  _Supports:_ v3.2 LTBT powers

**Uncertainty:** The 'certain circumstances' that trigger external review are defined in the policy text, which was blocked. The existing first sentence was not re-verified.

**May need reconsideration if accepted**

- `edge:ca-sb53|rsp`: SB 53 codifies the published-framework norm Anthropic exemplified
- `edge:seoul-commit|rsp`: Seoul commitments triggered RSP's first public version
- `edge:gpai-cop|rsp`: Anthropic signed all three chapters
- `edge:fmf|rsp`: Anthropic is an FMF founding member
- `edge:metr|rsp`: METR conducts capability evaluations for Anthropic
- `edge:apollo|rsp`: Apollo evaluates Anthropic models for scheming
- `edge:uk-aisi|rsp`: UK AISI tested Anthropic models pre-deployment
- `gap:mit`: The most-covered category, and the most ambiguous — Almost every binding regulation covers deployment mitigations in some form — content marking, refusals, monitoring, anti-discri…
- `faq:which-ai-labs-have-published-frontier-safety-fra`: Which AI labs have published frontier safety frameworks? — Five major labs have published frontier safety frameworks at Layer 6 of this map: Anthropic (Responsible Scaling Policy,…
- `faq:what-is-sandbagging-in-ai-safety`: What is sandbagging in AI safety? — Sandbagging is when an AI model intentionally underperforms during safety evaluations — strategically scoring lower than its true capability so…
- Entry text that mentions the affected entries: `entry:ca-sb53:cov:thresh`, `entry:gpai-cop:desc`, `entry:fmf:desc`, `entry:fmf:cov:eval`, `entry:prep:cov:thresh`, `entry:fsf:context`, `entry:fsf:cov:thresh`, `entry:fsf:cov:timing`, `entry:fsf:cov:sec`, `entry:fsf:cov:halt`, `entry:fsf:cov:acct`, `entry:fsf:cov:update`, `entry:meta-faif:cov:thresh`, `entry:meta-faif:cov:sec`, `entry:metr:context`, `entry:metr:cov:eval`, `entry:apollo:cov:elicit`

---

### P-0008 v1 — Connection Seoul commitments ↔ Anthropic RSP: fix chronology

`change` · confidence: high · change-hash `7990ce2259ba` · decision: **accepted** (v1, 2026-10-09)

**Change**

- **connection `seoul-commit` ↔ `rsp`**

  Current:

  > Seoul commitments triggered RSP's first public version

  Proposed:

  > RSP's first version (Sep 2023) predates the Seoul commitments, which asked signatories to publish comparable frameworks

**Why it matters:** The connection asserts a causal sequence that is backwards: RSP v1.0 took effect 19 Sep 2023, and the Seoul summit was May 2024.

**Reasoning:** The date comes from Anthropic's version list. The second clause restates what the map already says about Seoul (ai-summits coverage note).

**Evidence**

- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-08 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Current and Prior Versions:
  > Version 3.4 and redline (effective July 8, 2026) · Version 3.3 (effective May 26, 2026) · Version 3.2 (effective April 29, 2026) · Version 3.1 (effective April 2, 2026) · Version 3.0 (effective February 24, 2026) · Version 2.2 (effective May 14, 2025) · Version 2.1 (effective March 31, 2025) · Version 2.0 (effective October 15, 2024) · Version 1.0 (effective September 19, 2023)
  _Supports:_ v1.0 effective 19 Sep 2023

**Uncertainty:** The Seoul half was not re-verified this run (gov.uk blocked). The same chronology problem probably affects 'Seoul commitments triggered the Preparedness Framework' (OpenAI) and possibly the DeepMind connection. Those are outside this trial and are queued for the baseline audit.

**May need reconsideration if accepted**

- `edge:ai-summits|seoul-commit`: Seoul commitments came out of the 2024 summit
- `edge:seoul-commit|prep` — **likely same chronology error — check in baseline**: Seoul commitments triggered the Preparedness Framework
- `edge:seoul-commit|fsf` — **check chronology in baseline**: Seoul commitments triggered the Frontier Safety Framework
- `edge:seoul-commit|meta-faif`: Meta's framework followed Seoul (delayed)
- `edge:seoul-commit|xai-rmf`: xAI's framework followed Seoul (delayed, thinner)
- `gap:halt`: Few mechanisms can compel a frontier developer to halt — Conditions for halting are the rarest column in the matrix. The EU AI Office can order recall (Aug 2026 onwards). The GPAI…
- `edge:ca-sb53|rsp`: SB 53 codifies the published-framework norm Anthropic exemplified
- `edge:gpai-cop|rsp`: Anthropic signed all three chapters
- `edge:fmf|rsp`: Anthropic is an FMF founding member
- `edge:metr|rsp`: METR conducts capability evaluations for Anthropic
- `edge:apollo|rsp`: Apollo evaluates Anthropic models for scheming
- `edge:uk-aisi|rsp`: UK AISI tested Anthropic models pre-deployment
- `gap:mit`: The most-covered category, and the most ambiguous — Almost every binding regulation covers deployment mitigations in some form — content marking, refusals, monitoring, anti-discri…
- `faq:which-ai-labs-have-published-frontier-safety-fra`: Which AI labs have published frontier safety frameworks? — Five major labs have published frontier safety frameworks at Layer 6 of this map: Anthropic (Responsible Scaling Policy,…
- `faq:what-is-sandbagging-in-ai-safety`: What is sandbagging in AI safety? — Sandbagging is when an AI model intentionally underperforms during safety evaluations — strategically scoring lower than its true capability so…
- Entry text that mentions the affected entries: `entry:ai-summits:desc`, `entry:ai-summits:context`, `entry:ai-summits:cov:thresh`, `entry:ai-summits:cov:update`, `entry:hiroshima:context`, `entry:hiroshima:cov:eval`, `entry:delhi-commit:desc`, `entry:delhi-commit:context`, `entry:delhi-commit:cov:acct`, `entry:ca-sb53:cov:thresh`, `entry:gpai-cop:desc`, `entry:fmf:desc`, `entry:fmf:cov:eval`, `entry:prep:cov:thresh`, `entry:fsf:context`, `entry:fsf:cov:thresh`, `entry:fsf:cov:timing`, `entry:fsf:cov:sec`, `entry:fsf:cov:halt`, `entry:fsf:cov:acct`, `entry:fsf:cov:update`, `entry:meta-faif:cov:thresh`, `entry:meta-faif:cov:sec`, `entry:metr:context`, `entry:metr:cov:eval`, `entry:apollo:cov:elicit`

---

### P-0009 v1 — New connection NY RAISE ↔ Anthropic RSP (Frontier Compliance Framework)

`change` · confidence: medium · change-hash `992a91c1e8d9` · decision: **accepted** (v1, 2026-10-09)

**Change**

- **new connection `ny-raise` ↔ `rsp`**

  Current:

  > _(absent)_

  Proposed:

  > RAISE requires a published safety framework; Anthropic says its Frontier Compliance Framework addresses it

**Why it matters:** The map connects SB 53 and the EU Code to the RSP but not RAISE, although Anthropic names all three as requirements it addresses. Found in Layer 6 discovery.

**Reasoning:** Anthropic's own statement about its compliance documentation. The wording attributes the claim to Anthropic.

**Evidence**

- **S-0007** https://www.anthropic.com/news/responsible-scaling-policy-v3 — <https://www.anthropic.com/news/responsible-scaling-policy-v3>
  primary · retrieved 2026-10-08 · access: ok · published 2026-02-24
  Assessing our theory of change:
  > governments … (for example in California with SB 53, in New York with the RAISE Act, and with the EU AI Act's Codes of Practice) start to require frontier AI developers to create and publish frameworks … requirements Anthropic addresses through public documentation including its Frontier Compliance Framework.
  _Supports:_ Anthropic lists SB 53, RAISE and the EU Codes of Practice as requirements it addresses via its Frontier Compliance Framework

**Uncertainty:** The Frontier Compliance Framework itself (trust.anthropic.com) was blocked, so this rests on Anthropic's description. RAISE's effective date (map: 1 Jan 2027) was not re-verified.

**May need reconsideration if accepted**

- `edge:us-preempt|ny-raise`: Preemption EO targets RAISE Act
- `edge:ny-raise|ca-sb53`: RAISE Act amendments aligned thresholds with SB 53
- `edge:co-doi|ny-raise`: Colorado DOI precedent informed NY RAISE's DFS office model
- `gap:timing`: Pre-deployment is widely required; post-deployment is sparse — Pre-deployment timing is the easy part: the EU AI Act, China's GenAI Measures, Korea's Framework Act, and the lab fr…
- `gap:acct`: The well-populated column — but not all accountability is equal — Most mechanisms claim accountability of some kind, from binding incident reporting (SB 53, RAISE Act, EU AI Act) …
- `faq:which-ai-laws-are-binding-with-penalties`: Which AI laws are binding with penalties? — Eight binding instruments in this map carry penalty regimes: the EU AI Act (up to €35M or 7% of global revenue), China's GenAI Measures…
- `faq:how-is-california-sb-53-different-from-the-ny-ra`: How is California SB 53 different from the NY RAISE Act? — Both target large frontier developers (>10²⁶ FLOPs, >$500M revenue) and require published safety frameworks. California …
- `text:footer-sources`: Sources: International AI Safety Report (Feb 2026), METR Common Elements of Frontier AI Safety Policies (Dec 2025), Brundage Substack, EU AI Act and AI Office documentation, Calif…
- `text:gap-default`: Mandatory third-party auditing, compute KYC, statutory incident reporting beyond California and (from 2027) New York, liability rules for harmful outputs, and international verifi…
- `edge:ca-sb53|rsp`: SB 53 codifies the published-framework norm Anthropic exemplified
- `edge:seoul-commit|rsp`: Seoul commitments triggered RSP's first public version
- `edge:gpai-cop|rsp`: Anthropic signed all three chapters
- `edge:fmf|rsp`: Anthropic is an FMF founding member
- `edge:metr|rsp`: METR conducts capability evaluations for Anthropic
- `edge:apollo|rsp`: Apollo evaluates Anthropic models for scheming
- `edge:uk-aisi|rsp`: UK AISI tested Anthropic models pre-deployment
- `gap:mit`: The most-covered category, and the most ambiguous — Almost every binding regulation covers deployment mitigations in some form — content marking, refusals, monitoring, anti-discri…
- `faq:which-ai-labs-have-published-frontier-safety-fra`: Which AI labs have published frontier safety frameworks? — Five major labs have published frontier safety frameworks at Layer 6 of this map: Anthropic (Responsible Scaling Policy,…
- `faq:what-is-sandbagging-in-ai-safety`: What is sandbagging in AI safety? — Sandbagging is when an AI model intentionally underperforms during safety evaluations — strategically scoring lower than its true capability so…
- Entry text that mentions the affected entries: `entry:eu-aia:cov:thresh`, `entry:kr-ai:cov:thresh`, `entry:seoul-commit:context`, `entry:co-doi:context`, `entry:ca-sb53:cov:thresh`, `entry:gpai-cop:desc`, `entry:fmf:desc`, `entry:fmf:cov:eval`, `entry:prep:cov:thresh`, `entry:fsf:context`, `entry:fsf:cov:thresh`, `entry:fsf:cov:timing`, `entry:fsf:cov:sec`, `entry:fsf:cov:halt`, `entry:fsf:cov:acct`, `entry:fsf:cov:update`, `entry:meta-faif:cov:thresh`, `entry:meta-faif:cov:sec`, `entry:metr:context`, `entry:metr:cov:eval`, `entry:apollo:cov:elicit`


## Appendix A — checked, no material change

- `entry:rsp`
  Link resolves (HTTP 200) and is still the policy's home page; still described by Anthropic as 'the voluntary framework' (pow 1); active; Layer 6 / co unchanged. — sources: S-0005 <https://www.anthropic.com/responsible-scaling-policy>; S-0007 <https://www.anthropic.com/news/responsible-scaling-policy-v3>
- `edge:ca-sb53|rsp`
  Anthropic states SB 53 requires published frameworks and that it addresses them via its Frontier Compliance Framework (S-0007#4); consistent with the connection. — sources: S-0007 <https://www.anthropic.com/news/responsible-scaling-policy-v3>
- `derived:generated`, `derived:dates`
  check.js: llms.txt, llms-full.txt and data.json are identical to a fresh build; all 11 content-date sites agree (2026-06-06). — sources: S-0027 <https://github.com/buildwithwhy/ai-governance-map/tree/f9d3e56>
- `text:layer-2:tooltip`, `faq:what-is-the-difference-between-layer-2-and-layer`
  Internally consistent with the layer rule (RUBRIC §2); their external facts were not checked. — sources: S-0027 <https://github.com/buildwithwhy/ai-governance-map/tree/f9d3e56>

## Appendix B — not checked in this run

Entries (44): `aisr`, `aisi-net`, `ai-summits`, `oecd`, `coe-ai`, `unesco`, `us-eo14179`, `us-action`, `us-preempt`, `cn-genai`, `uk-bill`, `kr-ai`, `jp-ai`, `ca-sb53`, `co-aia`, `ny-raise`, `tx-raiga`, `seoul-commit`, `hiroshima`, `fmf`, `delhi-commit`, `pai`, `prep`, `fsf`, `meta-faif`, `xai-rmf`, `eu-aio`, `uk-aisi`, `caisi`, `other-aisis`, `metr`, `apollo`, `averi`, `cais`, `fsi`, `uk-ofcom`, `uk-ico`, `us-ftc`, `au-esafety`, `co-doi`, `imda`, `jp-sectors`, `bis`, `nist-rmf`

Other inventory items not checked (118): connections, gap summaries, FAQ answers, page text and category definitions not listed above.

## Appendix C — sources used

- S-0001  <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai> — primary · blocked 2026-10-08
- S-0002  <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng> — primary · blocked 2026-10-08
- S-0017 Lewis Silkin: Digital Omnibus on AI enters into force <https://www.lewissilkin.com/insights/2026/07/27/the-digital-omnibus-on-ai-enters-into-force-today-102nedo> — secondary · search_result_only 2026-10-08
- S-0018 Addleshaw Goddard: AI Omnibus formally adopted <https://www.addleshawgoddard.com/en/insights/insights-briefings/2026/technology/eu-ai-act-ai-omnibus-formally-adopted/> — secondary · search_result_only 2026-10-08
- S-0019 Gibson Dunn: EU AI Act Omnibus agreement <https://www.gibsondunn.com/eu-ai-act-omnibus-agreement> — secondary · search_result_only 2026-10-08
- S-0003  <https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai> — primary · blocked 2026-10-08
- S-0026 CASRAI: GPAI Code of Practice guide <https://casrai.org/guides/eu-ai-act-gpai-code-of-practice> — secondary · search_result_only 2026-10-08
- S-0004  <https://www.npr.org/2026/06/02/nx-s1-5844347/ai-safety-trump-executive-order> — secondary · blocked 2026-10-08
- S-0012  <https://www.govinfo.gov/content/pkg/DCPD-202600376/html/DCPD-202600376.htm> — primary · blocked 2026-10-08
- S-0020 Latham & Watkins: EO establishing AI cybersecurity and frontier model framework <https://www.lw.com/en/insights/2026/06/president-trump-signs-executive-order-establishing-ai-cybersecurity-and-frontier-model-framework> — secondary · search_result_only 2026-10-08
- S-0021 Cooley: AI EO creates voluntary framework for frontier models <https://finsights.cooley.com/ai-executive-order-creates-voluntary-framework-for-frontier-models-advances-critical-infrastructure-cybersecurity/> — secondary · search_result_only 2026-10-08
- S-0022 AI Weekly: White House tells CAISI to halt public AI model reports <https://aiweekly.co/alerts/white-house-tells-caisi-to-halt-public-ai-model-reports> — secondary · search_result_only 2026-10-08
- S-0016  <https://www.whitehouse.gov/presidential-actions/> — primary · blocked 2026-10-08
- S-0014  <http://www.npc.gov.cn/> — primary · http_403 2026-10-08
- S-0015  <https://www.gov.cn/> — primary · blocked 2026-10-08
- S-0023 China IP Law Update: State Council 2026 Legislative Work Plan <https://www.chinaiplawupdate.com/?p=4093> — secondary · search_result_only 2026-10-08
- S-0024 Akin Gump: China's legislative plan for AI law <https://www.akingump.com/en/insights/ai-law-and-regulation-tracker/China's-Legislative-Plan-for-AI-Law> — secondary · search_result_only 2026-10-08
- S-0025 Caixin: China amends Cybersecurity Law to add first AI clause <https://www.caixinglobal.com/2025-10-29/china-amends-cybersecurity-law-to-add-first-ever-ai-clause-102376988.html> — secondary · search_result_only 2026-10-08
- S-0005  <https://www.anthropic.com/responsible-scaling-policy> — primary · ok 2026-10-08 · sha256:6ee2872c0a4b0ba2
- S-0007  <https://www.anthropic.com/news/responsible-scaling-policy-v3> — primary · ok 2026-10-08 · sha256:6ac980f3969230aa
- S-0011 Anthropic Transparency Hub <https://www.anthropic.com/transparency> — primary · ok 2026-10-08 · sha256:e1099cac8ad23939
- S-0006  <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf> — primary · blocked 2026-10-08
- S-0008 Responsible Scaling Policy v3.0 (HTML) <https://www.anthropic.com/responsible-scaling-policy/rsp-v3-0> — primary · blocked 2026-10-08
- S-0027 Map repository at f9d3e56 (index.html, build-llms.js, data.json) <https://github.com/buildwithwhy/ai-governance-map/tree/f9d3e56> — repo · ok 2026-10-08
