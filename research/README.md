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

- `research.js`: inventory, sources, checks, proposals, decisions, runs, report (`--html` also writes the review page via `report-html.js`).
- `apply.js`: applies approved proposal versions, updates derived counts and dates, then runs `build-llms.js`.
- `check.js`: structural and consistency validation. `--guard <ref>` replays manifests to prove the published diff.

`research/` and `tools/` are excluded from Vercel deployments by `.vercelignore`. That exclusion must still be verified on a real deployment, and the GitHub repository itself is public.

## Current state (2026-10-10, after the baseline audit)

- **Baseline audit done** (`runs/2026-10-10-baseline/`): every inventory item checked against primary sources (in this run or the trial run earlier the same day); 407 of 520 verified, the rest unresolved or not retrievable, each with what is missing. 99 proposals await the maintainer (80 corrections, 3 additions, 16 questions) on the review page https://claude.ai/artifact/MACCwb5T2ySWbPHVbDvz23, where each can be answered directly (RUNBOOK §5).
- **Applied on the PR branch so far:** all trial-1 proposals (manifests `applied/2026-10-10*.json`). Baseline proposals are applied only after the maintainer accepts them.
- **Tooling:** research subagents write batches; `research.js ingest FILE --validate` pre-checks them read-only; `ingest FILE --run RUN` re-fetches every source and rejects any quotation not found in the retrieved text.
- **Next:** read the maintainer's responses, record and apply them, republish the page, update the PR. Then create the weekly routine (RUNBOOK §7: Mondays 04:50 UK time).
- **Access notes:** the environment denies nothing; several websites block automated clients (RUNBOOK §0 lists alternatives).
