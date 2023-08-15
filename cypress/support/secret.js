// TL_33
Cypress.Commands.add("createSecretSuccess", (fileData) => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();
    cy.visit("/key-manager/secrets");
    cy.get('.ant-card-head button').click(); 
    cy.fixture(fileData).then((data) => {
        cy.get('#AddSecretsForm_name').type(
            data.secret_name
        );
        for (let i = 0; i < data.secret_value.length; i++) {
          cy.get(`#formSecretValue_[${i}].key`).type(data.secret_value[i].key)
          cy.get(`#formSecretValue_[${i}].value`).type(data.secret_value[i].value)
        }
    })
  });