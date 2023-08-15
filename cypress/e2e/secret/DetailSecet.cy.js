describe("Chức năng 3: Xem chi tiết Secret", () => {
    it("Kiểm tra hiển thị", () => {
      cy.detailSecret("secret/TL_43_data_test.json");
    });
  });
  