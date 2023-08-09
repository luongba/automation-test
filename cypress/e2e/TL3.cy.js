describe("Google Search Test", () => {
    it("Kiểm tra chi tiết key AES, RSA", () => {
        cy.checkDetailKey("TL_3_data_test_1.json").then((success) => {
          if (success) {
            cy.log("success");
          } else {
            cy.log("Thất bại");
          }
        });
      });
  });
  