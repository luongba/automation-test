describe("Google Search Test", () => {
  it("Test tìm kiếm key tồn tại", () => {
    cy.keySearch("TL_1_data_test_1.json").then((success) => {
      if (success) {
        cy.log("success");
      } else {
        cy.log("Thất bại");
      }
    });
  });
});
