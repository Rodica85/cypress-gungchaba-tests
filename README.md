# gungchaba.online — Cypress regression suite

End-to-end tests for [gungchaba.online](https://www.gungchaba.online), a multi-page Thai-massage business site in Abingdon. Built and tested as part of my freelance web-development work.

## What it covers

- **Smoke** (`smoke.cy.js`) — all five pages (`/`, `/about`, `/services`, `/contact`, `/gift-vouchers`) respond 200 with meaningful titles, plus the homepage hero h1.
- **Navigation** (`navigation.cy.js`) — the header nav links resolve to every main page, the brand link returns home, and each click actually navigates (not just exposes the right `href`).
- **Booking links** (`booking-links.cy.js`) — bookings happen via WhatsApp, phone, email and Facebook, not a form, so we validate the link metadata: correct WhatsApp / phone numbers, the email's pre-filled subject, the Facebook URL, and `rel="noopener"` on every external link.
- **Mobile menu** (`mobile-menu.cy.js`) — the hamburger is visible on a mobile viewport and hidden on desktop; clicking it reveals the panel; the mobile menu exposes the same destinations as the header.
- **Responsive** (`responsive.cy.js`) — the homepage h1 is visible on iPhone SE, iPad 2 and desktop. Includes `.skip`-ped overflow assertions that caught a real production bug on first run (see *Bugs found by this suite* below).
- **Content** (`content.cy.js`) — the three core service cards, the standard service-business sections (Services, Pricing, Testimonials, Visit Our Studio) and the *Passion for Healing* about-preview block are all present, and every image has non-empty alt text.

36 tests in total (30 active, 6 skipped pending the overflow fix documented below).

## How to run

```bash
npm install
npm run cy:open    # interactive runner — pick a spec to watch live
npm run cy:run     # headless run for the full suite
```

`baseUrl` is set to `https://www.gungchaba.online` in `cypress.config.js`, so visits use relative paths.

## Notes on the design

- **No real bookings sent** — tests verify the metadata of `tel:`, `mailto:`, WhatsApp and Facebook links without clicking, since clicking would launch the external app or open Mail.
- **Selectors** — prefer semantic IDs (`#mobile-menu-btn`, `#mobile-menu`) and stable section/heading text over Tailwind utility classes, which churn.
- **External-script noise suppressed** in `cypress/support/e2e.js` so third-party widgets and AOS animations don't fail the suite for issues that are not the site's.
- **Responsive coverage is dual-page** — the homepage *and* `/about`, since hero / content layouts often have different overflow risks.

## Bugs found by this suite

The first run of this suite caught a **real horizontal-overflow regression** on the live site that wasn't visible from casual browsing on a desktop. The overflow assertions in `responsive.cy.js` are currently `.skip`-ed pending a CSS fix — they should be re-enabled once the site is patched, so the regression can never reappear unnoticed.

| Viewport (CSS px) | `document.scrollWidth` | Overflow |
|---:|---:|---:|
| 375 (iPhone SE) | 459 | **+84 px** |
| 768 (iPad 2)    | 844 | +76 px |
| 1280 (desktop)  | 1292 | +12 px |

The pattern (a roughly constant ~12 px overflow even on desktop) is the classic Tailwind footgun: a section using `w-screen` instead of `w-full` ignores the scrollbar width and pushes the document beyond the viewport. The mobile overflow is much bigger and likely a second cause — most often an absolutely-positioned decorative element or a hero image without `max-width: 100%`.

**Recommended fix:**
1. Audit the page for `w-screen` and replace with `w-full` where the element is inside a constrained parent.
2. Add `html, body { overflow-x: hidden; }` as a safety net so users never see a horizontal scrollbar even if a new element regresses.
3. On a 375 px viewport with DevTools open, scroll right and inspect the element flagged as overflowing.
4. Un-skip the assertions in `responsive.cy.js` and re-run the suite.

## What I would add next

- GitHub Actions CI to run the suite on every push.
- Lighthouse / accessibility audit via `cypress-audit`.
- Visual regression snapshots for the hero on each viewport.
- A `gift-vouchers` purchase flow test once that page accepts orders directly.
