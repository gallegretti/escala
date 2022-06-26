const { openScore } = require('../helpers/open-score');
const { clickNote, noteIsVisible } = require('../helpers/select-note');
const { waitForAlphatab } = require('../helpers/wait-for-alphatab');

it('changes a note\'s fret', () => {
  cy.visit('/');
  waitForAlphatab();
  openScore('1-2-3-4.gp');
  waitForAlphatab();
  
  clickNote(4);
  cy.get('#editor-cursor').should('be.visible');
  cy.get('body').type('5');
  noteIsVisible(5);
})