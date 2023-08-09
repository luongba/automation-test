describe("Google Search Test", () => {
  it("Test thêm mới key", () => {
    cy.createKey("TL_7_data_test_1.json").then((success) => {
      if (success) {
        cy.log("success");
      } else {
        cy.log("Thất bại");
      }
    });
  });

  it("Test thêm mới key", () => {
    cy.createKey("TL_7_data_test_2.json").then((success) => {
      if (success) {
        cy.log("success");
      } else {
        cy.log("Thất bại");
      }
    });
  });
});
