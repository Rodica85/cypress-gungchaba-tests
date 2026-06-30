// Per-subpage content checks — each main page has its own h1 and topic-specific
// content that visitors and search engines should find.

describe('Subpage content', () => {
  it('/about — has the expected h1 and an "About" focus', () => {
    cy.visit('/about');
    cy.get('h1')
      .should('be.visible')
      .and('contain', 'About Gung Chaba');
  });

  it('/services — has the Services & Pricing h1 and lists massage types', () => {
    cy.visit('/services');
    cy.get('h1')
      .should('be.visible')
      .and('contain', 'Services & Pricing');
    // The page should mention at least one of the core massage types
    cy.contains(/Thai|Oil|Deep Tissue|Back|Neck|Shoulder|Reflexology/i)
      .should('exist');
  });

  it('/contact — has the Contact & Booking h1 and exposes the phone number', () => {
    cy.visit('/contact');
    cy.get('h1')
      .should('be.visible')
      .and('contain', 'Contact');
    cy.get('a[href^="tel:"]')
      .should('exist')
      .and('have.attr', 'href', 'tel:+447546583124');
  });

  it('/gift-vouchers — has the Gift Vouchers h1', () => {
    cy.visit('/gift-vouchers');
    cy.get('h1')
      .should('be.visible')
      .and('contain', 'Gift Vouchers');
  });

  it('every subpage keeps the brand name in the document title', () => {
    ['/about', '/services', '/contact', '/gift-vouchers'].forEach((path) => {
      cy.visit(path);
      cy.title().should('include', 'Thai Massage Abingdon');
    });
  });
});
