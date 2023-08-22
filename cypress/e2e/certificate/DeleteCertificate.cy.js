describe("Chức năng 2 : Xóa SSL Certificate", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();
    cy.visit("/key-manager/ssl-certificate");
  });
  it("Kiểm tra xóa thành công SSL Certificate", () => {
    cy.deleteSslSuccess("certificate/TL_17_data_test_1.json");
  });
  it("Kiểm tra xóa thành công nhiều bản ghi SSL Certificate (Chọn nhiều bản ghi không chứa LB)", () => {
    cy.deleteMultiSslSuccess("certificate/TL_17_data_test_2.json");
  });
  it("Kiểm tra xóa không thành công SSL Certificate", () => {
    cy.deleteSslFaild("certificate/TL_18_data_test_1.json");
  });
  it("Kiểm tra xóa không thành công SSL Certificate (Chọn nhiều bản ghi chứa cả LB và không chứa LB)", () => {
    cy.deleteMultiSslFaild("certificate/TL_19_data_test_1.json");
  });
  it("Kiểm tra xóa không thành công (Ấn hủy)", () => {
    cy.deleteSslFaildByCancel("certificate/TL_20_data_test_1.json");
  });
});
