describe("Google Search Test", () => {
    it("Test thêm mới key nhấn button hủy", () => {
      cy.createKeySpecialCharacters("TL_11_data_test_1.json").then((success) => {
        if (success) {
          cy.log("success");
        } else {
          cy.log("Thất bại");
        }
      });
    });
  });
  