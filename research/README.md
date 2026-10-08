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
