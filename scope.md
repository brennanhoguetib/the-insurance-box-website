## The Insurance Box Website Scope and Plan (MVP without app‑sent emails)

### Goals and success metrics
- **Primary**: Capture qualified leads via Contact form; write to Airtable “Leads” table; rely on Airtable automation for internal notifications.
- **Quality bars**: Lighthouse ≥ 90 (Performance/Best Practices/SEO), a11y ≥ 95; no console errors/hydration warnings; zero CLS; accessible forms and navigation.
- **Timeline**: 4 weeks to launch (staging end of Week 2, content freeze end of Week 3, production launch Week 4).

### Scope
- **Build**: Marketing site with Next.js (App Router), Tailwind CSS, Framer Motion.
- **Pages**: Homepage, Product detail, About, Contact, Licenses (stub), Privacy, Terms. (Products index page removed.)
- **Navigation**: Top‑nav “Products” dropdown lists all products with a blue icon and subtext; each item links to its product detail page.
- **MVP lead flow**: Write leads to Airtable only; no owner emails sent by the app.
- **Style**: Apple “liquid glass” aesthetic using the brand palette and system font stack.

### Information architecture and routes
- `/` Homepage
- `/products/[slug]` Product detail (7 products; optional 8th: Supplemental/Accident)
- `/about` About Us
- `/contact` Lead form
- `/licenses` States & Licenses (stub, data slot)
- `/privacy`, `/terms` Policy stubs
- `/sitemap.xml`, `/robots.txt` via `next-sitemap`
- Optional: `/api/contact` if not using Server Actions

Recommended file map (App Router):
- `app/(site)/layout.tsx`, `app/(site)/page.tsx`
- `app/(site)/products/[slug]/page.tsx`
- `app/(site)/about/page.tsx`, `app/(site)/contact/page.tsx`
- `app/(site)/licenses/page.tsx`, `app/(site)/privacy/page.tsx`, `app/(site)/terms/page.tsx`
- `app/api/contact/route.ts` (if not Server Actions)
- `components/*`, `ui/*`, `lib/*`, `content/*`, `styles/globals.css`, `tailwind.config.ts`

### Content and data model (JSON MVP)
- `content/products/*.json` with: `slug`, `name`, `summary`, `hero`, `bullets[]`, `resources[{label,url}]`, `seo{title,description}`
- `content/testimonials.json`: 4 entries (Rahul, Kimberly, Karen, Mark)
- `content/faq.json`: 6 entries (provided)
- `content/stats.json`: `policiesPlaced`, `statesServed = "Serving clients nationwide."`, `supportAvailability`

### Brand and UI system
#### Typography
- **Font family**: Gotham (locally hosted) for all headings, body, and UI; fallback to system UI. Weights: 300/400/500/600/700. Use `font-display: swap` to avoid CLS.
- **Font hosting**: Place files under `/public/fonts/gotham/` (Gotham-Light/Book/Medium/Semibold/Bold as `.woff2` + `.woff`). If a specific weight is missing, map to the nearest neighbor temporarily (e.g., 600 → 700) and note the mapping here until the file is added.
- **Headlines (cleaner, slightly larger)**
  - Hero headline: ≈2rem (32px), weight 700, line-height ~1.25, color `#333333`
  - Section/Main titles (H2/H3): ≈1.625rem (26px), line-height ~1.33; Section titles ≈1.375rem–1.5rem (22–24px), weight 600, color `#333333`
- **Subheadings**
  - ≈1.0625rem–1.125rem (17–18px), weight 400 (or 300 when very soft), line-height ~1.4, color `#7A7B7B`
- **Body text**
  - Default body: ≈1rem (16px) for large paragraphs and ≈0.9375rem–1rem (15–16px) for normal, weight 400, line-height 1.5–1.6
  - Color: `#7A7B7B` for supporting text; `#333333` for primary paragraphs
  - Inputs/labels follow the label guidance below
- **Indicators / small labels**
  - Medium 500, size 11–12px, letter-spacing 0.05–0.08em; use sparingly (stats, category labels, short button CTAs); no all-caps
- **Numbers & data**
  - Large numbers ≈26px using weight 600; companion labels follow “small labels” rules
