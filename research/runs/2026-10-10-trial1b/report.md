# Review report — Trial 1 completion — source access retest; RSP, RAISE, EU AI Act, GPAI Code, Frontier AI EO, China AI Law

> **PARTIAL RUN.** 6 of 50 entries attempted. This is not a baseline audit; everything else is *not checked*.

## Summary

- **Source access is fixed.** The new environment reaches the RSP PDF, EUR-Lex, the Commission, gov.uk, govinfo, whitehouse.gov, npc.gov.cn and gov.cn, with no environment denials. Some websites still refuse automated clients (Cloudflare on nysenate.gov, congress.gov, leginfo, federalregister.gov HTML, commerce.gov; EUR-Lex throttling; intermittent resets on some Chinese sites). Each source record says which other official copy was used and how it was obtained.
- **Applied after your decisions on 2026-10-10** (manifest applied/2026-10-10-2.json; the guard reproduces the published diff): the RSP v3 rewrite (P-0005 v3, P-0006, P-0007, P-0010 v3, P-0013), the RAISE ↔ RSP connection (P-0009 v3), EO 14409 (P-0014; CAISI connection removed, P-0015), the EU AI Act dates, AI Office fine cap and GPAI Code fixes (P-0016–P-0018), the China AI Law status (P-0019), and the 'Content updated' date wording (P-0012). These come on top of P-0001, P-0003, P-0004 and P-0008, applied earlier.
- **All trial-1 decisions are now made and applied.** P-0002 v2 (FAQ 'binding laws'), P-0011 v2 (other-aisis → Multilateral, kept in Layer 4 like UK AISI) and P-0020 (new entry: EU AI-generated content code) were accepted and applied on 2026-10-10 (manifest applied/2026-10-10-3.json). From now on, decisions can be answered on this page.
- **Coverage is still small:** 6 entries were attempted in this completion run. The whole-map coverage figure is computed live from the ledger (see below); the public date (10 Oct 2026) marks this release, not an audit. The baseline audit remains the next milestone.

| | |
|---|---|
| Attempted | 66 items across 6 entries |
| Verified against external sources | 50 (change supported: 33, no material change: 17) |
| Internal consistency checks passed or fixed | 0 (the map checked against itself, not against outside sources) |
| Not verified | 16 (source inaccessible: 0, unresolved: 16) |
| Sources | 26 used, 0 not retrieved |
| Proposals | ready for your decision: 0 · research/access required: 0 · accepted, awaiting application: 0 · applied: 20 · closed/deferred: 0 |
| Whole map | 49 of 520 inventory items have ever been verified against external sources. The map's public content date (2026-10-10) marks the latest applied release, not a full audit. |
| Run | `2026-10-10-trial1b` · 2026-10-10T16:29:13Z → 2026-10-10T16:53:01Z (24 min) · usage/cost: Not measured: get_session does not report cost in this environment. Wall-clock about 1 h 15 min in one session, including three research subagents (≈405k subagent tokens in total). |

## A. Ready for your decision

_Nothing ready for a decision._

## B. Further research or source access required

_No editorial decision is needed for these until the evidence is in._

_No proposals are waiting on evidence._

Checked items that did not verify in this run: 16 unresolved, 0 source inaccessible. Each is listed in §2 with exactly what is missing; most are queued for the baseline audit.

## C. Accepted and awaiting application

_None._

## D. Applied

| ID | Ver | Applied | Manifest | Proposal |
|---|---|---|---|---|
| P-0001 | v1 | 2026-10-10 | 2026-10-10.json | Derive the data.json description count instead of hardcoding "39" |
| P-0002 | v2 | 2026-10-10 | 2026-10-10-3.json | FAQ: align 'binding laws' with the map's own classifications (internal consistency only) |
| P-0003 | v2 | 2026-10-10 | 2026-10-10.json | Relabel jurisdiction code `as` from 'Asia (other)' to 'Asia-Pacific (other)' |
| P-0004 | v1 | 2026-10-10 | 2026-10-10.json | Layer 2 subtitle: 'agencies' → 'framework acts' |
| P-0005 | v3 | 2026-10-10 | 2026-10-10-2.json | Anthropic RSP: current version v3.4 (Jul 2026) and how v3 is structured |
| P-0006 | v1 | 2026-10-10 | 2026-10-10-2.json | Anthropic RSP · Updating policies: revision history and change-log commitment |
| P-0007 | v1 | 2026-10-10 | 2026-10-10-2.json | Anthropic RSP · Accountability: Risk Reports, external review, LTBT powers |
| P-0008 | v2 | 2026-10-10 | 2026-10-10.json | Connection Seoul commitments ↔ Anthropic RSP: fix chronology |
| P-0009 | v3 | 2026-10-10 | 2026-10-10-2.json | New connection NY RAISE ↔ Anthropic RSP: RAISE's framework requirement and Anthropic's separate compliance framework |
| P-0010 | v3 | 2026-10-10 | 2026-10-10-2.json | Anthropic RSP: describe the v3 structure (thresholds, ASLs, safeguards, evaluations, timing) and the separate compliance framework |
| P-0011 | v2 | 2026-10-10 | 2026-10-10-3.json | Classify `other-aisis` as Multilateral, kept in Layer 4 like UK AISI |
| P-0012 | v1 | 2026-10-10 | 2026-10-10-2.json | Make the public date say 'content updated', not imply a full audit |
| P-0013 | v1 | 2026-10-10 | 2026-10-10-2.json | Anthropic RSP · Halting: v3 replaced the unconditional pause commitment with competitor-dependent delay commitments |
| P-0014 | v1 | 2026-10-10 | 2026-10-10-2.json | US Frontier AI Access EO: describe EO 14409 from its official text (voluntary cyber-capability access; NSA, Treasury and CISA lead, not CAISI) |
| P-0015 | v1 | 2026-10-10 | 2026-10-10-2.json | Remove connection US Frontier AI Access EO ↔ CAISI: the order does not name CAISI |
| P-0016 | v1 | 2026-10-10 | 2026-10-10-2.json | EU AI Act: high-risk application dates moved by the Digital Omnibus (Reg. 2026/1744) |
| P-0017 | v1 | 2026-10-10 | 2026-10-10-2.json | EU AI Office: GPAI fines are capped at €15M or 3%, not €35M or 7%; enforcement powers apply since Aug 2026 |
| P-0018 | v1 | 2026-10-10 | 2026-10-10-2.json | EU GPAI Code: Model Reports every six months, not annual; content marking is not in the GPAI Code |
| P-0019 | v1 | 2026-10-10 | 2026-10-10-2.json | China AI Law: still a preparatory planning item with no draft; correct the '2025 plan dropped it' claim and add an official source link |
| P-0020 | v1 | 2026-10-10 | 2026-10-10-3.json | New entry: EU Code of Practice on Transparency of AI-generated Content (Article 50 marking and labelling) |

## 1. Proposal details

### Applied

### P-0001 v1 — Derive the data.json description count instead of hardcoding "39"

`change` · evidence: **Internal consistency only (the map checked against itself)** · decision: **accepted** (v1, 2026-10-09) · confidence: high · change-hash `107760cab70a`

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
  repo · retrieved 2026-10-08 · access: ok via repo
  build-llms.js line 150:
  > description: 'Interactive map of frontier AI governance: 39 mechanisms across six layers, …' — while ENTITIES has 49 entries; data.json therefore says 39.
  _Supports:_ The hardcoded value and the actual count

**Uncertainty:** None on the fact. The only visible effect is the data.json description string.

---

### P-0002 v2 — FAQ: align 'binding laws' with the map's own classifications (internal consistency only)

`change` · evidence: **Internal consistency only (the map checked against itself)** · decision: **accepted** (v2, 2026-10-10) · confidence: medium · change-hash `e33b70d35be3`

_Revised from v1: wording changed, so it needs a fresh decision._

**Change**

- **`index.html`**

  Current:

  > Eight binding instruments in this map carry penalty regimes: the EU AI Act (up to €35M or 7% of global revenue), China's GenAI Measures, Korea's AI Basic Act (~$21k per violation), California SB 53 (up to $1M per violation), the Colorado AI Act, the NY RAISE Act ($1M/$3M), Texas TRAIGA, and US BIS export controls. Most are phasing in; several face active federal preemption challenges in the United States.

  Proposed:

  > Five AI laws in this map are classed as binding with penalties: the EU AI Act (up to €35M or 7% of global revenue), China's GenAI Measures, Korea's AI Basic Act (~$21k per violation), California SB 53 (up to $1M per violation) and the NY RAISE Act ($1M/$3M). Most are phasing in; several face active federal preemption challenges in the United States. The map's wider count of mechanisms that are binding with penalties also includes US BIS export controls and five regulators: the EU AI Office, UK Ofcom, the UK ICO, Australia's eSafety Commissioner and the Colorado Division of Insurance. The map classes the Colorado AI Act and Texas TRAIGA as hard law with weak enforcement, so they are not counted here.

**Why it matters:** The FAQ says eight binding instruments and names Colorado and Texas, while the map classes both as pow 3 and its stats tile counts 11 pow-4 mechanisms. Search engines and LLMs ingest this FAQ.

**Reasoning:** Narrowed from v1. The edit now only aligns the FAQ's list and count with the map's own enforceability classifications and stats tile. It no longer characterises any statute: v1 called Colorado and Texas 'binding statutes' and described the regulators as 'enforcing binding law', both legal claims I had not verified. The penalty figures, 'Most are phasing in' and the preemption sentence are carried over word for word from the current FAQ.

**Evidence**

- **S-0027** Map repository at f9d3e56 (index.html, build-llms.js, data.json) — <https://github.com/buildwithwhy/ai-governance-map/tree/f9d3e56>
  repo · retrieved 2026-10-08 · access: ok via repo
  index.html FAQ JSON-LD vs stats block:
  > FAQ: 'Eight binding instruments in this map carry penalty regimes: … the Colorado AI Act, … Texas TRAIGA, and US BIS export controls.' Stats tile: 11 'binding with penalties' (= entries with pow 4). co-aia and tx-raiga have pow 3; pow-4 entries also include eu-aio, uk-ofcom, uk-ico, au-esafety, co-doi.
  _Supports:_ The FAQ list versus the pow values and stats tile

**Carried over unchanged, not re-verified:** Penalty figures (EU €35M/7%, Korea ~$21k, California $1M, New York $1M/$3M); 'Most are phasing in' (consistent with the map's status fields, not externally checked); 'several face active federal preemption challenges'

**Uncertainty:** This is an internal consistency fix. It does not verify the legal status, enforcement or penalties of any law named. Those need the official texts and are queued for the baseline audit. If the baseline finds Colorado or Texas should be pow 4, both the classification and this answer would change.

_Decision history:_ accepted v1 2026-10-09 (Maintainer in conversation, 2026-10-09: 'I accept all the areas you verified'); pending 2026-10-09 (v2: wording changed — needs renewed approval)

---

### P-0003 v2 — Relabel jurisdiction code `as` from 'Asia (other)' to 'Asia-Pacific (other)'

`change` · evidence: **Internal consistency only (the map checked against itself)** · decision: **accepted** (v2, 2026-10-09) · confidence: high · change-hash `d6753348364d`

_Revised from v1: same change wording, so an existing approval carries over._

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

**Why it matters:** Australia's eSafety Commissioner is coloured and described as 'Asia (other)'. That label also appears in llms-full.txt and data.json for every `as` entry.

**Reasoning:** A label-only change. The code `as`, its colour, the lens and all filtering behaviour stay as they are, and no entry moves.

**Evidence**

- **S-0027** Map repository at f9d3e56 (index.html, build-llms.js, data.json) — <https://github.com/buildwithwhy/ai-governance-map/tree/f9d3e56>
  repo · retrieved 2026-10-08 · access: ok via repo
  index.html JUR_LABEL / au-esafety / other-aisis:
  > JUR_LABEL as: 'Asia (other)'. au-esafety (Australia eSafety Commissioner) has jur 'as'. other-aisis (desc: 'Singapore …, Japan …, France (INESIA), Korea, Canada, Australia, Kenya, India') has jur 'as'.
  _Supports:_ au-esafety and other-aisis use `as`

**Uncertainty:** None on the facts. This proposal changes only the label. It does not decide how `other-aisis` (a multi-country entry including France, Canada and Kenya) should be classified; that question is tracked separately as P-0011.

---

### P-0004 v1 — Layer 2 subtitle: 'agencies' → 'framework acts'

`change` · evidence: **Internal consistency only (the map checked against itself)** · decision: **accepted** (v1, 2026-10-09) · confidence: high · change-hash `a3579e1ac559`

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
  repo · retrieved 2026-10-08 · access: ok via repo
  index.html Layer 2 band vs tooltip and FAQ:
  > Subtitle: 'Statutes, executive orders, agencies'. Tooltip: 'The laws themselves — statutes, executive orders, framework acts. The institutions that implement and enforce them sit in Layer 4.' No Layer 2 entry is an agency.
  _Supports:_ Subtitle vs tooltip; no Layer 2 entry is an agency

**Uncertainty:** None.

---

### P-0005 v3 — Anthropic RSP: current version v3.4 (Jul 2026) and how v3 is structured

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v3, 2026-10-10) · confidence: high · change-hash `d15839389f3d`

_Revised from v2: wording changed, so it needs a fresh decision._

**Linked:** P-0010, P-0013, P-0009

**Applied together with:** P-0006, P-0007, P-0010, P-0013

**Change**

- **`rsp` · desc**

  Current:

  > Responsible Scaling Policy (v3.0, Feb 2026). AI Safety Levels. Capability thresholds trigger required safeguards. Updated ~4× since 2023.

  Proposed:

  > Responsible Scaling Policy (v3.4, effective Jul 2026; rewritten as v3.0 in Feb 2026). Maps capability thresholds to Anthropic's planned safeguards and to recommended industry-wide safeguards. Revised 8× since v1.0 (Sep 2023).

**Why it matters:** The map names v3.0 (Feb 2026), but v3.1–v3.4 followed; v3.4 took effect 8 Jul 2026. It also says '~4×' where the version history shows eight revisions. And the retained phrases 'AI Safety Levels. Capability thresholds trigger required safeguards.' describe the pre-v3 policy.

**Reasoning:** Revised from v2 now that the v3.4 policy text could be read. Only the middle sentence changed. v2 kept 'AI Safety Levels. Capability thresholds trigger required safeguards.' unverified. The v3.4 text shows that ASLs now only label the safeguards kept for current models (Appendix B). Its thresholds table maps each threshold to Anthropic's planned mitigations and to industry-wide recommendations, which Anthropic says it cannot commit to follow unilaterally (§1). The version, date and revision count are unchanged from v2, which you accepted.

**Evidence**

- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-10 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Current and Prior Versions:
  > Version 3.4 and redline (effective July 8, 2026) · Version 3.3 (effective May 26, 2026) · Version 3.2 (effective April 29, 2026) · Version 3.1 (effective April 2, 2026) · Version 3.0 (effective February 24, 2026) · Version 2.2 (effective May 14, 2025) · Version 2.1 (effective March 31, 2025) · Version 2.0 (effective October 15, 2024) · Version 1.0 (effective September 19, 2023)
  _Supports:_ Version list and effective dates (v3.4 effective 8 Jul 2026; v1.0 19 Sep 2023)
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Changelog, v3.1–v3.4:
  > [v3.1] (1) how we operationalize the Automated R&D capability threshold … (3) that we may consider pausing development or deployment even where the commitments described in Appendix A are not triggered. [v3.3] revises our threshold for novel chemical/biological weapons production … [v3.4] It revises the Automated R&D capability threshold
  _Supports:_ Changelog in the v3.4 policy itself lists v1.0 to v3.4
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  §1 Our Recommendations for Industry-Wide Safety:
  > The left column identifies capability thresholds that would call for heightened mitigations. The middle column provides an overview of our planned mitigations … The right column describes our recommendations for industry-wide safety at each threshold. … we cannot unilaterally and unconditionally commit to staying in line with the industry-wide recommendations
  _Supports:_ Thresholds table: Anthropic plan column vs industry-wide recommendations column; no unilateral commitment to the latter
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Appendix B: Notes on ASLs:
  > Earlier editions of our RSP defined 'AI Safety Levels' with specific lists of required controls. We still use this concept to refer to, and distinguish between, present levels of risk mitigations—those that we maintain for existing AI models. … when defining the risk mitigations needed for future levels of AI capability, we have found that providing a specific list of controls is overly rigid
  _Supports:_ ASLs now refer only to present levels of mitigations
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-10 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Update log, February 24, 2026 / April 2, 2026:
  > Version 3.0 is a comprehensive rewrite of the RSP. … [changes] will be logged both on this page and in a changelog in the policy document itself.
  _Supports:_ v3.0 was a comprehensive rewrite

**Uncertainty:** None material on the facts. The wording is a compression: 'planned safeguards' covers the company column of the §1 table, which the policy says summarises commitments made elsewhere in the policy and its Roadmap.

**May need reconsideration if accepted**

- `edge:ca-sb53|rsp` — **checked: consistent; Anthropic says SB 53 formalises practices labs followed voluntarily (S-0030). Its SB 53 compliance document is the separate FCF (see P-0010 v3 context)**: SB 53 codifies the published-framework norm Anthropic exemplified
- `edge:seoul-commit|rsp`: RSP's first version (Sep 2023) predates the Seoul commitments, which asked signatories to publish comparable frameworks
- `edge:gpai-cop|rsp`: Anthropic signed all three chapters
- `edge:fmf|rsp`: Anthropic is an FMF founding member
- `edge:metr|rsp`: METR conducts capability evaluations for Anthropic
- `edge:apollo|rsp`: Apollo evaluates Anthropic models for scheming
- `edge:uk-aisi|rsp`: UK AISI tested Anthropic models pre-deployment
- `gap:mit` — **checked: 'Anthropic's ASL deployment safeguards' is still accurate, since v3.4 keeps ASL-3 protections for current models (S-0006#6)**: The most-covered category, and the most ambiguous — Almost every binding regulation covers deployment mitigations in some form — content marking, refusals, monitoring, anti-discri…
- `faq:which-ai-labs-have-published-frontier-safety-fra` — **needs change: see P-0010 v3**: Which AI labs have published frontier safety frameworks? — Five major labs have published frontier safety frameworks at Layer 6 of this map: Anthropic (Responsible Scaling Policy,…
- `faq:what-is-sandbagging-in-ai-safety`: What is sandbagging in AI safety? — Sandbagging is when an AI model intentionally underperforms during safety evaluations — strategically scoring lower than its true capability so…
- Entry text that mentions the affected entries: `entry:ca-sb53:cov:thresh`, `entry:gpai-cop:desc`, `entry:fmf:desc`, `entry:fmf:cov:eval`, `entry:prep:cov:thresh`, `entry:fsf:context`, `entry:fsf:cov:thresh`, `entry:fsf:cov:timing`, `entry:fsf:cov:sec`, `entry:fsf:cov:halt`, `entry:fsf:cov:acct`, `entry:fsf:cov:update`, `entry:meta-faif:cov:thresh`, `entry:meta-faif:cov:sec`, `entry:metr:context`, `entry:metr:cov:eval`, `entry:apollo:cov:elicit`

_Decision history:_ accepted v2 2026-10-09 (Maintainer in conversation, 2026-10-09: 'I accept all the areas you verified'); pending 2026-10-10 (v3: wording changed — needs renewed approval)

---

### P-0006 v1 — Anthropic RSP · Updating policies: revision history and change-log commitment

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v1, 2026-10-09) · confidence: high · change-hash `abad9e4a9415`

