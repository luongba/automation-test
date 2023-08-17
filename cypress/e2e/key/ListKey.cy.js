describe("Chức năng 1: Danh sách key:", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();
    cy.visit("/key-manager/keys");
  });
  it("Test tìm kiếm key tồn tại", () => {
    cy.keySearch("key/TL_1_data_test_1.json");
  });

  it("Test tìm kiếm key không tồn tại", () => {
    cy.searhNoResult("key/TL_2_data_test_1.json");
  });
});
