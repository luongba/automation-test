Cypress.Commands.add("baseSecret", (data, type = "Create") => {
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

  if (type === "Create") {
    cy.get("body").then(
      ($span) => {
        // if ($span.find("input[maxlength='128']").length) {
        // if (data.metadata && data.metadata.length > 0) {
        if (type === "Create") {
          cy.get(".ant-space-item > .ant-row").last().find("button").click();
        }
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
      // } else {
      //   cy.fail("Không có phần tử edit meta để sửa");
      // }
      // }
    );
  } else {
    cy.get("body").then(($span) => {
      if ($span.find("input[maxlength='128']").length) {
        if (data.metadata && data.metadata.length > 0) {
          if (type === "Create") {
            cy.get(".ant-space-item > .ant-row").last().find("button").click();
          }
          for (let i = 0; i < data.metadata.length; i++) {
            if (i !== 0) {
              cy.get(".ant-space-item > .ant-row")
                .last()
                .find("button")
                .click();
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
      } else {
        cy.fail("Không có phần tử edit meta để sửa");
      }
    });
  }
});
Cypress.Commands.add("baseDeleteSecret", (data, type = "Success") => {
  cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
    .should("exist")
    .type(data.secret_name);
  cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
    .should("exist")
    .type("{enter}");
  cy.get("body").then(($el) => {
    if (
      $el.find("td > a > span").length > 0 &&
      $el
        .find("td > a > span")
        .filter(
          (index, element) => element.innerText.trim() === data.secret_name
        ).length > 0
    ) {
      cy.get("td > a > span")
        .filter(
          (index, element) => element.innerText.trim() === data.secret_name
        )
        .click();
    } else {
      cy.fail("Không tìm thấy dữ liệu xóa");
    }
  });
  cy.wait(1000);
  cy.url().then((url) => {
    // 'url' chứa URL hiện tại của trang web
    const parts = url.split("=");
    cy.wait(1000);
    cy.visit("/key-manager/secrets");
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("exist")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("exist")
      .type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .parent()
      .parent()
      .parent()
      .find("td > div > span")
      .last()
      .click();
    if (type === "Fail") {
      Cypress.env("environment") === "production"
        ? cy.get(".btn-button-tertiary").should("be.visible").click()
        : cy.get("#cancelButtonDetailBackup").should("be.visible").click();
      cy.wait(1000);
    } else if (type === "Success") {
      Cypress.env("environment") === "production"
        ? cy.get(".btn-button-primary").should("be.visible").click()
        : cy.get("#okButton").should("be.visible").click();
    }else {
      cy.get(".ant-modal-close-x").should("be.visible").click();
    }
    cy.visit(`/key-manager/secrets/DetailSecrets?detail=${parts[1]}`);
    cy.wait(2000);
  });
});
// TL_33
Cypress.Commands.add("createSecretSuccess", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get("#AddSecretsForm_name").type(data.secret_name);
    cy.baseSecret(data);
  });
  cy.get("#buttonCreate").click();
  cy.wait(2000);
  return cy.url().then((currentURL) => {
    if (
      currentURL ==
      currentURL.split("key-manager")[0] + "key-manager/secrets"
    ) {
      cy.detailSecret(fileData);
    } else {
      cy.fail("Thêm key thất bại");
    }
  });
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
    cy.baseSecret(data);
    cy.get("#buttonCreate").click();
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
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.get(".ant-table-row").should("have.length.gt", 0);
  });
});

// TL_39
Cypress.Commands.add("findInvalidSecret", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.contains("Không tìm thấy dữ liệu");
  });
});

// TL39
Cypress.Commands.add("deleteSecretSuccess", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.baseDeleteSecret(data);
    cy.get("input.ant-input.ant-input-disabled")
      .eq(0)
      .invoke("val")
      .should("eq", "");
  });
});

// TL40

Cypress.Commands.add("deleteSecretFail", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.baseDeleteSecret(data, "Fail");
    cy.get("input.ant-input.ant-input-disabled")
      .eq(0)
      .invoke("val")
      .should("eq", data.secret_name);
  });
});

