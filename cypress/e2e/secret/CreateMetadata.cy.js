describe("Chức năng 6: Thêm metadata của 1 Secret", () => {
  // it("Tạo thành công metadata", () => {
  //     cy.createMetaDataSuccess("secret/TL_48_data_test.json");
  //   });
  it("Tạo trùng key metadata", () => {
  cy.createMetaDataExitsKey("secret/TL_49_data_test.json");
});
    //   it("Chỉnh sửa secret thành công", () => {
    //     cy.editSecretSuccess("secret/TL_43_data_test.json");
  //   });
  //   it("Chỉnh sửa secret thành công", () => {
  //     cy.editSecretSuccess("secret/TL_44_data_test.json");
  //   });
  //   it("Chỉnh sửa secret trùng key", () => {
    //     cy.editSecretFail("secret/TL_45_data_test.json");
    //   });
    //   it("Chỉnh sửa secret thiếu key", () => {
    //     cy.editSecretEmptyKey("secret/TL_46_data_test.json");
    //   });
    //   it("Chỉnh sửa secret nhấn hủy", () => {
    //     cy.editSecretRollbackList("secret/TL_43_data_test.json");
  //   });
});