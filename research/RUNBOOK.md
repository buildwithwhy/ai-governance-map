# Runbook

This is how Claude carries out a research run and records decisions. The commands are in `tools/research.js` (run it with no arguments for usage). All state lives in `research/`, because the cloud container is ephemeral. Commit run state to the run branch as each layer finishes.

## 0. Preconditions

- The environment's network access must reach government, legislature and lab sites. Test with `node tools/research.js source fetch https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai`. If it returns `blocked` (the environment's network policy denied the connection), stop and report; do not substitute search snippets for sources.
- `site_blocked` or `http_4xx` means the environment connected but the website refused, usually a Cloudflare bot challenge (nysenate.gov, congress.gov and leginfo.legislature.ca.gov as of Oct 2026). Use another official copy of the same text, e.g. nyassembly.gov for New York bills. JavaScript-only pages (trust.anthropic.com) can be opened in headless Chromium through the session proxy. Record those with `source add … --via browser --note "<how, content hash>"`.
- `node tools/check.js` passes, or reports only `KNOWN` issues.
- Read SCOPE.md and RUBRIC.md. Read open proposals with `node tools/research.js list`.

## 1. Start

Record the session's cumulative `usage.cost_usd` from `get_session` (claude-code-remote) at the start and end. Record the difference with `run usage <run> --text "…"`; it is approximate, because the platform updates the figure between turns.

```
node tools/research.js run start <YYYY-MM-DD[-label]> --label "<label>" [--partial --entries a,b,c]
```

A run is `--partial` unless it attempts every inventory item.

## 2. Verify existing items (SCOPE list A)

Work through each entry, plus the connections, narrative items and categories it touches (`research.js deps <entity>`). Fan out with one subagent per layer in a full run.

1. Fetch each source once: `source fetch <url> --type primary|secondary --title ... --run <run>`. Read the cached text it prints, and reuse the S-id for every claim the source covers.
2. For each claim that matters, record the passage: `source passage S-x --locator "Art. 113" --text "<≤60 words>"`, and record dates with `source dates S-x adopted=... in_force=... applies_from=...`.
3. Record the outcome per item or item group:
   `check <run> --items entry:eu-aia:* --outcome no_change|changed|unresolved|inaccessible --sources S-1,S-2 --note "<what was compared>" [--proposals P-x]`
   - A blocked source is recorded as `inaccessible`, never as `no_change`; the tool refuses otherwise.
   - Secondary-only evidence of a change → `unresolved`, with the lead described in the note.
   - Sources disagree → `unresolved --conflicting S-a,S-b --disagreement "<what each says>" --missing "<what would settle it>"`. Investigate further: authoritative text, a correction or superseding version, or whether the sources concern different dates, scopes or definitions. Close only with `--resolution FILE.json` (RUBRIC §7a). Record shared underlying accounts with `source derived`.
   - Missing or ambiguous evidence → make reasonable further attempts, then `unresolved --missing "<exactly what is missing>"`.
4. For a supported change, write the proposal JSON and run `propose <file> --run <run>`:
   ```json
   {
     "title": "…", "kind": "change|addition|flag",
     "changes": [{"op": "set_field", "entity": "eu-aia", "field": "desc", "from": "<exact current>", "to": "<proposed>"}],
     "why": "why it matters", "rationale": "…", "uncertainty": "…", "confidence": "high|medium|low",
     "evidence": [{"source": "S-0003", "passage": "S-0003#2", "stance": "supports", "supports": "…"},
                  {"source": "S-0009", "passage": "S-0009#1", "stance": "contradicts"},
                  {"source": "S-0012", "passage": "S-0012#1"}],
     "knock_on_notes": {"gap:halt": "needs change — see P-0009", "faq:what-does-the-eu-ai-office-do": "checked, still accurate"},
     "question": "only for flags / judgment calls",
     "resolves_checks": ["data-description-count"],
     "research_status": "verified|internal-consistency|needs-research|needs-source-access",
     "missing": ["exactly what remains missing"], "linked": ["P-0010"], "apply_together": ["P-0005", "P-0006"],
     "unverified_carryover": ["text restated unchanged and not re-verified"],
     "conflict_resolution": {"disagreement": "…", "basis": "authoritative-text|correction-or-superseding-version|different-date|different-scope|different-definition|misreading-on-recheck", "evidence": [{"source": "S-0012", "passage": "S-0012#1"}], "explanation": "…"}
   }
   ```
   Ops: `set_field` (link, name, layer, jur, pow, status, desc, context), `set_cov` (cat; `to: null` removes), `add_entity`, `add_edge` / `set_edge` / `remove_edge`, `replace_text` (file, exact `from`, `count`). Every `from` must equal the current text; the tool dry-runs the edit and rejects stale or ambiguous ones.