**Applied together with:** P-0005, P-0007, P-0010, P-0013

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
  primary · retrieved 2026-10-10 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Current and Prior Versions:
  > Version 3.4 and redline (effective July 8, 2026) · Version 3.3 (effective May 26, 2026) · Version 3.2 (effective April 29, 2026) · Version 3.1 (effective April 2, 2026) · Version 3.0 (effective February 24, 2026) · Version 2.2 (effective May 14, 2025) · Version 2.1 (effective March 31, 2025) · Version 2.0 (effective October 15, 2024) · Version 1.0 (effective September 19, 2023)
  _Supports:_ Versions and dates
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-10 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Update log, February 24, 2026 / April 2, 2026:
  > Version 3.0 is a comprehensive rewrite of the RSP. … [changes] will be logged both on this page and in a changelog in the policy document itself.
  _Supports:_ Rewrite; change-log commitment
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-10 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Update log, April 29, 2026:
  > Version 3.2 of our RSP authorizes the LTBT to request external review of Risk Reports, gives the LTBT the power to approve our selection of external reviewers, and formalizes a requirement that we provide the LTBT with regular briefings.
  _Supports:_ v3.2 LTBT changes

**Uncertainty:** Removes the clause 'incorporating external evaluator findings'. That clause may still be true; I only lacked evidence for it. Say if you prefer to keep it.

**May need reconsideration if accepted**

- `edge:ca-sb53|rsp`: SB 53 codifies the published-framework norm Anthropic exemplified
- `edge:seoul-commit|rsp`: RSP's first version (Sep 2023) predates the Seoul commitments, which asked signatories to publish comparable frameworks
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

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v1, 2026-10-09) · confidence: high · change-hash `43032f62a608`

**Applied together with:** P-0005, P-0006, P-0010, P-0013

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
  primary · retrieved 2026-10-10 · access: ok · published 2026-02-24
  3. Risk Reports and external review:
  > Risk Reports will be published online (with some redactions) every 3-6 months. The new RSP also requires external review of Risk Reports in certain circumstances. … Although our current models do not yet require external review, we are already running pilots
  _Supports:_ Risk Report cadence and external-review requirement
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-10 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Risk Reports:
  > Redacted Risk Report August 2026 · Redacted Risk Report February 2026
  _Supports:_ Two published Risk Reports
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-10 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Update log, April 29, 2026:
  > Version 3.2 of our RSP authorizes the LTBT to request external review of Risk Reports, gives the LTBT the power to approve our selection of external reviewers, and formalizes a requirement that we provide the LTBT with regular briefings.
  _Supports:_ v3.2 LTBT powers

**Uncertainty:** The 'certain circumstances' that trigger external review are defined in the policy text, which was blocked. The existing first sentence was not re-verified.

**May need reconsideration if accepted**

- `edge:ca-sb53|rsp`: SB 53 codifies the published-framework norm Anthropic exemplified
- `edge:seoul-commit|rsp`: RSP's first version (Sep 2023) predates the Seoul commitments, which asked signatories to publish comparable frameworks
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

### P-0008 v2 — Connection Seoul commitments ↔ Anthropic RSP: fix chronology

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v2, 2026-10-09) · confidence: high · change-hash `7990ce2259ba`

_Revised from v1: same change wording, so an existing approval carries over._

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
  primary · retrieved 2026-10-10 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Current and Prior Versions:
  > Version 3.4 and redline (effective July 8, 2026) · Version 3.3 (effective May 26, 2026) · Version 3.2 (effective April 29, 2026) · Version 3.1 (effective April 2, 2026) · Version 3.0 (effective February 24, 2026) · Version 2.2 (effective May 14, 2025) · Version 2.1 (effective March 31, 2025) · Version 2.0 (effective October 15, 2024) · Version 1.0 (effective September 19, 2023)
  _Supports:_ v1.0 effective 19 Sep 2023
- **S-0035** UK Government: Frontier AI Safety Commitments publication page — <https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024>
  primary · retrieved 2026-10-10 · access: ok · published 2024-05-21
  Publication metadata:
  > Published: 21 May 2024 … 21 May 2024 First published.
  _Supports:_ Seoul commitments published 21 May 2024
- **S-0034** UK Government: Frontier AI Safety Commitments, AI Seoul Summit 2024 — <https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024/frontier-ai-safety-commitments-ai-seoul-summit-2024>
  primary · retrieved 2026-10-10 · access: ok
  Commitments preamble:
  > The above organisations … undertake to develop and deploy their frontier AI models and systems responsibly, in accordance with the following voluntary commitments, and to demonstrate how they have achieved this by publishing a safety framework focused on severe risks by the upcoming AI Summit in France.
  _Supports:_ Signatories undertook to publish a safety framework focused on severe risks
- **S-0034** UK Government: Frontier AI Safety Commitments, AI Seoul Summit 2024 — <https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024/frontier-ai-safety-commitments-ai-seoul-summit-2024>
  primary · retrieved 2026-10-10 · access: ok
  Signatory list:
  > Anthropic [listed among the signatory organisations]
  _Supports:_ Anthropic is a signatory

**Uncertainty:** Both halves now verified against primary sources (Anthropic version list; UK Government publication of the Seoul commitments, 21 May 2024). The same chronology problem probably affects 'Seoul commitments triggered the Preparedness Framework' (OpenAI) and possibly the DeepMind connection; outside this trial and queued for the baseline audit.

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

### P-0009 v3 — New connection NY RAISE ↔ Anthropic RSP: RAISE's framework requirement and Anthropic's separate compliance framework

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v3, 2026-10-10) · confidence: medium · change-hash `8d3b104ef303`

_Revised from v2: wording changed, so it needs a fresh decision._

**Linked:** P-0005, P-0010

**Change**

- **new connection `ny-raise` ↔ `rsp`**

  Current:

  > _(absent)_

  Proposed:

  > RAISE requires a published frontier AI framework from Jan 2027; Anthropic says it addresses such requirements with documents including its Frontier Compliance Framework, which is separate from the RSP

**Question for you:** Accept this connection on the RSP entry, or prefer no RAISE↔RSP connection until the map decides how to represent compliance frameworks (for example, noting the FCF in the RSP entry, as P-0010 v3 does)?

**Why it matters:** The map connects SB 53 and the EU Code to the RSP but not RAISE. Anthropic names all three as framework-publication requirements it addresses. The official texts now settle both open points: what RAISE requires and from when, and how the compliance document relates to the RSP.

**Reasoning:** Revised from v2 after reading the primary sources. (1) RAISE, as rewritten by Chapter 96 of 2026 (S8828, signed 27 Mar 2026), requires a large frontier developer to 'write, implement, comply with, and clearly and conspicuously publish' a frontier AI framework. It takes effect 1 Jan 2027 (S-0033#2, #3). This RAISE half is now stated in the map's own voice, because the statute was read. (2) Anthropic says SB 53, RAISE and the EU Codes are 'requirements Anthropic addresses through public documentation including its Frontier Compliance Framework' (S-0007#6). The FCF says it 'is distinct from our Responsible Scaling Policy' (S-0010#1). v2 did not say the FCF is a separate document, so a reader would have taken the RSP to be the RAISE compliance route.

**Evidence**

- **S-0033** NY Assembly: S08828 (RAISE Act chapter amendment) summary, actions and text — <https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S08828&term=2025&Summary=Y&Actions=Y&Text=Y>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-03-27, effective 2027-01-01
  §2, new GBL §1421(1):
  > A large frontier developer shall write, implement, comply with, and clearly and conspicuously publish on its internet website a frontier AI framework that applies to the large frontier developer's frontier models and describes in detail how the large frontier developer handles all of the following:
  _Supports:_ RAISE §1421(1): write, implement, comply with and publish a frontier AI framework
- **S-0033** NY Assembly: S08828 (RAISE Act chapter amendment) summary, actions and text — <https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S08828&term=2025&Summary=Y&Actions=Y&Text=Y>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-03-27, effective 2027-01-01
  §3 (amending §3 of Chapter 699 of 2025):
  > § 3. This act shall take effect [on the ninetieth day after it shall have become a law] January 1, 2027.
  _Supports:_ Effective 1 Jan 2027
- **S-0033** NY Assembly: S08828 (RAISE Act chapter amendment) summary, actions and text — <https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S08828&term=2025&Summary=Y&Actions=Y&Text=Y>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-03-27, effective 2027-01-01
  Actions:
  > 01/28/2026 PASSED SENATE … 02/25/2026 substituted for a9449 … 03/11/2026 passed assembly … 03/27/2026 SIGNED CHAP.96
  _Supports:_ Chapter 96 of 2026, signed 27 Mar 2026
- **S-0007** https://www.anthropic.com/news/responsible-scaling-policy-v3 — <https://www.anthropic.com/news/responsible-scaling-policy-v3>
  primary · retrieved 2026-10-10 · access: ok · published 2026-02-24
  Assessing our theory of change (re-fetched 2026-10-10):
  > We've seen governments around the world (for example in California with SB 53, in New York with the RAISE Act, and with the EU AI Act's Codes of Practice) start to require frontier AI developers to create and publish frameworks for assessing and managing catastrophic risks—requirements Anthropic addresses through public documentation including its Frontier Compliance Framework.
  _Supports:_ Anthropic: RAISE among requirements it addresses via documents including the FCF
- **S-0010** Anthropic Frontier Compliance Framework v2 (Trust Center PDF) — <https://trust.anthropic.com/resources?s=eorilovp4wxk38nxbi7k3&name=anthropic-frontier-compliance-framework>
  primary · retrieved 2026-10-10 · access: ok via browser · effective 2026-07-24
  §1 Introduction:
  > The FCF is distinct from our Responsible Scaling Policy (RSP), which will remain our voluntary safety framework … the FCF is our compliance framework for various applicable regulatory regimes, including: In the United States, the FCF serves as our Frontier AI Framework under California's Transparency in Frontier AI Act (TFAIA) … In the European Union … the FCF serves as the publicly available summarized version of our Safety & Security Framework
  _Supports:_ FCF distinct from the RSP
- **S-0010** Anthropic Frontier Compliance Framework v2 (Trust Center PDF) — <https://trust.anthropic.com/resources?s=eorilovp4wxk38nxbi7k3&name=anthropic-frontier-compliance-framework>
  primary · retrieved 2026-10-10 · access: ok via browser · effective 2026-07-24
  Whole document (searched):
  > Version 2, effective 24 July 2026. The regimes named are California's TFAIA and the EU General-Purpose AI Code of Practice / EU AI Act. New York and the RAISE Act are not mentioned anywhere in the document.
- **S-0030** Anthropic: Our framework for complying with California SB 53 — <https://www.anthropic.com/news/compliance-framework-SB53>
  primary · retrieved 2026-10-10 · access: ok · published 2025-12-19
  What's in our Frontier Compliance Framework:
  > Moving forward, the FCF will serve as our compliance framework for SB 53 and other regulatory requirements. The RSP will remain our voluntary safety policy, reflecting what we believe best practices should be as the AI landscape evolves, even when that goes beyond or otherwise differs from current regulatory requirements.
  _Supports:_ FCF is the compliance framework for SB 53 and other requirements; RSP stays voluntary

**Uncertainty:** FCF v2 (24 Jul 2026) names only California's TFAIA and the EU Code, not RAISE, which is not yet in effect. So 'addresses such requirements' rests on Anthropic's general statement of Feb 2026, not on a RAISE-specific compliance document. Whether a statute-to-compliance-document link belongs on the RSP entry at all is an editorial choice: the map has no FCF entry, and its existing SB 53 and EU Code connections use the RSP.

**May need reconsideration if accepted**

- `edge:us-preempt|ny-raise`: Preemption EO targets RAISE Act
- `edge:ny-raise|ca-sb53` — **not checked beyond §1421 and the >$500M revenue definition, which mirror SB 53**: RAISE Act amendments aligned thresholds with SB 53
- `edge:co-doi|ny-raise`: Colorado DOI precedent informed NY RAISE's DFS office model
- `gap:timing`: Pre-deployment is widely required; post-deployment is sparse — Pre-deployment timing is the easy part: the EU AI Act, China's GenAI Measures, Korea's Framework Act, and the lab fr…
- `gap:acct`: The well-populated column — but not all accountability is equal — Most mechanisms claim accountability of some kind, from binding incident reporting (SB 53, RAISE Act, EU AI Act) …
- `faq:which-ai-laws-are-binding-with-penalties`: Which AI laws are binding with penalties? — Five AI laws in this map are classed as binding with penalties: the EU AI Act (up to €35M or 7% of global revenue), China's GenAI Measu…
- `faq:how-is-california-sb-53-different-from-the-ny-ra`: How is California SB 53 different from the NY RAISE Act? — Both target large frontier developers (>10²⁶ FLOPs, >$500M revenue) and require published safety frameworks. California …
- `text:footer-sources`: Sources: International AI Safety Report (Feb 2026), METR Common Elements of Frontier AI Safety Policies (Dec 2025), Brundage Substack, EU AI Act and AI Office documentation, Calif…
- `text:gap-default`: Mandatory third-party auditing, compute KYC, statutory incident reporting beyond California and (from 2027) New York, liability rules for harmful outputs, and international verifi…
- `edge:ca-sb53|rsp`: SB 53 codifies the published-framework norm Anthropic exemplified
- `edge:seoul-commit|rsp`: RSP's first version (Sep 2023) predates the Seoul commitments, which asked signatories to publish comparable frameworks
- `edge:gpai-cop|rsp`: Anthropic signed all three chapters
- `edge:fmf|rsp`: Anthropic is an FMF founding member
- `edge:metr|rsp`: METR conducts capability evaluations for Anthropic
- `edge:apollo|rsp`: Apollo evaluates Anthropic models for scheming
- `edge:uk-aisi|rsp`: UK AISI tested Anthropic models pre-deployment
- `gap:mit`: The most-covered category, and the most ambiguous — Almost every binding regulation covers deployment mitigations in some form — content marking, refusals, monitoring, anti-discri…
- `faq:which-ai-labs-have-published-frontier-safety-fra`: Which AI labs have published frontier safety frameworks? — Five major labs have published frontier safety frameworks at Layer 6 of this map: Anthropic (Responsible Scaling Policy,…
- `faq:what-is-sandbagging-in-ai-safety`: What is sandbagging in AI safety? — Sandbagging is when an AI model intentionally underperforms during safety evaluations — strategically scoring lower than its true capability so…
- Entry text that mentions the affected entries: `entry:eu-aia:cov:thresh`, `entry:kr-ai:cov:thresh`, `entry:seoul-commit:context`, `entry:co-doi:context`, `entry:ca-sb53:cov:thresh`, `entry:gpai-cop:desc`, `entry:fmf:desc`, `entry:fmf:cov:eval`, `entry:prep:cov:thresh`, `entry:fsf:context`, `entry:fsf:cov:thresh`, `entry:fsf:cov:timing`, `entry:fsf:cov:sec`, `entry:fsf:cov:halt`, `entry:fsf:cov:acct`, `entry:fsf:cov:update`, `entry:meta-faif:cov:thresh`, `entry:meta-faif:cov:sec`, `entry:metr:context`, `entry:metr:cov:eval`, `entry:apollo:cov:elicit`

_Decision history:_ accepted v1 2026-10-09 (Maintainer in conversation, 2026-10-09: 'I accept all the areas you verified'); pending 2026-10-09 (v2: wording changed — needs renewed approval)

---

### P-0010 v3 — Anthropic RSP: describe the v3 structure (thresholds, ASLs, safeguards, evaluations, timing) and the separate compliance framework

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v3, 2026-10-10) · confidence: high · change-hash `92f0d8ad0842`

_Revised from v2: wording changed, so it needs a fresh decision._

**Linked:** P-0005, P-0013

**Applied together with:** P-0005, P-0006, P-0007, P-0013

**Change**

- **`rsp` · context**

  Current:

  > Defines AI Safety Levels (ASLs) — currently up to ASL-3 — each tied to specific capability evaluations and mandatory safeguards: weight-security tiers, deployment mitigations, model-autonomy controls. The original published framework that set the template for the field; commitments include not deploying at a given ASL until the corresponding mitigations are in place. Subjected to detailed external scrutiny in EU GPAI Code drafting and California SB 53.

  Proposed:

  > Since v3.0 (Feb 2026) the policy separates Anthropic's own plans from more ambitious industry-wide recommendations, which Anthropic says it cannot commit to follow unilaterally. ASLs now label only the safeguards kept for current models (ASL-3). It adds a Frontier Safety Roadmap of public goals (not hard commitments) and Risk Reports every 3–6 months. The original published framework that set the template for the field. Anthropic's documents for California SB 53 and the EU GPAI Code are a separate Frontier Compliance Framework; the RSP remains its voluntary policy.

- **`rsp` · coverage · thresh**

  Current:

  > AI Safety Levels (ASL-1, 2, 3, currently up to ASL-3) trigger graduated safeguards as capabilities cross specified evaluations. The original published framework that set the threshold-and-tier template; SB 53 codifies the underlying norm.

  Proposed:

  > Four capability thresholds (non-novel and novel chemical/biological weapons, misaligned AI in high-stakes settings, automated R&D), each mapped to Anthropic's planned mitigations and to recommended industry-wide mitigations. The original published framework that set the threshold-and-tier template; SB 53 codifies the underlying norm.

- **`rsp` · coverage · eval**

  Current:

  > Pre-deployment evaluations at each ASL covering CBRN, cyber, autonomous-replication, and AI R&D capabilities. Methodology updated as evaluations mature and external evaluator findings come in.

  Proposed:

  > Risk Reports must present capability and alignment evaluations for each threat model, run internally and by external parties as appropriate. Since v3.0 the policy does not pre-specify which evaluations show that a threshold has been crossed.

- **`rsp` · coverage · timing**

  Current:

  > Evaluations run pre-training, pre-deployment, and during ongoing operation; thresholds re-checked as capabilities scale. Among the most comprehensive timing regimes in any framework.

  Proposed:

  > Risk Reports every 3–6 months cover all publicly deployed models and certain internally deployed ones. Off-cycle risk analyses are due when a significantly more capable model is publicly deployed, and within 30 days of identifying a higher-risk internal model.

- **`rsp` · coverage · sec**

  Current:

  > Weight-security tier rises with each ASL — ASL-3 mandates substantially stronger protections against insider threat, exfiltration, and supply-chain attacks. Tied directly to the model's capability profile.

  Proposed:

  > Anthropic commits to maintain or improve the ASL-3 security controls it applies to current models, and plans 'moonshot' security R&D for the automated R&D threshold. The security roughly in line with RAND SL4 that it recommends industry-wide at higher thresholds is not a unilateral commitment.

- **`rsp` · coverage · mit**

  Current:

  > Deployment safeguards by ASL include refusal training, monitoring, abuse detection, and (at higher ASLs) deployment-environment controls. Specific safeguards published for each tier.

  Proposed:

  > Current ASL-3 deployment protections include classifier guards, access controls for trusted users, red-teaming, bug bounties and threat intelligence. For higher thresholds v3 no longer lists required controls; it recommends that developers make a strong argument that risks are contained.

- **`index.html`**

  Current:

  > Anthropic (Responsible Scaling Policy, with AI Safety Levels)

  Proposed:

  > Anthropic (Responsible Scaling Policy, with capability thresholds and periodic Risk Reports)

