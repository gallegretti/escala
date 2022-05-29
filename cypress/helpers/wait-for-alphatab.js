/**
 * AlphaTab renders asynchronously so we should be waiting for it to finish rendering before continuing the test
 */
function waitForAlphatab() {
  // TODO: Need to figure out a better way to do this
  cy.wait(2000);
}

export {
  waitForAlphatab
}