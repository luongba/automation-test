describe("Chức năng 5: Chỉnh sửa Secret", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();

    cy.visit("/key-manager/secrets");
  });
  it.skip("Chỉnh sửa secret thành công", () => {
    cy.editSecretSuccess("secret/TL_43_data_test.json");
  });
  it.skip("Chỉnh sửa secret thành công", () => {
    cy.editSecretSuccess("secret/TL_44_data_test.json");
  });
  it("Chỉnh sửa secret trùng key", () => {
    cy.editSecretFail("secret/TL_45_data_test.json");
  });
  it("Chỉnh sửa secret thiếu key", () => {
    cy.editSecretEmptyKey("secret/TL_46_data_test.json");
  });
  it("Chỉnh sửa secret nhấn hủy", () => {
    cy.editSecretRollbackList("secret/TL_43_data_test.json");
  });
});
