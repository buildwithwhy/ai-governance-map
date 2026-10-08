# Recurring research-and-update workflow — inspection & plan

Status: **planning only**. Nothing here changes the published map, and no runs are scheduled.
Inspected: 8 Oct 2026, at commit `8739ca3` (last content update 6 June 2026).

---

## 1. What exists today

### Where things live

| Thing | Location | Notes |
|---|---|---|
| Records (49 mechanisms) | `index.html` → `const ENTITIES = [...]` (inline JS, ~L498–934) | **The only source of truth.** Fields: `id, link, name, layer, jur, pow, status, desc, context, cov` |
| Relationships (81) | `index.html` → `const EDGES` (~L936) | `{a, b, rel}` |
| Source URLs | `ENTITIES[].link` | One URL per entity. Mix of primary (EUR-Lex, Federal Register, leginfo) and secondary (NPR for the Frontier Access EO, White & Case for Japan, chinalawtranslate). `cn-ai-law` has none. No per-claim citations, no "last verified" dates. |
| Coverage definitions | `CATEGORIES` (METR's 9 common elements) + per-entity `cov: {catId: note}` | Category-level analysis prose in `GAP_SUMMARIES` and the default gap-panel text — these name specific entities and dates, so they go stale with the records. |
| Classification rules | **Not written down as a rubric.** Implicit in: `JUR_LABEL`, `POW_LABEL`, `STATUS_LABEL`; layer `data-tooltip` text (L377–413); the FAQ JSON-LD answer on Layer 2 vs 4; the issue template. | No inclusion criteria; no definition of when something is pow 3 vs 4; no rule for jurisdictions without a code. |
| Discovery scope | **Nowhere.** | Jurisdictions/institutions/categories to search must be defined before a run can be "complete". |

### How changes reach the published map

1. Edit `index.html` by hand (all 24 commits, 6 May–6 June 2026, went straight to `main`; no PRs, issues, or Actions exist).
2. Run `node build-llms.js` → regenerates `llms.txt`, `llms-full.txt`, `data.json` from `index.html`. (Verified: regenerating at HEAD produces no diff, so derived files are currently in sync.)
3. Push to `main` → Vercel serves the repo root as a static site (no build step; `vercel.json` only sets headers/clean URLs). *Assumed* to be Vercel's Git integration with `main` as production — not visible from the repo.

Hand-maintained values that must be updated alongside content (no script does it):

- Counts: `<meta>` description, og/twitter descriptions, Dataset JSON-LD description, `.stats` block (49 / 19 / 11 / 9).
- Dates: topbar `<time>`, JSON-LD `dateModified`/`version`, `sitemap.xml` `lastmod` ×4, `build-llms.js` `UPDATED`/`version`/`updated`.
- Prose: FAQ JSON-LD answers, footer "Sources" line, Layer 4 tooltip (lists example institutions), `GAP_SUMMARIES`.

### Existing scripts

Only `build-llms.js` (generation). **No research, validation, link-check or test scripts.**

### Existing drift found during inspection

- `build-llms.js:150` hardcodes "39 mechanisms" → `data.json` description says 39; actual is 49.
- FAQ "Which AI laws are binding with penalties?" says *eight* and lists Colorado AI Act and Texas TRAIGA (both `pow: 3`), while the stats block counts 11 `pow: 4` entities (incl. Ofcom, ICO, eSafety, Colorado DOI, EU AI Office, BIS).
- Layer 2 subtitle says "Statutes, executive orders, **agencies**", but agencies sit in Layer 4.
- `jur: 'as'` ("Asia (other)") is used for Australia's eSafety Commissioner and for the multi-country `other-aisis`; NGOs/evaluators use `co` ("Corporate / global").
- Five entities have no edges: `unesco, kr-ai, tx-raiga, pai, bis`.
- Likely already stale (secondary sources, **not yet verified against the Official Journal**): the EU "Digital Omnibus on AI" reportedly entered into force 27 July 2026 and moved Annex III high-risk obligations to 2 Dec 2027, which conflicts with the `eu-aia` entry ("Most provisions apply Aug 2026; high-risk system rules Aug 2027"). Sources: [Lewis Silkin](https://www.lewissilkin.com/insights/2026/07/27/the-digital-omnibus-on-ai-enters-into-force-today-102nedo), [Addleshaw Goddard](https://www.addleshawgoddard.com/en/insights/insights-briefings/2026/technology/eu-ai-act-ai-omnibus-formally-adopted/), [Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement). This is the kind of finding a first run should surface.

### Cloud environment readiness (tested in this session)

| Capability | Result |
|---|---|
| Node 22, no dependencies needed | ✅ `build-llms.js` runs as-is |
| GitHub (branch push, PRs via MCP) | ✅ scoped to this repo |
| `WebSearch` | ✅ works |
| `WebFetch` / `curl` to source sites | ❌ **48 of 49 source URLs blocked** by the environment's network policy (only anthropic.com allowed). Research cannot read primary sources until this changes. |
| Persistence | Container is ephemeral → all state must be committed to git. |

---

## 2. Recommended design (smallest fit)

Keep `index.html` as the source of truth and keep the deploy path unchanged. Add a `research/` folder holding scope, rubric, a decision ledger and per-run reports, plus one validation script. The repo gets no package.json, no framework, and no data-format migration.

```
research/
  SCOPE.md            what to search: jurisdictions × institution types × layers, inclusion/exclusion rules
  RUBRIC.md           written classification rules: layer, jur, pow, status, coverage-note standard, evidence standard
  RUNBOOK.md          the run procedure Claude follows (the "prompt" for each run)
  ledger.json         every proposal ever made + its decision — the persistent state between runs
  verification.json   per-entity: last checked date, sources consulted, result
  runs/YYYY-MM-DD/
    report.md         readable, evidence-linked review report
tools/
  check.js            validator (see §2.4)
.vercelignore         excludes research/ and tools/ from the deployed site
```

### 2.1 One cycle = two PRs, two human gates

```
RUN (Claude, cloud session)                REVIEW (you)                APPLY (Claude)                 PUBLISH (you)
───────────────────────────                ────────────                ──────────────                 ─────────────
verify all 49 entries          ──►  PR #A: report + ledger    ──►  PR #B: index.html edits    ──►  merge PR #B
discover new mechanisms             you set decisions:              for accepted/edited only        → Vercel deploys
write report.md + ledger            accept / edit / reject /        + build-llms.js + check.js
NO index.html changes               defer — merge PR #A             + date/count bumps
```

- **PR #A (research)** touches only `research/`. Merging it records your decisions in `ledger.json`; with `.vercelignore` it changes nothing on the site.
- **PR #B (apply)** is the only thing that changes the map. It is generated strictly from ledger entries with `decision: accepted|edited`, and `tools/check.js --guard` fails the PR if it contains any change not traceable to an approved proposal.
- Nothing is pushed to `main` by Claude. You merge both PRs.

### 2.2 How you record decisions

Either:
1. **Tell Claude in the session** ("accept P-0012; edit P-0015 to say …; reject P-0018, secondary source only; defer P-0020 until the Omnibus text is in the OJ") and Claude writes them into `ledger.json` on PR #A, **or**
2. **Edit `ledger.json` directly** in GitHub's web editor on the PR #A branch (each proposal has a `decision` block).

`report.md` lists every proposal with its ID, current vs proposed text, evidence links and a blank decision line, so you can review it in the PR's rich diff.

### 2.3 Ledger entry shape (persistence between runs)

```json
{
  "id": "P-0012",
  "run": "2026-10-15",
  "kind": "update_field",          // update_field | add_entity | retire_entity | add_edge | update_edge | remove_edge | update_prose | flag_only
  "target": { "entity": "eu-aia", "field": "desc" },
  "current": "In force Aug 2024. … high-risk system rules Aug 2027. …",
  "proposed": "…",
  "rationale": "Regulation (EU) 2026/1744 moved Annex III application to 2 Dec 2027.",
  "evidence": [
    { "url": "https://eur-lex.europa.eu/…", "type": "primary", "accessed": "2026-10-15",
      "locator": "Art. 1(12)", "excerpt": "≤ 40 words quoted" }
  ],
  "confidence": "high",            // high | medium | low
  "knock_on": ["GAP_SUMMARIES.halt", "FAQ: What does the EU AI Office do?"],
  "decision": { "status": "pending", "by": null, "date": null, "note": null,
                "edited_value": null, "revisit_after": null },
  "applied_in": null               // commit SHA once in PR #B
}
```

Carry-over rules between runs:
- **pending** stays in the ledger. The next run re-checks it and either refreshes the evidence or marks it `superseded` by a new ID, so the same change never appears twice.
- **deferred** comes back when `revisit_after` has passed, or on the next run if no date was given.
- **rejected** is not re-proposed unless the run finds *new* evidence (a different URL, or a later date). Matching uses entity + field + normalised proposed value.
- **accepted/edited** but not yet applied is picked up by the next APPLY step.

### 2.4 `tools/check.js` (≈100 lines, no deps)

Runs locally and in each PR (optionally as a GitHub Action later):
- Every `ENTITIES` id is unique; every edge endpoint exists; `layer/jur/pow/status/cov` keys are valid enums.
- Hardcoded counts and dates (meta, JSON-LD, stats block, sitemap, `build-llms.js`) match the computed values.
- `llms.txt`/`llms-full.txt`/`data.json` equal a fresh `build-llms.js` output.
- `--guard <base-ref>`: parse `ENTITIES`/`EDGES` at the base and at HEAD, diff per entity per field, and fail on any change not listed in an approved, unapplied ledger entry.

### 2.5 Run procedure (`research/RUNBOOK.md`, summarised)

1. **Load** SCOPE, RUBRIC, ledger, verification log; parse current `ENTITIES`/`EDGES`.
2. **Verify every existing entry** (all 49). Fan out with ~6 subagents, one per layer. For each entity: check that the source link works and is still the best primary source; status (in force / phasing / proposed / revoked); dates, thresholds and penalties in `desc`/`context`; each `cov` note; edges. Output per entity: `no change` (with the sources consulted) **or** proposals. A "no change" is still recorded with evidence, so the report shows every entry was checked.
3. **Discover**: for each cell of SCOPE (jurisdiction × institution type × layer), search for items new since the last run date. Screen candidates against RUBRIC inclusion criteria. Proposed additions are full entity drafts (layer, jur, pow, status, desc, context, cov, edges, link). Rejected candidates go in a "considered, not proposed" appendix, so breadth is auditable.
4. **Knock-on prose**: flag `GAP_SUMMARIES`, FAQ answers, the footer and layer tooltips affected by any proposal (`kind: update_prose`).
5. **Write** `runs/<date>/report.md`, append to `ledger.json`, update `verification.json`, commit to a run branch and open PR #A. Commit progress per layer, because the container can be reclaimed mid-run.

Evidence standard (to confirm in RUBRIC): every factual change needs ≥1 primary source (official text, government or institution page, the lab's own framework). Secondary-only evidence → `confidence: low`, and the proposal is labelled as such.

Report layout: summary counts → high-confidence changes → status changes → proposed additions → low-confidence/flags → per-entity verification table (49 rows: entity, sources checked, result) → discovery log (searched / found / screened out).

### 2.6 Preserving breadth beyond legislation

SCOPE must enumerate all six layers explicitly, so discovery covers institutions (AISIs, regulators, evaluators, NGOs, compute controls), voluntary codes, summit commitments, and lab frameworks, as well as statutes. The verification step covers every existing entity regardless of type. RUBRIC records the existing principle: classify by **who acts**, not what they regulate.

---

## 3. Prerequisites before the first run

1. **Network access** for the cloud environment: change it from the current restricted policy to one that can reach government, legislature and lab sites. Discovery hits unpredictable domains, so an allowlist is impractical; "Full" (or a broad custom list) is needed. Setting: environment menu → Edit → Network access ([docs](https://code.claude.com/docs/en/cloud-environments#network-access)).
2. Write `SCOPE.md` and `RUBRIC.md` from current practice and your answers to §4; you approve them before any run.
3. Add `tools/check.js`, `.vercelignore`, `RUNBOOK.md` and an empty `ledger.json`. Fix the `39` hardcode in `build-llms.js` (a one-line, non-content change).
4. **Dry run**: one manual run on 2–3 layers to calibrate report length and false-positive rate before a full run or any schedule.

Scheduling (a Claude Code routine that opens PR #A) comes after the dry run, if you want it.

---

## 4. Decisions needed from you

1. **Network policy**: OK to switch this environment to full outbound access, or do you prefer a domain allowlist and accept weaker discovery?
2. **Scope — jurisdictions**: currently US fed/states, EU, UK, China, Korea, Japan, Singapore, Australia, plus multilateral (and India, Canada, France and Kenya only via AISI/summit entries). Add others (e.g. Brazil, Canada, India, UAE, Taiwan, Vietnam, Switzerland), or hold?
3. **Scope — Layer 3**: US states only, or any sub-national government? Which US states to monitor: all 50, or only frontier-relevant bills?
4. **Scope — Layer 6**: only the current five labs, or every developer with a published frontier safety framework (Microsoft, Amazon, NVIDIA, Cohere, Mistral, Naver, G42, …)?
5. **Scope — institution types with no current home**: standards bodies (ISO/IEC JTC 1/SC 42, CEN-CENELEC JTC 21, NIST profiles), UN bodies (e.g. the UN scientific panel/global dialogue), courts/litigation, insurers. In or out?
6. **Inclusion threshold**: must a mechanism bear on *frontier/general-purpose* AI, or does any AI governance count? (The map already includes general regulators such as the ICO and the Colorado DOI.)
7. **Taxonomy changes**: if discovery adds, for example, Brazil, does it get a new `jur` code and legend colour (a UI change) or go under an existing bucket? Should Australia stay under "Asia (other)"?
8. **Existing drift** (§1): fix the FAQ "eight binding" answer, the "39" description and the Layer 2 "agencies" subtitle as proposals in the first run, or separately now?
9. **"Updated" date**: bump only when content changes, or also show a "Last reviewed" date after a no-change run?
10. **Visibility**: the repo is linked publicly, so the ledger, including rejected and deferred proposals, would be public on GitHub (though not on the site). Acceptable, or do you want review state kept elsewhere?
11. **Evidence on the published map**: keep one `link` per entity (evidence stays in the ledger), or add `sources[]`/`verified` fields to `data.json` (a schema change)?
12. **Cadence and size**: target frequency (monthly?) and acceptable report length. A full 49-entity verification plus discovery is a long run.
13. **Vercel**: confirm `main` is the production branch, and whether preview deployments of PR branches are public or protected.

## 5. Uncertainties

- Vercel project settings (production branch, preview protection, ignored build step) are not in the repo.
- Some lab and government sites block automated fetches even with open egress (Cloudflare and bot rules), and some sources are PDFs or non-English (CAC, Korean MSIT, Japanese ministries). Expect some `flag_only` items that need manual checking.
- Classification calls (pow 3 vs 4, layer of hybrid bodies) are judgement-based until RUBRIC is approved. Early runs will surface disagreements that should be folded back into RUBRIC.
- Run cost and duration for full verification are unknown until the dry run.
