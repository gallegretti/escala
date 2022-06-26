/**
 * AlphaTab renders asynchronously so we should be waiting for it to finish rendering before continuing the test
 */
export default function waitForAlphatab() {
  // TODO: Need to figure out a better way to do this
  cy.wait(2000);
}
