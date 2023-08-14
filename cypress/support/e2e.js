Cypress.Commands.add("loginDevelopment", () => {
    cy.fixture("accountDevelopment.json").then((data) => {
        cy.visit("/");
        cy.get("#username").type(data.username).should("be.visible");
        cy.get("#password").type(data.password).should("be.visible");
        cy.get("#kc-login").click();
    });

    cy.get("#buttonFirstService").should("be.visible").click();
    cy.wait(1000);
    cy.get('input[placeholder="Tìm kiếm theo tên dự án"]')
        .should("be.visible")
        .type("TTT");
    cy.get('input[placeholder="Tìm kiếm theo tên dự án"]')
        .should("be.visible")
        .type("{enter}");
    cy.get("td > div > span").contains("TTT").should("be.visible").click();
});
Cypress.Commands.add("loginProduction", () => {
    cy.fixture("accountProduction.json").then((data) => {
        cy.visit("/");
        cy.get("#username").type(data.username).should("be.visible");
        cy.get("#password").type(data.password).should("be.visible");
        cy.get("#kc-login").click();
    });

    cy.get("#buttonFirstService").should("be.visible").click();
    cy.wait(1000);
    cy.get(".ant-table-body").scrollTo(0, 500);
    cy.get("td > div > span").contains("huyen").should("be.visible").click();
});
import "./key";
import "./certificate";
import "./environment";
// Alternatively you can use CommonJS syntax:
// require('./commands')
