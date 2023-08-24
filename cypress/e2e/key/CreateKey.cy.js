describe("Chức năng 4: Tạo Key", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();
    cy.visit("/key-manager/keys/AddKeys");
  });
  it("Test thêm mới key", () => {
    cy.createKey("key/TL_7_data_test_1.json");
  });

  it("Test thêm mới key đã tồn tại", () => {
    cy.createKeyExist("key/TL_8_data_test_1.json");
  });
  it("Test thêm mới key không nhập dữ liệu require", () => {
    cy.createKeyEmpty("key/TL_9_data_test_1.json");
  });
  it("Test thêm mới key nhấn button hủy", () => {
    cy.createKeyCancel("key/TL_7_data_test_1.json");
  });
  it("Test thêm mới key có ký tự đặc biệt", () => {
    cy.createKeySpecialCharacters("key/TL_11_data_test_1.json");
  });
});
