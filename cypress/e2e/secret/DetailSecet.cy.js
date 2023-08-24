describe("Chức năng 4: Xem chi tiết Secret", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();
    cy.visit("/key-manager/secrets");
  });
  it("Kiểm tra hiển thị", () => {
    cy.detailSecret("secret/TL_42_data_test.json");
  });
});
