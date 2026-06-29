# gungchaba.online — Cypress regression suite

End-to-end tests for [gungchaba.online](https://www.gungchaba.online), a multi-page Thai-massage business site in Abingdon. Built and tested as part of my freelance web-development work.

## What it covers

- **Smoke** (`smoke.cy.js`) — all five pages (`/`, `/about`, `/services`, `/contact`, `/gift-vouchers`) respond 200 with meaningful titles, plus the homepage hero h1.
- **Navigation** (`navigation.cy.js`) — the header nav links resolve to every main page, the brand link returns home, and each click actually navigates (not just exposes the right `href`).
- **Booking links** (`booking-links.cy.js`) — bookings happen via WhatsApp, phone, email and Facebook, not a form, so we validate the link metadata: correct WhatsApp / phone numbers, the email's pre-filled subject, the Facebook URL, and `rel="noopener"` on every external link.
- **Mobile menu** (`mobile-menu.cy.js`) — the hamburger is visible on a mobile viewport and hidden on desktop; clicking it reveals the panel; the mobile menu exposes the same destinations as the header.
- **Responsive** (`responsive.cy.js`) — the homepage h1 is visible on iPhone SE, iPad 2 and desktop, and both `/` and `/about` render without horizontal overflow on every viewport (`document.documentElement.scrollWidth ≤ window.innerWidth`).
- **Content** (`content.cy.js`) — the three core service cards, the standard service-business sections (Services, Pricing, Testimonials, Visit Our Studio) and the *Passion for Healing* about-preview block are all present, and every image has non-empty alt text.

36 tests in total.

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

## What I would add next

- GitHub Actions CI to run the suite on every push.
- Lighthouse / accessibility audit via `cypress-audit`.
- Visual regression snapshots for the hero on each viewport.
- A `gift-vouchers` purchase flow test once that page accepts orders directly.
