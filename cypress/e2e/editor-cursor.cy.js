const { openScore } = require('../helpers/open-score');
const { clickNote } = require('../helpers/select-note');
const { waitForAlphatab } = require('../helpers/wait-for-alphatab');

it('shows the editor cursor when a note is cliked', () => {
  cy.visit('/');
  waitForAlphatab();
  openScore('1-2-3-4.gp');
  waitForAlphatab();

  clickNote(3);
  cy.get('#editor-cursor').should('be.visible');
})