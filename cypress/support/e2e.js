Cypress.Commands.add("loginDevelopment", () => {
  cy.session("login", () => {
    cy.fixture("accountDevelopment.json").then((data) => {
      cy.visit("/");
      cy.get("#username").should("exist").type(data.username);
      cy.get("#password").should("exist").type(data.password);
      cy.get("#kc-login").click();
    });

    cy.get("#buttonFirstService").should("exist").click();
    cy.wait(1000);
    cy.get('input[placeholder="Tìm kiếm theo tên dự án"]')
      .should("exist")
      .type("TTT");
    cy.get('input[placeholder="Tìm kiếm theo tên dự án"]')
      .should("exist")
      .type("{enter}");
    cy.get("td > div > span").contains("TTT").should("exist").click();
  });
});
Cypress.Commands.add("loginProduction", () => {
  cy.session("login", () => {
    cy.fixture("accountProduction.json").then((data) => {
      cy.visit("/");
      cy.get("#username").should("be.visible").type(data.username);
      cy.get("#password").should("be.visible").type(data.password);
      cy.get("#kc-login").click();
    });

    cy.get("#buttonFirstService").should("be.visible").click();
    cy.wait(1000);
    cy.get(".ant-table-body").scrollTo(0, 500);
    cy.get("td > div > span").should("be.visible").contains("huyen").click();
  });
});
Cypress.Keyboard.defaults({
  keystrokeDelay: 0,
})

Cypress.Commands.add(
  'paste',
  { prevSubject: true, element: true },
  ($element, data) => {
    const clipboardData = new DataTransfer()
    clipboardData.setData('text', data)
    const pasteEvent = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      data,
      clipboardData,
    })

    cy.get($element).then(() => {
      $element[0].dispatchEvent(pasteEvent)
    })
  },
)
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
import "./key";
import "./certificate";
import "./environment";
import "./secret";
// Alternatively you can use CommonJS syntax:
// require('./commands')
