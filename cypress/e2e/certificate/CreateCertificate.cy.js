describe("Chức năng 3: Tạo SSL Certificate:", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  });
  it.skip("Test tên chứng chỉ đã tồn tại trong hệ thống", () => {
    cy.AddCheckExist("certificate/TL_22_data_test_3.json")
  });
  it("Test tạo thành công TL_23_1", () => {
    cy.addSuccessingTL23("certificate/TL_23_data_test_3_1.json")
  });
  it("Test tạo thành công TL_23_2", () => {
    cy.addSuccessingTL23("certificate/TL_23_data_test_3_2.json")
  });
  it("Test tạo thành công TL_23_3", () => {
    cy.addSuccessingTL23("certificate/TL_23_data_test_3_3.json")
  });
  it("Test tạo thành công TL_23_4", () => {
    cy.addSuccessingTL23("certificate/TL_23_data_test_3_4.json")
  });
  it("Test tạo thành công TL_24", () => {
  });
  it("Test tạo thành công với người dùng đã đăng kí chứng chỉ và co password", () => {
    cy.addSuccessingTL25("certificate/TL_25_data_test_3.json")
  });
  it("Kiểm tạo không thành công Certificate khi nhập  Certificate/private key không đúng chuẩn pem", () => {
    cy.addCertificateprivateKey("certificate/TL_26_data_test_3.json")
  });
  it("Test private key và passphrase không hợp lệ", () => {
    cy.addCheckPriKeyAndPassphrase("certificate/TL_27_data_test_3.json")
  });
  it("Test private key không có passphrase", () => {
    cy.addCheckPriKeyNoPass("certificate/TL_28_data_test_3.json")
  });
  it("Test để trống các trường", () => {
    cy.addNull("certificate/TL_29_data_test_3.json")
  });
  it("Test các trường hợp lệ và nhấn nút hủy", () => {
    cy.addClickCencel("certificate/TL_30_data_test_3.json")
  });
  it("Test các trường hợp các trường sai định dạng", () => {
    cy.addCheck("certificate/TL_31_data_test_3.json")
  });
});