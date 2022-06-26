import openScore from '../helpers/open-score';
import waitForAlphatab from '../helpers/wait-for-alphatab';
import { clickNote } from '../helpers/select-note';

it('shows the editor cursor when a note is cliked', () => {
  cy.visit('/');
  waitForAlphatab();
  openScore('1-2-3-4.gp');
  waitForAlphatab();

  clickNote(3);
  cy.get('#editor-cursor').should('be.visible');
});
