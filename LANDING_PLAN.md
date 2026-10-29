# Landing Plan: Aarambh Construction

- **Goal:** corporate landing page. Tell people who Aarambh is, what it does and what it has delivered; soft action is contact.
- **Primary CTA:** "Get in touch" (header, hero, mid-page after Projects, closing contact).
- **Playbook:** local-service (real estate) with fintech-style credibility proof. Spine reordered so the redevelopment process and the financing and legal partners sit before the projects, because society committees ask "can I trust the process and the money?" before "show me buildings".
- **Audience read:** redevelopment committees and JV landowners (trust, process, legal and financial cover), home buyers (look and location), pitch audiences (scale, partners).
- **Brief:** approved. Editorial and refined, light base with navy bands, Jost 700 uppercase headings, Compact scale, sharp hairlines, moderate motion.

| # | Section | Visitor question | Essence | Visual role | Media | Layout | Motion recipe and why | Copy source | Grows? |
|---|---|---|---|---|---|---|---|---|---|
| 0 | Header | Where do I go, how do I reach them? | Calm authority, always-available contact | none (chrome) | Logo.webp (white, on navy/photo; navy-tinted variant on light) | Floating 3-zone bar: logo left, jump links centre, phone + "Get in touch" right, backdrop blur (Norm) | None; fades to solid on scroll (CSS) | company.md, live nav | no |
| 1 | Hero | What is this and why trust it? | "A builder that opens a new chapter for you" | Hero stage | HomepageHeroVideo.mp4 (1080p, 5s, no burned-in text) behind the gates, poster = first frame | Closed navy gates with AARAMBH / CONSTRUCTION wordmark, H1 "Your Dream. Our Blueprint.", sub, CTA all visible at 375x667; scroll opens gates onto the video | **Portal parting** (your MO-4 reference): scrubbed, reversible, sticky CSS stage not a pin, so it counts as a scrubbed effect. Text group fades out first third, before gates move. Purpose: physical "entrance" for the name Aarambh | company.md, live site | no |
| 2 | Opening statement | What do they believe? | Every project is a new beginning | Backdrop + overlay | BgImage.webp (blueprint sketch, 1 image) | Label, statement headline with gold key phrases, clipped blueprint frame expanding to full-bleed behind the text zone | **Mask reveal** (scrub) + **Line-by-line text**. Image never reaches text: frame expands on the empty half, text exits first | company.md, competitors.md | no |
| 3 | Numbers | How big is this? | 7+ years, 30+ projects, 750+ families, 38L sq ft | Proof wall | none (client rule), solid navy | Four figures in a hairline-divided strip. Not big-number-over-label: figure and label set inline on one baseline with the unit | **Counter tick** once on entry | company.md stats | no |
| 4 | What we do | What can they do for me? | Four core services, each a route to a different client | Image cards | 4 images: Joint Ventures (CompletedProject3), Contracting (ContractualProject2), Redevelopment & Land Acquisition (ConstructionWorkArchitect), Finance (1 Magnific stock, see list). Secondary services (Building, Renovation, Flooring, Electrical) as an icon-only list under the cards, no photos (client rule) | 2x2 editorial cards, image on top, hairline border; secondary list as a ruled row | **Stagger cascade**; hover: image zooms in frame (CSS) | company.md services | Cards: no (fixed 4). Secondary list: yes, wraps |
| 5 | Redevelopment process | How does a redevelopment actually run, and is my society protected? | Four clear steps: feasibility, sanctions, escrow trust, timely handover | Scroll story | 4 frames: BgImage (feasibility), ConstructionWorkArchitect (sanctions), Compliment2 (escrow/quality), Compliment1 (handover). Frames are mood images, not claims | Sticky media left, step text right; phone: image above each step | **Sticky media story** (CSS sticky, not pinned) | company.md (process, confirmed 2026-10-29) | Steps: no |
| 6 | Partners | Who backs and checks the work? | Banks fund it, named firms check it | Proof wall | none (client rule): 6 bank logos supplied (Partner1, partner2-6.webp, grey-bordered, set on white tiles, crop trims the baked-in border); the 3 professional firms (Bhansali and Palekar, Anant Darshan, Adyant) and Zero Brokerage Home have no logo files, so they are set as typographic names | Off-white strip: financing row (6 banks) and professional row (3 firms + Zero Brokerage Home), hairline grid | **Stagger cascade** (2nd and last use) | company.md | Yes: wraps, tested at 12 |
| 7 | Projects | What have they built? | Six delivered towers across Mumbai | Scroll story (horizontal rail) | 6 images: CompletedProject1-3, ContractualProject, 2, 3 (assigned in file order; user will swap later, so no placeholder marking) | Full-height pinned stage; cards slide sideways: image, name, typology, location. Mid-page "Get in touch" after it | **Horizontal rail** (the one pinned scene). Mobile and reduced motion: swipe carousel (Embla) | company.md case studies | Yes: carousel on phone, rail on desktop, stress-tested at 12 |
| 8 | Testimonials | What do clients say? | People like me were looked after | People | Initial avatar badges (no photos) | Dual opposing marquee rails, edge-masked, hover pause | **Marquee** (ambient). Reduced motion: static grid | Dummy quotes, user-approved for pitch. No caption | Yes |
| 9 | Leadership | Who am I dealing with? | Three named people, reachable | Image cards | Akshay and Roshni portraits; Kartar Singh Kaler: no photo, initial badge | 3 portrait cards, name, role. Responsibilities from confirmed company.md | **Mask reveal** (2nd use) | company.md team | no |
| 10 | FAQs | What else do I need to know? | Common questions answered, nothing hidden | Statement (text-only list, by client rule) | none (client rule) | Two-column: title left, accordion (shadcn behaviour, restyled) right | **Soft rise** (supporting only; the section is a reading list) | Dummy FAQs (user-approved), written plainly around the four enquiry types | Yes |
| 11 | Contact | How do I reach them? | One easy way in, a person to ask for | Split | Map embed (correct Borivali West pin), no photos | Left: Kartar, phone, email, office address, enquiry types. Right: form (Name*, Email*, Phone, Message, enquiry type). Navy ground | **Line-by-line text** (2nd use). Form states: inline validation, success | company.md contact | no |
| 12 | Footer | Anything else? | Closure and legal | none (chrome) | none; oversized cropped "AARAMBH" watermark | Navy, address, quick links, Privacy Policy, Terms of Services, Disclaimer, Credit (visible links only), copyright "Aarambh Infra Works". No MahaRERA, no ISO | **Soft rise** | live footer | no |

