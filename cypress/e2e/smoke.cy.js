const pages = [
  { path: '/',              titleIncludes: 'Thai Massage Abingdon' },
  { path: '/about',         titleIncludes: 'Thai Massage Abingdon' },
  { path: '/services',      titleIncludes: 'Thai Massage Abingdon' },
  { path: '/contact',       titleIncludes: 'Thai Massage Abingdon' },
  { path: '/gift-vouchers', titleIncludes: 'Thai Massage Abingdon' },
];

describe('Smoke — every page loads', () => {
  pages.forEach(({ path, titleIncludes }) => {
    it(`${path} responds 200 and has a meaningful title`, () => {
      cy.request(path).its('status').should('eq', 200);
      cy.visit(path);
      cy.title().should('include', titleIncludes);
      cy.get('body').should('be.visible').and('not.be.empty');
    });
  });

  it('homepage shows the Gung Chaba h1 hero', () => {
    cy.visit('/');
    cy.get('h1').should('be.visible').and('contain', 'Gung Chaba');
  });
});