**Why it matters:** The entry describes the pre-v3 policy: an ASL ladder in which crossing capability evaluations triggers specified safeguards for each tier. v3 (Feb 2026, now v3.4) replaced that structure. The ASL wording also feeds the FAQ answer on lab frameworks, which search engines and LLMs ingest. The entry also implies the RSP is what was scrutinised under SB 53 and the EU Code. Anthropic says its compliance document for both is a separate Frontier Compliance Framework.

**Reasoning:** Each edit is taken from the v3.4 policy text (S-0006); v3.0 (S-0008) already had the same structure. Context: two-tier structure and no unilateral commitment to the industry column (§1, Introduction); ASLs only for present mitigations (Appendix B); Roadmap goals are not hard commitments, and Risk Reports are new (Introduction). The FCF sentence comes from the FCF itself (S-0010#1) and Anthropic's Dec 2025 post (S-0030#1). The RSP also says it handles SB 53-type requirements in separate documents (S-0006#15). Thresholds: the four rows of the §1 table. Evaluations: §3.3 item 3; §1 says evaluations cannot be specified in advance. Timing: §3.1. Security: §1 table, row 1 (ASL-3 controls), the automated R&D row (moonshot security R&D) and the industry column (RAND SL4). Mitigations: §1 table, row 1, and Appendix B. Removed as outdated or unsupported: 'currently up to ASL-3 … each tied to specific capability evaluations and mandatory safeguards'; 'commitments include not deploying at a given ASL until the corresponding mitigations are in place' (pre-v3; v2.0 changelog); 'Subjected to detailed external scrutiny in EU GPAI Code drafting and California SB 53' (not supported by anything inspected, and the compliance document is the FCF); 'autonomous-replication' (replaced by a checkpoint in v2.0, absent from v3); 'pre-training' evaluation timing (absent from v3); 'Specific safeguards published for each tier' (contradicted by Appendix B); and the comparative claim 'Among the most comprehensive timing regimes in any framework' (not checked against other labs).

**Evidence**

- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Introduction:
  > Our previous RSP committed to implementing mitigations that would reduce our models' absolute risk levels to acceptable levels, without regard to whether other frontier AI developers would do the same. … We now separate our plans as a company … from our more ambitious industry-wide recommendations. … But we cannot commit to following them unilaterally.
  _Supports:_ Company plans separated from industry-wide recommendations; no unilateral commitment to the latter
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Introduction (Frontier Safety Roadmaps; Risk Reports):
  > Frontier Safety Roadmaps are a new requirement under our RSP. … These are not hard commitments but rather public goals against which we will openly grade our progress. Risk Reports are another new requirement.
  _Supports:_ Roadmap goals are not hard commitments; Risk Reports are a new requirement
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  §1 Our Recommendations for Industry-Wide Safety:
  > The left column identifies capability thresholds that would call for heightened mitigations. The middle column provides an overview of our planned mitigations … The right column describes our recommendations for industry-wide safety at each threshold. … we cannot unilaterally and unconditionally commit to staying in line with the industry-wide recommendations
  _Supports:_ Thresholds table structure
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  §1, structure of recommendations:
  > we cannot presently give highly specific advance detail on what evaluations will determine whether risk thresholds have been passed, or what risk mitigations will be needed to achieve safety. Our recommendations for industry-wide safety are thus structured around requiring analysis and arguments making a strong case for safety, rather than AI Safety Levels (more in Appendix B).
  _Supports:_ Recommendations structured around safety arguments rather than ASLs; evaluations not specified in advance
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  §1 table, rows (capability or usage thresholds):
  > Rows: Non-novel chemical/biological weapons production; Novel chemical/biological weapons production; Misaligned AI systems in high-stakes settings; Automated R&D in key domains.
  _Supports:_ The four thresholds
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  §1 table, row 1, company plan:
  > We will maintain or improve on our ASL-3 protections, which include classifier guards at least as robust as our initial Constitutional Classifiers; access controls for trusted users with exemptions to classifier guards; red-teaming, bug bounties, and threat intelligence for continually assessing the threat of jailbreaks; and a number of noteworthy security controls.
  _Supports:_ Current ASL-3 deployment and security protections
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  §1 table, Automated R&D rows (company plan and industry recommendation):
  > We will: Resource and complete significant 'moonshot R&D for security' projects … [Industry:] This would likely mean security roughly in line with RAND SL4.
  _Supports:_ Moonshot security R&D; RAND SL4 in the industry column
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  §3.1 Scope and Timing:
  > It will cover all publicly deployed models as of the coverage date, as well as any internally deployed models … Timing. We will publish a Risk Report every 3-6 months. … Off-cycle updates … When we publicly deploy a model that we determine is (1) significantly more capable … Within 30 days of determining that we have an internally deployed model that …
  _Supports:_ Risk Report cadence, coverage, off-cycle triggers
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  §3.3 Contents, item 3:
  > Evidence (including evaluations) about relevant model capabilities and behaviors: For each in-scope model, capability and alignment evaluations (conducted internally and by external parties as appropriate), their results, and (as appropriate) other evidence we considered in assessing the level of risk.
  _Supports:_ Evaluations in Risk Reports, internal and external as appropriate
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Appendix B: Notes on ASLs:
  > Earlier editions of our RSP defined 'AI Safety Levels' with specific lists of required controls. We still use this concept to refer to, and distinguish between, present levels of risk mitigations—those that we maintain for existing AI models. … when defining the risk mitigations needed for future levels of AI capability, we have found that providing a specific list of controls is overly rigid
  _Supports:_ ASLs only for present mitigations; no specific control lists for future levels
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Introduction, footnote 1 and preceding text:
  > the RSP may serve some regulatory requirements, but it is not designed to be comprehensive. … Where regulatory requirements exceed or differ from what the RSP covers, we will address them through separate documents. … Where laws such as California SB 53 define this or similar terms with specific thresholds, we address those requirements in separate compliance frameworks.
  _Supports:_ Regulatory requirements handled in separate documents
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Changelog, v2.0 and v2.2:
  > [v2.0] maintaining our commitment not to train or deploy models unless we have implemented adequate safeguards. … [v2.2] This update excludes both sophisticated insiders and state-compromised insiders from the ASL-3 Security Standard.
  _Supports:_ Pre-v3 commitment not to train or deploy without adequate safeguards (now superseded)
- **S-0008** Anthropic Responsible Scaling Policy v3.0 (served as PDF at the rsp-v3-0 URL) — <https://www.anthropic.com/responsible-scaling-policy/rsp-v3-0>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-02-24
  §1 (v3.0):
  > Our recommendations for industry-wide safety are thus structured around requiring analysis and arguments making a strong case for safety, rather than AI Safety Levels (more in Appendix B).
  _Supports:_ v3.0 already used safety arguments rather than ASLs
- **S-0010** Anthropic Frontier Compliance Framework v2 (Trust Center PDF) — <https://trust.anthropic.com/resources?s=eorilovp4wxk38nxbi7k3&name=anthropic-frontier-compliance-framework>
  primary · retrieved 2026-10-10 · access: ok via browser · effective 2026-07-24
  §1 Introduction:
  > The FCF is distinct from our Responsible Scaling Policy (RSP), which will remain our voluntary safety framework … the FCF is our compliance framework for various applicable regulatory regimes, including: In the United States, the FCF serves as our Frontier AI Framework under California's Transparency in Frontier AI Act (TFAIA) … In the European Union … the FCF serves as the publicly available summarized version of our Safety & Security Framework
  _Supports:_ FCF distinct from RSP; FCF is the SB 53 framework and the EU Code summary
- **S-0030** Anthropic: Our framework for complying with California SB 53 — <https://www.anthropic.com/news/compliance-framework-SB53>
  primary · retrieved 2026-10-10 · access: ok · published 2025-12-19
  What's in our Frontier Compliance Framework:
  > Moving forward, the FCF will serve as our compliance framework for SB 53 and other regulatory requirements. The RSP will remain our voluntary safety policy, reflecting what we believe best practices should be as the AI landscape evolves, even when that goes beyond or otherwise differs from current regulatory requirements.
  _Supports:_ FCF is the compliance framework; RSP remains voluntary policy
- **S-0007** https://www.anthropic.com/news/responsible-scaling-policy-v3 — <https://www.anthropic.com/news/responsible-scaling-policy-v3>
  primary · retrieved 2026-10-10 · access: ok · published 2026-02-24
  1. Separating our plans as a company from our recommendations for the industry:
  > Our RSP now outlines two sets of mitigations: first, the mitigations that we plan to pursue regardless of what others do; and second, an ambitious capabilities-to-mitigations map that, we believe, would help adequately manage the risks from advanced AI if implemented across the AI industry.
  _Supports:_ Two sets of mitigations (announcement)

**Carried over unchanged, not re-verified:** 'The original published framework that set the template for the field' (context) and '…set the threshold-and-tier template; SB 53 codifies the underlying norm' (thresh): Anthropic's own account only

**Uncertainty:** The policy text settles what the RSP says. It does not show how Anthropic implements it. The sentences on ASL-3 protections describe commitments, not audited practice. 'The original published framework that set the template' and 'SB 53 codifies the underlying norm' are carried over; Anthropic's own account supports them (S-0007, S-0030), but no independent source was checked. cov.elicit and cov.acct's first sentence are untouched and unverified.

**May need reconsideration if accepted**

- `edge:ca-sb53|rsp`: SB 53 codifies the published-framework norm Anthropic exemplified
- `edge:seoul-commit|rsp`: RSP's first version (Sep 2023) predates the Seoul commitments, which asked signatories to publish comparable frameworks
- `edge:gpai-cop|rsp` — **checked: FCF says Anthropic Ireland signed the EU Code (S-0010#1); 'all three chapters' not checked here**: Anthropic signed all three chapters
- `edge:fmf|rsp`: Anthropic is an FMF founding member
- `edge:metr|rsp`: METR conducts capability evaluations for Anthropic
- `edge:apollo|rsp`: Apollo evaluates Anthropic models for scheming
- `edge:uk-aisi|rsp`: UK AISI tested Anthropic models pre-deployment
- `gap:mit` — **checked, still accurate: 'Anthropic's ASL deployment safeguards' matches v3.4's ASL-3 protections (S-0006#6)**: The most-covered category, and the most ambiguous — Almost every binding regulation covers deployment mitigations in some form — content marking, refusals, monitoring, anti-discri…
- `faq:which-ai-labs-have-published-frontier-safety-fra` — **changed here (Anthropic clause only); the other labs' descriptions are not checked**: Which AI labs have published frontier safety frameworks? — Five major labs have published frontier safety frameworks at Layer 6 of this map: Anthropic (Responsible Scaling Policy,…
- `faq:what-is-sandbagging-in-ai-safety`: What is sandbagging in AI safety? — Sandbagging is when an AI model intentionally underperforms during safety evaluations — strategically scoring lower than its true capability so…
- Entry text that mentions the affected entries: `entry:ca-sb53:cov:thresh`, `entry:gpai-cop:desc`, `entry:fmf:desc`, `entry:fmf:cov:eval`, `entry:prep:cov:thresh`, `entry:fsf:context`, `entry:fsf:cov:thresh`, `entry:fsf:cov:timing`, `entry:fsf:cov:sec`, `entry:fsf:cov:halt`, `entry:fsf:cov:acct`, `entry:fsf:cov:update`, `entry:meta-faif:cov:thresh`, `entry:meta-faif:cov:sec`, `entry:metr:context`, `entry:metr:cov:eval`, `entry:apollo:cov:elicit`

---

### P-0011 v2 — Classify `other-aisis` as Multilateral, kept in Layer 4 like UK AISI

`change` · evidence: **Internal consistency only (the map checked against itself)** · decision: **accepted** (v2, 2026-10-10) · confidence: — · change-hash `c13b04d4b97b`

_Revised from v1: wording changed, so it needs a fresh decision._

**Change**

- **`other-aisis` · jur**

  Current:

  > as

  Proposed:

  > mu

**Why it matters:** other-aisis groups the national AI safety institutes of Singapore, Japan, France, Korea, Canada, Australia, Kenya and India. 'Asia-Pacific (other)' is wrong for France, Canada and Kenya.

**Reasoning:** Maintainer's choice (option b), 'make it the same as UK AISI': jurisdiction becomes Multilateral, while the entry stays in Layer 4 (Infrastructure) with pow 2 and status active, matching uk-aisi. It does not move to Layer 1 with the AISI Network. Its colour and legend group change to Multilateral; no new code is needed.

**Evidence**

- **S-0027** Map repository at f9d3e56 (index.html, build-llms.js, data.json) — <https://github.com/buildwithwhy/ai-governance-map/tree/f9d3e56>
  repo · retrieved 2026-10-08 · access: ok via repo
  index.html JUR_LABEL / au-esafety / other-aisis:
  > JUR_LABEL as: 'Asia (other)'. au-esafety (Australia eSafety Commissioner) has jur 'as'. other-aisis (desc: 'Singapore …, Japan …, France (INESIA), Korea, Canada, Australia, Kenya, India') has jur 'as'.
  _Supports:_ other-aisis members and current jur code

**Uncertainty:** Internal classification only; no external facts involved.

**May need reconsideration if accepted**

- `edge:aisi-net|other-aisis`: Singapore, Japan, France, Korea, Canada, Australia, Kenya, India participate
- `edge:au-esafety|other-aisis`: Australia also participates in the AISI Network
- `edge:imda|other-aisis`: IMDA hosts Singapore's DTC + AI Verify AISI-equivalent work
- `edge:jp-sectors|other-aisis`: J-AISI is Japan's central institute alongside sectoral ministries
- `gap:eval`: Evaluations everywhere, mandates almost nowhere — Most mechanisms touch evaluations in some way, but mandatory third-party evaluation of frontier models is rare. The EU AI Act req…
- `text:layer-4:tooltip`: Institutions that shape AI behavior — AI-specific bodies (EU AI Office, AISIs), independent evaluators and NGOs (METR, Apollo, AVERI, CAIS, FSI), sector regulators applying genera…
- `text:layer-4:subtitle`: Regulators, AISIs, evaluators, compute controls
- Entry text that mentions the affected entries: `entry:aisr:context`, `entry:aisi-net:context`, `entry:uk-aisi:cov:elicit`

---

### P-0012 v1 — Make the public date say 'content updated', not imply a full audit

`change` · evidence: **Internal consistency only (the map checked against itself)** · decision: **accepted** (v1, 2026-10-10) · confidence: — · change-hash `0c071f106ecd`

**Change**

- **`index.html`**

  Current:

  > · Updated <time

  Proposed:

  > · Content updated <time

- **`build-llms.js`**

  Current:

  > ${UPDATED} snapshot; ${ENTITIES.length} mechanisms

  Proposed:

  > content last updated ${UPDATED} (entries are re-verified on a rolling basis, not all at once); ${ENTITIES.length} mechanisms

- **`build-llms.js`**

  Current:

  > full += `Updated: ${UPDATED}\n\n`;

  Proposed:

  > full += `Content updated: ${UPDATED} (entries are re-verified on a rolling basis, not all at once)\n\n`;

**Why it matters:** Applying this release moves the public date to the release date. 'Updated' on the page and 'snapshot' in llms.txt would suggest the whole map was re-audited on that date, but this release re-checked only a few entries.

**Reasoning:** Wording-only change. The date mechanics are unchanged (the derived date still marks the latest applied content release).

**Evidence**

- **S-0027** Map repository at f9d3e56 (index.html, build-llms.js, data.json) — <https://github.com/buildwithwhy/ai-governance-map/tree/f9d3e56>
  repo · retrieved 2026-10-08 · access: ok via repo
  index.html topbar; build-llms.js llms.txt/llms-full.txt headers:
  > Topbar: 'Updated <time datetime="2026-06-06">6 June 2026</time>'. llms.txt: '${UPDATED} snapshot; …'. llms-full.txt: 'Updated: ${UPDATED}'. The date is set by the content-update process for the whole file.
  _Supports:_ Where the public date is stated and how it is worded

**Uncertainty:** None on the facts; the wording is a style choice.

---

### P-0013 v1 — Anthropic RSP · Halting: v3 replaced the unconditional pause commitment with competitor-dependent delay commitments

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v1, 2026-10-10) · confidence: high · change-hash `fbf2ed18a3d5`

**Linked:** P-0005, P-0010

**Applied together with:** P-0005, P-0006, P-0007, P-0010

**Change**

- **`rsp` · coverage · halt**

  Current:

  > Anthropic commits to pause development or deployment if mitigations are insufficient for the model's ASL. The halting commitment is the most operationally specific in any lab framework.

  Proposed:

  > Since v3.0, Anthropic commits to delay development and deployment in two competitor-dependent scenarios. If it has a significant lead with a highly capable model, it delays until it has a strong argument that catastrophic risk is contained. If all competitors with such models can make that argument, it delays until it matches their risk-reduction posture. Earlier versions committed not to train or deploy models without adequate safeguards, whatever other developers did. Anthropic says it would strongly consider pausing in other cases too.

**Why it matters:** The map says 'Anthropic commits to pause development or deployment if mitigations are insufficient for the model's ASL' and calls this 'the most operationally specific in any lab framework'. That describes the pre-v3 policy. v3 still has delay commitments, but only in Appendix A's competitor-dependent scenarios. This feeds the halting gap summary, which says every lab framework includes halting conditions.

**Reasoning:** From v3.4 Appendix A (scenarios and commitments) and its preamble, where v3.1 added 'would strongly consider pausing … even in cases not covered below'. The Introduction says the previous RSP committed to reduce absolute risk 'without regard to whether other frontier AI developers would do the same'. The v2.0 changelog shows the earlier 'commitment not to train or deploy models unless we have implemented adequate safeguards'. v3.0 already had the same Appendix A commitments (S-0008#1), so the change dates from v3.0. The trial-1 caution 'do not infer that pause commitments were removed' holds: they were made conditional, not removed. Also removed: the comparative claim about other labs, which was not checked. 'Highly capable' is the policy's defined term (crossing the automated AI R&D threshold).

**Evidence**

- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Appendix A: Commitments Related to Competitors:
  > Anthropic in the lead … We will delay AI development and deployment as needed to achieve this, until and unless we no longer believe we have a significant lead. Competitors have strong safety measures … we will delay AI development and deployment as needed to achieve this. General upleveling … we will not necessarily delay AI development and deployment in this scenario.
  _Supports:_ Appendix A scenarios and delay commitments
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Appendix A, preamble:
  > the commitments below do not preclude us from taking cautionary action, such as refraining from training or deploying models, in other circumstances. … we would strongly consider pausing development and/or deployment to improve the safety profiles of our models even in cases not covered below.
  _Supports:_ Would strongly consider pausing in other cases
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Introduction:
  > Our previous RSP committed to implementing mitigations that would reduce our models' absolute risk levels to acceptable levels, without regard to whether other frontier AI developers would do the same. … We now separate our plans as a company … from our more ambitious industry-wide recommendations. … But we cannot commit to following them unilaterally.
  _Supports:_ Previous RSP was unconditional on other developers
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Changelog, v2.0 and v2.2:
  > [v2.0] maintaining our commitment not to train or deploy models unless we have implemented adequate safeguards. … [v2.2] This update excludes both sophisticated insiders and state-compromised insiders from the ASL-3 Security Standard.
  _Supports:_ Pre-v3 commitment not to train or deploy without adequate safeguards
- **S-0006** Anthropic Responsible Scaling Policy v3.4 (PDF) — <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-07-08
  Changelog, v3.1–v3.4:
  > [v3.1] (1) how we operationalize the Automated R&D capability threshold … (3) that we may consider pausing development or deployment even where the commitments described in Appendix A are not triggered. [v3.3] revises our threshold for novel chemical/biological weapons production … [v3.4] It revises the Automated R&D capability threshold
  _Supports:_ v3.1 changelog: may consider pausing where Appendix A is not triggered
- **S-0008** Anthropic Responsible Scaling Policy v3.0 (served as PDF at the rsp-v3-0 URL) — <https://www.anthropic.com/responsible-scaling-policy/rsp-v3-0>
  primary · retrieved 2026-10-10 · access: ok · effective 2026-02-24
  Appendix A: Commitments Related to Competitors (v3.0):
  > Anthropic in the lead. … We will require a strong argument that catastrophic risk is contained … We will delay AI development and deployment as needed to achieve this … [No preamble sentence on pausing in other cases; v3.0's preamble ends after 'inadvertent race to the bottom on safety'.]
  _Supports:_ v3.0 already contained the Appendix A delay commitments
- **S-0005** https://www.anthropic.com/responsible-scaling-policy — <https://www.anthropic.com/responsible-scaling-policy>
  primary · retrieved 2026-10-10 · access: ok · page_updated 2026-08-14, current_version_effective 2026-07-08, first_version_effective 2023-09-19
  Update log, April 2, 2026 (v3.1):
  > We now clarify that, even if not required by the RSP, we remain free to take measures such as pausing the development of our AI systems in any circumstances in which we deem them appropriate.
  _Supports:_ v3.1 update log: free to pause even if not required by the RSP

**Uncertainty:** This is the most consequential wording on the entry. It states commitments only; whether any scenario has applied is not evidenced. The policy notes Anthropic often won't know whether a scenario applies and will use its best judgment. The CEO and RSO decide on deployment from each Risk Report, with Board and LTBT approval when marginal-risk arguments are central (§3.4). That is a decision process, not a pause trigger, so it is left out. You may prefer a shorter wording.

**May need reconsideration if accepted**

- `edge:ca-sb53|rsp`: SB 53 codifies the published-framework norm Anthropic exemplified
- `edge:seoul-commit|rsp`: RSP's first version (Sep 2023) predates the Seoul commitments, which asked signatories to publish comparable frameworks
- `edge:gpai-cop|rsp`: Anthropic signed all three chapters
- `edge:fmf|rsp`: Anthropic is an FMF founding member
- `edge:metr|rsp`: METR conducts capability evaluations for Anthropic
- `edge:apollo|rsp`: Apollo evaluates Anthropic models for scheming
- `edge:uk-aisi|rsp`: UK AISI tested Anthropic models pre-deployment
- `gap:mit`: The most-covered category, and the most ambiguous — Almost every binding regulation covers deployment mitigations in some form — content marking, refusals, monitoring, anti-discri…
- `faq:which-ai-labs-have-published-frontier-safety-fra` — **no halting claim; no change**: Which AI labs have published frontier safety frameworks? — Five major labs have published frontier safety frameworks at Layer 6 of this map: Anthropic (Responsible Scaling Policy,…
- `faq:what-is-sandbagging-in-ai-safety`: What is sandbagging in AI safety? — Sandbagging is when an AI model intentionally underperforms during safety evaluations — strategically scoring lower than its true capability so…
- Entry text that mentions the affected entries: `entry:ca-sb53:cov:thresh`, `entry:gpai-cop:desc`, `entry:fmf:desc`, `entry:fmf:cov:eval`, `entry:prep:cov:thresh`, `entry:fsf:context`, `entry:fsf:cov:thresh`, `entry:fsf:cov:timing`, `entry:fsf:cov:sec`, `entry:fsf:cov:halt`, `entry:fsf:cov:acct`, `entry:fsf:cov:update`, `entry:meta-faif:cov:thresh`, `entry:meta-faif:cov:sec`, `entry:metr:context`, `entry:metr:cov:eval`, `entry:apollo:cov:elicit`

---

### P-0014 v1 — US Frontier AI Access EO: describe EO 14409 from its official text (voluntary cyber-capability access; NSA, Treasury and CISA lead, not CAISI)

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v1, 2026-10-10) · confidence: high · change-hash `acf23d9552f9`

**Linked:** P-0015

**Change**

- **`us-frontier-access-eo` · link**

  Current:

  > https://www.npr.org/2026/06/02/nx-s1-5844347/ai-safety-trump-executive-order

  Proposed:

  > https://www.federalregister.gov/documents/2026/06/05/2026-11415/promoting-advanced-artificial-intelligence-innovation-and-security

- **`us-frontier-access-eo` · desc**

  Current:

  > EO signed June 2, 2026. Directs federal agencies to establish a framework for voluntary pre-release access (up to 30 days) by frontier-model developers for national-security review.

  Proposed:

  > EO 14409, signed June 2, 2026. Directs Treasury, NSA and CISA to design a voluntary framework under which developers may give the government access to 'covered frontier models' (designated by the NSA Director via a classified cyber benchmark) for up to 30 days before release to other trusted partners. Rules out mandatory licensing or preclearance.

- **`us-frontier-access-eo` · context**

  Current:

  > Marks a notable shift in the Trump administration's posture — from deregulation (EO 14179) and state preemption (EO 14365) toward asking for federal access to pre-release frontier models. The 30-day voluntary window mirrors the access agreements UK AISI uses; CAISI is positioned to administer reviews. Whether the framework results in a meaningful national-security review process or remains nominal will depend on developer participation.

  Proposed:

  > Marks a notable shift in the Trump administration's posture — from deregulation (EO 14179) and state preemption (EO 14365) toward asking for federal access to pre-release frontier models, though the order itself is scoped to cyber capabilities and rejects 'overly burdensome regulation'. The 30-day voluntary window mirrors the access agreements UK AISI uses. NSA, Treasury and CISA lead; CAISI is not named and NIST is only consulted. Whether the framework results in meaningful federal access will depend on developer participation.

- **`us-frontier-access-eo` · coverage · eval**

  Current:

  > Pre-release access (up to 30 days) could enable systematic federal evaluation of frontier models if developers participate.

  Proposed:

  > Voluntary early access (up to 30 days) to models the NSA designates through a classified cyber-capability benchmark; scoped to cyber capabilities, not general safety evaluation.

- **`us-frontier-access-eo` · coverage · timing**

  Current:

  > 30-day pre-release window; voluntary participation.

  Proposed:

  > Benchmark and framework due within 60 days of the order; access window up to 30 days before release to other trusted partners; participation voluntary.

- **`us-frontier-access-eo` · coverage · acct**

  Current:

  > Federal review mechanism for national-security risks. Departs from prior administration's deregulatory-only posture.

  Proposed:

  > Creates no approval or preclearance power (§3(c)) and no enforceable rights (§5(c)). Also directs a Treasury-led AI cybersecurity clearinghouse and a DOJ enforcement priority on AI-enabled computer crime.

**Why it matters:** The entry's only source is a news article. On the official text, two of its claims are wrong. CAISI does not administer reviews (it is not named; NSA, Treasury and CISA lead, and the NSA Director designates covered models). The order creates no 'review': it sets up voluntary access and expressly rules out preclearance. It also scopes access to cyber capabilities, which the map omits.

**Reasoning:** All new facts come from the Federal Register text, EO 14409, 91 FR 34565 (S-0038), and its FR API record (S-0039): number, title, signing and publication dates, §3 roles, §3(a) classified cyber benchmark and NSA designation, §3(b) voluntary framework and up-to-30-day access before release to other trusted partners, §3(c) no licensing or preclearance, §2(d) clearinghouse, §4 DOJ priority, §5(c) no enforceable rights. The link moves from NPR to the Federal Register document page, matching the map's other EO entries. The context keeps the map's 'notable shift' analysis and the UK AISI comparison (both carried over), adds that the order itself frames things as reducing regulation (§1), and replaces 'CAISI is positioned to administer reviews'.

**Evidence**

- **S-0038** Federal Register 91 FR 34565: Executive Order 14409, Promoting Advanced Artificial Intelligence Innovation and Security — <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-06-02, published 2026-06-05
  Heading and §1 Purpose:
  > Executive Order 14409 of June 2, 2026 … Promoting Advanced Artificial Intelligence Innovation and Security … The United States continues to lead the world in Artificial Intelligence (AI) because of … our AI industry, and because we refuse to stifle this innovation with overly burdensome regulation.
  _Supports:_ EO number, title, date; §1 deregulatory framing
- **S-0039** Federal Register API record for FR Doc. 2026-11415 (EO 14409) — <https://www.federalregister.gov/api/v1/documents/2026-11415.json>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-06-02, published 2026-06-05
  API record fields:
  > executive_order_number 14409; signing_date 2026-06-02; publication_date 2026-06-05; citation 91 FR 34565; document_number 2026-11415; corrections: none
  _Supports:_ FR citation and dates; no corrections
- **S-0038** Federal Register 91 FR 34565: Executive Order 14409, Promoting Advanced Artificial Intelligence Innovation and Security — <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-06-02, published 2026-06-05
  §3 Secure Frontier Model Deployment (lead agencies):
  > Within 60 days … the Secretary of the Treasury, the Secretary of War, through the Director of NSA, and the Secretary of Homeland Security, through the Director of CISA, in consultation with … the Secretary of Commerce, through the Director of the National Institute of Standards and Technology … shall:
  _Supports:_ Lead and consulted agencies
- **S-0038** Federal Register 91 FR 34565: Executive Order 14409, Promoting Advanced Artificial Intelligence Innovation and Security — <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-06-02, published 2026-06-05
  §3(a):
  > develop and maintain a classified benchmarking process to assess the advanced cyber capabilities of AI models and determine the threshold at which an AI model should be designated a 'covered frontier model' … Such a determination shall be made by the Director of NSA
  _Supports:_ Classified cyber benchmark; NSA Director designates
- **S-0038** Federal Register 91 FR 34565: Executive Order 14409, Promoting Advanced Artificial Intelligence Innovation and Security — <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-06-02, published 2026-06-05
  §3(b), §3(b)(ii):
  > design a voluntary framework with AI developers through which developers would be able to: … provide the Federal Government with access to covered frontier models … for a period of up to 30 days before they plan to release such models to other trusted partners
  _Supports:_ Voluntary framework; up to 30 days before release to other trusted partners
- **S-0038** Federal Register 91 FR 34565: Executive Order 14409, Promoting Advanced Artificial Intelligence Innovation and Security — <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-06-02, published 2026-06-05
  §3(c):
  > Nothing in this section shall be construed to authorize the creation of a mandatory governmental licensing, preclearance, or permitting requirement for the development, publication, release, or distribution of new AI models, including frontier models.
  _Supports:_ No licensing or preclearance
- **S-0038** Federal Register 91 FR 34565: Executive Order 14409, Promoting Advanced Artificial Intelligence Innovation and Security — <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-06-02, published 2026-06-05
  §2(d):
  > Within 30 days of the date of this order, the Secretary of the Treasury … shall form an AI cybersecurity clearinghouse, in voluntary collaboration with the AI industry and operators of critical infrastructure, that coordinates and deconflicts scanning for software vulnerabilities
  _Supports:_ Clearinghouse
- **S-0038** Federal Register 91 FR 34565: Executive Order 14409, Promoting Advanced Artificial Intelligence Innovation and Security — <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-06-02, published 2026-06-05
  §4 and §5(c):
  > The Attorney General shall prioritize the enforcement of 18 U.S.C. 1028, 18 U.S.C. 1030 … This order is not intended to, and does not, create any right or benefit, substantive or procedural, enforceable at law or in equity
  _Supports:_ DOJ priority; no enforceable rights
- **S-0038** Federal Register 91 FR 34565: Executive Order 14409, Promoting Advanced Artificial Intelligence Innovation and Security — <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-06-02, published 2026-06-05
  Whole text (searched):
  > The order does not mention the Center for AI Standards and Innovation (CAISI), 'safety', 'evaluation', 'testing' or 'review'. NIST appears once, as a consulted agency in §3.
  _Supports:_ CAISI not named; NIST consulted only
- **S-0004** https://www.npr.org/2026/06/02/nx-s1-5844347/ai-safety-trump-executive-order — <https://www.npr.org/2026/06/02/nx-s1-5844347/ai-safety-trump-executive-order>
  secondary · retrieved 2026-10-10 · access: ok
  Standfirst:
  > The order asks AI companies to voluntarily submit their most powerful models for the government to test up to 30 days before releasing them to the public.

**Carried over unchanged, not re-verified:** 'Marks a notable shift in the Trump administration's posture — from deregulation (EO 14179) and state preemption (EO 14365)': the map's own analysis; the White House frames the order as continuity; 'The 30-day voluntary window mirrors the access agreements UK AISI uses': not checked against UK AISI sources

**Conflicting evidence — resolved (the authoritative (official/legal) text settles it).** Disagreement: NPR (the map's current source) says companies would submit models for the government to 'test up to 30 days before releasing them to the public', and calls this a 'review'. The order says developers may give access 'for a period of up to 30 days before they plan to release such models to other trusted partners'. It does not use the word 'review', and it rules out any preclearance.. Why resolved: The Federal Register text is the legal instrument (91 FR 34565). NPR paraphrases it. Where they differ, on the release reference point and the 'review' framing, the order's own wording governs.

**Uncertainty:** Whether the benchmark, framework or clearinghouse has been delivered was not checked; no official announcement was found. pow 3 (hard law, weak enforcement) is unchanged. It fits an EO that binds agencies but is voluntary for developers, but that classification is a rubric question for the baseline. The name 'US Frontier AI Access EO' is an informal label and is unchanged.

**May need reconsideration if accepted**

- `edge:us-frontier-access-eo|us-eo14179` — **map analysis; unchanged**: Marks shift from prior deregulation-only EO posture
- `edge:us-frontier-access-eo|caisi` — **contradicted: see P-0015**
- `edge:us-frontier-access-eo|uk-aisi` — **not checked (UK AISI sources not read)**: 30-day access model mirrors UK AISI voluntary access agreements
- `edge:fsi|us-frontier-access-eo` — **says 'the EO's national-security review framework'; the order has no review framework. fsi was not checked; raise in the baseline audit**: FSI's policy translation aligns with the EO's national-security review framework

---

### P-0015 v1 — Remove connection US Frontier AI Access EO ↔ CAISI: the order does not name CAISI

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v1, 2026-10-10) · confidence: high · change-hash `17f88ce20310`

**Linked:** P-0014

**Change**

- **remove connection `us-frontier-access-eo` ↔ `caisi`**

  Current:

  > _(absent)_

  Proposed:

  > _(absent)_

**Question for you:** Remove the connection (recommended), or keep it with the alternative wording in the reasoning?

**Why it matters:** The connection says 'EO designates CAISI to administer national-security reviews'. EO 14409 does not mention CAISI, and it creates no review. NIST appears once, as one of several agencies consulted by Treasury, NSA and CISA.

**Reasoning:** Removal rather than rewording: NIST is consulted, but there is no CAISI-specific relationship to describe. If you would rather keep a link, an accurate alternative is: 'EO 14409 consults NIST (CAISI's parent) on the NSA-led cyber benchmark and access framework; CAISI is not named'.

**Evidence**

- **S-0038** Federal Register 91 FR 34565: Executive Order 14409, Promoting Advanced Artificial Intelligence Innovation and Security — <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-06-02, published 2026-06-05
  Whole text (searched):
  > The order does not mention the Center for AI Standards and Innovation (CAISI), 'safety', 'evaluation', 'testing' or 'review'. NIST appears once, as a consulted agency in §3.
  _Supports:_ CAISI not named; NIST consulted only
- **S-0038** Federal Register 91 FR 34565: Executive Order 14409, Promoting Advanced Artificial Intelligence Innovation and Security — <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-06-02, published 2026-06-05
  §3 Secure Frontier Model Deployment (lead agencies):
  > Within 60 days … the Secretary of the Treasury, the Secretary of War, through the Director of NSA, and the Secretary of Homeland Security, through the Director of CISA, in consultation with … the Secretary of Commerce, through the Director of the National Institute of Standards and Technology … shall:
  _Supports:_ Roles under §3

**Uncertainty:** Agencies may still involve CAISI in implementation. Nothing official was found on that, and NIST's CAISSI page does not mention the order.

**May need reconsideration if accepted**

- `edge:us-frontier-access-eo|us-eo14179`: Marks shift from prior deregulation-only EO posture
- `edge:us-frontier-access-eo|uk-aisi`: 30-day access model mirrors UK AISI voluntary access agreements
- `edge:fsi|us-frontier-access-eo`: FSI's policy translation aligns with the EO's national-security review framework
- `edge:aisi-net|caisi`: CAISI represents the US in the network
- `edge:us-eo14179|caisi`: EO led to AISI rename to CAISI in Jun 2025
- `edge:caisi|nist-rmf`: CAISI sits within NIST alongside the AI RMF
- `edge:fsi|caisi` — **not checked**: Both work on national-security review of frontier models
- `faq:what-is-the-difference-between-layer-2-and-layer`: What is the difference between Layer 2 and Layer 4 in the map? — Layer 2 covers the laws themselves — statutes, executive orders, and framework acts like the EU AI Act, US executi…
- Entry text that mentions the affected entries: `entry:aisi-net:desc`, `entry:us-frontier-access-eo:context`, `entry:uk-aisi:context`

---

### P-0016 v1 — EU AI Act: high-risk application dates moved by the Digital Omnibus (Reg. 2026/1744)

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v1, 2026-10-10) · confidence: high · change-hash `51eb7ca184a5`

**Change**

- **`eu-aia` · desc**

  Current:

  > In force Aug 2024. GPAI obligations Aug 2025. Most provisions apply Aug 2026; high-risk system rules Aug 2027. Penalties up to €35M or 7% global revenue.

  Proposed:

  > In force Aug 2024. GPAI obligations Aug 2025. Most provisions apply Aug 2026; the 2026 Digital Omnibus (Reg. 2026/1744) moved high-risk rules to Dec 2027 (Annex III) and Aug 2028 (Annex I). Penalties up to €35M or 7% global revenue.

**Why it matters:** The map says high-risk rules apply in Aug 2027. Regulation (EU) 2026/1744, in force since 27 Jul 2026, set 2 Dec 2027 for Annex III systems and 2 Aug 2028 for Annex I systems. Even before that, 'Aug 2027' applied only to Annex I.

**Reasoning:** The dates come from the Official Journal text of 2026/1744: Art 1(40)(b), replacing AI Act Art 113(c), and Art 4 for entry into force. The Commission's enforcement page agrees. The other clauses were checked and are unchanged. In force Aug 2024 and GPAI obligations Aug 2025 come from AI Act Art 113 (original OJ). Most provisions apply Aug 2026 is the general date, per Omnibus recital 40. €35M/7% is the top penalty tier (Art 99(3)), which the Commission's penalties passage confirms.

**Evidence**

- **S-0041** Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal L series — <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744>
  primary · retrieved 2026-10-10 · access: ok via curl (research subagent, 2026-10-10 ~16:38Z) · adopted 2026-07-08, published 2026-07-24, in_force 2026-07-27
  Art 1(40)(b), replacing AI Act Art 113, third paragraph, point (c):
  > Chapter III, Sections 1, 2, and 3, with the exception of Article 6(5), shall apply from: (i) 2 December 2027 as regards AI systems classified as high-risk pursuant to Article 6(2) and Annex III; and (ii) 2 August 2028 as regards AI systems classified as high-risk pursuant to Article 6(1) and Annex I
  _Supports:_ New high-risk dates
- **S-0041** Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal L series — <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744>
  primary · retrieved 2026-10-10 · access: ok via curl (research subagent, 2026-10-10 ~16:38Z) · adopted 2026-07-08, published 2026-07-24, in_force 2026-07-27
  Title; OJ L 2026/1744, 24.7.2026:
  > REGULATION (EU) 2026/1744 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL of 8 July 2026 amending Regulations (EU) 2024/1689, (EU) 2018/1139 and (EU) 2023/1230 as regards the simplification of the implementation of harmonised rules on artificial intelligence (Digital Omnibus on AI)
  _Supports:_ Regulation number, title, date
- **S-0041** Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal L series — <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744>
  primary · retrieved 2026-10-10 · access: ok via curl (research subagent, 2026-10-10 ~16:38Z) · adopted 2026-07-08, published 2026-07-24, in_force 2026-07-27
  Art 4:
  > This Regulation shall enter into force on the third day following that of its publication in the Official Journal of the European Union.
  _Supports:_ Entry into force
- **S-0041** Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal L series — <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744>
  primary · retrieved 2026-10-10 · access: ok via curl (research subagent, 2026-10-10 ~16:38Z) · adopted 2026-07-08, published 2026-07-24, in_force 2026-07-27
  Recital 40:
  > Article 113 of Regulation (EU) 2024/1689 establishes the dates of entry into force and application of that Regulation, in particular that the general date of application is 2 August 2026.
  _Supports:_ General application date 2 Aug 2026
- **S-0043** European Commission: The enforcement framework of the AI Act — <https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act>
  primary · retrieved 2026-10-10 · access: ok
  Penalties:
  > Infringements involving prohibited AI practices are subject to the highest penalties, of up to €35 million or 7% of the offender's total worldwide annual turnover, whichever is higher. Other breaches, including of the obligations for GPAI models, may result in fines of up to €15 million or 3% of total worldwide annual turnover
  _Supports:_ €35M/7% is the highest tier

**Uncertainty:** The Omnibus OJ text was read from a copy fetched (HTTP 200) earlier the same day. Later EUR-Lex requests returned empty HTTP 202 responses, and the fetch is recorded as such. The Commission enforcement page (S-0043) independently states the same Annex III and Annex I dates. The Omnibus also brought forward new prohibitions (nudification apps, CSAM) from 2 Dec 2026; these are not added, to keep the edit minimal.

**May need reconsideration if accepted**

- `edge:coe-ai|eu-aia`: CoE Convention is the international treaty layer above EU AI Act
- `edge:eu-aia|eu-aio`: EU AI Office is the regulator implementing EU AI Act
- `edge:gpai-cop|eu-aia`: GPAI Code is the voluntary route to EU AI Act compliance
- `edge:uk-ico|eu-aia`: UK GDPR/ICO guidance and EU AI Act set parallel data/AI standards
- `gap:eval`: Evaluations everywhere, mandates almost nowhere — Most mechanisms touch evaluations in some way, but mandatory third-party evaluation of frontier models is rare. The EU AI Act req…
- `gap:elicit`: Capability elicitation sits with evaluators, not regulators — Almost no statute requires it; only the EU AI Act and the GPAI Code do, indirectly through adversarial-testing langua…
- `gap:timing`: Pre-deployment is widely required; post-deployment is sparse — Pre-deployment timing is the easy part: the EU AI Act, China's GenAI Measures, Korea's Framework Act, and the lab fr…
- `gap:sec`: Weight security is mostly self-imposed — The EU AI Act addresses it. The GPAI Code addresses it. The G7 Hiroshima Process mentions it. The lab frameworks all impose escalating tie…
- `gap:acct`: The well-populated column — but not all accountability is equal — Most mechanisms claim accountability of some kind, from binding incident reporting (SB 53, RAISE Act, EU AI Act) …
- `gap:update`: Most policies don't update themselves — The EU AI Act revises through its Code of Practice. California SB 53 requires labs to keep their published frameworks current. NIST AI RMF,…
- `faq:which-ai-laws-are-binding-with-penalties`: Which AI laws are binding with penalties? — Five AI laws in this map are classed as binding with penalties: the EU AI Act (up to €35M or 7% of global revenue), China's GenAI Measu…
- `faq:what-does-the-eu-ai-act-require-for-systemic-ris`: What does the EU AI Act require for systemic-risk GPAI? — General-purpose AI models trained with cumulative compute above 10²⁵ FLOPs are presumed to have systemic risk and face ad…
- `faq:what-does-the-eu-ai-office-do`: What does the EU AI Office do? — The EU AI Office (established January 2024 within DG CNECT) coordinates EU AI Act implementation across member states and directly enforces GPAI o…
- `faq:what-is-the-difference-between-layer-2-and-layer`: What is the difference between Layer 2 and Layer 4 in the map? — Layer 2 covers the laws themselves — statutes, executive orders, and framework acts like the EU AI Act, US executi…
- `text:footer-sources`: Sources: International AI Safety Report (Feb 2026), METR Common Elements of Frontier AI Safety Policies (Dec 2025), Brundage Substack, EU AI Act and AI Office documentation, Calif…
- Entry text that mentions the affected entries: `entry:kr-ai:cov:thresh`, `entry:kr-ai:cov:eval`, `entry:ca-sb53:desc`, `entry:co-aia:desc`, `entry:co-aia:context`, `entry:co-aia:cov:acct`, `entry:gpai-cop:desc`, `entry:gpai-cop:context`, `entry:gpai-cop:cov:thresh`, `entry:gpai-cop:cov:eval`, `entry:gpai-cop:cov:sec`, `entry:gpai-cop:cov:acct`, `entry:meta-faif:context`, `entry:meta-faif:cov:acct`, `entry:xai-rmf:desc`, `entry:eu-aio:context`, `entry:averi:context`, `entry:averi:cov:eval`

---

### P-0017 v1 — EU AI Office: GPAI fines are capped at €15M or 3%, not €35M or 7%; enforcement powers apply since Aug 2026

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v1, 2026-10-10) · confidence: high · change-hash `b77b6d4a1d68`

**Change**

- **`eu-aia` · coverage · acct**

  Current:

  > Mandatory incident reporting to the EU AI Office for systemic-risk GPAI; market-surveillance authorities handle high-risk systems. The Office can request models, order recalls, and impose fines up to €35M / 7% global revenue.

  Proposed:

  > Mandatory incident reporting to the EU AI Office for systemic-risk GPAI; market-surveillance authorities handle high-risk systems. The Office can request models, order recalls, and fine GPAI providers up to €15M / 3% global revenue.

- **`index.html`**

  Current:

  > impose fines up to €35M or 7% of global revenue, and runs the Scientific Panel of independent experts advising on systemic risk. Full enforcement powers activate in August 2026.

  Proposed:

  > fine GPAI providers up to €15M or 3% of global revenue, and runs the Scientific Panel of independent experts advising on systemic risk. Its enforcement powers have applied since August 2026.

**Why it matters:** Both the eu-aia accountability note and the FAQ answer on the AI Office give the AI Office a fine ceiling of €35M or 7%. That ceiling is for prohibited practices. Fines on GPAI model providers, which the Office enforces, are capped at €15M or 3% (Art 101). The FAQ also still says powers 'activate in August 2026', a date that has passed.

**Reasoning:** From AI Act Art 101(1) (original OJ text, S-0002) and the Commission's enforcement page (S-0043): '€35 million or 7%' for prohibited practices; 'Other breaches, including of the obligations for GPAI models … up to €15 million or 3%'; powers 'apply from 2 August 2026'. The Omnibus (Art 75c(4)) now lets the Office use the Art 99 tiers for AI systems under its new Art 75(1) competence. The highest of those tiers (€35M/7%) is still for prohibited practices only, so 'GPAI providers … €15M / 3%' is the accurate general statement. 'Established January 2024 within DG CNECT' and the Scientific Panel are carried over.

**Evidence**

- **S-0002** https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng — <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng>
  primary · retrieved 2026-10-10 · access: ok · adopted 2024-06-13, published 2024-07-12
  Art 101(1):
  > The Commission may impose on providers of general-purpose AI models fines not exceeding 3 % of their annual total worldwide turnover in the preceding financial year or EUR 15 000 000, whichever is higher
  _Supports:_ Art 101(1) GPAI fine cap
- **S-0043** European Commission: The enforcement framework of the AI Act — <https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act>
  primary · retrieved 2026-10-10 · access: ok
  Penalties:
  > Infringements involving prohibited AI practices are subject to the highest penalties, of up to €35 million or 7% of the offender's total worldwide annual turnover, whichever is higher. Other breaches, including of the obligations for GPAI models, may result in fines of up to €15 million or 3% of total worldwide annual turnover
  _Supports:_ Fine tiers
- **S-0043** European Commission: The enforcement framework of the AI Act — <https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act>
  primary · retrieved 2026-10-10 · access: ok
  Timeline:
  > The enforcement powers of the AI Office and the national competent authorities of the Member States apply from 2 August 2026, when certain provisions of the AI Act become enforceable.
  _Supports:_ Powers apply from 2 Aug 2026
- **S-0041** Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal L series — <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744>
  primary · retrieved 2026-10-10 · access: ok via curl (research subagent, 2026-10-10 ~16:38Z) · adopted 2026-07-08, published 2026-07-24, in_force 2026-07-27
  Art 1(32), new AI Act Art 75c(4):
  > A decision adopted pursuant to paragraph 1 of this Article may be accompanied by the imposition of penalties in accordance with Article 99(3) to (7), which provisions shall apply mutatis mutandis to the AI Office in the execution of its supervision and enforcement tasks referred to in Article 75(1).
  _Supports:_ Omnibus: Art 99(3)-(7) penalties for AI systems under the Office's new competence
- **S-0041** Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal L series — <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744>
  primary · retrieved 2026-10-10 · access: ok via curl (research subagent, 2026-10-10 ~16:38Z) · adopted 2026-07-08, published 2026-07-24, in_force 2026-07-27
  Art 1(31)(b), new AI Act Art 75(1):
  > The AI Office shall be exclusively competent for the supervision and enforcement of the obligations under this Regulation in relation to the following AI systems: (a) AI systems based on general-purpose AI models where the model and the system are developed by the same provider … (b) AI systems that constitute or that are integrated into a very large online platform or very large online search engine

**Carried over unchanged, not re-verified:** FAQ: 'established January 2024 within DG CNECT', 'a centralised role unique within EU regulatory architecture', 'runs the Scientific Panel'

**Uncertainty:** After the Omnibus, the Office can also fine certain AI systems (those built on a provider's own GPAI model, and those in very large online platforms) under the Art 99 tiers. A fuller description of its new powers belongs to the eu-aio entry, which is outside this trial.

**May need reconsideration if accepted**

- `edge:coe-ai|eu-aia`: CoE Convention is the international treaty layer above EU AI Act
- `edge:eu-aia|eu-aio`: EU AI Office is the regulator implementing EU AI Act
- `edge:gpai-cop|eu-aia`: GPAI Code is the voluntary route to EU AI Act compliance
- `edge:uk-ico|eu-aia`: UK GDPR/ICO guidance and EU AI Act set parallel data/AI standards
- `gap:eval`: Evaluations everywhere, mandates almost nowhere — Most mechanisms touch evaluations in some way, but mandatory third-party evaluation of frontier models is rare. The EU AI Act req…
- `gap:elicit`: Capability elicitation sits with evaluators, not regulators — Almost no statute requires it; only the EU AI Act and the GPAI Code do, indirectly through adversarial-testing langua…
- `gap:timing`: Pre-deployment is widely required; post-deployment is sparse — Pre-deployment timing is the easy part: the EU AI Act, China's GenAI Measures, Korea's Framework Act, and the lab fr…
- `gap:sec`: Weight security is mostly self-imposed — The EU AI Act addresses it. The GPAI Code addresses it. The G7 Hiroshima Process mentions it. The lab frameworks all impose escalating tie…
- `gap:acct`: The well-populated column — but not all accountability is equal — Most mechanisms claim accountability of some kind, from binding incident reporting (SB 53, RAISE Act, EU AI Act) …
- `gap:update`: Most policies don't update themselves — The EU AI Act revises through its Code of Practice. California SB 53 requires labs to keep their published frameworks current. NIST AI RMF,…
- `faq:which-ai-laws-are-binding-with-penalties` — **'EU AI Act (up to €35M or 7%)' is the Act's top tier and is accurate**: Which AI laws are binding with penalties? — Five AI laws in this map are classed as binding with penalties: the EU AI Act (up to €35M or 7% of global revenue), China's GenAI Measu…
- `faq:what-does-the-eu-ai-act-require-for-systemic-ris`: What does the EU AI Act require for systemic-risk GPAI? — General-purpose AI models trained with cumulative compute above 10²⁵ FLOPs are presumed to have systemic risk and face ad…
- `faq:what-does-the-eu-ai-office-do`: What does the EU AI Office do? — The EU AI Office (established January 2024 within DG CNECT) coordinates EU AI Act implementation across member states and directly enforces GPAI o…
- `faq:what-is-the-difference-between-layer-2-and-layer`: What is the difference between Layer 2 and Layer 4 in the map? — Layer 2 covers the laws themselves — statutes, executive orders, and framework acts like the EU AI Act, US executi…
- `text:footer-sources`: Sources: International AI Safety Report (Feb 2026), METR Common Elements of Frontier AI Safety Policies (Dec 2025), Brundage Substack, EU AI Act and AI Office documentation, Calif…
- Entry text that mentions the affected entries: `entry:kr-ai:cov:thresh`, `entry:kr-ai:cov:eval`, `entry:ca-sb53:desc`, `entry:co-aia:desc`, `entry:co-aia:context`, `entry:co-aia:cov:acct`, `entry:gpai-cop:desc`, `entry:gpai-cop:context`, `entry:gpai-cop:cov:thresh`, `entry:gpai-cop:cov:eval`, `entry:gpai-cop:cov:sec`, `entry:gpai-cop:cov:acct`, `entry:meta-faif:context`, `entry:meta-faif:cov:acct`, `entry:xai-rmf:desc`, `entry:eu-aio:context`, `entry:averi:context`, `entry:averi:cov:eval`

---

### P-0018 v1 — EU GPAI Code: Model Reports every six months, not annual; content marking is not in the GPAI Code

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v1, 2026-10-10) · confidence: high · change-hash `57c427d2479d`

**Change**

- **`gpai-cop` · coverage · acct**

  Current:

  > Transparency obligations extend to model documentation, training-data summaries, and copyright disclosures. Signatories report annually; non-signatories must demonstrate AI Act compliance through other means.

  Proposed:

  > Transparency obligations extend to model documentation, training-data summaries, and copyright disclosures. Safety signatories update Model Reports to the AI Office at least every six months for their most capable models; non-signatories must demonstrate AI Act compliance through other means.

- **`gpai-cop` · coverage · mit**

  Current:

  > Deployment mitigations include content marking, refusals, and user-facing transparency. The transparency chapter (separate from safety) governs documentation duties.

  Proposed:

  > Deployment mitigations include input/output filtering, refusals, and staged access. The transparency chapter (separate from safety) governs documentation duties; marking AI-generated content falls under a separate Article 50 code.

**Why it matters:** The map says Code signatories 'report annually'. The Safety and Security chapter requires updated Model Reports to the AI Office at least every six months for a signatory's most capable models. The mitigations note also lists content marking, which the GPAI Code does not require. Marking is an AI Act Article 50 duty, with its own code of practice.

**Reasoning:** From the Safety and Security chapter PDF (S-0044): Measure 7.6 (six-monthly Model Reports) and Measure 5.1 (listed safety mitigations: filtering, refusals, staged access; no marking measure). Watermarks appear only as a post-market monitoring technique. The Article 50 code is described on the Commission's page (S-0045). 'User-facing transparency' is dropped from the mitigations note because nothing inspected supports it as a GPAI Code mitigation.

**Evidence**

- **S-0044** GPAI Code of Practice: Safety and Security chapter (Jul 2025) — <https://ec.europa.eu/newsroom/dae/redirection/document/118119>
  primary · retrieved 2026-10-10 · access: ok
  Commitment 7, Measure 7.6:
  > if the model is amongst their respective most capable models available on the market, Signatories will provide the AI Office with an updated Model Report at least every six months.
  _Supports:_ Six-monthly Model Reports
- **S-0044** GPAI Code of Practice: Safety and Security chapter (Jul 2025) — <https://ec.europa.eu/newsroom/dae/redirection/document/118119>
  primary · retrieved 2026-10-10 · access: ok
  Commitment 5, Measure 5.1 (examples of safety mitigations):
  > (2) monitoring and filtering the model's inputs and/or outputs; (3) changing the model behaviour in the interests of safety, such as fine-tuning the model to refuse certain requests … (4) staging the access to the model, e.g. by limiting API access to vetted users … [No content-marking measure; watermarks appear only as a post-market monitoring technique (Commitment 3)]
  _Supports:_ Safety mitigations listed; no content marking
- **S-0045** European Commission: Code of practice on transparency of AI-generated content — <https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content>
  primary · retrieved 2026-10-10 · access: ok
  Overview:
  > [The code] helps providers and deployers of generative AI systems to comply with the AI Act's obligations for labelling and marking of AI-generated content – Article 50(2), (4) and (5) … 10 June 2026 Closing Plenary Publication of the final code of practice
  _Supports:_ Marking/labelling has a separate Article 50 code

**Carried over unchanged, not re-verified:** acct: 'training-data summaries, and copyright disclosures' (Transparency and Copyright chapters not read)

**Uncertainty:** 'Training-data summaries' come from the Commission's Art 53 template rather than the Code itself; carried over. The signatory statements in desc were checked against the Commission list (S-0003#1) and stand. 'Meta declined' is consistent with Meta's absence from the list, but no primary Meta statement was read. Note that Meta did sign the separate Article 50 code.

**May need reconsideration if accepted**

- `edge:gpai-cop|eu-aia`: GPAI Code is the voluntary route to EU AI Act compliance
- `edge:gpai-cop|rsp`: Anthropic signed all three chapters
- `edge:gpai-cop|prep`: OpenAI signed all three chapters
- `edge:gpai-cop|fsf`: Google signed all three chapters
- `edge:gpai-cop|meta-faif`: Meta declined to sign
- `edge:gpai-cop|xai-rmf`: xAI signed only the safety chapter
- `edge:gpai-cop|eu-aio`: EU AI Office runs and oversees the CoP
- `gap:elicit`: Capability elicitation sits with evaluators, not regulators — Almost no statute requires it; only the EU AI Act and the GPAI Code do, indirectly through adversarial-testing langua…
- `gap:sec`: Weight security is mostly self-imposed — The EU AI Act addresses it. The GPAI Code addresses it. The G7 Hiroshima Process mentions it. The lab frameworks all impose escalating tie…
- `gap:halt`: Few mechanisms can compel a frontier developer to halt — Conditions for halting are the rarest column in the matrix. The EU AI Office can order recall (Aug 2026 onwards). The GPAI…
- `gap:update`: Most policies don't update themselves — The EU AI Act revises through its Code of Practice. California SB 53 requires labs to keep their published frameworks current. NIST AI RMF,…
- `faq:what-does-the-eu-ai-act-require-for-systemic-ris`: What does the EU AI Act require for systemic-risk GPAI? — General-purpose AI models trained with cumulative compute above 10²⁵ FLOPs are presumed to have systemic risk and face ad…
- Entry text that mentions the affected entries: `entry:eu-aia:cov:eval`, `entry:eu-aia:cov:elicit`, `entry:eu-aia:cov:sec`, `entry:eu-aia:cov:update`, `entry:hiroshima:cov:eval`, `entry:rsp:context`, `entry:rsp:cov:acct`, `entry:prep:context`, `entry:meta-faif:desc`, `entry:meta-faif:context`, `entry:meta-faif:cov:acct`, `entry:metr:cov:thresh`, `entry:nist-rmf:context`, `entry:nist-rmf:cov:acct`

---

### P-0019 v1 — China AI Law: still a preparatory planning item with no draft; correct the '2025 plan dropped it' claim and add an official source link

`change` · evidence: **Verified against inspected external sources** · decision: **accepted** (v1, 2026-10-10) · confidence: high · change-hash `abfbe2e7035a`

**Change**

- **`cn-ai-law` · link**

  Current:

  > _(absent)_

  Proposed:

  > http://www.npc.gov.cn/npc/c2/c30834/202605/P020260511309265804880.pdf

- **`cn-ai-law` · desc**

  Current:

  > Comprehensive AI law in drafting at NPC. Compute thresholds debated.

  Proposed:

  > Comprehensive AI legislation at the planning stage: an unscheduled preparatory item in the NPC Standing Committee's 2025 and 2026 legislative plans; the State Council's 2026 plan calls for accelerating it. No draft has been submitted.

- **`cn-ai-law` · context**

  Current:

  > Would consolidate the patchwork of CAC measures (recommendation algorithms, deep synthesis, generative AI) into a single statute; competing proposals from MOST and CAIC have circulated. The 2025 NPC plan dropped it from preparatory items, so near-term action looks unlikely; in the meantime China is regulating frontier issues through narrower instruments — cybersecurity-law amendments, draft rules on humanlike interactive AI.

  Proposed:

  > Could consolidate the patchwork of CAC measures (recommendation algorithms, deep synthesis, generative AI) into a single statute. The State Council dropped a named AI Law draft from its 2025 plan, then in May 2026 called for accelerating 'comprehensive legislation'; MOST-led drafting of a framework text was under way in late 2025. In the meantime China regulates frontier issues through narrower instruments — a Cybersecurity Law AI article (in force Jan 2026) and CAC rules on humanlike interactive AI (in force Jul 2026).

- **`cn-ai-law` · coverage · thresh**

  Current:

  > Compute thresholds have featured in competing draft proposals from MOST and CAIC; the eventual statute is expected to set capability or compute thresholds, but specifics aren't fixed.

  Proposed:

  > No official draft has been published, so thresholds are not yet defined.

- **`cn-ai-law` · coverage · eval**

  Current:

  > Drafts have signalled risk assessment obligations for high-impact AI systems; details are still being negotiated within the NPC process.

  Proposed:

  > No official draft has been published, so evaluation duties are not yet defined.

- **`cn-ai-law` · coverage · mit**

  Current:

  > Drafts have proposed mitigation duties layered on top of the existing CAC measures, but specifics depend on which competing proposal prevails.

  Proposed:

  > No official draft has been published, so mitigation duties are not yet defined.

- **`cn-ai-law` · coverage · acct**

  Current:

  > Drafts envisage centralised oversight expansion — consolidating algorithm registration, deep-synthesis rules, and generative-AI rules under one statute. Whether this strengthens or duplicates current CAC powers is open.

  Proposed:

  > No official draft has been published, so the oversight structure is not yet defined. Drafting is ministry-led (MOST and others) ahead of any NPC Standing Committee reading.

- **connection `cn-genai` ↔ `cn-ai-law`**

  Current:

  > GenAI Measures will be folded into the AI Law

  Proposed:

  > GenAI Measures could be consolidated into a comprehensive AI law

**Why it matters:** The entry has no source link. It says the law is 'in drafting at NPC' and that 'the 2025 NPC plan dropped it from preparatory items', and its coverage notes describe the contents of 'drafts'. Official sources show there is no published draft. AI legislation is still a preparatory (unscheduled) item in the NPC Standing Committee's 2025 and 2026 plans. It was the State Council's plan that dropped a named 'AI Law draft' in 2025, and its 2026 plan calls for accelerating comprehensive legislation. The 'draft rules on humanlike interactive AI' have since been finalised.

**Reasoning:** Official texts: NPCSC 2026 and 2025 legislative plans (S-0049, S-0050), §(三) preparatory items. State Council plans for 2026 (S-0051), 2025 (S-0052) and 2024 (S-0053, MOJ copy). The NPC committee's Jan 2026 report on AI-law motions (S-0057) covers MOST-led framework drafting. The NPCSC decision amending the Cybersecurity Law adds Art. 20 on AI, adopted 28 Oct 2025 and in force 1 Jan 2026 (S-0054). CAC Order No. 21 on humanlike interactive AI was issued 10 Apr 2026, in force 15 Jul 2026 (S-0056, S-0055). Removed as unsupported: 'Compute thresholds debated', 'competing proposals from MOST and CAIC' (no official source; 'CAIC' is unidentified), the draft-content claims in the coverage notes (no official draft exists), and 'near-term action looks unlikely' (the State Council's 2026 wording is 'accelerate'). The link is the NPCSC 2026 plan PDF, which settles the NPC status. 'Could consolidate…' softens a speculative claim. status 'proposed' and pow 2 are unchanged.

