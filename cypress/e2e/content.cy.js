// The site uses AOS (animate-on-scroll), which sets `opacity: 0` on content
// blocks until they scroll into view. Cypress doesn't scroll naturally, so
// `should('be.visible')` would fail on elements lower down the page. We call
// `.scrollIntoView()` first, which triggers the animation, then assert.

describe('Homepage content sections', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the three core massage services', () => {
    cy.contains('h3', 'Full Body Oils Massage').scrollIntoView().should('be.visible');
    cy.contains('h3', 'Traditional Thai Massage').scrollIntoView().should('be.visible');
    cy.contains('h3', 'Back, Neck & Shoulder').scrollIntoView().should('be.visible');
  });

  it('has the main content sections expected on a service-business homepage', () => {
    cy.contains('h2', 'Massage Services').should('exist');
    cy.contains('h2', 'Pricing').should('exist');
    cy.contains('h2', 'Testimonials').should('exist');
    cy.contains('h2', 'Visit Our Studio').should('exist');
  });

  it('shows the "A Passion for Healing" about-preview block', () => {
    cy.contains('h2', 'A Passion for Healing').scrollIntoView().should('be.visible');
  });

  it('every img on the page has a non-empty alt attribute (accessibility)', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img)
        .should('have.attr', 'alt')
        .and((alt) => {
          expect(alt, 'image alt text').to.exist;
        });
    });
  });
});
