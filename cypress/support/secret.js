// TL_33
Cypress.Commands.add("createSecretSuccess", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get("#AddSecretsForm_name").type(data.secret_name);
    cy.get(`tr[data-row-key="0"]`)
      .find("input.ant-input")
      .eq(0)
      .type(data.secret_value[0].key);
    cy.get(`tr[data-row-key="0"]`)
      .find("input.ant-input")
      .eq(1)
      .type(data.secret_value[0].value);
  });
  cy.get("#buttonCreate").click();
  cy.get(".ant-notification-notice-message")
    .contains("Tạo Secret thành công")
    .should("be.visible");
});
// TL_34
Cypress.Commands.add("createSecretFaild34", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get("#AddSecretsForm_name").type(data.secret_name);
  });
  cy.get("#buttonCreate").click();
  cy.get(`tr[data-row-key="0"]`)
    .find(".ant-form-explain")
    .contains("Vui lòng nhập thông tin");
});
// TL_35
Cypress.Commands.add("createSecretFaild35", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get("#AddSecretsForm_name").type(data.secret_name);
    for (let i = 0; i < data.secret_value.length; i++) {
      try {
        if (i !== 0) {
          cy.get(".ant-tabs-content button").click();
        }
        cy.get(`tr[data-row-key="${i}"]`)
          .find("input.ant-input")
          .eq(0)
          .type(data.secret_value[i].key);
        cy.get(`tr[data-row-key="${i}"]`)
          .find("input.ant-input")
          .eq(1)
          .type(data.secret_value[i].value);
      } catch (error) {}
    }
    cy.get(`tr[data-row-key="${data.secret_value.length - 1}"]`)
      .find(".ant-form-explain")
      .contains("Key bị trùng lặp! Vui lòng thay đổi Key ");
  });
});
// TL_36
Cypress.Commands.add("createSecretFaild36", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get("#AddSecretsForm_name").type(data.secret_name);
    cy.get(`tr[data-row-key="0"]`)
      .find("input.ant-input")
      .eq(0)
      .type(data.secret_value[0].key);
    cy.get(`tr[data-row-key="0"]`)
      .find("input.ant-input")
      .eq(1)
      .type(data.secret_value[0].value);
  });
  cy.get(".page--footer .btn-button-tertiary").click();
  cy.url()
    .should('match', /\/key-manager\/secrets/)
});
// TL_38
Cypress.Commands.add("findValidSecret", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type(
      data.secret_search
    );
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type("{enter}");
    cy.get('.ant-table-row').should('have.length.gt', 0)
  });
});

// TL_39
Cypress.Commands.add("findInvalidSecret", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type(
      data.secret_search
    );
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type("{enter}");
    cy.get('.ant-table-placeholder').contains("Không tìm thấy dữ liệu").should("be.visible");
  });
});