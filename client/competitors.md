# Competitors and References

List several reference sites, not one. Claude opens each, compares them, and merges them into one direction (see `landing-page/references/design-refs`). Your notes here outrank what Claude observes on the sites.

References are used for structure and ideas only, never copied.

## How to fill this in

Add one block per URL. Mark each as a **competitor** (same market), **design reference** (look and feel, any market) or **both**. Aim for 3-6 total.

## References

### 1. Norm Architects

* **URL:** https://normcph.com/

* **Type:** design reference

* **Borrow:**

  * Restrained architectural minimalism, intentional negative space, and disciplined typography.

  * Floating 3-zone translucent header bar: vector logo pinned left, subtle section jump links centered, high-contrast CTA and phone number pinned right with backdrop-blur.

  * Full-bleed architectural imagery with subtle hover cross-fades and quiet bottom-anchored typographic hierarchy.

* **Avoid:**

  * Overly detached Scandinavian gallery feel with zero direct conversion prompts. Mumbai redevelopment committees and home buyers need immediate trust anchors and accessible inquiry options.

* **How the client is different:**

  * Aarambh Construction is an active urban developer and society redevelopment firm in Mumbai (Western Suburbs & MMR). It requires institutional credibility anchors (banking consortiums, delivered square footage, legal and PMC partners) alongside refined aesthetics.

* **Notes:**

  * Calibrates the calm, high-end architectural authority that elevates Aarambh above noisy local builder templates.

### 2. Hum Developers

* **URL:**https://humdevelopers.com

* **Type:** competitor

* **Borrow:**

  * "Where Numbers Meet Legacy" horizontal social proof band with clean hairline dividers and geometric accents.

  * Interactive milestone timeline tracing developer delivery history over time.

  * Structured elevation cards for ongoing and delivered multi-storey high-rises.

* **Avoid:**

  * Flashy neon glows, generic Web3 styling, or busy crypto-style tech patterns that compromise institutional reliability.

* **How the client is different:**

  * Aarambh emphasizes structural, legal, and financial escrow transparency for cooperative housing societies (featuring partners like Bhansali & Palekar, Anant Darshan, Adyant).

* **Notes:**

  * Direct local benchmark for modern residential presentation in Mumbai.

### 3. Hum Emerald (New Hum)

* **URL:** https://newhum-one.vercel.app/

* **Type:** competitor

* **Borrow:**

  * Two-column editorial narrative fold: bronze eyebrow tag, bold statement display heading, and editorial narrative on the left; tall vertical elevation render frame on the right.

  * Dense luxury developer footer: corporate office address, jump links, subdued oversized brand watermark typography ("AARAMBH"), and dedicated compliance/disclaimer notes.

  * Split "Get in Touch" lead intake section with direct sales contact channels on one side and an inquiry form on the other.

* **Avoid:**

  * Single-project micro-site constraints. Aarambh's page is an overarching corporate developer brand catering to societies, home buyers, and joint-venture land partners.

* **How the client is different:**

  * Multi-stakeholder offering (redevelopment, joint ventures, turnkey contracting, finance) rather than a single tower inventory push.

* **Notes:**

  * Benchmark for balanced two-column developer storytelling and luxury footer layout.

## Hero Animation Reference

* **URL, video or description of the hero motion you want:**

  * **Portal Parting & Wordmark Expansion (Superdesign Portal Pattern):**

  * A sticky \~2.5vh pinned stage on solid Navy (`#1C2F54`) with `isolation: isolate` and `overflow: hidden`.

  * The hero begins **CLOSED**: two solid Navy panels meet exactly in the center, completely concealing the background image. At the center intersection sit two bronze/gold accent dots.

  * Overlaid on top is the display wordmark split into two distinct spans: `AARAMBH` (left span) and `CONSTRUCTION` (right span).

  * **Scroll Scrubbing Action:** As the user scrolls vertically:

    1. The two solid Navy panels slide outward horizontally beyond their own width, opening like architectural gates to uncover a full-bleed architectural tower photograph behind them.

    2. The background image settles from a slight overscale ($1.08 \rightarrow 1.0$) with a subtle navy/gold duotone wash settling into natural brilliance.

    3. The title scales up slightly while **simultaneously tightening its tracking** (letter-spacing), and span 1 translates left while span 2 translates right toward the screen edges.

    4. The two accent dots travel toward opposite corners of the stage.

  * **Reversibility:** Fully bound to scroll position via a requestAnimationFrame (rAF) throttle or GSAP ScrollTrigger so it plays symmetrically in reverse on scroll-up.

