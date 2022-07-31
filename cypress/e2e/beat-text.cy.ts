import openScore from '../helpers/open-score';
import { clickNote } from '../helpers/select-note';
import waitForAlphatab from '../helpers/wait-for-alphatab';

describe('beat text', () => {
  it('sets a new beat text', () => {
    cy.visit('/');
    waitForAlphatab();
    openScore('1-2-3-4.gp');
    waitForAlphatab();

    clickNote(4);
    cy.contains('Beat').click();
    cy.contains('Text').click();

    cy.get('#field-beat-text').type('Lyrics goes here');
    cy.get('[title="Save"]').click();
    cy.contains('Lyrics goes here').should('be.visible');
  });
});