**Evidence**

- **S-0049** NPCSC 2026 Legislative Work Plan (全国人大常委会2026年度立法工作计划) — <http://www.npc.gov.cn/npc/c2/c30834/202605/P020260511309265804880.pdf>
  primary · retrieved 2026-10-10 · access: ok · published 2026-05-11
  Part 2 (三) 预备审议项目 (preparatory review items), p.4–5:
  > ……治理网络暴力和人工智能健康发展等方面的立法项目，由有关方面抓紧开展调研和起草工作，视情安排审议。 [Legislative projects on … governing online violence and the healthy development of AI: relevant parties to step up research and drafting; review to be arranged as circumstances warrant.] AI appears in neither (一) continued review nor (二) first review.
  _Supports:_ 2026 NPCSC plan: preparatory item only
- **S-0050** NPCSC 2025 Legislative Work Plan (全国人大常委会2025年度立法工作计划) — <http://www.npc.gov.cn/npc/c2/c30834/202505/P020250513550316685290.pdf>
  primary · retrieved 2026-10-10 · access: ok · published 2025-05-13
  (三) 预备审议项目, p.4:
  > ……治理网络违法行为和人工智能健康发展等方面的立法项目，由有关方面抓紧开展调研和起草工作，视情安排审议。 [… and the healthy development of AI: relevant parties to step up research and drafting; review as circumstances warrant.]
  _Supports:_ 2025 NPCSC plan: preparatory item (contradicts the map)
