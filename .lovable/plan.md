# Workshop Purworejo Landing Page — Revised Build Plan

Single production-ready `index.html` deployed to Netlify, optimized for Google Indonesia ranking on industrial property keywords. Replaces the previous file at `/mnt/documents/index.html`.

## Deliverable

One file: `/mnt/documents/index.html` — zero external dependencies except Google Fonts. Drag-and-drop deployable.

## Page structure (top → bottom)

1. **Sticky Nav** — "Workshop Purworejo" logo · links (Spesifikasi, Lokasi, FAQ) · amber "Hubungi WA" CTA · hamburger on mobile · transparent → solid on scroll
2. **Hero (100vh)** — dark wood radial gradient (#2C1810 → #0f0a06) + animated grain overlay · H1 "Workshop Kayu Dijual di Purworejo" · subtitle with all 4 USPs · "Rp 6 Miliar · Nego" pill · WA + Maps CTAs · scroll arrow
3. **Trust Bar** — 4 chips: SHM Tangan Pertama | Non Lahan Hijau | Jalan Nasional | Langsung Owner
4. **Breadcrumb** — Beranda › Properti Industri › Purworejo › Workshop Kayu (also as JSON-LD)
5. **USP** — H2 "Kenapa Aset Ini Bernilai Lebih" + 3 glass cards (Kiln Dry, 35 kVA, Jalan Nasional) with cost/time-saved framing
6. **Spesifikasi** — H2 + 2-col table, 10 rows alternating bg
7. **Buyer Persona** — H2 "Aset Ini Cocok Untuk" + 4 SVG-icon cards (Furniture Jepara/Solo · Eksportir Kayu · Investor · Developer Gudang)
8. **FAQ Accordion** — H2 + 4 `<details>` Q&A (operasional, KPA bank, kondisi oven, cara survey)
9. **Lokasi** — H2 + responsive Google Maps iframe (400px) + alamat lengkap + koordinat + highlight box
10. **CTA Final** — full-width amber band · H2 "Tertarik? Hubungi Langsung Owner" · big WA button · phone display
11. **Footer** — copyright + secondary anchor links
12. **Sticky Mobile Bar** (<768px) — "Workshop Purworejo · 6M Nego" + "WA Sekarang"
13. **Floating WA bubble** — desktop bottom-right with pulse animation

## SEO implementation

- `<html lang="id">`, single H1 (exact keyword), H2 for every section
- Title + meta description exactly as specified (155 chars)
- Canonical, robots index/follow, OG (title/desc/image/url/type/locale=id_ID), Twitter summary_large_image
- Four JSON-LD blocks: **RealEstateListing** (full schema with floorSize MTK, geo, address), **FAQPage** (4 Q&A), **BreadcrumbList**, **LocalBusiness**
- All `<img>` (none in v1, but trust icons as `<svg aria-label>`) and decorative SVGs labelled in Bahasa Indonesia
- Internal anchor nav using `#spesifikasi`, `#lokasi`, `#faq`, `#kontak`

## Design system

- Palette: bg `#0f0a08`, card `#1a1210`, border `#3a2a20`, primary amber `#C8860A`, secondary saddle `#8B4513`, text `#F5F0EB` / `#A09080`
- Fonts: Playfair Display (headings) + Source Sans 3 (body), preconnect + `display=swap`
- Glass-morphism cards with amber accent line
- All CTAs ≥44px tap target, focus-visible outlines, ARIA labels

## Technical / performance

- Inline critical CSS in `<style>` (no external stylesheet)
- Google Fonts: `preconnect` + async `<link>`
- Maps iframe `loading="lazy"`
- Vanilla JS only: IntersectionObserver fade-in, scroll listener for nav solidify, hamburger toggle, smooth scroll
- Breakpoints: 480 / 768 / 1024
- Targets: LCP < 2.5s, CLS < 0.1, contrast ≥ 4.5:1
- Valid HTML5, semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)

## Content

All copy written in production Bahasa Indonesia per the prompt — USP cost/time framing, persona descriptions, all 4 FAQ answers, location highlight. No Lorem ipsum, no TODO comments.

## Bottom-of-file HTML comment

Post-deploy SEO checklist: Google Search Console + Bing Webmaster, backlink targets (OLX, Rumah123, Facebook, YouTube desc), Google Business Profile registration, pagespeed.web.dev test, og-image.jpg + sitemap.xml reminder, canonical URL replacement note.

## Differences from previous build

- Adds visible breadcrumb nav (was JSON-LD only)
- Adds trust bar strip between hero and USP
- Hamburger mobile nav (was hidden links)
- Sticky bottom mobile CTA bar (new)
- Animated grain overlay in hero (new)
- Buyer persona becomes 4 icon cards (was bullet list)
- USP cards include explicit cost/time-saved numbers
- Geo coordinates added to RealEstateListing schema
- floorSize + numberOfRooms added to schema
- Post-deploy SEO checklist appended as HTML comment

## Output

Write to `/mnt/documents/index.html` (overwrite v1) and surface via `<lov-artifact>` tag. No code changes to the project repo — this is a standalone static asset task.
