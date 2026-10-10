# Research and update workflow

This is a recurring, evidence-linked review of the map. Approved changes reach the published map only through a second, reproducible apply step.

```
RUN (Claude)                    REVIEW (maintainer, in conversation)     APPLY (Claude)                    PUBLISH (maintainer)
verify every map item      ──►  accept / edit / reject / defer      ──►  tools/apply.js on a branch   ──►  merge PR → Vercel
discover within SCOPE B         each proposal by ID + version            check.js --guard proves the
report + ledger (PR #1)         Claude records it in ledger.json         diff = approved edits only (PR #2)
```

| File | Purpose |
|---|---|
| `SCOPE.md` | What is verified (the whole map) and where new items are searched for (explicit list) |
| `RUBRIC.md` | Inclusion, layer, jurisdiction, enforceability and status rules; evidence standard; outcomes; approval semantics |
| `RUNBOOK.md` | Step-by-step run procedure and the decision-recording protocol |
| `aliases.json` | Names used to find where the narrative text mentions each entry (dependency map) |
| `ledger.json` | Every proposal, all its versions and the decision history: the persistent state between runs |
| `sources.json` | Shared source registry: URL, fetch attempts and access status, passages, document dates |
| `checks.json` | Per inventory item: last attempt and last *successful* check, with the text hash checked |
| `runs/<run>/` | `run.json` (scope, timing, discovery log), `checks.json`, `report.md` |
| `applied/<date>.json` | Apply manifests: exactly which proposal versions were applied |

Tools, in `tools/`, have no dependencies beyond Node:

- `research.js`: inventory, sources, checks, proposals, decisions, runs, report.
- `apply.js`: applies approved proposal versions, updates derived counts and dates, then runs `build-llms.js`.
- `check.js`: structural and consistency validation. `--guard <ref>` replays manifests to prove the published diff.

`research/` and `tools/` are excluded from Vercel deployments by `.vercelignore`. That exclusion must still be verified on a real deployment, and the GitHub repository itself is public.

## Current state (2026-10-10)

- **Trial 1 is complete** (`runs/2026-10-08-trial1/report.md`, then `runs/2026-10-10-trial1b/report.md` after source access was restored). The 2026-10-10 report is the current review.
- **Source access:** the environment denies nothing. Some websites block automated clients (Cloudflare on nysenate.gov, congress.gov, leginfo, federalregister.gov HTML, commerce.gov; EUR-Lex throttling; intermittent resets on some Chinese sites). Fetches record these as `site_blocked`, `http_202` or `error`, distinct from `blocked` (environment). RUNBOOK §0 lists the official alternatives.
- **Applied on the PR branch:** P-0001, P-0003 v2, P-0004, P-0008 v2; then, after decisions on 2026-10-10, P-0005 v3, P-0006, P-0007, P-0009 v3, P-0010 v3, P-0012, P-0013, P-0014–P-0019. Guard passes.
- **Awaiting the maintainer:** P-0002 v2, P-0011, P-0020 (new entry: EU AI-generated content code). Everything else from trial 1 is applied (manifests `applied/2026-10-10.json`, `applied/2026-10-10-2.json`).
- **Then:** record decisions, re-run `tools/apply.js` on the same branch, re-check `tools/check.js --guard origin/main`, update the PR. Do not merge or schedule runs.
- **Next milestone:** full baseline audit plus scoped discovery, before any recurring schedule. Leads queued for it are in the 2026-10-10 report (§2 and §3), e.g. the EU Article 50 transparency code (candidate entry), CAISI's renaming to CAISSI, the AI Office's new Omnibus powers, the OpenAI/DeepMind Seoul chronology, CAC humanlike-AI measures.