- **S-0051** State Council 2026 Legislative Work Plan (国办发〔2026〕14号) — <https://www.gov.cn/zhengce/content/202605/content_7068345.htm>
  primary · retrieved 2026-10-10 · access: ok · signed 2026-05-08, published 2026-05-11
  Part 2, science and technology paragraph:
  > 完善人工智能治理，加快推进人工智能健康发展综合性立法 [Improve AI governance; accelerate comprehensive legislation on the healthy development of AI]. The AI item does not use the formula 预备提请全国人大常委会审议…草案 (preparing to submit a draft to the NPCSC) used for other bills in the same paragraph.
  _Supports:_ State Council 2026: accelerate comprehensive legislation
- **S-0052** State Council 2025 Legislative Work Plan (国办发〔2025〕17号), State Council Gazette — <https://www.gov.cn/gongbao/2025/issue_12066/202505/content_7025478.html>
  primary · retrieved 2026-10-10 · access: ok
  Science, education and culture paragraph, final sentence:
  > 推进人工智能健康发展立法工作。 [Advance legislative work on the healthy development of AI.] No named 人工智能法草案 (AI Law draft).
  _Supports:_ State Council 2025: no named draft
- **S-0053** State Council 2024 Legislative Work Plan (国办发〔2024〕23号), Ministry of Justice copy — <https://www.moj.gov.cn/pub/sfbgw/gwxw/xwyw/202405/t20240509_498554.html>
  primary · retrieved 2026-10-10 · access: ok via curl with cookie jar (research subagent, 2026-10-10 ~16:47Z) · published 2024-05-09
  Science, education and culture paragraph:
  > 预备提请全国人大常委会审议……人工智能法草案、商标法修订草案…… [Preparing to submit to the NPCSC … the draft AI Law, the draft revised Trademark Law …]
  _Supports:_ State Council 2024: named AI Law draft
