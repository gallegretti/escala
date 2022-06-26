import openScore from '../helpers/open-score';
import waitForAlphatab from '../helpers/wait-for-alphatab';
import { clickNote, noteIsVisible } from '../helpers/select-note';

it('changes a note\'s fret', () => {
  cy.visit('/');
  waitForAlphatab();
  openScore('1-2-3-4.gp');
  waitForAlphatab();

  clickNote(4);
  cy.get('#editor-cursor').should('be.visible');
  cy.get('body').type('5');
  noteIsVisible(5);
});
