# Part 2
## End-to-end Test Plan

### Tools and Techniques
Based on my recent experience setting up E2E automation for a new project from scratch, I intend to use [Cypress 13.6.3](https://github.com/cypress-io/cypress). While other tools such as [Playwright](https://playwright.dev/) and [Nightwatch](https://nightwatchjs.org/) would likely work just as well, in my opinion the quick setup and ease-of-use Cypress offers makes it win out.

I also intend to create a helper function-based library that can be imported where needed instead of the more traditional Page Object Model (POM), and to implement action-based testing that bypasses the UI whenever appropriate, using Cypress requests (see [this blog post](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions)). When possible, I will utilize dynamic rather than explicit waits by either waiting for updated DOM content and/or network call completion, or by spying on methods.

"Arrange, act, assert" or "given, when, then" are good mnemonic templates for structuring individual test cases within each spec. Whenever possible and feasible, the Single Responsibility Principle should be followed, along with linting and code style enforcement. [Remember](https://martinfowler.com/articles/practical-test-pyramid.html), test code is as important as production code.

If time allowed or this was a full project, I would also set up a Cypress Cloud instance with enough users so that the entire team can view test replays and results, as well as integrate with CI/CD and a PR cadence using the team's desired framework (I have experience integrating test automation with GitHub Actions, Jenkins, and TravisCI).

### Test Coverage and Goals
Ideally, each UI tab (Posts, Users, Notifications) would be covered by its own robust test suite, which could either be broken up into different categorized specs for readability/maintainability, or kept in one file for easier verification of a single area of functionality. Each test within a spec file should verify a single UI action, or at most a few related actions, similar to a unit test.

For the purposes of this project, I intend to focus on the Posts tab. While attempting to stay within the total time limit, I will cover as many different UI operations as possible; namely:
* Create post
  - Saved with expected data and accurate timestamp
  - Author, title, and content are required
* View post
* Edit post title + content (TODO)
  - Appears to be broken for Content - test should fail
* React to post (TODO)
  - Reactions saved across homepage + post view

## Running E2E tests
After installing Cypress along with all other dependencies, as well as launching the app locally using `npm start`, simply run `npm run cy:chrome` to execute all tests in a headless Chrome browser, or `npm run cy:headed` for a headed version. There is also a Cypress-provided `npx cypress run` command that uses a bundled Electron browser by default, along with options for other browsers.

For running tests against a 'production' build, simply build the app as specified in the project instructions and update [`baseUrl` in the cypress config](https://github.com/cdsoftw/cesium-sdet-project/blob/ea58167df751e40902bd7667ebf8c40e6d06618c/sample-app/cypress.config.js#L8) to `'http://[YOUR_LOCAL_IP]:5000'`.
