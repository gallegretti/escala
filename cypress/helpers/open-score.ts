export default function openScore(fileName: string) {
  // The input element is hidden so we must use force: true
  cy.get('#open-input').selectFile(`cypress/scores/${fileName}`, { force: true });
}