* **What specifically you like about it:**

  * It creates a physical architectural sense of entrance ("Aarambh" / beginning), uncovering the structural craft behind a parting monolithic facade rather than using a generic template fade.

## Per-Section References & Motion Mechanics

### 1. Statement Fold & Opening Frame

* **Concept:** Post-hero full-height transition fold.

* **Layout & Motion:**

  * Small uppercase label in Bronze (`#BF9E73`).

  * Bold statement headline (`clamp(24px, 3.6vw, 52px)`) with key phrases highlighted in Gold (`#EDC66F`): *"Every project marks a new beginning, an Aarambh."*

  * An architectural blueprint or tower elevation clipped with Superdesign `clip-path: inset(28% 24% round 4px)` that smoothly expands to a full edge-to-edge card as the user scrolls into the section.

### 2. Social Proof & Performance Band (Zero Images)

* **Constraint (from `company.md`):** Solid Navy (`#1C2F54`) background strictly with **NO images**.

* **Layout:** Horizontal stats strip featuring 4 large figures in Gold (`#EDC66F`):

  * `30+` Completed Projects

  * `750+` Happy Families

  * `38L` Sq. Ft. Delivered

  * `7+` Years of Experience

* **Motion:** Count-up on scroll entry with hairline vertical dividers (`rgba(237, 198, 111, 0.18)`).

### 3. Pinned Horizontal Gallery (Portfolio of Delivered Projects)

* **Concept:** Sticky vertical-to-horizontal pinning showcase for verified completed projects (*Raj Spaces, Matrudarshan, Disha CHS, Pratur, Moru Milan, HDG Hill View*).

* **Layout & Motion:**

  * A full-height sticky section where vertical page scroll locks into place.

  * Cards slide horizontally across the screen, displaying each completed high-rise with high-contrast architectural imagery, typology, location tag, and structural specs.

* **Technical Requirement:** GSAP ScrollTrigger initialization wrapped in a safety check (`ResizeObserver` or microtask delay inside `useLayoutEffect`/`useEffect`) to ensure the DOM is completely rendered, image dimensions are resolved, and horizontal track widths are accurately measured prior to pin calculation.

### 4. Continuous Marquee Testimonials & Society Trust

* **Concept:** Dual opposing continuous-scroll rails.

* **Layout & Motion:**

  * Two rows of compact cards scrolling seamlessly in opposite directions (Row 1 translates left, Row 2 translates right).

  * Infinite seamless looping with duplicated card sets (`translateX(-50%)`), pausing on hover.

  * Edge fade achieved via CSS `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)` so the fade remains transparent over any section ground.

  * Initial-based colored avatar badges (e.g., society committee designations: "CHS Chairman", "Khar West Resident") ensuring no external asset dependency.

  * Respects `prefers-reduced-motion` by falling back to a clean multi-column static grid.

### 5. Institutional Partners & Governance Strip

* **Layout:** Monochromatic grid on Off-White (`#F8F7F4`) surface.

* **Logos:** Approved financing institutions (*IDFC FIRST Bank, ICICI Bank, AU Small Finance, Piramal, SBI, Kotak Mahindra*) and named consulting partners (*Bhansali & Palekar, Anant Darshan, Adyant*).

### 6. Lead Engine & Footer

* **Layout:** Split contact section: Direct team routing (Sales Head Kartar Singh Kaler, direct phone `+91 89285 26871`, email) on the left; structured inquiry selector (Society Redevelopment / Purchase / JV) on the right.

* **Footer:** Deep navy base, registered Borivali corporate address, MahaRERA compliance disclaimer space, and oversized cropped "AARAMBH" display watermark along the bottom edge.

## Overall Direction

* **What the page should feel like:**

  * An elite architectural monograph merged with an institutional financial fortress. Confident, grounded, mathematically precise. Navy (`#1C2F54`), Gold (`#EDC66F`), and Off-White (`#F8F7F4`) palette held together by crisp Jost typography and fine architectural hairlines.

* **Sites it should clearly not resemble:**

  * Crowded classifieds (MagicBricks/99acres), flashy dark-mode crypto portals, or template builder sites with cluttered cartoon icons.

* **superdesign.dev designs to use:**

  * **Portal Hero Parting Panels:** Two solid navy slabs sliding outward to uncover the hero elevation while the wordmark splits and tracking tightens.

  * **Pinned Horizontal Gallery:** Vertical scroll-locked horizontal slide showcasing completed high-rises.

  * **Opposing Dual Marquee:** Edge-masked, endless-loop testimonial rails with hover-pause.

  * **Per-Atom Motion Budget:** Staggered per-word typography reveal on display headlines using `cubic-bezier(0.16, 1, 0.3, 1)`.