Testing Strategy

To prevent regressions, the project uses unit tests with Jest
and end-to-end (E2E) tests with Cypress.

What has been tested:

- Unit tests (Jest):

  - AddPatient component
  - PatientsTable component

- End-to-end tests (Cypress):
  - Filtering patients by name using the search form
  - Adding a new patient to the list

How to run the tests:

Unit Tests (Jest)
Run the following command to execute unit tests:

    npm run test

End-to-End Tests (Cypress)
To open Cypress in interactive mode:

    npx cypress open

To run Cypress tests in headless mode:

    npx cypress run

Make sure the development server is running before executing Cypress tests:
modify the localhost address if needed on file spec.cy.ts
beforeEach(() => {
cy.visit("http://localhost:5173");
});

    npm run dev
