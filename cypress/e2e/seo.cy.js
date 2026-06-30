describe('SEO and structured data', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('html element declares English language', () => {
    cy.get('html').should('have.attr', 'lang').and('match', /^en/i);
  });

  it('meta description mentions the business, location and service', () => {
    cy.get('head meta[name="description"]')
      .should('have.attr', 'content')
      .and('include', 'Abingdon')
      .and('include', 'Thai massage');
  });

  it('Open Graph title and description are set for social sharing', () => {
    cy.get('head meta[property="og:title"]')
      .should('have.attr', 'content').and('not.be.empty');
    cy.get('head meta[property="og:description"]')
      .should('have.attr', 'content').and('not.be.empty');
  });

  it('Open Graph type is set to website', () => {
    cy.get('head meta[property="og:type"]')
      .should('have.attr', 'content', 'website');
  });

  it('embeds JSON-LD structured data for local search', () => {
    cy.get('head script[type="application/ld+json"]')
      .should('have.length.at.least', 1);
  });

  it('JSON-LD declares MassageTherapy schema with name and phone', () => {
    cy.get('head script[type="application/ld+json"]').then(($scripts) => {
      const ld = JSON.parse($scripts.first().text());
      expect(ld['@type']).to.eq('MassageTherapy');
      expect(ld.name).to.include('Gung Chaba');
      expect(ld.telephone).to.include('+44');
    });
  });

  it('JSON-LD includes a UK postal address for Abingdon', () => {
    cy.get('head script[type="application/ld+json"]').then(($scripts) => {
      const ld = JSON.parse($scripts.first().text());
      expect(ld.address['@type']).to.eq('PostalAddress');
      expect(ld.address.addressLocality).to.eq('Abingdon');
      expect(ld.address.addressCountry).to.eq('GB');
    });
  });

  it('viewport meta tag is set for mobile rendering', () => {
    cy.get('head meta[name="viewport"]')
      .should('have.attr', 'content')
      .and('include', 'width=device-width');
  });
});
