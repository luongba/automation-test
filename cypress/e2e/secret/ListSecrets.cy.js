describe("Chức năng 2: Danh sách Secrets", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();
    cy.visit("/key-manager/secrets");
  });
  it("Kiểm tra thực hiện tìm kiếm (từ khóa tồn tại)", () => {
    cy.findValidSecret("secret/TL_38_data_test.json");
  });
  it("Kiểm tra thực hiện tìm kiếm (từ khóa không tồn tại)", () => {
    cy.findInvalidSecret("secret/TL_39_data_test.json");
  });
});
