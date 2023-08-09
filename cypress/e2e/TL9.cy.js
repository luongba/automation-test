describe("Google Search Test", () => {
    it("Test thêm mới key không nhập dữ liệu require", () => {
      cy.createKeyEmpty("TL_9_data_test_1.json").then((success) => {
        if (success) {
          cy.log("success");
        } else {
          cy.log("Thất bại");
        }
      });
    });
  });
  