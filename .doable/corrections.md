# Corrections

Append-only log of fixes and feedback made during development. Binding once logged, below the brief and above `rules.md`.

Entry format (one block per correction, newest last, headed with three hashes, the ID and a short title):
- Date:
- Scope: global, page:<name>, section:<name> or component:<name>
- Was: what was built or assumed
- Now: what is correct
- Why: the user's reason, in their words
- Status: `one-off`, `rule`, `promoted` (moved into the brief) or `retired` (no longer enforced)

Only `rule` entries are enforced. A correction that contradicts a locked brief decision is not logged here: it goes through the amendment path and the brief changelog links back to the ID.

### C-001 Landing page: dummy content is fine, do not mark or ask
- Date: 2026-10-29
- Scope: global
- Was: proposed visible TODO(placeholder) markers and a "Sample content" caption, and asked for the legal text, FAQs and image mapping
- Now: this is a landing page. Legal pages are footer links only. Missing content (testimonials, FAQs, project mapping) gets dummy content, not marked as placeholder in the UI, and is not asked for. The user swaps it later.
- Why: "this is a landing page", "dont mark as placeholder i can change the image later on thats not an issue"
- Status: rule
