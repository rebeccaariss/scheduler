/// <reference types="Cypress" />

context('Navigation', () => {
  it("should visit root", () => {
    cy.visit("/");
  });
})