// TL41

Cypress.Commands.add("deleteSecretFailX", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.baseDeleteSecret(data, "X");
    cy.get("input.ant-input.ant-input-disabled")
      .eq(0)
      .invoke("val")
      .should("eq", data.secret_name);
  });
});

// TL42

Cypress.Commands.add("detailSecret", (fileData) => {
  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
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
            const numericInputValue = inputValue.toString().trim();
            expect(numericInputValue).to.equal(
              data.secret_value[i].key.toString().trim()
            ); // So sánh giá trị số từ trường nhập với giá trị số dự kiến
          });
        cy.get("table")
          .first()
          .get(`tr[data-row-key="${i}"]`)
          .find("input.ant-input")
          .eq(1)
          .invoke("val")
          .then((inputValue) => {
            const numericInputValue = inputValue.toString().trim();
            expect(numericInputValue).to.equal(
              data.secret_value[i].value.toString().trim()
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
              const numericInputValue = inputValue.toString().trim();
              expect(numericInputValue).to.equal(
                data.metadata_value[i].key.toString().trim()
              ); // So sánh giá trị số từ trường nhập với giá trị số dự kiến
            });
          cy.get("table")
            .last()
            .get(`tr[data-row-key="${i}"]`)
            .find("input.ant-input")
            .eq(1)
            .invoke("val")
            .then((inputValue) => {
              const numericInputValue = inputValue.toString().trim();
              expect(numericInputValue).to.equal(
                data.metadata_value[i].value.toString().trim()
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
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);
    cy.baseSecret(data, "Edit");
    cy.get("#buttonUpdate").click();
    cy.wait(2000);
    cy.detailSecret(fileData);
  });
});

// TL45
Cypress.Commands.add("editSecretFail", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);
    cy.baseSecret(data, "Edit");
    cy.get("#buttonUpdate").click();
    const divSelector = ".ant-notification-notice-message";

    cy.get(divSelector)
      .contains("Key bị trùng lặp! Vui lòng thay đổi Key")
      .should("be.visible");
  });
});

//TL-46

Cypress.Commands.add("editSecretEmptyKey", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);
    cy.baseSecret(data, "Edit");
    cy.get("#buttonUpdate").click();
    const divSelector = ".ant-form-explain";
    cy.get(divSelector)
      .contains("Vui lòng nhập thông tin")
      .should("be.visible");
  });
});
//TL-47

Cypress.Commands.add("editSecretRollbackList", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);
    cy.baseSecret(data, "Edit");
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
  cy.fixture(fileData).then((data) => {
    cy.get(".ant-card-head button").click();
    cy.wait(1000);
    cy.get("#AddSecretsForm_name").type(data.secret_name);

    cy.baseSecret(data);
    cy.get("#buttonCreate").click();
    cy.wait(1000);
    return cy.url().then((currentURL) => {
      if (
        currentURL ==
        currentURL.split("key-manager")[0] + "key-manager/secrets"
      ) {
        cy.detailSecret(fileData);
      } else {
        cy.fail("Thêm key thất bại");
      }
    });
  });
});
//TL-49

Cypress.Commands.add("createMetaDataExitsKey", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get(".ant-card-head button").click();
    cy.wait(1000);
    cy.get("#AddSecretsForm_name").type(data.secret_name);

    cy.baseSecret(data);
    cy.get("#buttonCreate").click();
    const divSelector = ".ant-form-explain";
    cy.get(divSelector)
      .contains("Key bị trùng lặp! Vui lòng thay đổi Key")
      .should("exist");
  });
});
//TL-50

Cypress.Commands.add("createMetaDataEmptyKey", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get(".ant-card-head button").click();
    cy.wait(1000);
    cy.get("#AddSecretsForm_name").type(data.secret_name);

    cy.baseSecret(data);
    cy.get("#buttonCreate").click();
    const divSelector = ".ant-form-explain";
    cy.get(divSelector).contains("Vui lòng nhập thông tin").should("exist");
  });
});

