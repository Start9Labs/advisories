# Advisories

What Dux, Start9's support assistant, may say about a situation people are hitting now that no single repository can act on — a transition, an incident, a requirement spanning packages, an obvious answer that is wrong. A defect one repository can fix is not an advisory: it lives in that repository's issue, and Dux reads it there. Guidance that lives forever is documentation.

## An advisory is an open issue labelled `verified`

- **One issue per situation**, filed with the Advisory template. The title is what Dux's search weighs most, so it names the service or product the situation is in — StartOS alone goes unnamed — and is recognisable from a customer's own words.
- **`verified` is Start9's word.** Dux relays a verified issue as confirmed, and an unlabelled one as a report, with how credible it is.
- **Edit the issue to update it. Close it to retire it** — when the situation is over, the guidance has moved into the docs, or a repository's issue now captures it.
- **The Remedy is the fix as the service knows it** — a version, a setting, a repair — never the StartOS steps that reach it. Dux takes those from the documentation, so nothing here goes stale with a StartOS release.

## How Dux uses it

The support server mirrors this repository's issues with the rest of Start9's, and every step of Dux's issue search covers this repository as well as the one it is searching. Dux reads an issue in full before using it.

Agents filing or editing one follow [`AGENTS.md`](AGENTS.md).
