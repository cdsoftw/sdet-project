import { generate } from 'random-words';
import { loadSite, POST_FEED_ENTRY } from '../../support/siteHelper';
import { users } from '../../fixtures/users.json';

/* selectors */
// TODO: move to helper file
const CREATE_POST_SAVE_BUTTON = '[data-testid="createPostSaveButton"]';
const NEW_POST_TITLE_INPUT = '#postTitle';
const NEW_POST_CONTENT_INPUT = '#postContent';
const NEW_POST_AUTHOR_DROPDOWN = '#postAuthor';
const POST_CONTENT = '.post-content'; // TODO: make less fragile
const POST_AUTHOR = '[data-testid="postAuthor"]';
const POST_TIMESTAMP = '[data-testid="postTimestamp"]';

describe('test post creation', () => {
  beforeEach(function () {
    loadSite();
  });

  it('requires author, title, and content for new post', function () {
    const title = 'test title';
    const content = 'test content';

    // disabled with all 3 blank
    cy.get(CREATE_POST_SAVE_BUTTON).should('be.disabled');

    // disabled with only author blank
    cy.get(NEW_POST_CONTENT_INPUT).type(content);
    cy.get(CREATE_POST_SAVE_BUTTON).should('be.disabled');

    // disabled with only content blank
    cy.get(NEW_POST_CONTENT_INPUT).clear();
    cy.get(NEW_POST_AUTHOR_DROPDOWN).select(users.at(0).name);
    cy.get(CREATE_POST_SAVE_BUTTON).should('be.disabled');

    // disabled with only title blank
    cy.get(NEW_POST_TITLE_INPUT).clear();
    cy.get(NEW_POST_CONTENT_INPUT).type(content);
    cy.get(CREATE_POST_SAVE_BUTTON).should('be.disabled');

    // enabled with none blank
    cy.get(NEW_POST_TITLE_INPUT).type(title);
    cy.get(CREATE_POST_SAVE_BUTTON).should('be.enabled');
  });

  it('creates a post and saves it', function () {
    // generate random english word strings
    const title = generate({ min: 7, max: 12, join: ' ' }) + '?';
    const content = generate({ min: 15, max: 25, join: ', ' });
    const author = users.at(1).name;

    // fill in post data
    cy.get(NEW_POST_TITLE_INPUT).type(title);
    cy.get(NEW_POST_AUTHOR_DROPDOWN).select(author);
    cy.get(NEW_POST_CONTENT_INPUT).type(content);

    // validate data and save
    cy.get(NEW_POST_TITLE_INPUT).should('have.value', title);
    cy.get(NEW_POST_AUTHOR_DROPDOWN + ' option:selected').should(
      'have.text',
      author
    );
    cy.get(NEW_POST_CONTENT_INPUT).should('have.value', content);
    cy.get(CREATE_POST_SAVE_BUTTON).click();

    // wait for new post to appear
    cy.get(POST_FEED_ENTRY)
      .eq(0)
      .find('h3') // TODO: make less fragile
      .should('have.text', title)
      .then(() => {
        const now = Date.now();

        // verify new post data
        cy.get(POST_FEED_ENTRY)
          .eq(0)
          .then((newPost) => {
            expect(newPost.find(POST_CONTENT)).to.have.text(
              content.slice(0, 100) // only includes first 100 chars
            );
            expect(newPost.find(POST_AUTHOR)).to.have.text('by ' + author);
            expect(
              Date.parse(newPost.find(POST_TIMESTAMP).attr('title'))
            ).to.be.within(now - 3500, now + 3500); // allow 3.5 sec buffer
          });
      });
  });

  it('created posts are viewable', function () {
    // generate random english word strings
    const title = generate({ min: 7, max: 12, join: ' ' }) + '?';
    const content = generate({ min: 15, max: 25, join: ', ' });
    const author = users.at(2).name;

    /* TODO: figure out how to leverage fake api using cy.request - for now, create post thru UI as normal
    cy.get(NEW_POST_AUTHOR_DROPDOWN).select(author);
    cy.get('#postAuthor option:selected')
      .invoke('val')
      .then((authorId) => {
        // create post using cy.request()
        const newPost = { title: title, content: content, user: authorId };
        cy.request('POST', '/fakeApi/posts/addNewPost', { post: newPost });
      });
    */
    cy.get(NEW_POST_TITLE_INPUT).type(title);
    cy.get(NEW_POST_AUTHOR_DROPDOWN).select(author);
    cy.get(NEW_POST_CONTENT_INPUT).type(content);
    cy.get(CREATE_POST_SAVE_BUTTON).click();

    // wait for new post to appear
    cy.get(POST_FEED_ENTRY)
      .eq(0)
      .find('h3') // TODO: make less fragile
      .should('have.text', title)
      .then(() => {
        const now = Date.now();

        // verify view capability
        cy.get(POST_FEED_ENTRY).eq(0).find('.button').click(); // TODO: make less fragile
        cy.get('h2').should('have.text', title); // TODO: make less fragile
        cy.get(POST_AUTHOR).should('have.text', 'by ' + author);
        cy.get(POST_CONTENT).should('have.text', content);
        cy.get(POST_TIMESTAMP).then((timestampEl) => {
          expect(Date.parse(timestampEl.attr('title'))).to.be.within(
            now - 3500,
            now + 3500
          ); // allow 3.5 sec buffer
        });
      });
  });
});
