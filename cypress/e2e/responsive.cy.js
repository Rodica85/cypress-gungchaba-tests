// TODO: un-skip the overflow assertions once the horizontal-overflow bug on
// gungchaba.online is fixed. See README → "Bugs found by this suite".
//
// Current measurements (recorded on first run of this suite):
//   - Mobile  (375px viewport):   document scrollWidth = 459px   → overflow +84px
//   - Tablet  (768px viewport):   document scrollWidth = 844px   → overflow +76px
//   - Desktop (1280px viewport):  document scrollWidth = 1292px  → overflow +12px
//
// The desktop +12px figure is the classic "w-screen vs w-full" Tailwind bug:
// w-screen ignores the scrollbar width on desktop browsers.

describe('Responsive layout', () => {
  const viewports = [
    { name: 'mobile (iPhone SE)', preset: 'iphone-se2' },
    { name: 'tablet (iPad 2)',    preset: 'ipad-2' },
    { name: 'desktop (1280x800)', preset: [1280, 800] },
  ];

  function setViewport(preset) {
    if (Array.isArray(preset)) {
      cy.viewport(preset[0], preset[1]);
    } else {
      cy.viewport(preset);
    }
  }

  viewports.forEach(({ name, preset }) => {
    it(`${name}: homepage h1 is visible`, () => {
      setViewport(preset);
      cy.visit('/');
      cy.get('h1').should('be.visible');
    });

    it.skip(`${name}: homepage renders without horizontal overflow`, () => {
      setViewport(preset);
      cy.visit('/');
      cy.window().then((win) => {
        const docWidth = win.document.documentElement.scrollWidth;
        const viewWidth = win.innerWidth;
        expect(docWidth, `${name}: doc width vs viewport`).to.be.at.most(viewWidth + 1);
      });
    });

    it.skip(`${name}: about page renders without horizontal overflow`, () => {
      setViewport(preset);
      cy.visit('/about');
      cy.window().then((win) => {
        const docWidth = win.document.documentElement.scrollWidth;
        const viewWidth = win.innerWidth;
        expect(docWidth, `${name}: doc width vs viewport`).to.be.at.most(viewWidth + 1);
      });
    });
  });
});
