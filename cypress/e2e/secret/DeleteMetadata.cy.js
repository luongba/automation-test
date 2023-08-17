
describe("Chức năng 8: Xóa metadata của 1 Secret", () => {
    it("Xóa metadata thành công", () => {
      cy.deleteMetadataSuccess("secret/TL_56_data_test.json");
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
  