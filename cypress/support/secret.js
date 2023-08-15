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
  cy.url().should("match", /\/key-manager\/secrets/);
});
// TL_38
Cypress.Commands.add("findValidSecret", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type(
      data.secret_search
    );
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type("{enter}");
    cy.get(".ant-table-row").should("have.length.gt", 0);
  });
});

// TL_39
Cypress.Commands.add("findInvalidSecret", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();
  cy.visit("/key-manager/secrets");
  cy.get(".ant-card-head button").click();
  cy.fixture(fileData).then((data) => {
    cy.get("#AddSecretsForm_name").type(data.secret_name);
    for (let i = 0; i < data.secret_value.length; i++) {
      cy.get(`#formSecretValue_[${i}].key`).type(data.secret_value[i].key);
      cy.get(`#formSecretValue_[${i}].value`).type(data.secret_value[i].value);
    }
  });
});

// TL39
Cypress.Commands.add("deleteSecretSuccess", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type(
      data.secret_name
    );
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.wait(1000);
    cy.url().then((url) => {
      // 'url' chứa URL hiện tại của trang web
      const parts = url.split("=");
      cy.wait(1000);
      cy.visit("/key-manager/secrets");
      cy.get("td > a > span")
        .filter(
          (index, element) => element.innerText.trim() === data.secret_name
        )
        .parent()
        .parent()
        .parent()
        .find("td > div > span")
        .last()
        .click();
      Cypress.env("environment") === "production"
        ? cy.get(".btn-button-primary").should("be.visible").click()
        : cy.get("#okButton").should("be.visible").click();
      cy.wait(1000);
      cy.visit(`/key-manager/secrets/DetailSecrets?detail=${parts[1]}`);
      cy.get("input.ant-input.ant-input-disabled")
        .eq(0)
        .invoke("val")
        .should("eq", "");
    });
  });
});

// TL40

Cypress.Commands.add("deleteSecretFail", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type(
      data.secret_name
    );
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type("{enter}");
    cy.get("td > a > span")
      .filter(
        (index, element) => element.innerText.trim() === data.secret_search
      )
      .click();
    cy.wait(1000);
    cy.url().then((url) => {
      // 'url' chứa URL hiện tại của trang web
      const parts = url.split("=");
      cy.wait(1000);
      cy.visit("/key-manager/secrets");
      cy.get("td > a > span")
        .filter(
          (index, element) => element.innerText.trim() === data.secret_search
        )
        .parent()
        .parent()
        .parent()
        .find("td > div > span")
        .last()
        .click();
      Cypress.env("environment") === "production"
        ? cy.get(".btn-button-tertiary").should("be.visible").click()
        : cy.get("#cancelButtonDetailBackup").should("be.visible").click();
      cy.wait(1000);
      cy.visit(`/key-manager/secrets/DetailSecrets?detail=${parts[1]}`);
      cy.get("input.ant-input.ant-input-disabled")
        .eq(0)
        .invoke("val")
        .should("eq", data.secret_search);
    });
  });
});

// TL41

Cypress.Commands.add("deleteSecretFailX", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type(
      data.secret_search
    );
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type("{enter}");
    cy.get("td > a > span")
      .filter(
        (index, element) => element.innerText.trim() === data.secret_search
      )
      .click();
    cy.wait(1000);
    cy.url().then((url) => {
      // 'url' chứa URL hiện tại của trang web
      const parts = url.split("=");
      cy.wait(1000);
      cy.visit("/key-manager/secrets");
      cy.get("td > a > span")
        .filter(
          (index, element) => element.innerText.trim() === data.secret_search
        )
        .parent()
        .parent()
        .parent()
        .find("td > div > span")
        .last()
        .click();
      cy.get(".ant-modal-close-x").click();
      cy.wait(1000);
      cy.visit(`/key-manager/secrets/DetailSecrets?detail=${parts[1]}`);
      cy.get("input.ant-input.ant-input-disabled")
        .eq(0)
        .invoke("val")
        .should("eq", data.secret_search);
    });
  });
});

// TL42

