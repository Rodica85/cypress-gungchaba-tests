// The site exposes nav links twice — once in the desktop nav (class `nav-link`)
// and once inside the mobile menu (`#mobile-menu`). These tests target the
// desktop nav specifically; mobile menu behaviour lives in mobile-menu.cy.js.

describe('Desktop header navigation between pages', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('/');
  });

  it('header exposes desktop nav links to every main page', () => {
    const expected = ['/about', '/services', '/contact', '/gift-vouchers'];
    expected.forEach((href) => {
      cy.get(`.nav-link[href="${href}"]`).should('be.visible');
    });
  });

  it('clicking the About link navigates to /about', () => {
    cy.get('.nav-link[href="/about"]').click();
    cy.url().should('include', '/about');
    cy.get('body').should('be.visible');
  });

  it('clicking the Services link navigates to /services', () => {
    cy.get('.nav-link[href="/services"]').click();
    cy.url().should('include', '/services');
    cy.get('body').should('be.visible');
  });

  it('clicking the Contact link navigates to /contact', () => {
    cy.get('.nav-link[href="/contact"]').click();
    cy.url().should('include', '/contact');
    cy.get('body').should('be.visible');
  });

  it('clicking the Gift Vouchers link navigates to /gift-vouchers', () => {
    cy.get('.nav-link[href="/gift-vouchers"]').click();
    cy.url().should('include', '/gift-vouchers');
    cy.get('body').should('be.visible');
  });

  it('the brand/home link returns to /', () => {
    cy.visit('/about');
    cy.get('.nav-link[href="/"]').click();
    cy.url().should('match', /\/$/);
    cy.get('h1').should('contain', 'Gung Chaba');
  });
});
