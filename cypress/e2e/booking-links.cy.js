// Booking happens via WhatsApp / phone / email / Facebook on this site.
// We verify the link metadata only — never click tel:/mailto:/external links
// in tests, since that would launch external apps or hit production endpoints.

describe('Booking and contact links', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('WhatsApp link has the correct number and opens in a new tab', () => {
    cy.get('a[href*="wa.me"]').first()
      .should('have.attr', 'href')
      .and('include', 'wa.me/447546583124');
    cy.get('a[href*="wa.me"]').first()
      .should('have.attr', 'target', '_blank');
  });

  it('phone link uses the international tel: format', () => {
    cy.get('a[href^="tel:"]').first()
      .should('have.attr', 'href', 'tel:+447546583124');
  });

  it('email link uses mailto: with a pre-filled subject for bookings', () => {
    cy.get('a[href^="mailto:"]').first()
      .should('have.attr', 'href')
      .and('include', 'mosschaba1@gmail.com')
      .and('include', 'Appointment%20Booking');
  });

  it('Facebook link points to the business page and opens in a new tab', () => {
    cy.get('a[href*="facebook.com"]').first()
      .should('have.attr', 'href')
      .and('include', 'Gung-Chaba-Massage-Therapy');
    cy.get('a[href*="facebook.com"]').first()
      .should('have.attr', 'target', '_blank');
  });

  it('all external links use rel="noopener" for security', () => {
    cy.get('a[target="_blank"]').each(($link) => {
      cy.wrap($link)
        .should('have.attr', 'rel')
        .and('include', 'noopener');
    });
  });
});
