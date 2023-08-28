Cypress.Commands.add("baseCreateKey", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('span > span > input[type="text"].ant-input', {
      timeout: 20000,
    }).type(data.key_name);
    cy.get('div[title="AES (Symmetric key used for Encrypt and Decrypt)"]', {
      timeout: 20000,
    }).click();
    cy.get("li").contains(data.algorithm).should("be.visible").click();
    if (data.type === "AES") {
      cy.get('div[title="256 bits"]').click();
      cy.get("li").contains(data.keylength).should("be.visible").click();
    } else if (data.type === "RSA") {
      cy.get('div[title="2048 bits"]').click();
      cy.get("li").contains(data.keylength).should("be.visible").click();
    } else {
      cy.get('div[title="NIST_P256"]').click();
      cy.get("li")
        .contains(data.elliptic_curve_id)
        .should("be.visible")
        .click();
    }
  });
});

//TL1
Cypress.Commands.add("keySearch", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', {
      timeout: 20000,
    }).type(data.key_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', {
      timeout: 20000,
    }).type("{enter}");
    cy.wait(1000);
    cy.get("body").then(($el) => {
      if ($el.find("tbody > tr").length > 0) {
        cy.get("tbody > tr").then(($results) => {
          if ($results.length > 0) {
            cy.log("Kết quả tìm kiếm:" + $results.length);
          } else {
            cy.fail("Không tìm thấy kết quả.");
          }
        });
      } else {
        cy.log("Không tìm thấy kết quả.");
      }
    });
  });
});

//TL2
Cypress.Commands.add("searhNoResult", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', {
      timeout: 20000,
    }).type(data.key_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', {
      timeout: 20000,
    }).type("{enter}");
    cy.get(".ant-table-placeholder")
      .contains("Không tìm thấy dữ liệu")
      .should("be.visible");
  });
});

//TL3-TL4
Cypress.Commands.add("checkDetailKey", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', {
      timeout: 20000,
    }).type(data.key_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', {
      timeout: 20000,
    }).type("{enter}");
    cy.get("td > a > span").contains(data.key_search).click();
    cy.wait(2000);
    cy.get("input.ant-input.ant-input-disabled")
      .eq(0)
      .invoke("val")
      .should("eq", data.key_search);
    cy.get("div.ant-select-selection-selected-value")
      .eq(0)
      .should("have.attr", "title");
    cy.get("div.ant-select-selection-selected-value")
      .eq(1)
      .should("have.attr", "title");
    cy.get(".div-delete").should("exist");
  });
});

//TL5
Cypress.Commands.add("deleteKeySuccess", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', { timeout: 20000 })
      .should("be.visible")
      .type(data.key_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', { timeout: 20000 })
      .should("be.visible")
      .type("{enter}");
    cy.get("body").then(($el) => {
      if (
        $el.find("td > a > span").length > 0 &&
        $el
          .find("td > a > span")
          .filter(
            (index, element) => element.innerText.trim() === data.key_search
          ).length > 0
      ) {
        cy.get("td > a > span")
          .filter(
            (index, element) => element.innerText.trim() === data.key_search
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
      cy.visit("/key-manager/keys");
      cy.get("td > a > span")
        .filter(
          (index, element) => element.innerText.trim() === data.key_search
        )
        .parent()
        .parent()
        .parent()
        .find("td > div > span")
        .click();
      Cypress.env("environment") === "production"
        ? cy.get(".btn-button-primary").should("be.visible").click()
        : cy.get("#okButton").should("be.visible").click();
      cy.visit(`/key-manager/keys/DetailKeys?detail=${parts[1]}`);
      const divSelector = ".ant-notification-notice-message";

      cy.get(divSelector).contains("Không tìm thấy").should("be.visible");
    });
  });
});

//TL6
Cypress.Commands.add("deleteKeyFail", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.wait(1000);
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', { timeout: 20000 })
      .should("be.visible")
      .type(data.key_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', { timeout: 20000 })
      .should("be.visible")
      .type("{enter}");
    cy.get("body").then(($el) => {
      if (
        $el.find("td > a > span").length > 0 &&
        $el
          .find("td > a > span")
          .filter(
            (index, element) => element.innerText.trim() === data.key_search
          ).length > 0
      ) {
        cy.get("td > a > span")
          .filter(
            (index, element) => element.innerText.trim() === data.key_search
          )
          .click();
      } else {
        cy.fail("Không tìm thấy dữ liệu xóa");
      }
    });
    cy.wait(1000);
    cy.url().then((url) => {
      const parts = url.split("=");
      cy.visit("/key-manager/keys");
      cy.get("td > a > span")
        .filter(
          (index, element) => element.innerText.trim() === data.key_search
        )
        .parent()
        .parent()
        .parent()
        .find("td > div > span")
        .click();
      Cypress.env("environment") === "production"
        ? cy.get(".btn-button-tertiary").should("be.visible").click()
        : cy.get("#cancelButtonDetailBackup").should("be.visible").click();
      cy.visit(`/key-manager/keys/DetailKeys?detail=${parts[1]}`);
      cy.wait(1000);
      const divSelector = ".ant-notification-notice-message";
      cy.get("input.ant-input.ant-input-disabled")
        .eq(0)
        .invoke("val")
        .should("eq", data.key_search);
    });
  });
});