- **Buttons**
  - Medium 500 to Semi‑Bold 600; uppercase only when truly short (1–2 words); font size ≈14–15px with generous padding
- **Quotes / testimonials**
  - Quote: Regular 400 at ≈15–16px, slightly lighter color (or italic); Name: Medium 500 at ≈14px
- **FAQ**
  - Question: Medium 500 at ≈15–16px, color `#333333`; Answer: Regular 400 at ≈14–15px, color `#7A7B7B`
- **Mobile adjustments (≤640px)**
  - Scale headings down proportionally (hero ~29px, main title ~22–24px), preserve hierarchy
- **Usage guidance**: Limit bold to one primary element per section, keep per‑page weights to 2–3, rely on whitespace/alignment for hierarchy. One H1 per page; use H2 for sections and H3 for sub‑sections; do not skip heading levels. Ensure AA contrast over glass.

##### Usage guidelines (weights and styles)
- **Headlines**: 600 (Semi‑Bold) for H1/H2/H3 by default; 700 only for major hero headlines. Line height: 1.2–1.3 for hero; 1.3–1.4 for others. Color: `#333333`.
- **Subheadings**: 400 (Regular); color `#7A7B7B`; slightly smaller than headlines (≈1.125–1.25rem).
- **Body**: 400 (Regular) with line height 1.5–1.6. Use `#7A7B7B` for supporting text; `#333333` for primary paragraphs.
- **Indicators/labels**: 500 (Medium) ALL CAPS, font size 0.75–0.875rem, letter‑spacing 0.05–0.08em; use sparingly (stats, category labels, buttons).
- **Buttons**: Keep 600 for emphasis; uppercase only for short (1–2 words); use generous padding.
- **Quotes/testimonials**: Quote text 400, slightly lighter color (or italic). Name 500 at ~0.875rem.
- **FAQ**: Question 500 in `#333333`; answer Regular in `#7A7B7B`.
- **General**: Limit bold to one main element per section; keep weights per page to 2–3 max. Maintain hierarchy: 1× H1 per page, H2 for sections, H3+ for subsections with no skipped levels. Ensure AA contrast.
- **Colors** (CSS variables):
  - `--brand-primary: #B7DDE6`
  - `--text-primary: #333333`
  - `--text-secondary: #7A7B7B`
  - `--accent: #F9D64E`
  - `--bg: #F8FAFB`
  - `--surface: #FFFFFF`
- **Liquid glass**: translucent white overlays, `backdrop-blur-xl`, soft ring/border, layered soft shadow, large radii.
- **Top navigation**: centered menu items with a right‑aligned primary CTA button “Get started”; stronger blue tint using `--brand-primary` at ~20–25% opacity over the glass background; mobile‑friendly with a hamburger menu.
- **Layout density**: spacious sections `py-20 md:py-28`, `max-w-7xl`, consistent gutters.

Tailwind extensions (conceptual):
- Colors mapped to CSS variables
- Shadows: `soft`, `glass`
- Radii: `xl`, `2xl`
- Timing: `'spring': cubic-bezier(0.2, 0.8, 0.2, 1)`

### Components (reusable, accessible)
- **Layout**: `SiteHeader` (centered nav + right CTA), `Nav` with `ProductsMenu` dropdown (desktop hover‑open), `MobileNav` (hamburger + panel), `SiteFooter`, `Container`, `Section`
- **UI**: `GlassCard`, `Button` (primary/secondary/ghost), `Badge`, `Kpi`, `Divider`, `Icon`
- **Content**: `Hero`, `ValueProps`, `Testimonials`, `StatsStrip`, `FaqAccordion`, `ProductGrid`, `ProductCard`, `ResourceList`
- **Form**: `LeadForm` (Zod + RHF), `FormField`, `SubmitButton` (pending)
- **Utility**: `AnimateOnScroll`, `SEO` helper, `ThemeImage` (Next `Image` wrapper)

