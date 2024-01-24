const APP_TITLE = 'Redux Essentials Example';

describe('visit the site', () => {
  it('loads the app correctly', () => {
    cy.visit('/');
    cy.contains(APP_TITLE).should('have.text', APP_TITLE); // title is present
  });
});