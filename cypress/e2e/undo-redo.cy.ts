import openScore from '../helpers/open-score';
import { clickNote, noteIsVisible } from '../helpers/select-note';
import waitForAlphatab from '../helpers/wait-for-alphatab';

it('can redo and undo a simple action', () => {
  cy.visit('/');
  waitForAlphatab();
  openScore('1-2-3-4.gp');
  waitForAlphatab();

  // Change from fret 4 to 5
  clickNote(4);
  cy.get('#editor-cursor').should('be.visible');
  cy.get('body').type('5');
  noteIsVisible(5);

  // Undo and check if it's 4 again
  cy.get('#undo').click();
  waitForAlphatab();
  noteIsVisible(4);

  // Redo and check if it's back to 5
  cy.get('#redo').click();
  waitForAlphatab();
  noteIsVisible(5);
});