//TL-51

Cypress.Commands.add("createMetaBackList", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get(".ant-card-head button").click();
    cy.wait(1000);
    cy.get("#AddSecretsForm_name").type(data.secret_name);

    cy.baseSecret(data);
    cy.get(".btn-button-tertiary").click();
    cy.wait(1000);
    cy.wait(2000);
    return cy.url().then((currentURL) => {
      if (
        currentURL ==
        currentURL.split("key-manager")[0] + "key-manager/secrets"
      ) {
        cy.log("success");
      } else {
        cy.fail("Lỗi không quay lại trang danh sách");
      }
    });
  });
});
//TL-52

Cypress.Commands.add("editMetaSucess", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);

    cy.baseSecret(data, "Edit");
    cy.get("#buttonUpdate").click();
    cy.wait(2000);
    cy.detailSecret(fileData);
  });
});

//TL-53

Cypress.Commands.add("editMetaExitsKey", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);

    cy.baseSecret(data, "Edit");
    cy.get("#buttonUpdate").click();
    const divSelector = ".ant-form-explain";
    cy.get(divSelector)
      .contains("Key bị trùng lặp! Vui lòng thay đổi Key")
      .should("exist");
  });
});
//TL-54

Cypress.Commands.add("editMetaEmptyKey", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);

    cy.baseSecret(data, "Edit");
    cy.get("#buttonUpdate").click();
    const divSelector = ".ant-form-explain";
    cy.get(divSelector).contains("Vui lòng nhập thông tin").should("exist");
  });
});

//TL-55

Cypress.Commands.add("editMetaBackList", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);

    cy.baseSecret(data, "Edit");
    cy.get(".btn-button-tertiary").click();
    return cy.url().then((currentURL) => {
      if (currentURL.includes("/key-manager/secrets")) {
        cy.log("success");
      } else {
        cy.fail("Lỗi không quay lại trang danh sách");
      }
    });
  });
});

// TL 56

Cypress.Commands.add("deleteMetadataSuccess", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/secrets");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .parent()
      .parent()
      .parent()
      .find("td > div > span")
      .first()
      .click();
    cy.wait(1000);
    if (data.metadata && data.metadata.length > 0) {
      cy.get("span").then(($span) => {
        if ($span.find("input[maxlength='128']").length) {
          let isFlag = false;
          for (let i = 0; i < data.metadata.length; i++) {
            cy.get("input[maxlength='128']").each(($input, index) => {
              const inputValue = $input.val();
              if (inputValue === data.metadata[i].key.toString().trim()) {
                isFlag = true;
                cy.wrap($input)
                  .parents("tr")
                  .find("td:last-child div > span")
                  .click();
              }
            });
          }
          if (!isFlag) {
            cy.fail("Không tồn tại phần tử muốn xóar");
          }
        } else {
          cy.fail("Lỗi không có phần tử nào để xóa");
        }
      });
    }
    cy.get("#buttonUpdate").click();
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type(data.secret_name);
    cy.get('input[placeholder="Tìm kiếm theo tên Secret"]')
      .should("be.visible")
      .type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.secret_name)
      .click();
    cy.get(".div-edit").click();
    cy.wait(1000);
    if (data.metadata && data.metadata.length > 0) {
      cy.get("span").then(($span) => {
        cy.log("-----------------", $span.has("input[maxlength='128']"));
        if ($span.find("input[maxlength='128']").length) {
          for (let i = 0; i < data.metadata.length; i++) {
            cy.get("input[maxlength='128']").each(($input, index) => {
              const inputValue = $input.val();
              if (inputValue === data.metadata[i].key.toString().trim()) {
                cy.fail("Lỗi chưa xóa được");
              } else {
                cy.log("Thành công");
              }
            });
          }
        } else {
          cy.log("Thành công");
        }
      });
    }
  });
});