5. Review the knock-on list the tool computes: connections, gap summaries, FAQ answers and page text mentioning the entry. Record each relevant one in `knock_on_notes`, and propose separately where a change is needed.

## 3. Discover (SCOPE list B)

For each B cell (jurisdiction × institution type, the B2 states, the B4 labs), search for mechanisms new since the previous run. Include unfamiliar URLs; open the primary sources of every candidate. Screen against RUBRIC §1. Log every search and candidate (proposed / screened out / lead awaiting access) with `run discovery <run> <file.json>`:

```json
{"area": "EU", "summary": "…", "queries": ["…"], "limits": "…",
 "candidates": [{"name": "…", "result": "proposed|screened out|lead — source inaccessible|update to existing entry", "reason": "…", "proposal": "P-0007", "sources": ["S-0004"]}]}
```

Out-of-scope finds of significance become `addition` proposals labelled "outside monitored scope". They do not change SCOPE.

## 4. Report

Write 3–6 plain-language highlights (key findings, blockers, decisions needed) with `run highlights <run> <file.json>`. Then run `run finish <run> [--usage "<tokens/cost if known>"]` and `report <run>`. The report opens with the summary and a decisions table (awaiting, then decided), followed by full proposal details. Unresolved items, the discovery log, decided-proposal details and the appendices come after. The report leads with decisions needed and puts unchanged checks in an appendix.

**Review page (always, every run; maintainer decision 2026-10-10).** The maintainer reviews the report as a private web page, not a Markdown file. After `report`, run `report <run> --html` (writes `runs/<run>/report.html` from the same ledger data). Publish it with the Artifact tool to the **one stable review page**, https://claude.ai/artifact/MACCwb5T2ySWbPHVbDvz23, so the link never changes. From a new conversation, first `read` that URL, then publish the new file with `url` set to it; never create a second review page. Give the maintainer the link and a short in-session summary of findings, map changes and decisions needed. Re-publish the page whenever decisions are recorded or proposals are applied. Keep its declared capabilities (`db`, `user`, `comments`) so the response buttons and the send button keep working (see §5). The page is private to the maintainer; sharing is done from its Share menu.

**Visibility:** the GitHub repo and its branches may be public, and so may preview deployments. Until the maintainer has approved the public audit format, do not push run outputs (`ledger.json`, `sources.json`, `checks.json`, `runs/`).

## 5. Recording decisions (review page or conversation)