### Page blueprints
- **Homepage**
  - Hero: “Insurance made simple.” Subtext: compare top plans, plain‑English explanations, enroll with no extra cost. Buttons: “Get my quote” (primary), “Browse products” (secondary).
  - Why section: 3 value props in glass cards.
  - Testimonials: 4 cards (wrap 2x2 on tablet).
  - Stats strip: 3 KPIs; “Serving clients nationwide.”
  - FAQ accordion (6 items).
  - CTA band: “Get my quote.”
- Products index page removed. Products are discoverable via the top‑nav “Products” dropdown (each item links to its product detail page). Dropdown is opaque (no transparency) and opens on hover (desktop) and tap (mobile).
- **Product detail**: Hero; “Who needs this and why?” (3–4 bullets); “Learn more” resources; sticky CTA “Get started.”
- **About**: Why different, customer‑first, compensation disclosure.
- **Contact**: Lead form (name, email, phone, zip, interests multi‑select, message, consent). Success state: “We’ll be in touch soon.”
- **Licenses**: Stub with upcoming states/licenses data slot.
- **Footer**: Privacy, Terms, Licenses, Contact; disclosure line.

### Accessibility and motion
- **A11y**: AA contrast on glass; `focus-visible` styles; keyboard nav for menu/accordion; descriptive labels and `aria-describedby` for form errors; semantic landmarks.
- **Motion** (Framer Motion): gentle fade+rise reveals, card hover lift, reduced‑motion variants, short durations 150–250ms.

### SEO
- Next Metadata API per page (title, description, canonical)
- OpenGraph/Twitter images; dynamic OG for product pages
- `next-sitemap` for `sitemap.xml`/`robots.txt`
- JSON‑LD:
  - Organization (logo/brand links)
  - Service/Product per product
  - FAQPage on homepage
  - BreadcrumbList on product detail
- Clean H1 hierarchy; descriptive slugs.

### Performance and quality
- No CLS: fixed image sizes/aspects; stable layout; avoid lazying above‑the‑fold hero text
- Next `Image`, responsive `sizes`; modern formats
- Static generation; ISR optional later
- TypeScript strict; ESLint with `jsx-a11y`; Prettier
- Vercel Analytics; optional GA4 later

### Forms and CRM integration (Airtable‑only MVP)
- **Validation**: Zod server‑side; client‑side RHF UX
  - Email RFC; US phone normalize; ZIP `^\d{5}$`; consent required
- **Anti‑spam**: honeypot + time‑to‑submit check; IP rate limit 5/min
- **Submission**:
  - Create Airtable “Leads” record with: `name`, `email`, `phone`, `zip`, `interestedProducts[]`, `message`, `source` (UTM/referrer), `timestamp`
  - No app‑sent owner email; Airtable automation handles team notifications
- **Abstraction**:
  - `lib/crm/index.ts` → `createLead(lead)`
  - Implementation: `lib/crm/airtable.ts`
  - Leave `lib/crm/hubspot.ts` stub for future swap with no UI changes

### Analytics and monitoring
- Vercel Analytics for traffic and page views
- Optional GA4/Meta/LinkedIn later
- Server‑side logging around submissions (redacted PII); no emails sent

### Dependencies and tech stack
- Next.js 14.2.15 (App Router), React 18.3.1
- Tailwind CSS
- Framer Motion
- Zod, React Hook Form, `@hookform/resolvers`
- Airtable SDK
- Map: `react-simple-maps@3` with `d3-geo` and `topojson-client`
- `next-sitemap`
- Linting/Types: `eslint@8.x` with `eslint-config-next@14.x`, TypeScript 5, `@types/react@18`, `@types/react-dom@18`
- Testing: Playwright, `@axe-core/playwright` (or axe via script)
- Note: Resend/email libs excluded from MVP (can be added later behind a flag)

### Build and runtime alignment
- No Turbopack (Next 15 feature). Dev server uses `next dev`.
- Config uses `next.config.mjs` (not `.ts`) for Next 14 compatibility.
- Interactive map is client-only via dynamic import with `ssr: false`, wrapped in a client component on `/licenses`.
- Added module declaration for `react-simple-maps` to satisfy TypeScript.
- Project targets Node 18 or 20 on Vercel; `.env*` files are ignored by Git.

