describe("Google Search Test", () => {
    it("Test thêm mới key đã tồn tại", () => {
      cy.createKeyExist("TL_8_data_test_1.json").then((success) => {
        if (success) {
          cy.log("success");
        } else {
          cy.log("Thất bại");
        }
      });
    });
  });
  