- **S-0057** NPC Education, Science, Culture and Health Committee: report on delegates' motions (3rd Session), Jan 2026 — <http://www.npc.gov.cn/c2/c30834/202601/W020260105533918736222.pdf>
  primary · retrieved 2026-10-10 · access: ok
  Item 5 (motions for an AI law), p.5:
  > 2025年度立法工作计划将'人工智能健康发展'立法列入预备审议项目。目前，科技部等有关部门正在稳步推进人工智能立法相关工作……开展法律文本框架起草工作。 [The 2025 plan listed 'healthy development of AI' legislation as a preparatory item. MOST and other departments are … drafting a framework legal text.]
  _Supports:_ MOST-led framework drafting; 2025 preparatory item
- **S-0054** NPCSC Decision amending the Cybersecurity Law (28 Oct 2025) — <http://www.npc.gov.cn/npc/c2/c30834/202510/t20251028_449048.html>
  primary · retrieved 2026-10-10 · access: ok · adopted 2025-10-28, in_force 2026-01-01
  Header; item 3 (new Art. 20); final clause:
  > （2025年10月28日第十四届全国人民代表大会常务委员会第十八次会议通过）… 增加一条，作为第二十条：'国家支持人工智能基础理论研究……加强风险监测评估和安全监管……' … 本决定自2026年1月1日起施行。 [Adopted 28 Oct 2025; adds Art. 20 on AI incl. risk monitoring, assessment and safety supervision; in force 1 Jan 2026.]
  _Supports:_ Cybersecurity Law Art. 20 on AI, in force 1 Jan 2026
- **S-0056** Interim Measures for Humanlike Interactive AI Services (CAC Order No. 21), Jiangsu Cyberspace Office repost — <https://www.jswx.gov.cn/zhengce/fagui/202604/t20260410_1322320.shtml>
  primary · retrieved 2026-10-10 · access: ok via curl (research subagent, 2026-10-10 ~16:44Z) · published 2026-04-10, in_force 2026-07-15
  CAC Order No. 21, promulgation clause:
  > 《人工智能拟人化互动服务管理暂行办法》……现予公布，自2026年7月15日起施行。……2026年4月10日 [Interim Measures for Humanlike Interactive AI Services … promulgated, effective 15 July 2026 … 10 April 2026]
  _Supports:_ Humanlike interactive AI measures, in force 15 Jul 2026
- **S-0055** CAC: interpretation of the Interim Measures for Humanlike Interactive AI Services — <https://www.cac.gov.cn/2026-04/17/c_1778166820056328.htm>
  primary · retrieved 2026-10-10 · access: ok
  Opening:
  > 近日，国家互联网信息办公室等五部门联合公布《人工智能拟人化互动服务管理暂行办法》 [Recently the CAC and four other departments jointly promulgated the Interim Measures for Humanlike Interactive AI Services]
  _Supports:_ CAC and four departments promulgated the humanlike measures

**Carried over unchanged, not re-verified:** 'Could consolidate the patchwork of CAC measures (recommendation algorithms, deep synthesis, generative AI) into a single statute': softened from 'Would'; not stated in any official source

**Uncertainty:** None of the plans says whether the eventual instrument will be an NPC law or a State Council regulation. Layer 2 and 'proposed' fit either. The MOJ copy of the 2024 State Council plan and the provincial repost of CAC Order 21 were read from copies a research subagent saved. Later direct fetches got connection resets from those sites, and each source record says so. The NPC draft-consultation database (no AI-law draft through 28 Aug 2026) was checked only by the subagent, so 'No draft has been submitted' rests mainly on the 2026 plan listing AI only as a preparatory item.

**May need reconsideration if accepted**

- `gap:timing`: Pre-deployment is widely required; post-deployment is sparse — Pre-deployment timing is the easy part: the EU AI Act, China's GenAI Measures, Korea's Framework Act, and the lab fr…
- `gap:mit`: The most-covered category, and the most ambiguous — Almost every binding regulation covers deployment mitigations in some form — content marking, refusals, monitoring, anti-discri…
- `faq:which-ai-laws-are-binding-with-penalties`: Which AI laws are binding with penalties? — Five AI laws in this map are classed as binding with penalties: the EU AI Act (up to €35M or 7% of global revenue), China's GenAI Measu…
- `faq:what-is-the-difference-between-layer-2-and-layer`: What is the difference between Layer 2 and Layer 4 in the map? — Layer 2 covers the laws themselves — statutes, executive orders, and framework acts like the EU AI Act, US executi…

---

### P-0020 v1 — New entry: EU Code of Practice on Transparency of AI-generated Content (Article 50 marking and labelling)

`addition` · evidence: **Verified against inspected external sources** · decision: **accepted** (v1, 2026-10-10) · confidence: high · change-hash `410d595a202b`

**Change**

- **New entry `eu-genai-code`** — EU AI-generated content code · Layer 5 · jur `eu` · pow 2 · active · https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content

> Voluntary code (final Jun 2026) for the AI Act's Article 50 duties to mark and label AI-generated content; the Commission and AI Board found it adequate in Jul 2026. Anthropic, Google, Meta, Microsoft and OpenAI signed the provider section.

> Two sections: providers commit to machine-readable marking (digitally signed metadata plus imperceptible watermarks) and free detection tools; deployers commit to labelling deepfakes and AI-generated text on matters of public interest. Drafted by independent experts under the AI Office, like the GPAI Code, it gives signatories a recognised route to show compliance with duties that apply from Aug 2026; others must show adequate alternatives to national market-surveillance authorities. Unlike the GPAI Code, Meta signed it.

  - _timing_: The underlying Article 50 duties apply from 2 Aug 2026; generative systems already on the market before then have until 2 Dec 2026 for machine-readable marking.
  - _mit_: Providers mark outputs with signed metadata and imperceptible watermarks so they are detectable as AI-generated; deployers label deepfakes and AI-generated text published on matters of public interest. Aimed at deception and misinformation, not catastrophic risk.
  - _acct_: Signatories must offer detection tools free of charge to users, authorities, researchers and media. Adherence is not conclusive proof of compliance; non-signatories must demonstrate adequate alternatives to market-surveillance authorities.

- **new connection `eu-genai-code` ↔ `eu-aia`**

  Current:

  > _(absent)_

  Proposed:

  > Code implements the AI Act's Article 50 marking and labelling duties

- **new connection `eu-aio` ↔ `eu-genai-code`**

  Current:

  > _(absent)_

  Proposed:

  > AI Office facilitated the drafting by independent experts

**Question for you:** Accept as drafted? Optional extras not included, to keep it minimal: (a) a connection to gpai-cop ('Sibling AI Office code; Meta signed this one but not the GPAI Code'); (b) connections to the lab framework entries of signatories (rsp, prep, meta-faif). Say if you want either.

**Why it matters:** A second AI Act code of practice, adopted in July 2026, that the map does not cover. It shapes how every major generative AI provider, including the frontier labs on the map, marks and enables detection of model outputs in the EU. The maintainer asked for it to be drafted (2026-10-10).

**Reasoning:** Meets RUBRIC §1. It is identifiable (published code text, S-0060). It is material: contextual under SCOPE §C, because it governs deployment-stage marking by GPAI and generative AI providers rather than catastrophic risk. It is attributable: drawn up under the AI Office and assessed as adequate by the Commission and AI Board (S-0046). Layer 5, jur eu, pow 2 and status active mirror gpai-cop, the map's other AI Office code. pow 2 follows RUBRIC §4 ('voluntary government codes'). Every fact comes from Commission pages or the code itself: final publication 10 Jun 2026 (S-0059); adequacy 8 and 9 Jul 2026, and adherence not conclusive proof (S-0046); two sections and non-signatories assessed by market surveillance (S-0045); signed metadata and watermarking (S-0060, Measure 1.1); free detection solution for users, authorities, researchers and media (S-0060, Measure 2.1). Application dates come from the AI Act as amended (S-0041, Art 111(4); S-0045). Section 1 signatories are named by the Commission (S-0058). Meta's absence from the GPAI Code list is from S-0003. Coverage notes are limited to the three METR elements the code actually addresses.

**Evidence**

- **S-0045** European Commission: Code of practice on transparency of AI-generated content — <https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content>
  primary · retrieved 2026-10-10 · access: ok
  Overview and 'Code of Practice':
  > drawn up by independent experts in a multi-stakeholder process facilitated by the AI Office … The Commission and the AI Board have confirmed that the code is an adequate voluntary tool … 2 sections: Section 1: Providers - Rules for marking and detection … Section 2: Deployers - Rules for labelling of deepfakes and AI-generated and manipulated text
  _Supports:_ Two sections; AI Office-facilitated drafting; adequacy
- **S-0045** European Commission: Code of practice on transparency of AI-generated content — <https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content>
  primary · retrieved 2026-10-10 · access: ok
  Overview:
  > These transparency obligations, applicable from 2 August 2026 … providers and deployers that decide to comply through other means will have to demonstrate that those measures are adequate. This will be assessed individually by different market surveillance authorities.
  _Supports:_ Duties apply from 2 Aug 2026; non-signatories assessed by market surveillance
- **S-0059** Commission publishes the code of practice on marking and labelling of AI-generated content (10 Jun 2026) — <https://digital-strategy.ec.europa.eu/en/news/commission-publishes-code-practice-marking-and-labelling-ai-generated-content>
  primary · retrieved 2026-10-10 · access: ok · published 2026-06-10
  News, 10 June 2026:
  > The European Commission published the final Code of Practice on marking and labelling of AI-generated content. The Code is voluntary and sets out practical steps to help providers and deployers of generative artificial intelligence (AI) systems meet the AI Act transparency obligations that will apply from 2 August 2026.
  _Supports:_ Final code published 10 Jun 2026; voluntary
- **S-0046** Commission opinion on the adequacy of the AI-generated content transparency code — <https://digital-strategy.ec.europa.eu/en/library/commission-opinion-assessment-code-practice-transparency-ai-generated-content>
  primary · retrieved 2026-10-10 · access: ok · published 2026-07-09
  Opinion, 9 July 2026:
  > On July 8, the Commission concluded that the Code of Practice on Transparency of AI-generated Content adequately covers the obligations provided for in Articles 50(2), (4) and (5) AI Act … The following day, the AI Board adopted its Adequacy Assessment … Adherence to the code does not constitute conclusive evidence of compliance with these obligations.
  _Supports:_ Commission adequacy 8 Jul; AI Board 9 Jul; not conclusive evidence
- **S-0058** Commission: strong backing for the code of practice on transparency of AI-generated content (signatories, 31 Jul 2026) — <https://digital-strategy.ec.europa.eu/en/news/strong-backing-code-practice-transparency-ai-generated-content>
  primary · retrieved 2026-10-10 · access: ok · published 2026-07-31
  News, 31 July 2026:
  > By the end of July 2026, about 190 organisations … have signed the code. … Examples for Section 1 include: Aleph Alpha, Anthropic, Black Forest Labs, Cohere, Google, Meta, Microsoft, Mistral, Open AI, Synthesia. … Section 1 signatories: 95 · Section 2 signatories: 192 [xAI not listed]
  _Supports:_ Signatories incl. Anthropic, Google, Meta, Microsoft, OpenAI (Section 1)
