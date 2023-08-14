describe("Chức năng 1: Danh sách certificate:", () => {
  it("Test tìm kiếm certificate tồn tại", () => {
    cy.certificateSearch("certificate/TL_1_data_test_1.json");
  });
  it("Test tìm kiếm certificate không tồn tại", () => {
    cy.wait(2000);
    cy.certificateSearchNoResult("certificate/TL_2_data_test_1.json");
  });
  it("Test tìm kiếm certificate trả về  tồn tại", () => {
    cy.wait(2000);
    cy.certificateSearchWithRegion("certificate/TL_3_data_test_1.json");
  });
  it("Test tìm kiếm certificate trả về  tồn tại", () => {
    cy.wait(2000);

    cy.certificateSearchWithRegionNoResult("certificate/TL_4_data_test_1.json");
  });
});
