/// <reference types="cypress" />

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("opens application correctly and search for a patient", () => {
    cy.contains("Patients List");
    cy.get('[placeholder="Search patients..."]', { timeout: 10000 }).type(
      "John Doe"
    );
    cy.get("tbody tr").contains("John Doe").should("exist");
  });

  it("Adds a new patient", () => {
    cy.get("button").contains("+ Add Patient").click();
    cy.get("input[name='name']").type("New Patient");
    cy.get("input[name='age']").type("30");
    cy.get("input[name='condition']").type("Healthy");
    cy.get("button").contains("Add new patient").click();

    cy.wait(1000); // wait for the patient to be added
    cy.get("a").contains("2").click();

    cy.wait(1000); // wait for the page to load
    cy.get("tbody tr").contains("New Patient").should("exist");
  });
  // Puedes seguir agregando más tests y todos tendrán la app cargada previamente
});
