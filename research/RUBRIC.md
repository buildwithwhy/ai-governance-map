# Rubric: classification and evidence rules

These rules are written down from existing practice: the layer tooltips, the FAQ, the issue template and the data itself. Where practice is inconsistent, the rule is marked **(open)** and raised as a question rather than applied retroactively.

## 1. Inclusion

A mechanism qualifies when all three hold:

1. **Identifiable:** there is a text, decision, charter, mandate or published policy that can be cited, not just an announcement of intent. Two exceptions: formally introduced bills, and officially announced legislative programmes with a public text or consultation, can enter as `proposed`.
2. **Material:** it shapes how frontier/general-purpose AI is developed, evaluated, deployed or overseen. That bearing may be direct (frontier/GPAI-specific) or contextual (general AI or sector governance applied to such systems; state how in `context`). See SCOPE §C.
3. **Attributable:** a specific actor adopts, operates or enforces it.

Commentary, research outputs and advocacy do not qualify by themselves. The exception is intergovernmentally mandated syntheses such as the International AI Safety Report. METR's nine elements are a lens for describing coverage, not an inclusion test.

## 2. Layer: who acts, not what is regulated

| Layer | Contains | Precedent |
|---|---|---|
| 1 International | Treaties, multilateral principles, intergovernmental reports, summit series, networks of national bodies | coe-ai, oecd, aisi-net |
| 2 National regulation | The national laws themselves: statutes, executive orders, framework acts, binding regulations, formally proposed bills | eu-aia, us-eo14179, kr-ai |
| 3 Sub-national | US state laws | ca-sb53, ny-raise |
| 4 Infrastructure | Institutions that implement, enforce, evaluate or shape behaviour: AI offices, AISIs, sector regulators applying law to AI (including state agencies), evaluators and NGOs, compute and export controls, standards frameworks | eu-aio, co-doi, bis, nist-rmf |
| 5 Industry voluntary | Cross-firm and multistakeholder commitments and codes | seoul-commit, gpai-cop, fmf |
| 6 Corporate self-governance | A single lab's own published frontier safety framework | rsp, prep |

A law and the body that enforces it are separate entries: the EU AI Act is in L2, the EU AI Office in L4. **(open)** Standards bodies (ISO/IEC, CEN-CENELEC), courts and insurers have no precedent. A first instance is raised as a question with a recommended layer.

## 3. Jurisdiction (`jur`)

Codes: `us` US federal, `uss` US state, `eu`, `uk`, `cn`, `as` Asia (other), `mu` multilateral, `co` corporate / global.

- `co` is used for companies **and** for non-governmental organisations operating globally (METR, CAIS). Keep this unless the maintainer decides otherwise.
- **(open)** `as` currently includes Australia (au-esafety), and `other-aisis` includes France, Canada and Kenya. A label correction is proposed rather than a new code, so colours and filtering keep working.
- A new jurisdiction with no fitting code is a question for the maintainer. Never invent a code silently.

## 4. Enforceability (`pow`)

| pow | Label | Rule |
|---|---|---|
| 1 | Voluntary | No legal force; self-imposed or norm-setting (lab frameworks, cross-firm commitments, NGO activity) |
| 2 | Soft / advisory | Government-issued or institutional but non-binding on developers (guidance, advisory institutes, proposed laws, voluntary government codes) |
| 3 | Hard law, weak enforcement | Legally binding instrument whose obligations on AI developers have limited or indirect enforcement (EOs directing agencies, statutes with narrow remedies, treaties without domestic transposition) |
| 4 | Binding with penalties | Statute, regulation or regulator able to impose penalties on AI developers or deployers |

**Terms.** "Binding mechanisms" (the stats tile) means every entry with `pow: 4`, including regulators and export controls. "Binding laws" means L2/L3 statutes or regulations with `pow: 4`. These are not the same set, so prose must say which it means. **(open)** The FAQ currently lists the Colorado AI Act and Texas TRAIGA as penalty-bearing laws while classifying both as `pow: 3`.

## 5. Status

`proposed` introduced/announced, not adopted · `phasing` adopted and in force, with obligations applying in stages · `active` in force/operating · `revoked` repealed, withdrawn or superseded.

When recording dates, always distinguish: **proposed/introduced → adopted (passed/signed) → published → entry into force → application date(s)**. An amendment that changes application dates is a change to the original entry, plus a possible new entry if it is a separate instrument of independent significance.

