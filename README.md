# Advisories

What Dux, Start9's support assistant, is allowed to say about a confirmed problem. One file per advisory under `advisories/`. Merging a file to `master` is what makes it real: Dux reads this repository for confirmed guidance and nothing else.

An advisory is a situation people are hitting now — a transition, an incident, an obvious answer that is wrong — together with what to tell them. It is expected to pass. Guidance that lives forever is documentation. A defect that still owes a fix has a tracker issue in its code repository; the advisory links it under Sources and carries the support guidance.

Issues in this repository are discussion. Only a file is an advisory, and nothing else anywhere is called one.

## The file

`advisories/<n>.md`, where `<n>` is the next unused integer. Never renamed, never reused: the number is the advisory's identity, and retiring one file and adding another is how an advisory changes identity. [`TEMPLATE.md`](TEMPLATE.md) is the file to copy; it names each section and says what goes in it.

The title is the single `#` heading and is what Dux sees in a search result, so it names the service or product the situation is in — StartOS alone goes unnamed — and is recognisable from a customer's own words. Symptom, Affects and Remedy are required; an empty optional section is deleted, not left blank. No other headings, no front matter, under 8 KB. `npm run check` enforces every rule, and CI runs it on each pull request, so `master` only ever holds valid advisories.

## How Dux uses it

Every couple of minutes the support server syncs `advisories/` from `master` into Postgres: number, title, full text, the file's first-commit date, its sources. A customer message is matched against that text with Postgres full-text search — title weighted highest, then Symptom and Affects, then the rest — and ranked by the match, by how often past support threads turned out to be about the advisory, and with a lift for advisories filed in the last thirty days. Dux is handed the top few titles. It must read an advisory in full before saying a word of it, and the server discards a reply that cites one it did not read. An advisory says what the fix is; how to reach it on StartOS — SSH, `start-cli`, the UI — is documentation, and Dux takes those steps from there when it answers, so nothing here goes stale with a StartOS release.

No model performs the search. Haiku and Sonnet draft advisories, humans merge them, Postgres finds them, Dux verifies and answers.

## Lifecycle

- **File** — a pull request adding `advisories/<n>.md`. A maintainer reviews and merges. Dux has it within minutes.
- **Update** — a pull request editing the file. Same review. Postgres follows `master`, so an edit is live on merge and never stale.
- **Retire** — a pull request deleting the file. Gone from Dux on the next sync, kept in history. Retire an advisory when the situation is over or the guidance has moved into the docs.
- **Never rename.** The number is what ranking history hangs on.

An advisory nobody has hit for a long time ranks lower on its own; nothing has to be closed to keep Dux current. When a source changes upstream, an update PR is opened for review; nothing edits `master` without one.

## Filing one

A pull request adding `advisories/<n>.md`, reviewed and merged like any other change here. Agents and bots follow [`AGENTS.md`](AGENTS.md).
