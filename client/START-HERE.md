# Start here: what to give the pack

Give as much of the first two tiers as you have. Claude infers the rest, states what it assumed, and asks only for gaps that block the work. Blank is fine; invented is not, so anything missing becomes a visible placeholder.

## Tier 1: needed to start
| What | Where | Why |
|---|---|---|
| What the business is, who the page is for, and the one action it should drive (with exact CTA label) | `company.md` | Picks the industry playbook and the section story |
| The live site URL, if one exists | `company.md` | Claude pulls the real wording into `copy.md` so nothing is invented |
| Brand colours and fonts, if they exist | `company.md` | Used as-is; no alternatives proposed |
| Whatever images, product shots and videos you have | `media/` | Used first. Videos: tell Claude any claims or numbers burned into them |

## Tier 2: makes the result noticeably better
| What | Where | Why |
|---|---|---|
| Real proof: customer names, numbers, certifications, press, reviews | `company.md` / `copy.md` | Proof is never invented; without it the proof sections are thinner |
| 3 to 6 reference sites, with one line each on what to borrow | `competitors.md` | Layout and motion ideas inside the playbook's structure |
| For any reference that blocks fetching: screenshots or a scroll recording | `references/<site>/` | Always preferred over fetching; cannot be rate-limited |
| Things you dislike ("no stock-photo people", "not another card grid") | `competitors.md` overall direction | Becomes a project anti-pattern |
| Which lists will grow (products, reviews, FAQs) | `company.md` | Growable lists are built as carousels |
| Whether stock photos are allowed, and for what | `company.md` | Decides whether Magnific is used; set `MAGNIFIC_API_KEY` in env if yes |

## Tier 3: optional overrides
Hero motion reference (URL, video or description), a minimal vs expressive preference, the type scale, section order changes, specific layouts for specific sections. If you give none, Claude chooses from the playbook and shows alternates in the plan.

## The shortest useful first message
> Build the landing page. Business: ___. Audience: ___. Action: ___ ("___"). Live site: ___. Brand colours/fonts: ___. Stock photos: allowed / not allowed. References are in `client/competitors.md`.

## What you will be asked
A short discovery (about 3 rounds, with recommended answers pre-filled), then one approval of the page plan. After that the page is built without per-section questions.