//TL7
Cypress.Commands.add("deleteKeyFailX", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', { timeout: 20000 })
      .should("be.visible")
      .type(data.key_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]', { timeout: 20000 })
      .should("be.visible")
      .type("{enter}");
    cy.get("body").then(($el) => {
      if (
        $el.find("td > a > span").length > 0 &&
        $el
          .find("td > a > span")
          .filter(
            (index, element) => element.innerText.trim() === data.key_search
          ).length > 0
      ) {
        cy.get("td > a > span")
          .filter(
            (index, element) => element.innerText.trim() === data.key_search
          )
          .click();
      } else {
        cy.fail("Không tìm thấy dữ liệu xóa");
      }
    });
    cy.wait(1000);
    cy.url().then((url) => {
      const parts = url.split("=");
      cy.visit("/key-manager/keys");
      cy.get("td > a > span")
        .filter(
          (index, element) => element.innerText.trim() === data.key_search
        )
        .parent()
        .parent()
        .parent()
        .find("td > div > span")
        .click();
      cy.get(".ant-modal-close-x").should("be.visible").click();
      cy.visit(`/key-manager/keys/DetailKeys?detail=${parts[1]}`);
      cy.get("input.ant-input.ant-input-disabled")
        .eq(0)
        .invoke("val")
        .should("eq", data.key_search);
    });
  });
});
// TL7
Cypress.Commands.add("createKey", (fileData) => {
  // Load the data from the fixture
  cy.baseCreateKey(fileData);
  cy.get("#buttonCreateKey").click();
  cy.wait(2000);
  return cy.url().then((currentURL) => {
    if (currentURL == currentURL.split("key-manager")[0] + "key-manager/keys") {
      cy.wait(2000);
      cy.fixture(fileData).then((data) => {
        cy.get('input[placeholder="Tìm kiếm theo tên Key"]', { timeout: 20000 })
          .should("be.visible")
          .type(data.key_name);
        cy.get('input[placeholder="Tìm kiếm theo tên Key"]', {
          timeout: 20000,
        }).type("{enter}");
        cy.get("td > a > span").contains(data.key_name).click();
        cy.get("input.ant-input.ant-input-disabled")
          .eq(0)
          .should("have.value", data.key_name);
        cy.get("div.ant-select-selection-selected-value")
          .eq(0)
          .should("have.attr", "title", data.algorithm);
        if (data.type !== "ECDSA") {
          cy.get("div.ant-select-selection-selected-value")
            .eq(1)
            .should("have.attr", "title", data.keylength);
        } else {
          cy.get("div.ant-select-selection-selected-value")
            .eq(1)
            .should("have.attr", "title", data.elliptic_curve_id);
        }
      });
    } else {
      cy.fail("Thêm key thất bại");
    }
  });
});

// TL8
Cypress.Commands.add("createKeyExist", (fileData) => {
  cy.baseCreateKey(fileData);
  cy.get("#buttonCreateKey").click();
  return cy.url().then((currentURL) => {
    if (currentURL == currentURL.split("key-manager")[0] + "key-manager/keys") {
      cy.fail("Key chưa tồn tại");
    } else {
      const divSelector = ".ant-notification-notice-message";

      cy.get(divSelector)
        .should("be.visible")
        .contains("Tên key đã tồn tại trong project này");
    }
  });
});

// TL9
Cypress.Commands.add("createKeyEmpty", (fileData) => {
  cy.baseCreateKey(fileData);
  cy.get("#buttonCreateKey").click();
  return cy.url().then((currentURL) => {
    if (currentURL == currentURL.split("key-manager")[0] + "key-manager/keys") {
      cy.fail("Lỗi bỏ trống trường name những vẫn thêm thành công");
    } else {
      const divSelector = ".ant-form-explain";

      cy.get(divSelector)
        .contains("Vui lòng nhập thông tin")
        .should("be.visible");
    }
  });
});

// TL10
Cypress.Commands.add("createKeyCancel", (fileData) => {
  cy.baseCreateKey(fileData);
  cy.get("button.btn-button-tertiary").click();
  return cy.url().then((currentURL) => {
    cy.wait(2000);
    cy.fixture(fileData).then((data) => {
      if (currentURL.includes("/key-manager/keys")) {
        cy.get('span > span > input[type="text"].ant-input', {
          timeout: 20000,
        }).type(data.key_name);
        cy.get('body').then(($el) => {
          if($el
            .find("td > a > span")
            .filter(
              (index, element) => element.innerText.trim() === data.key_name
            ).length > 0){
            cy.fail("Lỗi nhấn hủy nhưng vẫn lưu thành công");
          }else {
            cy.log("sucess")
          }
        })
      } else {
        cy.fail("Lỗi không quay lại trang danh sách");
      }
    });
  });
});

// TL11

Cypress.Commands.add("createKeySpecialCharacters", (fileData) => {
  cy.baseCreateKey(fileData);
  return cy.url().then((currentURL) => {
    if (currentURL == currentURL.split("key-manager")[0] + "key-manager/keys") {
      cy.fail("Lỗi trường name nhập ký tự đặc biệt những vẫn thêm thành công");
    } else {
      const divSelector = ".ant-form-explain";

      cy.get(divSelector)
        .contains(
          "Tên key chỉ có thể chứa các chữ cái (a-z, A-Z), số (0-9) và dấu gạch dưới (_)"
        )
        .should("be.visible");
    }
  });
});

//TL13
