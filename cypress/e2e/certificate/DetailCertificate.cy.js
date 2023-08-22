describe("Chức năng 2: Chi tiết Certificate:", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();
    cy.visit("/key-manager/ssl-certificate");
  });
    it("Test xem chi tiết certicate", () => {
      cy.detailCertificate("certificate/TL_32_data_test_2.json")
    });
});