Cypress.Commands.add("detailSecret", (fileData) => {
  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type(
      data.secret_name
    );
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get("div").contains("SECRET VALUE").click();
    cy.get("#DetailSecretsForm_name")
      .invoke("val")
      .should("eq", data.secret_name);
    for (let i = 0; i < data.secret_value.length; i++) {
      try {
        cy.get("table")
          .first()
          .get(`tr[data-row-key="${i}"]`)
          .find("input.ant-input")
          .eq(0)
          .invoke("val")
          .then((inputValue) => {
            const numericInputValue = inputValue.trim().toString();
            expect(numericInputValue).to.equal(
              data.secret_value[i].key.trim().toString()
            ); // So sánh giá trị số từ trường nhập với giá trị số dự kiến
          });
        cy.get("table")
          .first()
          .get(`tr[data-row-key="${i}"]`)
          .find("input.ant-input")
          .eq(1)
          .invoke("val")
          .then((inputValue) => {
            const numericInputValue = inputValue.trim().toString();
            expect(numericInputValue).to.equal(
              data.secret_value[i].value.trim().toString()
            ); // So sánh giá trị số từ trường nhập với giá trị số dự kiến
          });
      } catch (error) {}
    }
    if (data.metadata_value) {
      for (let i = 0; i < data.metadata_value.length; i++) {
        try {
          cy.get("table")
            .last()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(0)
            .invoke("val")
            .then((inputValue) => {
              const numericInputValue = inputValue.trim().toString();
              expect(numericInputValue).to.equal(
                data.metadata_value[i].key.trim().toString()
              ); // So sánh giá trị số từ trường nhập với giá trị số dự kiến
            });
          cy.get("table")
            .last()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .invoke("val")
            .then((inputValue) => {
              const numericInputValue = inputValue.trim().toString();
              expect(numericInputValue).to.equal(
                data.metadata_value[i].value.trim().toString()
              ); // So sánh giá trị số từ trường nhập với giá trị số dự kiến
            });
        } catch (error) {}
        cy.get(".div-delete").should("exist");
        cy.get(".div-edit").should("exist");
      }
    }
  });
});

// TL43

Cypress.Commands.add("editSecretSuccess", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type(
      data.secret_name
    );
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);
    for (let i = 0; i < data.secret_value.length; i++) {
      try {
        cy.get("table")
          .first()
          .get(`tr[data-row-key="${i}"]`)
          .find("input.ant-input")
          .eq(0)
          .clear()
          .type(data.secret_value[i].key.toString());

        if (data.secret_value[i].value.toString() === "") {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear();
        } else {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear()
            .type(data.secret_value[i].value.toString());
        }
      } catch (error) {}
    }
    cy.get("#buttonUpdate").click();
    cy.wait(2000);
    cy.detailSecret(fileData);
  });
});

// TL45
Cypress.Commands.add("editSecretFail", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type(
      data.secret_name
    );
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);
    for (let i = 0; i < data.secret_value.length; i++) {
      if (i !== 0) {
        cy.get(".ant-tabs-content button").first().click();
      }
      try {
        cy.get("table")
          .first()
          .get(`tr[data-row-key="${i}"]`)
          .find("input.ant-input")
          .eq(0)
          .clear()
          .type(data.secret_value[i].key.toString());

        if (data.secret_value[i].value.toString() === "") {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear();
        } else {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear()
            .type(data.secret_value[i].value.toString());
        }
      } catch (error) {}
    }
    cy.get("#buttonUpdate").click();
    const divSelector = ".ant-notification-notice-message";

    cy.get(divSelector)
      .contains("Key bị trùng lặp! Vui lòng thay đổi Key")
      .should("be.visible");
  });
});

//TL-46

Cypress.Commands.add("editSecretEmptyKey", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type(
      data.secret_name
    );
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);
    for (let i = 0; i < data.secret_value.length; i++) {
      try {
        if (data.secret_value[i].key.toString() === "") {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(0)
            .eq(0)
            .clear();
        } else {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(0)
            .clear()
            .type(data.secret_value[i].key.toString());
        }

        if (data.secret_value[i].value.toString() === "") {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear();
        } else {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear()
            .type(data.secret_value[i].value.toString());
        }
      } catch (error) {}
    }
    cy.get("#buttonUpdate").click();
    const divSelector = ".ant-form-explain";
    cy.get(divSelector)
      .contains("Vui lòng nhập thông tin")
      .should("be.visible");
  });
});
//TL-47

Cypress.Commands.add("editSecretRollbackList", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type(
      data.secret_name
    );
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]').type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);
    for (let i = 0; i < data.secret_value.length; i++) {
      try {
        if (data.secret_value[i].key.toString() === "") {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(0)
            .eq(0)
            .clear();
        } else {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(0)
            .clear()
            .type(data.secret_value[i].key.toString());
        }

        if (data.secret_value[i].value.toString() === "") {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear();
        } else {
          cy.get("table")
            .first()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear()
            .type(data.secret_value[i].value.toString());
        }
      } catch (error) {}
    }
    cy.get(".btn-button-tertiary").click();
    cy.wait(2000);
    return cy.url().then((currentURL) => {
      if (currentURL.includes("/key-manager/secrets")) {
        cy.log("success");
      } else {
        cy.fail("Lỗi không quay lại trang danh sách");
      }
    });
  });
});

//TL-48

