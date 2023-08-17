describe("Chức năng 2: Xem chi tiết key", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();
      cy.visit("/key-manager/keys");
  });
    it("Kiểm tra chi tiết key AES, RSA", () => {
      cy.checkDetailKey("key/TL_3_data_test_1.json");
    });
    it("Kiểm tra chi tiết key ECDSA", () => {
      cy.checkDetailKey("key/TL_4_data_test_1.json");
    });
  });
  