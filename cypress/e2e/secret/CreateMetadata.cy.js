describe("Chức năng 6: Thêm metadata của 1 Secret", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();

    cy.visit("/key-manager/secrets");
  });
  it("Tạo thành công metadata", () => {
    cy.createMetaDataSuccess("secret/TL_48_data_test.json");
  });
  it.skip("Tạo secert đã tồn tại", () => {
    cy.createMetaDataExitsKey("secret/TL_49_data_test.json");
  });
  it.skip("Tạo secert trống trường key", () => {
    cy.createMetaDataEmptyKey("secret/TL_50_data_test.json");
  });
  it.skip("Trong màn tạo nhấn quay lại trang danh sách", () => {
    cy.createMetaBackList("secret/TL_50_data_test.json");
  });
});
