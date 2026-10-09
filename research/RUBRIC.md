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

### 7a. Conflicting, missing or ambiguous evidence

**Conflicts.** When sources disagree, or a source contradicts a proposal, the evidence status is *disputed*. A disputed claim cannot be accepted (without an explicit override), applied or marked verified until a resolution is recorded. A third source does **not** settle a conflict just by existing or by coming from a different publisher. The resolution must state:

- **the specific disagreement** (what each side says);
- **the basis**, which must be one of:
  - **authoritative text:** the official or legal text settles it; needs a primary source passage.
  - **correction or superseding version:** a documented correction, erratum or later version.
  - **different date, scope or definition:** the sources are about different versions, provisions or definitions, so they don't actually conflict; needs passages from each side.
  - **misreading on recheck:** on re-reading, the contradicting source doesn't say what it was taken to say; needs a fresh passage from that source.
- **the inspected passages** that establish it;
- **an explanation** of why those passages resolve the disagreement.

**Independence signals, not proofs.** Publisher domain and shared underlying accounts (`source derived S-x --from S-y`, e.g. several articles summarising one press release or one news report) are reported as signals. Two sources repeating one account count as a single piece of corroboration. Domain checks never resolve or validate anything by themselves.

**Missing or ambiguous evidence** gets the same treatment. Make reasonable further attempts: official text, the issuing body, a later version. If it still can't be settled, keep the item *unresolved* and record exactly what is missing (`--missing` is required for unresolved and inaccessible outcomes, and `missing` for proposals that are not verified).

How the tools enforce it:
- `stance: contradicts` on evidence plus `conflict_resolution` on the proposal version.
- At item level: `check --outcome unresolved --conflicting S-a,S-b --disagreement "…" --missing "…"`, closed only with `--resolution FILE.json`.

### 7b. Evidence status is separate from editorial approval

Every proposal has an **evidence status**, which is the research side:

| Status | Meaning |
|---|---|
| Verified | Verified against inspected external sources |
| Internal consistency | The map checked against itself only (counts, labels, classifications, cross-references); no claim about the world is verified |
| Needs research | Evidence missing or ambiguous |
| Needs source access | The deciding source could not be retrieved |
| Disputed | Unresolved conflicting evidence (derived automatically) |

It also has an **editorial decision**, which is the maintainer's: pending, accepted, rejected or deferred.

- Only *verified* or *internal-consistency* proposals are ready for a decision and can be applied. Proposals that need research or source access don't ask the maintainer for a decision.
- An accepted proposal whose evidence weakens is held, not applied. So is one that must be applied together with a held proposal (`apply_together`), for example several edits that would leave one entry internally inconsistent if published separately.
- A maintainer **override** (`decide … --override "reason"`) allows publication but **never changes the evidence status**. The report, ledger and apply manifest keep showing it as disputed or unverified.
- Text that a proposal carries over unchanged is listed as `unverified_carryover`, so restating it does not make it look newly verified.

## 8. Check outcomes

| Outcome | Meaning |
|---|---|
| Change supported | An inspected source supports a change; a proposal ID is attached |
| No material change found in the checked sources | Inspected sources match the current text. This says nothing beyond those sources |
| Unresolved or conflicting evidence | Sources disagree, are secondary-only, or are ambiguous; what is missing is recorded |
| Source inaccessible | The needed source could not be retrieved |
| Not checked | Not attempted in this run (implicit) |

Each check is tagged **internal** (repo evidence only: the map against itself) or **external** (outside sources). The report counts them separately and keeps *attempted* separate from *successfully verified*.

## 9. Proposals and approval

- Each proposal has a stable ID (`P-0001`), numbered versions, and a change-hash over its exact edits.
- Decisions (accept, reject, defer, or edit, which means the maintainer's wording is accepted) bind to a version and its change-hash. A revision that changes the edits is **substantive** and resets the decision to pending. A revision that only updates evidence or notes keeps an existing approval.
- Rejected proposals are not re-raised unless new evidence exists (`revise --reopen`). Deferred ones return on their revisit date.
- `apply.js` applies only the approved version, and only when the evidence status allows it (§7b). `check.js --guard` proves that the published files equal base + approved edits + permitted derived updates (counts, content dates, generated files). The guard checks consistency, not research correctness.

## 10. Dates on the map

- **Content updated** (shown on the map) changes only when approved edits are applied.
- **Last research attempt** and **last successful check** are tracked per item in `research/checks.json` and never shown as the map's date. An incomplete run cannot make the map look freshly verified.