Cypress.Commands.add("createMetaDataSuccess", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get(".ant-card-head button").click();
    cy.wait(1000);
    cy.get("#AddSecretsForm_name").type(data.secret_name);

    for (let i = 0; i < data.secret_value.length; i++) {
      if (i !== 0) {
        cy.get(".ant-space-item > .ant-row").first().find("button").click();
      }
      try {
        if (data.secret_value[i].key.toString() === "") {
          cy.get(".ant-space-item > .ant-row")
            .first()
            .find(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(0)
            .eq(0)
            .clear();
        } else {
          cy.get(".ant-space-item > .ant-row")
            .first()
            .find(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(0)
            .clear()
            .type(data.secret_value[i].key.toString());
        }

        if (data.secret_value[i].value.toString() === "") {
          cy.get(".ant-space-item > .ant-row")
            .first()
            .find(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear();
        } else {
          cy.get(".ant-space-item > .ant-row")
            .first()
            .find(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear()
            .type(data.secret_value[i].value.toString());
        }
      } catch (error) {}
    }
    if (data.metadata && data.metadata.length > 0) {
      cy.get(".ant-space-item > .ant-row").last().find("button").click();
      for (let i = 0; i < data.metadata.length; i++) {
        if (i !== 0) {
          cy.get(".ant-space-item > .ant-row").last().find("button").click();
        }
        try {
          if (data.metadata[i].key.toString() === "") {
            cy.get(".ant-space-item > .ant-row")
              .last()
              .find(`tr[data-row-key="${i}"]`)
              .find("input.ant-input")
              .eq(0)
              .eq(0)
              .clear();
          } else {
            cy.get(".ant-space-item > .ant-row")
              .last()
              .find(`tr[data-row-key="${i}"]`)
              .find("input.ant-input")
              .eq(0)
              .clear()
              .type(data.metadata[i].key.toString());
          }

          if (data.metadata[i].value.toString() === "") {
            cy.get(".ant-space-item > .ant-row")
              .last()
              .find(`tr[data-row-key="${i}"]`)
              .find("input.ant-input")
              .eq(1)
              .eq(0)
              .clear();
          } else {
            cy.get(".ant-space-item > .ant-row")
              .last()
              .find(`tr[data-row-key="${i}"]`)
              .find("input.ant-input")
              .eq(1)
              .eq(0)
              .clear()
              .type(data.metadata[i].value.toString());
          }
        } catch (error) {}
      }
    }
    cy.get("#buttonCreate").click();
    cy.wait(1000);
    cy.detailSecret(fileData);
  });
});
//TL-40

Cypress.Commands.add("createMetaDataExitsKey", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get(".ant-card-head button").click();
    cy.wait(1000);
    cy.get("#AddSecretsForm_name").type(data.secret_name);

    for (let i = 0; i < data.secret_value.length; i++) {
      if (i !== 0) {
        cy.get(".ant-space-item > .ant-row").first().find("button").click();
      }
      try {
        if (data.secret_value[i].key.toString() === "") {
          cy.get(".ant-space-item > .ant-row")
            .first()
            .find(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(0)
            .eq(0)
            .clear();
        } else {
          cy.get(".ant-space-item > .ant-row")
            .first()
            .find(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(0)
            .clear()
            .type(data.secret_value[i].key.toString());
        }

        if (data.secret_value[i].value.toString() === "") {
          cy.get(".ant-space-item > .ant-row")
            .first()
            .find(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear();
        } else {
          cy.get(".ant-space-item > .ant-row")
            .first()
            .find(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .eq(0)
            .clear()
            .type(data.secret_value[i].value.toString());
        }
      } catch (error) {}
    }
    if (data.metadata && data.metadata.length > 0) {
      cy.get(".ant-space-item > .ant-row").last().find("button").click();
      for (let i = 0; i < data.metadata.length; i++) {
        if (i !== 0) {
          cy.get(".ant-space-item > .ant-row").last().find("button").click();
        }
        try {
          if (data.metadata[i].key.toString() === "") {
            cy.get(".ant-space-item > .ant-row")
              .last()
              .find(`tr[data-row-key="${i}"]`)
              .find("input.ant-input")
              .eq(0)
              .eq(0)
              .clear();
          } else {
            cy.get(".ant-space-item > .ant-row")
              .last()
              .find(`tr[data-row-key="${i}"]`)
              .find("input.ant-input")
              .eq(0)
              .clear()
              .type(data.metadata[i].key.toString());
          }

          if (data.metadata[i].value.toString() === "") {
            cy.get(".ant-space-item > .ant-row")
              .last()
              .find(`tr[data-row-key="${i}"]`)
              .find("input.ant-input")
              .eq(1)
              .eq(0)
              .clear();
          } else {
            cy.get(".ant-space-item > .ant-row")
              .last()
              .find(`tr[data-row-key="${i}"]`)
              .find("input.ant-input")
              .eq(1)
              .eq(0)
              .clear()
              .type(data.metadata[i].value.toString());
          }
        } catch (error) {}
      }
    }
    cy.get("#buttonCreate").click();
    const divSelector = ".ant-form-explain";
    cy.get(divSelector)
      .contains("Key bị trùng lặp! Vui lòng thay đổi Key")
      .should("exist");
  });
});
