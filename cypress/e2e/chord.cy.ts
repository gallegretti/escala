import openScore from '../helpers/open-score';
import selectSlot from '../helpers/select-slot';
import waitForAlphatab from '../helpers/wait-for-alphatab';

it('creates a new chord', () => {
  cy.visit('/');
  waitForAlphatab();
  openScore('empty.gp');
  waitForAlphatab();
  selectSlot(0);
  cy.contains('Beat').click();
  cy.get('#chord').click();

  // Configure chord
  cy.get('#chord-name').type('Am');
  cy.get('#fret-1-string-4').click();
  cy.get('#fret-2-string-2').click();
  cy.get('#fret-2-string-3').click();
  cy.get('#chord-save').click();
  waitForAlphatab();

  // Check if notes were created
  cy.get(':nth-child(27) > [y="232"]').contains('1');
  cy.get(':nth-child(27) > [y="243"]').contains('2');
  cy.get(':nth-child(27) > [y="254"]').contains('2');
});
