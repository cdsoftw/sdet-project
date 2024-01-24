/* selectors */
export const POST_FEED_ENTRY = '.post-excerpt'; // TODO: make less fragile

/**
 * Load the app via the cypress baseUrl, waiting for posts to populate.
 */
export function loadSite() {
  cy.visit('/');
  cy.get(POST_FEED_ENTRY).should('have.length.greaterThan', 1); // more than one post entry
}
