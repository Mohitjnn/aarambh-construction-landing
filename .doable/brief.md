---
version: 1
status: approved
updated: 2026-10-29
---

# Design Brief

Source of truth for this project. Written by `doable-discovery`, approved by the user, and binding on every session. Do not edit by hand mid-build: change a locked decision through an amendment (`/doable-frontend change <ID or area>`), which updates this file and adds a line to the changelog.

Each decision is `ID | status | value`. Status is `decided`, `defaulted` (user said "you pick") or `unknown`. The brief is complete only when no required field is `unknown`.

## 1. Locked decisions

### Brand
- BR-1 | decided | Aarambh Construction (entities: Aarambh Construction, Aarambh Infra Works). Mumbai construction company: joint ventures, contracting, redevelopment and land acquisition, housing finance. [client/company.md]
- BR-2 | decided | Housing society redevelopment committees, premium home buyers, JV landowners, contract clients; also pitch audiences (partners, lenders, investors). [client/company.md]
- BR-3 | defaulted | Assured, plain, values-led, institutional. Inferred from company.md tone and competitors.md "overall direction".
- BR-4 | decided | Get in touch (contact form: Name*, Email*, Phone, Message; enquiry types: society redevelopment, purchase, JV, contracting). [client/company.md]
- BR-5 | decided | local-service (real estate) spine with fintech-style credibility proof (bank partners, legal partners, stats).
- BR-6 | decided | Likes: Norm Architects restraint, Hum Developers proof band and timeline, Hum Emerald split editorial and dense footer. Dislikes: MagicBricks/99acres classifieds, crypto neon, cartoon-icon builder templates. [client/competitors.md]

### Visual style
- ST-1 | decided | Editorial and refined: architectural monograph meets institutional fortress; hairlines, large photography, blueprint motifs.
- ST-2 | defaulted | Balanced, generous whitespace around photography, tight in proof bands.
- ST-3 | decided | Sharp: 0-4px radius, 1px gold/bronze hairline borders, no heavy shadows.

### Dimensionality
- DM-1 | defaulted | 2D with depth (layered panels, clip-path reveals, photography). Inferred from the portal hero reference.
- DM-2 | decided | n/a (2D)

### Typography
- TY-1 | decided | Jost 700, uppercase, slight tracking (next/font).
- TY-2 | decided | Jost regular [client/company.md]
- TY-3 | decided | Compact: H1 up to 64px, H2 28-36px, card title 20-24px, body 16px/1.6, caption 14px, section padding 64 desktop / 48 phone, section height 450-700px at 1440.

### Colour
- CO-1 | decided | Light base (#F8F7F4) with navy bands (hero, stats, contact, footer). No toggle.
- CO-2 | decided | navy #1C2F54, gold #EDC66F, bronze #BF9E73, off-white #F8F7F4, ink #1F2328 [client/company.md]
- CO-3 | decided | Gold for actions, stat numbers and key phrases in statement headlines; bronze for small eyebrow labels. No gold body text on light (contrast).
- CO-4 | defaulted | Subtle navy/gold duotone wash on hero image only; none behind body text.

### UI elements
- UI-1 | defaulted | shadcn/ui behaviour layer (form, dialog, sheet, toast); all visuals custom.
- UI-2 | defaulted | Sharp-cornered solid: gold with navy text on navy; navy with off-white text on light; arrow icon.
- UI-3 | defaulted | Flat bordered with hairlines, editorial (no box) where possible.
- UI-4 | defaulted | Lucide, single thin stroke, for the secondary services.
- UI-5 | defaulted | Stacked contact form with enquiry-type selector, split beside direct sales contacts. [client/competitors.md]

### Motion
- MO-1 | decided | Moderate: portal hero, pinned horizontal project gallery and stats count-up are the big moments; elsewhere quiet staggered reveals. Dual testimonial marquee is in (placeholder content, see Section: Testimonials).
- MO-2 | decided | Hero: portal parting panels with wordmark expansion, scroll-scrubbed and reversible. [client/competitors.md]
- MO-3 | defaulted | Full content, no animation under prefers-reduced-motion; marquee falls back to static grid.
- MO-4 | decided | Portal Parting & Wordmark Expansion (see client/competitors.md, Hero Animation Reference).

### Imagery
- IM-1 | decided | Client media first, stock allowed to fill gaps (Magnific via env var, never generated). [client/company.md]
- IM-2 | defaulted | Full-bleed or 4px-radius frames, natural grade with navy/gold wash on hero only.
- IM-3 | decided | Hero video available: client/media/HomepageHeroVideo.mp4 (use per hero recipe).
- IM-4 | decided | No images: stats band, financing and professional partner logos, FAQs, contact, legal and footer, secondary services (icons only). Every other section has an image. [client/company.md]

### Stack
- SK-1 | defaulted | Next.js App Router, Tailwind v4, shadcn/ui, GSAP (empty repo; defaults per rules.md section 1).

## 2. Pages and sections

The page plan lives in `LANDING_PLAN.md`.

### Section: Testimonials
- Direction given by the user: placeholder testimonials are allowed for now because the section is being pitched. Mark them clearly in code (`TODO(placeholder)` in content/site.ts) so they are replaced before launch.

### Legal
- Direction given by the user: Privacy Policy, Terms of Services, Disclaimer and Credit only need to be visible as footer links. No full legal text required.

### Compliance
- Direction given by the user: leave out MahaRERA and ISO entirely (no numbers, no disclaimer, no claims).

## 3. Open questions

- Anuradha CHS and Aarambh Trident: confirmed by the user, but status (ongoing, upcoming, completed) is not given. Show without a status label until supplied, and keep them out of the "completed" stats and gallery.

## 4. Changelog

- 2026-10-29 | created | initial brief approved
- 2026-10-29 | amended | OQ unverified items: confirmed by the user (38L sq ft is correct; all company.md items usable); MahaRERA/ISO omitted; legal links only; placeholder testimonials allowed
