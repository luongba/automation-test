describe("Chức năng 3: Xóa key", () => {
    it("Test xóa thành công", () => {
      cy.deleteKeySuccess("key/TL_5_data_test_1.json");
    });
  });
  