## 6. Text standards

- `desc`: one or two sentences of hard facts (dates, thresholds, penalties, version). `context`: why it matters and how it relates to the rest of the map. `cov.<element>`: what this mechanism does for that METR element. Mark stretches as stretches.
- **Corporate commitments are written as commitments** ("commits to pause…"). Evidence of implementation (published evaluations, third-party reports, enforcement) is recorded separately and never inferred from the commitment.
- Prefer stable phrasing over counts and relative dates in prose, because counts drift. Counts that must appear are derived (tools/lib.js COUNT_SITES).
- Make minimal edits in the existing voice; one concern per proposal.

## 7. Evidence

- **Candidates** may come from search results, secondary reporting, newsletters or tips.
- **A material change is verified only after a supporting source has been opened and inspected.** Prefer the official legal text (Official Journal, Federal Register, legislature), then an official government or institution page, then the actor's own publication. Reputable secondary sources (law firms, press) corroborate but do not verify on their own.
- Each piece of evidence records: source URL, the relevant passage and its locator (article, section or heading), retrieval date, and the document's publication/adoption/in-force/application dates where applicable (`tools/research.js source passage` / `source dates`).
- Shared sources are fetched once per run and reused across every claim they support (`sources.json` keys by URL).
- A source that could not be retrieved (blocked, 4xx/5xx, timeout) **cannot** support a successful outcome; the tooling refuses it.
- An unchanged page shows only that this page is unchanged. It does not show that nothing new exists elsewhere. Discovery is a separate step.

### 7a. Conflicting evidence: double check, then a third source

When sources disagree, or a source contradicts a proposal, nothing is accepted, applied or marked verified until the conflict is resolved in one of two ways:

1. **Double check.** Re-fetch and re-read every contradicting source, and record a fresh passage. If on re-reading it does not actually contradict (a misreading, an outdated page, a different provision), record it as `role: "recheck"` evidence.
2. **Third source.** If the conflict stands, consult a third source that is **independent of both sides**: a different publisher, preferably the primary legal text or the issuing body. Record it as `role: "tiebreak"` with a passage. If the third source contradicts the proposal, the proposal is revised or rejected, not accepted.

How the tools enforce it:
- Evidence carries `stance: supports|contradicts`.
- `decide … accept` and maintainer `edit` refuse a proposal with an unresolved conflict, and `apply.js` refuses to apply one.
- At item level, `check --outcome unresolved --conflicting S-a,S-b` records the disagreement. The item can only be closed later with `--recheck` (both sources successfully re-fetched since the conflict) or `--tiebreak S-c` (accessible, independent).
- Independence is enforced by publisher domain, so `anthropic.com` and `www-cdn.anthropic.com` count as one source. This is a floor, not the whole test: two publishers on one shared government domain, or one publisher with several domains, still need judgment, and the report names the sources so you can see.
- The maintainer may override with a stated reason (`--override-conflict "…"`). The override is stored with the decision.

## 8. Check outcomes

| Outcome | Meaning |
|---|---|
| Change supported | An inspected source supports a change; a proposal ID is attached |
| No material change found in the checked sources | Inspected sources match the current text. This says nothing beyond those sources |
| Unresolved or conflicting evidence | Sources disagree, are secondary-only, or are ambiguous |
| Source inaccessible | The needed source could not be retrieved |
| Not checked | Not attempted in this run (implicit) |

## 9. Proposals and approval

- Each proposal has a stable ID (`P-0001`), numbered versions, and a change-hash over its exact edits.
- Decisions (accept, reject, defer, or edit, which means the maintainer's wording is accepted) bind to a version and its change-hash. A revision that changes the edits is **substantive** and resets the decision to pending. A revision that only updates evidence or notes keeps an existing approval.
- Rejected proposals are not re-raised unless new evidence exists (`revise --reopen`). Deferred ones return on their revisit date.
- `apply.js` applies only the approved version. `check.js --guard` proves that the published files equal base + approved edits + permitted derived updates (counts, content dates, generated files). The guard checks consistency, not research correctness.

## 10. Dates on the map

- **Content updated** (shown on the map) changes only when approved edits are applied.
- **Last research attempt** and **last successful check** are tracked per item in `research/checks.json` and never shown as the map's date. An incomplete run cannot make the map look freshly verified.
