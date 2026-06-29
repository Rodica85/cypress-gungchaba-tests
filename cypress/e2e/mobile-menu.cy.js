describe('Mobile hamburger menu', () => {
  context('on a mobile viewport', () => {
    beforeEach(() => {
      cy.viewport('iphone-se2');
      cy.visit('/');
    });

    it('hamburger button is visible on mobile', () => {
      cy.get('#mobile-menu-btn').should('be.visible');
    });

    it('mobile menu is hidden on initial load', () => {
      cy.get('#mobile-menu').should('not.be.visible');
    });

    it('clicking the hamburger reveals the mobile menu', () => {
      cy.get('#mobile-menu-btn').click();
      cy.get('#mobile-menu').should('be.visible');
    });

    it('the mobile menu exposes the same nav links as the header', () => {
      cy.get('#mobile-menu-btn').click();
      cy.get('#mobile-menu').within(() => {
        cy.get('a[href="/about"]').should('exist');
        cy.get('a[href="/services"]').should('exist');
        cy.get('a[href="/contact"]').should('exist');
        cy.get('a[href="/gift-vouchers"]').should('exist');
      });
    });
  });

  context('on a desktop viewport', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.visit('/');
    });

    it('hamburger button is hidden on desktop (Tailwind md:hidden)', () => {
      cy.get('#mobile-menu-btn').should('not.be.visible');
    });

    it('desktop nav is visible on desktop', () => {
      cy.get('.nav-link[href="/about"]').should('be.visible');
    });
  });
});