**Hero alternatives (one line each):** (A) Full-bleed video with line-by-line wordmark reveal and slow zoom, no gates; (B) Blueprint stage: BgImage sketch draws itself over navy, then the video fades in behind the wordmark.

## Page checks
- **Roles by section:** hero-stage, backdrop-overlay, proof-wall, image-cards, scroll-story, proof-wall, scroll-story, people, image-cards, statement, split. No neighbours share a role. 7 distinct roles on 12 sections.
- **Motion (moderate budget: 1 pinned, 2 scrubbed, 1 ambient, 5+ recipes):** pinned 1 (rail), scrubbed 2 (portal, mask in section 2), ambient 1 (marquee). 9 distinct recipes. No recipe on more than two sections.
- **No-media sections and why:** 3, 6, 10, 11 (map only), 12 are no-photo by your rule. Statement count is 1.
- **Stock shopping list (Magnific, one slot):** Finance card: housing finance, keys and documents, neutral, no faces, landscape. Shortlist shown before any download.
- **Deviations from rules.md:** none. The hero reference is a custom recipe not in motion.md; your reference wins.

## Decisions and gaps
1. **This is a landing page:** dummy content is fine for anything not supplied (testimonials, FAQs, project to image mapping). It is not marked as a placeholder in the UI; the user swaps it later.
2. **Projects:** the six images are assigned to the six names in file order.
3. **Partners:** bank logos supplied. Professional-firm logos not supplied, shown as typographic names.
4. **Anuradha CHS and Aarambh Trident:** no images or status, left out.
5. **Copy:** wording comes from company.md verbatim; the live fetch returned paraphrase only. "Active since 2021" excluded.
6. **Stack install:** empty repo, so Next.js, Tailwind v4, shadcn and GSAP get scaffolded at their latest versions in Phase 4.

Status: approved 2026-10-29 with the amendments above.

## Build notes (2026-10-29)
- Stock (Magnific, photos only, AI-generated excluded, each picked after viewing): service-finance (428489048), service-contracting (37773308), service-redevelopment (39105546). Manifest: `client/media/stock/manifest.md`.
- Hero: closed wordmark is optically centred (the two words differ in length, so the phrase is nudged left by half the width difference). Tracking tightening is animated as in your reference, on two small spans only.
- Process: image column widened to 7/12 and step text blocks shortened to remove dead space.
- Projects image to name mapping is in file order. The image used for "Pratur" carries a visible "NAVKETTAN" sign, and the image for "Moru Milan" carries third-party shop and builder signage. Swap when the real mapping is known.
- Contact form validates but has no backend yet.
