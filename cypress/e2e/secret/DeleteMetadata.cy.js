
describe("Chức năng 8: Xóa metadata của 1 Secret", () => {
    it.skip("Xóa metadata thành công trong chi tiết", () => {
      cy.deleteMetadataSuccess("secret/TL_56_data_test.json");
    });
    it.skip("Xóa metadata thành công ngoài danh sách", () => {
      cy.deleteSecretSuccess("secret/TL_57_data_test.json");
    });
    it("Xóa metadata hiển thị popup nhấn hủy", () => {
      cy.deleteSecretFail("secret/TL_41_data_test.json");
    });
    it.skip("Xóa metadata hiển thị popup nhấn icon X", () => {
      cy.deleteSecretFailX("secret/TL_41_data_test.json");
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
  