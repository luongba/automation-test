describe("Chức năng 1: Danh sách Certificate:", () => {
  it("Test tìm kiếm key tồn tại", () => {
    cy.keySearch("certificate/TL_1_data_test_1.json").then((success) => {
      if (success) {
        cy.log("success");
      } else {
        cy.log("Thất bại");
      }
    });
  });
  it("Test tìm kiếm key không tồn tại", () => {
    cy.searhNoResult("certificate/TL_2_data_test_1.json").then((success) => {
      if (success) {
        cy.log("success");
      } else {
        cy.log("Thất bại"); 
      }
    });
  });
});
