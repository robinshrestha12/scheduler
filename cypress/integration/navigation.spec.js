describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  }),
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.get("li").contains("Tuesday").click();

  }),
  it("should have an off white background on Tuesday list item", () => {
  cy.contains("li", "Tuesday")
    .should("have.css", "background-color", "rgb(242, 242, 242)");
  }),
  it("finds the list item, clicks it and checks it for the correct background colour", () => {
    cy.contains("li", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
    }),
    it("should navigate to Tuesday", () => {
      cy.visit("/");

  cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
      });
});
