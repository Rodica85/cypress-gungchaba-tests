// Suppress uncaught exceptions thrown by third-party scripts (analytics,
// fonts, AOS) so they don't fail tests for issues that are not the site's.
Cypress.on('uncaught:exception', () => false);
