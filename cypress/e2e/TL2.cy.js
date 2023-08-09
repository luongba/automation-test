describe("Google Search Test", () => {
    it("Test tìm kiếm key không tồn tại", () => {
        cy.keySearch("TL_2_data_test_1.json").then((success) => {
          if (success) {
            cy.log("success");
          } else {
            cy.log("Thất bại");
          }
        });
      });
  });
  