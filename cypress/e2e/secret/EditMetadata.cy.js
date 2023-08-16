describe("Chức năng 7: Sửa metadata của 1 Secret", () => {
    it("Edit thành công", () => {
      cy.editMetaSucess("secret/TL_52_data_test.json");
    });
    // it("Edit trùng key", () => {
    //   cy.editMetaExitsKey("secret/TL_53_data_test.json");
    // });
    // it("Edit bỏ trống trường bắt buộc", () => {
    //   cy.editMetaEmptyKey("secret/TL_54_data_test.json");
    // });
    // it("Nhấn nút hủy", () => {
    //   cy.editMetaBackList("secret/TL_52_data_test.json");
    // });
  });
  