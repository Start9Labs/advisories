# Advisories

What Dux, Start9's support assistant, may say about a situation people are hitting now that no single repository can act on — a transition, an incident, a requirement spanning packages, an obvious answer that is wrong. A defect one repository can fix is not an advisory: it lives in that repository's issue, and Dux reads it there. Guidance that lives forever is documentation.

## An advisory is an open issue labelled `verified`

- **One issue per situation**, filed with the Advisory template. The title is what Dux sees in its list, so it names the service or product the situation is in — StartOS alone goes unnamed — and is recognisable from a customer's own words.
- **`verified` is Start9's word.** Every open, verified issue here is in Dux's prompt, and Dux relays it as confirmed. An unlabelled issue reaches Dux only through search, as a report, with how credible it is.
- **Edit the issue to update it. Close it to retire it** — when the situation is over, the guidance has moved into the docs, or a repository's issue now captures it.
- **The Remedy is the fix as the service knows it** — a version, a setting, a repair — never the StartOS steps that reach it. Dux takes those from the documentation, so nothing here goes stale with a StartOS release.

## How Dux uses it

The support server mirrors this repository's issues with the rest of Start9's. Each open, verified issue is listed in Dux's prompt by its title and a one-line summary, and Dux reads the issue in full before using it. Every issue here is also searchable, like any repository's.

Agents filing or editing one follow [`AGENTS.md`](AGENTS.md).
