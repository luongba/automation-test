Cypress.Commands.add("certificateSearch", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type(
      data.certificate_search
    );
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type("{enter}");
    cy.wait(1000);
    cy.get("tbody > tr").then(($results) => {
      if ($results.length > 0) {
        cy.log("Kết quả tìm kiếm:" + $results.length);
      } else {
        cy.fail("Không tìm thấy kết quả.");
      }
    });
  });
});
Cypress.Commands.add("certificateSearchNoResult", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type(
      data.certificate_search
    );
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type("{enter}");
    cy.get(".ant-table-placeholder")
      .contains("Không tìm thấy dữ liệu")
      .should("be.visible");
  });
});

Cypress.Commands.add("certificateSearchWithRegion", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate");
  cy.fixture(fileData).then((data) => {
    cy.wait(1000)
    cy.get('.btn-location').click();
    cy.get("li").contains(data.region_search).should("be.visible").click();
    cy.wait(1000);
    cy.get("tbody > tr").then(($results) => {
      if ($results.length > 0) {
        cy.log("Kết quả tìm kiếm:" + $results.length);
      } else {
        cy.fail("Không tìm thấy kết quả.");
      }
    });
  });
});
Cypress.Commands.add("certificateSearchWithRegionNoResult", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type(
      data.region_search
    );
    cy.get('.btn-location').click();
    cy.get("li").contains(data.region_search).should("be.visible").click();
    cy.get(".ant-table-placeholder")
      .contains("Không tìm thấy dữ liệu")
      .should("be.visible");
  });
});

