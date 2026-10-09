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

## Current state (2026-10-09)

- **Partial trial 1** (`runs/2026-10-08-trial1/report.md`) is complete as far as source access allows. Accepted and eligible: P-0001, P-0003 v2, P-0004, P-0008. Awaiting the maintainer: P-0002 v2, P-0011, P-0012. Held for source access: P-0005–P-0007 (applied together), P-0009 v2, P-0010.
- **Blocked on:** the environment's network policy, which denies government sites and `www-cdn.anthropic.com`. After it is changed, retest with `node tools/research.js source fetch <url>` for the RSP v3.4 PDF, EUR-Lex, govinfo, nysenate.gov and gov.cn before any broad run.
- **Then:** read the RSP v3.4 PDF (Appendix A, Appendix B, main sections) and revise P-0005 and P-0010 together. Revisit the blocked trial items (EU AI Act, GPAI Code, Frontier AI Access EO, China AI Law) and P-0009. Regenerate the report, run `tools/apply.js` for eligible proposals on `claude/governance-map-workflow-design-4s2wt7`, check `tools/check.js --guard origin/main`, and open one combined PR. Do not merge it.
- **Next milestone:** full baseline audit plus scoped discovery, before any recurring schedule.
