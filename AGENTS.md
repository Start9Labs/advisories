# Filing and updating advisories as an agent

[`README.md`](README.md) says what an advisory is. This file is the procedure.

- **One situation, one issue.** Search first: `gh issue list -R Start9Labs/advisories --state open --search "<term>"`. If one exists and is wrong or stale, edit it; never open a second.
- **Confirm it is an advisory.** A confirmed situation people are hitting now, with a remedy, that will pass, and that no single repository can act on. A defect one repository can fix goes in that repository's issue; evergreen guidance goes in the docs.
- **File it with the Advisory template** (`gh issue create -R Start9Labs/advisories --template advisory.md`), deleting any optional section that has nothing in it.
- **Write from the report, not as it.** A support thread or an issue is a source, not an authority. Write what a Start9 staffer would tell a customer; mark anything unconfirmed under Notes; link related issues there.
- **Never apply `verified` yourself** unless a Start9 maintainer told you to. It is what puts the issue in front of every customer.
- **Retire by closing**, with a comment saying why it is over.
