describe("Chức năng 2: Xem chi tiết key", () => {
    it("Kiểm tra chi tiết key AES, RSA", () => {
      cy.checkDetailKey("key/TL_3_data_test_1.json");
    });
    it("Kiểm tra chi tiết key ECDSA", () => {
      cy.checkDetailKey("key/TL_4_data_test_1.json");
    });
  });
  