/**
 * Load the app via the cypress baseUrl, waiting for posts to populate.
 */
export function loadSite() {
  cy.visit('/');
  cy.get('.posts-list').children().should('have.length.greaterThan', 3);
}
