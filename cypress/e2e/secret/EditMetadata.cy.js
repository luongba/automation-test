describe("Chức năng 7: Sửa metadata của 1 Secret", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
      ? cy.loginProduction()
      : cy.loginDevelopment();

    cy.visit("/key-manager/secrets");
  });
    it.skip("Edit thành công", () => {
      cy.editMetaSucess("secret/TL_52_data_test.json");
    });
    it.skip("Edit trùng key", () => {
      cy.editMetaExitsKey("secret/TL_53_data_test.json");
    });
    it.skip("Edit bỏ trống trường bắt buộc", () => {
      cy.editMetaEmptyKey("secret/TL_54_data_test.json");
    });
    it("Nhấn nút hủy", () => {
      cy.editMetaBackList("secret/TL_52_data_test.json");
    });
  });
  