### Environment variables (MVP)
- `NEXT_PUBLIC_SITE_URL`
- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`
- `AIRTABLE_LEADS_TABLE_NAME=Contact`

### Work plan by phases

#### Phase 0 — Inputs, decisions, schedule (1–2 days)
- **Inputs**: Final hero/value props/about copy; product bullets/resources; stats; Airtable Base ID/table; DNS access; imagery style OK; Calendly decision (optional).
- **Decisions**: Use Server Actions vs route handler; include Calendly on success?
- **Deliverables**: Project schedule; content doc; risk register.
- **Acceptance**: Inputs accounted for or covered by placeholders.

#### Phase 1 — Architecture, tokens, core components (Week 1)
- Implement routes and layout shell; Tailwind config; CSS variables
- Build core primitives: `GlassCard`, `Button`, `Container`, `Section`, `Kpi`
- A11y foundations and motion patterns
- **Acceptance**: Components meet a11y standards; tokens reflect brand; motion respects reduced‑motion.

#### Phase 2 — Homepage + Nav dropdown + motion (Week 2)
- Build homepage sections end‑to‑end; add motion reveals
- Implement `ProductsMenu` dropdown in the header listing all products with a blue icon and subtext; each item links to its detail page. Dropdown opens on hover (desktop) and is opaque; mobile uses a hamburger to reveal navigation.
- Staging deploy; responsive QA
- **Acceptance**: No CLS, clean console, responsive breakpoints pass; dropdown accessible via keyboard and screen readers.

### Products list update
- Launch with 7 products: Life, Health, Medicare, Disability, Long‑Term Care, Annuities, Financial Advisement. Supplemental/Accident removed.

### Process note
- Keep `scope.md` updated automatically whenever functional or UX changes are made to ensure the plan stays in sync with the implementation.

#### Phase 3 — Product details, About, Licenses, SEO (Week 3)
- Product detail sections with JSON‑driven content
- About page with compensation disclosure; Licenses stub; Privacy/Terms stubs
- SEO metadata/OG/JSON‑LD; sitemap/robots
- A11y + Lighthouse tuning; content freeze
- **Acceptance**: SEO validations pass; a11y checks ≥ 95; heading hierarchy correct.

#### Phase 4 — Contact form, Airtable integration, analytics, launch (Week 4)
- Lead form with validation, anti‑spam, and rate limiting
- Airtable “Leads” write; capture UTM/referrer to `source`; confirm Airtable automation triggers team notifications
- Vercel Analytics; final QA, staging sign‑off; production deploy and DNS
- **Acceptance**: Successful submissions create Airtable rows; success UI shown; no app emails; analytics active.

### QA and testing
- **Automated**: Playwright smoke (home/products/detail/about/contact flows); submit form (mock Airtable); axe checks on key pages
- **Manual**: Multi‑device responsive pass; keyboard navigation; focus states; screen reader spot checks
- **Performance**: Lighthouse targets met; image and layout audits

### Risks and mitigations
- **Airtable automation fails**: Add Airtable view for “New in last 24h” and a daily audit; optional Slack webhook post‑launch
- **Airtable API limits**: Use retry/backoff; keep payload minimal
- **Imagery CLS**: Enforce fixed aspect ratios; compress; verify in staging
- **Scope creep**: Defer CMS/filters until after launch; JSON content for MVP
- **Compliance**: Licenses/states slot ready; scheduled pre‑launch review

### Deployment
- Vercel projects: staging and production
- Connect domains: `staging.theinsurancebox.com`, `theinsurancebox.com`
- Configure env vars per environment
- Pre‑launch checklist: a11y/SEO/Lighthouse; forms working in staging; DNS cutover plan
- Post‑launch: monitor analytics and server logs for 72h; confirm Airtable automation firing

### Handoff and documentation
- README: how to edit `content/*.json`, environment setup, deploy steps, troubleshooting
- Short training: updating content, reviewing Airtable leads, reading analytics
- Change log: track content and copy changes

### Next steps
- Approve this plan and 4‑week schedule.
- Provide Airtable Base ID/table name now or at start of Phase 4.
- Share any copy updates for product bullets/resources and About page before content freeze.


