function clickNote(fret) {
  cy.get('.at-surface').children().eq(3).within(() => {
    // Use regex exact match so we don't select the tempo by mistake.
    // TODO: This still selects the '1' below the tempo. Need to find a better selector
    cy.contains(new RegExp(`^${fret}$`)).click();
  });
}

function noteIsVisible(fret) {
  cy.get('.at-surface').children().eq(3).within(() => {
    // Use regex exact match so we don't select the tempo by mistake.
    // TODO: This still selects the '1' below the tempo. Need to find a better selector
    cy.contains(new RegExp(`^${fret}$`)).should('be.visible');
  });
}

export {
  clickNote,
  noteIsVisible
}

