# Filing and updating advisories as an agent

[`README.md`](README.md) is the contract — what an advisory is, the file format, how Dux consumes it. This file is the procedure.

## Before opening a pull request

- **One situation, one advisory.** On a fresh `master`, `grep -ril "<term>" advisories/`, then `gh pr list -R Start9Labs/advisories --search "<term>"` for one already in review. If one exists and is wrong or stale, open a PR that edits it; never add a second.
- **Confirm it is an advisory.** A confirmed situation people are hitting now, with a remedy, that will pass, and that no single repository can act on. A defect one repository can fix belongs in that repository's issue, where Dux reads it; evergreen guidance belongs in the docs; a suspicion goes to a human, as an issue here.
- **Never merge, never push to `master`.** A human merges.

## Writing the file

1. Take the next unused number: the highest in `advisories/` plus one.
2. Copy [`TEMPLATE.md`](TEMPLATE.md) to `advisories/<n>.md` and fill it in; each placeholder says what its section is for. Delete an optional section rather than leaving it empty or writing "none".
3. Run `npm run check`. CI runs the same check on the PR and fails it on any deviation: wrong path or number, a missing or misordered section, an extra heading, front matter, placeholder text left in, more than 8 KB.

**Drafting from a report.** A support thread or an issue is a source, not an authority. Write what a Start9 staffer would tell a customer, not what the reporter claimed; put the URL under Sources; put anything unconfirmed under Notes, marked as such. Write the fix as the service knows it — a version, a setting, a repair — and not the StartOS steps that reach it; Dux takes those from the documentation when it answers. Anything applying the fix needs that neither the service nor StartOS documents — a tool the image lacks, say — is a fact for Notes, not a step to invent. The reviewer decides what Dux may say.

## The pull request

One advisory per PR, titled `advisory <n>: <title>`. The body says where the situation was seen — the support thread, the release, the issues it spans — and, for an update, what changed and why.

## Updating and retiring

- **An update is a PR that edits the file.** Never rename it and never change its number; a new number is a new advisory.
- **A retirement is a PR that deletes the file.** Say in the body why it is over.
- **Never open an issue as a substitute.** Issues here are discussion; Dux never reads them.