**From the review page.** Each card awaiting a decision has response buttons (Yes, accept · Accept with changes · Reject · Defer · Other; questions show their lettered options) and a note box. Answers are saved to the page's database, collection `responses`, document `<PID>-v<N>`, with `proposal`, `version`, `change_hash`, `choice`, `note`, `updated_at` and `by`. The page is published with `capabilities: {db: {}, user: {}, comments: {}}`; keep that declaration on every republish (omit `capabilities` to carry it forward). When the maintainer presses **Send my answers to Claude** on the page (a comment sent to Claude, which wakes the session watching the page; answer it in that comment thread with `ArtifactComments`), when they say responses are ready, and at the start of every run:
1. Read them: `ArtifactData` `list` on collection `responses` of the review page URL.
2. Use a response only if its `version` and `change_hash` match the proposal's current version (`research.js show PID`). A response to an older version is stale: show the new version and ask again.
3. Map it: `accept` → `decide PID accept --version N --note "Review page response <updated_at>: <note>"`. `reject` / `defer` → the same with that action. `option-x` on a question with drafted options → `choose PID --option x --version N --note "…"` (applies exactly that option's edits; an option with no edits closes the question). `recommendation` → `choose` with the `recommended` option. Older questions without drafted options: record the edit when the choice fully determines it; otherwise draft and ask. `accept-with-changes` or `other` → apply the note: exact wording becomes `edit PID`, anything needing judgment becomes a new version shown for review. If a note is ambiguous, ask in the session before recording.
4. Responses are written by people with edit access to the page. While the page is private to the maintainer, they are the maintainer's decisions; if it has been shared with editors, check `by` (`ArtifactData profiles`) and confirm anything not from the maintainer.
5. Read back what was recorded (ID, version, new status), apply, regenerate with `report <run> --html`, and republish the page. Old responses stay in the store as the record; never delete them.

**From conversation.** The maintainer replies in plain language. Map each reply to one command, always citing the version they saw:

| They say | Command |
|---|---|
| "accept P-0002" | `decide P-0002 accept --version <shown v>` |
| "reject P-0003 — reason" | `decide P-0003 reject --version N --note "reason"` |
| "defer P-0004 until Dec" | `decide P-0004 defer --version N --until 2026-12-01 --note "…"` |
| "edit P-0005: say X" | write the changes with their wording → `edit P-0005 <file> --note "…"` (accepted as their version) |
| an answer to a question/flag | record it with `decide … defer\|reject\|withdraw --note "<answer>"`, or revise the flag into a concrete change and show it again |

Set each proposal's evidence status (`status PID --status … --missing "…"` or `research_status` in the proposal file); it is separate from the decision. Only verified or internal-consistency proposals go to the maintainer for a decision. A disputed proposal can be accepted only with an explicit `--override "<their reason>"`, and the override never changes its evidence status. If a proposal was revised after they saw it, the tool refuses the decision. Show the new version first. Read the result back to the maintainer: ID, version, new status. Use `note PID --text` to record clarifications of what a decision covers.

## 6. Apply (second PR)

On a branch from `main`:
1. `node tools/apply.js --date <YYYY-MM-DD>` applies only accepted, unapplied proposals at their approved version, updates the derived counts and dates, runs `build-llms.js`, and writes a manifest to `research/applied/`.
2. `node tools/check.js --guard origin/main` must pass. It replays the manifest onto `main` and requires byte-identical published files.
3. Open the PR. Never merge it yourself; the maintainer merges, and Vercel deploys.

## 7. Weekly run (after the baseline audit)

**Schedule (maintainer decision 2026-10-10):** Mondays 04:50 UK time (`CRON_TZ=Europe/London`), i.e. late Sunday night US Eastern, so the review page is ready for a UK morning and a US Eastern morning alike. A weekly run is lighter than the baseline. It does not re-audit every item each week; it keeps every item re-verified on a rolling basis, re-checks anything whose source changed, and searches for new mechanisms. It runs in a fresh cloud session started by a scheduled routine.

1. **Set up.** If the repository is not checked out, attach `buildwithwhy/ai-governance-map` with `add_repo` and clone it. Work on the session's designated branch, based on `origin/main`. If an earlier weekly PR is still open, base the branch on that PR's head instead, so its unmerged research record is not lost. Check §0 preconditions.
2. **Read responses first.** Read the review page's `responses` collection (§5) and record any answers that match current proposal versions; apply what was accepted (§6).
3. **Start the run.** `run start <YYYY-MM-DD>-weekly --label "Weekly audit <date>" --partial`.
4. **Changed sources.** Re-fetch every source used by an item's last successful check (`source fetch`); the tool reports `content changed since last fetch`. Re-verify every item whose source changed.
5. **Rolling re-verification.** Re-verify the items with the oldest last successful external check, about one eighth of the inventory each week, so that every item is re-verified at least every eight weeks. Items never verified, or verified only internally, go first.
6. **Discovery.** Search every SCOPE list B cell for mechanisms and significant changes since the previous run (§3).
7. **Fan out and ingest.** Use one research subagent per layer when the work is large, each following `research/AGENT-BRIEF.md`. Subagents write batches (the shape in `tools/ingest.js`) and pre-check them with `ingest FILE --validate`. Claude reviews each batch, then records it with `ingest FILE --run RUN`, one batch at a time. Every quoted passage must appear in the retrieved text; approximate matches are checked by hand before anything relies on them.
8. **Report and publish.** Write highlights, finish the run, `report <run> --html`, and republish the review page to its stable URL (§4). The content date on the map changes only if accepted edits are applied.
9. **PR.** Commit the research record (and any applied, accepted edits) and open or update one PR for the week. Never merge it, and do not deploy.
10. **Tell the maintainer** in the session what changed, what needs a decision, and give the review page link.
