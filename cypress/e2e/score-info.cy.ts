import waitForAlphatab from '../helpers/wait-for-alphatab';

it('updates the score info when the data is changed', () => {
  cy.visit('/');
  waitForAlphatab();
  cy.get('#info').click();

  // Type some info
  cy.get('#field-title').type('New title');
  cy.get('#field-subtitle').type('Subtitle');
  cy.get('#field-artist').type('Artist');
  cy.get('#field-album').type('Album');
  cy.get('#field-tab-creator').type('Creator');
  cy.get('#field-comments').type('Comments');
  cy.get('#field-composer').type('Composer');

  // Save
  cy.get('[title="Save"]').click();

  // Make sure it's rendered back.
  // Note: 'Comments' and 'Composer' are not rendered
  cy.contains('New title').should('be.visible');
  cy.contains('Subtitle').should('be.visible');
  cy.contains('Artist').should('be.visible');
  cy.contains('Album').should('be.visible');
  cy.contains('Words by Composer').should('be.visible');
});