- **S-0060** Code of Practice on Transparency of AI-Generated Content (final, PDF) — <https://ec.europa.eu/newsroom/dae/redirection/document/129555>
  primary · retrieved 2026-10-10 · access: ok · published 2026-06-10
  Section 1, Measure 1.1 (Sub-measures 1.1.1, 1.1.2):
  > Sub-measure 1.1.1: Digitally signed metadata … Signatories will record information in the metadata on whether the content is AI-generated or manipulated. … Sub-measure 1.1.2: Imperceptible watermarking … The watermark is intended to serve as a robust mechanism to complement the digitally signed metadata
  _Supports:_ Signed metadata and imperceptible watermarks
- **S-0060** Code of Practice on Transparency of AI-Generated Content (final, PDF) — <https://ec.europa.eu/newsroom/dae/redirection/document/129555>
  primary · retrieved 2026-10-10 · access: ok · published 2026-06-10
  Section 1, Measure 2.1 and Sub-measure 2.1.x:
  > Signatories will make available a detection solution … to enable deployers, users … end-users exposed to the content, and other legitimate parties (such as competent authorities, independent researchers, civil society and media organisations) to verify whether content has been generated or manipulated by their AI system … Signatories will make the detection solution available free of charge.
  _Supports:_ Free detection solution for users, authorities, researchers, media
- **S-0041** Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal L series — <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744>
  primary · retrieved 2026-10-10 · access: ok via curl (research subagent, 2026-10-10 ~16:38Z) · adopted 2026-07-08, published 2026-07-24, in_force 2026-07-27
  Art 1(39)(b), new AI Act Art 111(4):
  > Providers of AI systems, including general-purpose AI systems, generating synthetic audio, image, video or text content, that have been placed on the market before 2 August 2026 shall take the necessary steps in order to comply with Article 50(2) by 2 December 2026.
  _Supports:_ Legacy systems: Art 50(2) marking by 2 Dec 2026
- **S-0003** https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai — <https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai>
  primary · retrieved 2026-10-10 · access: ok
  Signatories (page last updated 7 October 2026):
  > AI Studio Delta, Aleph Alpha, Almawave, Amazon, Anthropic, … Google, IBM, … Microsoft, Mistral AI, … OpenAI, … WRITER. In addition, xAI signed up to the Safety and Security Chapter; this means that it will have to demonstrate compliance with the AI Act's obligations concerning transparency and copyright via alternative adequate means.
  _Supports:_ Meta not on the GPAI Code signatory list

**Uncertainty:** Signatories can join or leave; the Commission's list is updated continuously (95 Section 1 and 192 Section 2 signatories as of the 31 Jul 2026 page). xAI does not appear. pow 2 versus pow 1 follows the gpai-cop precedent; the rubric's open question on voluntary government codes applies equally. Google is listed as 'Google', and the map's DeepMind framework entry (fsf) is not connected, since the Google signatory may be the company rather than DeepMind.

**May need reconsideration if accepted**

- `edge:coe-ai|eu-aia`: CoE Convention is the international treaty layer above EU AI Act
- `edge:eu-aia|eu-aio`: EU AI Office is the regulator implementing EU AI Act
- `edge:gpai-cop|eu-aia`: GPAI Code is the voluntary route to EU AI Act compliance
- `edge:uk-ico|eu-aia`: UK GDPR/ICO guidance and EU AI Act set parallel data/AI standards
- `gap:eval`: Evaluations everywhere, mandates almost nowhere — Most mechanisms touch evaluations in some way, but mandatory third-party evaluation of frontier models is rare. The EU AI Act req…
- `gap:elicit`: Capability elicitation sits with evaluators, not regulators — Almost no statute requires it; only the EU AI Act and the GPAI Code do, indirectly through adversarial-testing langua…
- `gap:timing`: Pre-deployment is widely required; post-deployment is sparse — Pre-deployment timing is the easy part: the EU AI Act, China's GenAI Measures, Korea's Framework Act, and the lab fr…
- `gap:sec`: Weight security is mostly self-imposed — The EU AI Act addresses it. The GPAI Code addresses it. The G7 Hiroshima Process mentions it. The lab frameworks all impose escalating tie…
- `gap:acct`: The well-populated column — but not all accountability is equal — Most mechanisms claim accountability of some kind, from binding incident reporting (SB 53, RAISE Act, EU AI Act) …
- `gap:update`: Most policies don't update themselves — The EU AI Act revises through its Code of Practice. California SB 53 requires labs to keep their published frameworks current. NIST AI RMF,…
- `faq:which-ai-laws-are-binding-with-penalties`: Which AI laws are binding with penalties? — Five AI laws in this map are classed as binding with penalties: the EU AI Act (up to €35M or 7% of global revenue), China's GenAI Measu…
- `faq:what-does-the-eu-ai-act-require-for-systemic-ris`: What does the EU AI Act require for systemic-risk GPAI? — General-purpose AI models trained with cumulative compute above 10²⁵ FLOPs are presumed to have systemic risk and face ad…
- `faq:what-does-the-eu-ai-office-do`: What does the EU AI Office do? — The EU AI Office (established January 2024 within DG CNECT) coordinates EU AI Act implementation across member states and directly enforces GPAI o…
- `faq:what-is-the-difference-between-layer-2-and-layer`: What is the difference between Layer 2 and Layer 4 in the map? — Layer 2 covers the laws themselves — statutes, executive orders, and framework acts like the EU AI Act, US executi…
- `text:footer-sources`: Sources: International AI Safety Report (Feb 2026), METR Common Elements of Frontier AI Safety Policies (Dec 2025), Brundage Substack, EU AI Act and AI Office documentation, Calif…
- `edge:aisi-net|eu-aio`: EU AI Office's Safety Unit is part of the network
- `edge:gpai-cop|eu-aio`: EU AI Office runs and oversees the CoP
- `gap:halt`: Few mechanisms can compel a frontier developer to halt — Conditions for halting are the rarest column in the matrix. The EU AI Office can order recall (Aug 2026 onwards). The GPAI…
- `text:layer-4:tooltip`: Institutions that shape AI behavior — AI-specific bodies (EU AI Office, AISIs), independent evaluators and NGOs (METR, Apollo, AVERI, CAIS, FSI), sector regulators applying genera…
- Entry text that mentions the affected entries: `entry:kr-ai:cov:thresh`, `entry:kr-ai:cov:eval`, `entry:ca-sb53:desc`, `entry:co-aia:desc`, `entry:co-aia:context`, `entry:co-aia:cov:acct`, `entry:gpai-cop:desc`, `entry:gpai-cop:context`, `entry:gpai-cop:cov:thresh`, `entry:gpai-cop:cov:eval`, `entry:gpai-cop:cov:sec`, `entry:gpai-cop:cov:acct`, `entry:meta-faif:context`, `entry:meta-faif:cov:acct`, `entry:xai-rmf:desc`, `entry:eu-aio:context`, `entry:averi:context`, `entry:averi:cov:eval`, `entry:aisi-net:desc`, `entry:eu-aia:cov:timing`, `entry:eu-aia:cov:acct`, `entry:gpai-cop:cov:update`, `entry:us-ftc:context`


## 2. Attempted checks that did not verify

- **Unresolved or conflicting evidence** — 1 item(s): `entry:rsp:cov:elicit`
  The v3.4 policy text does not describe elicitation methods or name METR or UK AISI. External evaluation appears only generally ('internally and by external parties as appropriate', §3.3).
  **Still missing:** System cards or Risk Reports (Feb/Aug 2026) describing elicitation methods and METR/UK AISI participation; queued for the baseline audit
  - S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf> — ok on 2026-10-10
- **Unresolved or conflicting evidence** — 4 item(s): `entry:eu-aia:context`, `entry:eu-aia:cov:mit`, `entry:eu-aia:cov:timing`, `entry:eu-aia:cov:update`
  Factual core consistent with the Act, but not every clause verified. cov.mit attributes content marking to GPAI duties, whereas marking is an Art 50 duty on generative AI systems (lead). Comparative claims ('most comprehensive', 'first regulation to split the lifecycle') not checked.
  **Still missing:** Clause-by-clause check of context and cov.mit against Arts 6–49, 50 and 53; evidence for the comparative claims. Queued for the baseline audit
  - S-0002 <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng> — ok on 2026-10-10
  - S-0041 <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744> — ok via curl (research subagent, 2026-10-10 ~16:38Z) on 2026-10-10
- **Unresolved or conflicting evidence** — 7 item(s): `entry:gpai-cop:context`, `entry:gpai-cop:cov:thresh`, `entry:gpai-cop:cov:eval`, `entry:gpai-cop:cov:elicit`, `entry:gpai-cop:cov:sec`, `entry:gpai-cop:cov:update`, `edge:gpai-cop|meta-faif`
  Consistent in substance with the Safety and Security chapter (evaluations, elicitation, weight security), but not checked clause by clause. cov.thresh 'mirroring the 10^25 trigger' is loose: the Code has signatory-defined risk tiers (Measure 4.1).
  **Still missing:** Clause-by-clause check against the three Code chapters; a primary Meta statement on declining to sign; the Code's update cadence. Queued for the baseline audit
  - S-0003 <https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai> — ok on 2026-10-10
  - S-0044 <https://ec.europa.eu/newsroom/dae/redirection/document/118119> — ok on 2026-10-10
- **Unresolved or conflicting evidence** — 3 item(s): `edge:us-frontier-access-eo|uk-aisi`, `edge:fsi|us-frontier-access-eo`, `edge:us-frontier-access-eo|us-eo14179`
  The order does not mention UK AISI or FSI and frames itself as deregulatory (§1). The FSI edge's 'national-security review framework' has no basis in the order.
  **Still missing:** UK AISI access-agreement sources; FSI publications. Queued for the baseline audit
  - S-0038 <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf> — ok on 2026-10-10
- **Unresolved or conflicting evidence** — 1 item(s): `gap:halt`
  Verified parts: AI Office can order recall (Art 93(1)(c); powers from 2 Aug 2026); GPAI Code proceed-only-if-acceptable (Measure 4.2); Seoul commitment not to develop or deploy in the extreme (Outcome 1 IV). 'Every lab framework includes it': Anthropic's v3 RSP has delay commitments, but only in competitor-dependent scenarios (P-0013); other labs not checked. 'No US state … can compel' not checked.
  **Still missing:** OpenAI, Google DeepMind, Meta and xAI frameworks; US state statutes' remedies. Queued for the baseline audit
  - S-0002 <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng> — ok on 2026-10-10
  - S-0044 <https://ec.europa.eu/newsroom/dae/redirection/document/118119> — ok on 2026-10-10
  - S-0034 <https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024/frontier-ai-safety-commitments-ai-seoul-summit-2024> — ok on 2026-10-10
  - S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf> — ok on 2026-10-10

## 3. Discovery log

### Anthropic (lab, B4) — policy text and compliance documents (retest)

With access restored I read the RSP v3.4 policy PDF in full, the v3.0 PDF, the Frontier Compliance Framework v2 (Trust Center; needed a headless browser) and Anthropic's Dec 2025 SB 53 post. Every change found is an update to the existing rsp entry, so no new entry is proposed.

Searches: “anthropic.com/responsible-scaling-policy (re-fetched; lists v3.4 as current; no newer version as of 2026-10-10)”; “RSP v3.4 PDF (www-cdn.anthropic.com)”; “RSP v3.0 PDF (anthropic.com/responsible-scaling-policy/rsp-v3-0)”; “Anthropic "Frontier Compliance Framework" SB 53 RAISE (web search for leads)”; “trust.anthropic.com Frontier AI Compliance section (headless Chromium)”; “anthropic.com/news/compliance-framework-SB53”

| Candidate | Result | Reason | Sources |
|---|---|---|---|
| RSP v3 structure (thresholds table, ASLs only for current safeguards, competitor-dependent delay commitments) | update to existing entry (P-0010) | Replaces the ASL-ladder and unconditional-pause wording on rsp. | S-0006, S-0008 |
| Halting commitments under RSP v3 (Appendix A) | update to existing entry (P-0013) | Delay commitments now depend on competitor scenarios. | S-0006, S-0008 |
| Frontier Compliance Framework v2 (effective 24 Jul 2026) | update to existing entry (context) — not a separate entry for now (P-0010) | Anthropic's compliance document for California TFAIA and the summary of its EU Code Safety & Security Framework. It is distinct from the RSP. It is noted in the rsp context (P-0010) and the RAISE connection (P-0009), not given its own entry. Whether compliance frameworks deserve entries is a question for the baseline audit, because OpenAI, Google DeepMind and others likely publish equivalents. | S-0010, S-0030 |
| RSP Noncompliance Reporting and Anti-Retaliation Policy | screened out — minor; note for baseline | Unchanged from trial 1: an internal compliance policy. The v3.4 governance section (S-0006 §4) already commits to noncompliance reporting and anti-retaliation. | S-0005 |

_Limits:_ Other labs were not searched; that is outside this trial. The Feb and Aug 2026 Risk Reports and system cards were not read, so implementation evidence and elicitation practice were not checked.

### New York (B2 represented state) — RAISE Act as amended

Read the enacted RAISE Act (Chapter 699 of 2025) and the chapter amendment (S8828, Chapter 96 of 2026) on nyassembly.gov. nysenate.gov, the map's current link, serves a Cloudflare bot challenge to automated clients; that is the website's block, not the environment's. The existing ny-raise description checks out.

Searches: “RAISE Act chapter amendment 2026 bill number (web search for leads)”; “nyassembly.gov bill S06953 (2025)”; “nyassembly.gov bills A09449 and S08828 (2025)”

| Candidate | Result | Reason | Sources |
|---|---|---|---|
| RAISE Act chapter amendment (Ch. 96 of 2026) | update to existing entry — none needed | Already reflected in ny-raise (Mar 27, 2026 amendment; effective Jan 1, 2027). | S-0033 |
| DFS office registration of large frontier developers (reported Sep 2026) | lead — not verified | Seen only in search results. If confirmed, it is implementation of ny-raise, not a new mechanism. Check in the baseline audit. |  |

_Limits:_ Only the transparency, incident-reporting, penalty and effective-date provisions were read. DFS office regulations and the reported Sep 2026 developer registration (a search lead) were not checked.

### EU (jurisdiction, B1) — retest of trial-1 leads with official sources

All trial-1 EU leads were checked against official sources: the Official Journal, EUR-Lex and Commission pages, read by a research subagent and re-checked by Claude. The Digital Omnibus is confirmed. The Article 50 transparency code is adopted and is a candidate new entry, raised to the maintainer but not drafted.

Searches: “EUR-Lex OJ L 2026/1744 and CELEX 32026R1744”; “digital-strategy.ec.europa.eu: AI Act page, enforcement framework page, GPAI Code page (signatories), AI Office page”; “Commission pages on the code of practice on transparency of AI-generated content (policy page, 10 Jun 2026 news, 9 Jul 2026 adequacy opinion, 31 Jul 2026 signatories news)”; “GPAI Code Safety and Security chapter PDF”

| Candidate | Result | Reason | Sources |
|---|---|---|---|
| Digital Omnibus on AI — Regulation (EU) 2026/1744 (in force 27 Jul 2026) | update to existing entry (eu-aia) (P-0016) | Moves high-risk application dates. Also adds AI Office powers, which are relevant to eu-aio in the baseline audit. | S-0041, S-0043 |
| AI Office GPAI enforcement powers from 2 Aug 2026; GPAI fine cap €15M/3% | update to existing entries (eu-aia, FAQ) (P-0017) | The map overstated the cap and used the future tense. | S-0002, S-0043 |
| Code of Practice on Transparency of AI-generated Content (Art 50; final 10 Jun 2026; Commission adequacy 8 Jul 2026; AI Board 9 Jul 2026) | proposed coverage addition — not drafted; maintainer decision needed | Meets RUBRIC §1: an identifiable text, material to GPAI and generative AI providers, attributable to the Commission and AI Office. It would sit in Layer 5 (voluntary code), like gpai-cop. Anthropic, Google, Meta, Microsoft and OpenAI are reported Section 1 signatories (Commission news, 31 Jul 2026, read by the subagent only). Not drafted because a new entry needs layer, pow, coverage notes and connections decided together. | S-0045, S-0046 |
| Commission guidelines on Article 50 (Jul 2026) | lead — context for the code above | Interpretive guidance, not a separate mechanism. |  |
| AI Office GPAI Code 'Signatory Taskforce' | screened out as a separate entry | Implementation forum of gpai-cop (unchanged from trial 1). |  |

_Limits:_ EUR-Lex served empty HTTP 202 responses after the first retrievals (a website-side throttle, not the environment). The consolidated AI Act text was not retrieved. Items listed on the Commission AI Act page but not opened: the EU Action Plan on Cybersecurity and AI (7 Jul 2026), the AI Office frontier expert findings (15 Jul 2026) and the Scientific Panel special meeting (5 Oct 2026).

### US federal (B1) — Frontier AI EO and CAISI (retest)

Read EO 14409 in the Federal Register (govinfo PDF and FR API). The map's description of it as a CAISI-administered national-security review is wrong; corrected in P-0014 and P-0015. Found in passing: NIST has renamed CAISI to CAISSI.

Searches: “govinfo DCPD-202600376 and FR Doc. 2026-11415”; “Federal Register API documents/2026-11415.json”; “whitehouse.gov EO 14409 page and fact sheet (subagent)”; “nist.gov/caisi”; “Federal Register search for later EOs amending 14409 (subagent)”

| Candidate | Result | Reason | Sources |
|---|---|---|---|
| EO 14409 (2 Jun 2026) | update to existing entry (us-frontier-access-eo) (P-0014) | Official text differs materially from the map. | S-0038, S-0039 |
| CAISI renamed CAISSI (Center for Advancing Innovation and Standards for Super Intelligence), page modified 30 Sep 2026 | lead — update to existing entry (caisi); outside this trial | Follows EO 14434 (29 Sep 2026) on 'Super Intelligence' terminology, per the subagent. Queue for the baseline audit. | S-0040 |
| EO 14434 'Inaugurating the Era of Super Intelligence' (29 Sep 2026) | lead — screen in the baseline audit | Read by the subagent only. A terminology order; whether it is material under RUBRIC §1 is undecided. |  |
| Reported halt of CAISI public model reports | lead — no primary source | NIST published CAISI assessments in Jul and Sep 2026, so a blanket halt is not supported. |  |

_Limits:_ federalregister.gov HTML pages and commerce.gov serve website bot challenges. The reported White House instruction for CAISI to halt public reports has no executive-branch source; a congressional letter only relays press reports. Implementation of the EO (benchmark, framework, clearinghouse) was not found.

### China (B1) — AI Law status and related instruments (retest)

With npc.gov.cn and gov.cn reachable, the AI Law status was settled from the NPCSC and State Council legislative plans. Two instruments the map mentions only in passing were confirmed: the Cybersecurity Law AI article (in force 1 Jan 2026) and CAC Order 21 on humanlike interactive AI (in force 15 Jul 2026).

