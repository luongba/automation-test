describe("Chức năng 1: Danh sách certificate:", () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate");
  });
  it("Test tìm kiếm certificate tồn tại", () => {
    cy.certificateSearch("certificate/TL_1_data_test_1.json");
  });
  it("Test tìm kiếm certificate không tồn tại", () => {
    cy.certificateSearchNoResult("certificate/TL_2_data_test_1.json");
  });
  it("Test tìm kiếm certificate trả về  tồn tại", () => {
    cy.certificateSearchWithRegion("certificate/TL_3_data_test_1.json");
  });
  it("Test tìm kiếm certificate trả về  tồn tại", () => {
    cy.certificateSearchWithRegionNoResult("certificate/TL_4_data_test_1.json");
  });
});
