describe("Chức năng 3: Xóa Secret", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();

    cy.visit("/key-manager/secrets");
  });
  it("Test xóa thành công", () => {
    cy.deleteSecretSuccess("secret/TL_40_data_test.json");
  });
  it("Test xóa thất bại", () => {
    cy.deleteSecretFail("secret/TL_41_data_test.json");
  });
  it("Test xóa thất bại", () => {
    cy.deleteSecretFailX("secret/TL_41_data_test.json");
  });
});
