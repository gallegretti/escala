import openScore from '../helpers/open-score';
import waitForAlphatab from '../helpers/wait-for-alphatab';

it('opens a new file correctly', () => {
  cy.visit('/');
  waitForAlphatab();
  openScore('1-2-3-4.gp');
  waitForAlphatab();

  // Check if the score was rendered as expected
  cy.contains('Simple score').should('be.visible'); // Title
  cy.contains('1-2-3-4').should('be.visible'); // Subtitle
  cy.contains('Gabriel').should('be.visible'); // Artist
  cy.contains('Test Scores').should('be.visible'); // Album
});