Searches: “npc.gov.cn NPCSC 2025 and 2026 legislative work plans (PDF)”; “gov.cn State Council 2025 and 2026 legislative work plans”; “moj.gov.cn State Council 2024 plan”; “npc.gov.cn NPCSC decision amending the Cybersecurity Law (28 Oct 2025)”; “cac.gov.cn and jswx.gov.cn on the humanlike interactive AI measures”; “npc.gov.cn draft-consultation database (subagent)”

| Candidate | Result | Reason | Sources |
|---|---|---|---|
| Cybersecurity Law amendment, new Art. 20 on AI (in force 1 Jan 2026) | screened out as a separate entry for now; noted in cn-ai-law context (P-0019) | A general promotional and supervisory clause with no specific obligations on developers. It may merit a coverage note on cn-genai or a separate entry in the baseline audit. | S-0054 |
| Interim Measures for Humanlike Interactive AI Services (CAC Order No. 21; in force 15 Jul 2026) | lead — possible new entry; maintainer decision | A binding CAC regulation on anthropomorphic AI services, comparable in kind to cn-genai. Its bearing on frontier and GPAI governance is contextual (SCOPE §C). Not drafted; raise in the baseline audit. | S-0056, S-0055 |

_Limits:_ flk.npc.gov.cn, cac.gov.cn, jswx.gov.cn and moj.gov.cn intermittently reset connections right after the TLS handshake. The proxy log shows the tunnel closed by the remote end, which is a site or network-path issue, not an environment denial. moj.gov.cn also needs a cookie challenge.

### Source access retest (environment change, 2026-10-10)

Retested every host that was blocked in trial 1, plus representative EU, UK, US and Chinese official sources. The environment network policy denied nothing; the agent proxy logged no CONNECT denials for any official host. Where a fetch failed, the website itself refused or dropped the connection. Each row below names the official alternative used.

Searches: “www-cdn.anthropic.com RSP v3.4 PDF: ok (S-0006)”; “anthropic.com rsp-v3-0: ok, serves the v3.0 PDF (S-0008)”; “trust.anthropic.com: ok, but a JavaScript app; the FCF PDF needed headless Chromium (S-0010)”; “eur-lex.europa.eu: ok at first (S-0002); later empty HTTP 202 responses (throttling) (S-0041/S-0042/S-0047/S-0048)”; “digital-strategy.ec.europa.eu, ec.europa.eu: ok (S-0001, S-0003, S-0043–S-0046)”; “gov.uk: ok (S-0034, S-0035)”; “govinfo.gov: ok (S-0012, S-0038); federalregister.gov API: ok (S-0039); federalregister.gov HTML: bot gate (subagent)”; “whitehouse.gov: ok (S-0016)”; “nysenate.gov, congress.gov, leginfo.legislature.ca.gov: Cloudflare bot challenge, website-side (S-0028, S-0036, S-0037); nyassembly.gov: ok (S-0031–S-0033)”; “commerce.gov: Cloudflare bot challenge (subagent)”; “npc.gov.cn, gov.cn: ok (S-0049–S-0052, S-0054, S-0057); flk.npc.gov.cn, cac.gov.cn, jswx.gov.cn, moj.gov.cn: intermittent resets right after TLS (proxy log: closed by remote end); moj.gov.cn also needs a cookie challenge”

_Limits:_ Headless Chromium also fails Cloudflare challenges, so nysenate.gov and congress.gov stay unreadable to automated runs. The map's ny-raise link (nysenate.gov) can't be link-checked automatically, though it probably works in a browser.

## Appendix A — successful external checks

- `entry:rsp` — _No material change found in the checked sources_
  v3.4 policy text: 'our voluntary framework' (pow 1 voluntary, Layer 6, co, active). Link still the policy home page and lists v3.4 as current. — sources: S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>; S-0005 <https://www.anthropic.com/responsible-scaling-policy>
- `entry:rsp:desc` — _Change supported_
  Version, date and count verified (v3.4, 8 Jul 2026; 8 revisions). 'AI Safety Levels. Capability thresholds trigger required safeguards.' is pre-v3 wording (Appendix B, §1). — sources: S-0005 <https://www.anthropic.com/responsible-scaling-policy>; S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
- `entry:rsp:context`, `entry:rsp:cov:thresh`, `entry:rsp:cov:eval`, `entry:rsp:cov:timing`, `entry:rsp:cov:sec`, `entry:rsp:cov:mit`, `faq:which-ai-labs-have-published-frontier-safety-fra` — _Change supported_
  Read against the v3.4 text (and v3.0): ASL ladder replaced by a thresholds table with company plans and industry recommendations; ASLs only for current safeguards; evaluations not pre-specified; Risk Report timing; FCF separate from RSP. FAQ: only the Anthropic clause checked. — sources: S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>; S-0008 <https://www.anthropic.com/responsible-scaling-policy/rsp-v3-0>; S-0010 <https://trust.anthropic.com/resources?s=eorilovp4wxk38nxbi7k3&name=anthropic-frontier-compliance-framework>; S-0030 <https://www.anthropic.com/news/compliance-framework-SB53>
- `entry:rsp:cov:halt` — _Change supported_
  Appendix A: delay commitments only in competitor-dependent scenarios since v3.0; v3.1 added 'would strongly consider pausing' in other cases. The pre-v3 unconditional commitment is superseded. — sources: S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>; S-0008 <https://www.anthropic.com/responsible-scaling-policy/rsp-v3-0>; S-0005 <https://www.anthropic.com/responsible-scaling-policy>
- `entry:rsp:cov:acct` — _Change supported_
  Re-checked P-0007's added sentence against v3.4 §3.1, §3.6, §3.6.1: Risk Reports every 3-6 months, external review when highly capable and significantly redacted, on LTBT request, LTBT approves reviewers. Accurate. First and last sentences are carried over, not verified. — sources: S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>; S-0005 <https://www.anthropic.com/responsible-scaling-policy>
- `entry:rsp:cov:update` — _Change supported_
  Re-checked P-0006 against the v3.4 changelog and §4(8): eight revisions; v3.3 and v3.4 revised thresholds (v3.1 also revised how the automated R&D threshold is operationalised, which P-0006 does not mention); v3.2 LTBT; change-log commitment. Accurate. — sources: S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>; S-0005 <https://www.anthropic.com/responsible-scaling-policy>
- `gap:mit` — _No material change found in the checked sources_
  'Anthropic's ASL deployment safeguards': v3.4 keeps ASL-3 protections for current models (§1 table, row 1). Only the Anthropic clause checked; the rest of the summary was not. — sources: S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
- `edge:ca-sb53|rsp` — _No material change found in the checked sources_
  Anthropic: SB 53 formalises transparency practices labs followed voluntarily (S-0030); consistent with 'codifies the published-framework norm Anthropic exemplified'. Note: Anthropic's SB 53 framework is the separate FCF (now stated in P-0010 v3 context). — sources: S-0030 <https://www.anthropic.com/news/compliance-framework-SB53>; S-0006 <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf>
- `entry:ny-raise:desc`, `entry:ny-raise:cov:timing` — _No material change found in the checked sources_
  Chapter 699 of 2025 signed 19 Dec 2025; Chapter 96 of 2026 (S8828) signed 27 Mar 2026; effective 1 Jan 2027; penalties up to $1M first / $3M subsequent (§1427); 72-hour incident reporting (§1422(3)(a)). Read on nyassembly.gov because nysenate.gov serves a Cloudflare bot challenge. — sources: S-0031 <https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S06953&term=2025&Summary=Y&Actions=Y&Text=Y>; S-0033 <https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S08828&term=2025&Summary=Y&Actions=Y&Text=Y>
- `edge:seoul-commit|rsp` — _Change supported_
  Both halves verified: RSP v1.0 effective 19 Sep 2023; Seoul commitments published 21 May 2024 and asked signatories (incl. Anthropic) to publish a safety framework. — sources: S-0005 <https://www.anthropic.com/responsible-scaling-policy>; S-0034 <https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024/frontier-ai-safety-commitments-ai-seoul-summit-2024>; S-0035 <https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024>
- `entry:eu-aia:desc` — _Change supported_
  High-risk dates moved by Reg. 2026/1744 to 2 Dec 2027 (Annex III) and 2 Aug 2028 (Annex I). Other clauses verified (Art 113; €35M/7% top tier). — sources: S-0041 <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744>; S-0043 <https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act>; S-0002 <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng>
- `entry:eu-aia:cov:acct`, `faq:what-does-the-eu-ai-office-do` — _Change supported_
  GPAI fine cap is €15M/3% (Art 101), not €35M/7%; enforcement powers apply since 2 Aug 2026. Incident reporting (Art 55(1)(c)) and recall (Art 93(1)(c)) verified. — sources: S-0002 <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng>; S-0043 <https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act>; S-0041 <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744>
- `entry:eu-aia`, `entry:eu-aia:cov:thresh`, `entry:eu-aia:cov:eval`, `entry:eu-aia:cov:elicit`, `entry:eu-aia:cov:sec` — _No material change found in the checked sources_
  Link (Commission AI Act page), L2/eu/pow 4/phasing consistent with the Act. 10^25 presumption (Art 51(2)); evaluation incl. adversarial testing (Art 55(1)(a)); cybersecurity (Art 55(1)(d)). The comparison with the 10^26 US state thresholds was not re-checked here. — sources: S-0002 <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng>; S-0001 <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai>; S-0043 <https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act>
- `entry:gpai-cop:cov:acct`, `entry:gpai-cop:cov:mit` — _Change supported_
  Model Reports at least every six months (Measure 7.6), not annually; content marking is not a GPAI Code mitigation (Measure 5.1); it falls under the separate Art 50 code. — sources: S-0044 <https://ec.europa.eu/newsroom/dae/redirection/document/118119>; S-0045 <https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content>
- `entry:gpai-cop`, `entry:gpai-cop:desc`, `entry:gpai-cop:cov:halt`, `edge:gpai-cop|rsp`, `edge:gpai-cop|prep`, `edge:gpai-cop|fsf`, `edge:gpai-cop|xai-rmf` — _No material change found in the checked sources_
  Signatory list (7 Oct 2026): Anthropic, OpenAI, Google, Microsoft on the main list; xAI Safety and Security chapter only. Halting matches Measure 4.2. 'Meta declined' and the meta-faif edge: Meta is absent from the list; no Meta statement read. — sources: S-0003 <https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai>; S-0044 <https://ec.europa.eu/newsroom/dae/redirection/document/118119>
- `entry:us-frontier-access-eo`, `entry:us-frontier-access-eo:desc`, `entry:us-frontier-access-eo:context`, `entry:us-frontier-access-eo:cov:eval`, `entry:us-frontier-access-eo:cov:timing`, `entry:us-frontier-access-eo:cov:acct` — _Change supported_
  Official text EO 14409 (91 FR 34565): voluntary cyber-capability access framework, NSA designates covered models, Treasury/NSA/CISA lead, no preclearance, CAISI not named. Link changed from NPR to the Federal Register. — sources: S-0038 <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>; S-0039 <https://www.federalregister.gov/api/v1/documents/2026-11415.json>
- `edge:us-frontier-access-eo|caisi` — _Change supported_
  Contradicted: the order does not name CAISI; NIST is consulted only. — sources: S-0038 <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf>
- `entry:cn-ai-law`, `entry:cn-ai-law:desc`, `entry:cn-ai-law:context`, `entry:cn-ai-law:cov`, `entry:cn-ai-law:cov:thresh`, `entry:cn-ai-law:cov:eval`, `entry:cn-ai-law:cov:mit`, `entry:cn-ai-law:cov:acct` — _Change supported_
  Official NPC and State Council plans: AI legislation is an NPCSC preparatory item (2025, 2026) with no draft; the State Council, not the NPC plan, dropped the named draft in 2025. Link added. Missing-link investigation closed. — sources: S-0049 <http://www.npc.gov.cn/npc/c2/c30834/202605/P020260511309265804880.pdf>; S-0050 <http://www.npc.gov.cn/npc/c2/c30834/202505/P020250513550316685290.pdf>; S-0051 <https://www.gov.cn/zhengce/content/202605/content_7068345.htm>; S-0052 <https://www.gov.cn/gongbao/2025/issue_12066/202505/content_7025478.html>; S-0053 <https://www.moj.gov.cn/pub/sfbgw/gwxw/xwyw/202405/t20240509_498554.html>; S-0057 <http://www.npc.gov.cn/c2/c30834/202601/W020260105533918736222.pdf>; S-0054 <http://www.npc.gov.cn/npc/c2/c30834/202510/t20251028_449048.html>; S-0056 <https://www.jswx.gov.cn/zhengce/fagui/202604/t20260410_1322320.shtml>
- `edge:cn-genai|cn-ai-law` — _Change supported_
  'will be folded' is not supported by any official text; softened. — sources: S-0049 <http://www.npc.gov.cn/npc/c2/c30834/202605/P020260511309265804880.pdf>; S-0051 <https://www.gov.cn/zhengce/content/202605/content_7068345.htm>

## Appendix B — internal consistency checks

_These compare the map with itself (counts, labels, generated files, cross-references). They do not verify facts about the world._

_None._

## Appendix C — not checked in this run

Entries (44): `aisr`, `aisi-net`, `ai-summits`, `oecd`, `coe-ai`, `unesco`, `us-eo14179`, `us-action`, `us-preempt`, `cn-genai`, `uk-bill`, `kr-ai`, `jp-ai`, `ca-sb53`, `co-aia`, `tx-raiga`, `seoul-commit`, `hiroshima`, `eu-genai-code`, `fmf`, `delhi-commit`, `pai`, `prep`, `fsf`, `meta-faif`, `xai-rmf`, `eu-aio`, `uk-aisi`, `caisi`, `other-aisis`, `metr`, `apollo`, `averi`, `cais`, `fsi`, `uk-ofcom`, `uk-ico`, `us-ftc`, `au-esafety`, `co-doi`, `imda`, `jp-sectors`, `bis`, `nist-rmf`

Other inventory items not checked (116): connections, gap summaries, FAQ answers, page text and category definitions not listed above.

## Appendix D — sources used

- S-0006 Anthropic Responsible Scaling Policy v3.4 (PDF) <https://www-cdn.anthropic.com/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf> — primary · ok 2026-10-10 · sha256:6247b9e4001fd342
- S-0005  <https://www.anthropic.com/responsible-scaling-policy> — primary · ok 2026-10-10 · sha256:2fce0fcd715d43e0
- S-0008 Anthropic Responsible Scaling Policy v3.0 (served as PDF at the rsp-v3-0 URL) <https://www.anthropic.com/responsible-scaling-policy/rsp-v3-0> — primary · ok 2026-10-10 · sha256:a71bfa08a7fa4b75
- S-0010 Anthropic Frontier Compliance Framework v2 (Trust Center PDF) <https://trust.anthropic.com/resources?s=eorilovp4wxk38nxbi7k3&name=anthropic-frontier-compliance-framework> — primary · ok via browser 2026-10-10
- S-0030 Anthropic: Our framework for complying with California SB 53 <https://www.anthropic.com/news/compliance-framework-SB53> — primary · ok 2026-10-10 · sha256:c597ebef2d2bfb9f
- S-0031 NY Assembly: S06953 (RAISE Act) summary, actions and text <https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S06953&term=2025&Summary=Y&Actions=Y&Text=Y> — primary · ok 2026-10-10 · sha256:49d259d01b107eee
- S-0033 NY Assembly: S08828 (RAISE Act chapter amendment) summary, actions and text <https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S08828&term=2025&Summary=Y&Actions=Y&Text=Y> — primary · ok 2026-10-10 · sha256:fff361ca0b91342f
- S-0034 UK Government: Frontier AI Safety Commitments, AI Seoul Summit 2024 <https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024/frontier-ai-safety-commitments-ai-seoul-summit-2024> — primary · ok 2026-10-10 · sha256:a090c43f82272068
- S-0035 UK Government: Frontier AI Safety Commitments publication page <https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024> — primary · ok 2026-10-10 · sha256:9773b52d78f7d52d
- S-0041 Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal L series <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744> — primary · ok via curl (research subagent, 2026-10-10 ~16:38Z) 2026-10-10
- S-0043 European Commission: The enforcement framework of the AI Act <https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act> — primary · ok 2026-10-10 · sha256:a634e53a8e652472
- S-0002  <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng> — primary · ok 2026-10-10 · sha256:6bce305a8318b9db
- S-0001  <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai> — primary · ok 2026-10-10 · sha256:c428cd019cea5360
- S-0044 GPAI Code of Practice: Safety and Security chapter (Jul 2025) <https://ec.europa.eu/newsroom/dae/redirection/document/118119> — primary · ok 2026-10-10 · sha256:d879f9b54c6068aa
- S-0045 European Commission: Code of practice on transparency of AI-generated content <https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content> — primary · ok 2026-10-10 · sha256:1b823fe46d757f6f
- S-0003  <https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai> — primary · ok 2026-10-10 · sha256:9487c62bc44b4f63
- S-0038 Federal Register 91 FR 34565: Executive Order 14409, Promoting Advanced Artificial Intelligence Innovation and Security <https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf> — primary · ok 2026-10-10 · sha256:4a25c970947e7234
- S-0039 Federal Register API record for FR Doc. 2026-11415 (EO 14409) <https://www.federalregister.gov/api/v1/documents/2026-11415.json> — primary · ok 2026-10-10 · sha256:f876e83d4fd24f17
- S-0049 NPCSC 2026 Legislative Work Plan (全国人大常委会2026年度立法工作计划) <http://www.npc.gov.cn/npc/c2/c30834/202605/P020260511309265804880.pdf> — primary · ok 2026-10-10 · sha256:be569073f90700e1
- S-0050 NPCSC 2025 Legislative Work Plan (全国人大常委会2025年度立法工作计划) <http://www.npc.gov.cn/npc/c2/c30834/202505/P020250513550316685290.pdf> — primary · ok 2026-10-10 · sha256:d21df610ee4cc775
- S-0051 State Council 2026 Legislative Work Plan (国办发〔2026〕14号) <https://www.gov.cn/zhengce/content/202605/content_7068345.htm> — primary · ok 2026-10-10 · sha256:65d04b38730337d3
- S-0052 State Council 2025 Legislative Work Plan (国办发〔2025〕17号), State Council Gazette <https://www.gov.cn/gongbao/2025/issue_12066/202505/content_7025478.html> — primary · ok 2026-10-10 · sha256:8fd903c6a2eea148
- S-0053 State Council 2024 Legislative Work Plan (国办发〔2024〕23号), Ministry of Justice copy <https://www.moj.gov.cn/pub/sfbgw/gwxw/xwyw/202405/t20240509_498554.html> — primary · ok via curl with cookie jar (research subagent, 2026-10-10 ~16:47Z) 2026-10-10
- S-0057 NPC Education, Science, Culture and Health Committee: report on delegates' motions (3rd Session), Jan 2026 <http://www.npc.gov.cn/c2/c30834/202601/W020260105533918736222.pdf> — primary · ok 2026-10-10 · sha256:35d226b3a46fd515
- S-0054 NPCSC Decision amending the Cybersecurity Law (28 Oct 2025) <http://www.npc.gov.cn/npc/c2/c30834/202510/t20251028_449048.html> — primary · ok 2026-10-10 · sha256:4ceadbbc782b676d
- S-0056 Interim Measures for Humanlike Interactive AI Services (CAC Order No. 21), Jiangsu Cyberspace Office repost <https://www.jswx.gov.cn/zhengce/fagui/202604/t20260410_1322320.shtml> — primary · ok via curl (research subagent, 2026-10-10 ~16:44Z) 2026-10-10
