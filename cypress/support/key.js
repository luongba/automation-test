Cypress.Commands.add("baseCreateKey", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();
  cy.visit("/key-manager/keys/AddKeys");
  cy.fixture(fileData).then((data) => {
    cy.get('span > span > input[type="text"].ant-input').type(data.key_name);
    cy.get(
      'div[title="AES (Symmetric key used for Encrypt and Decrypt)"]'
    ).click();
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

  cy.get("#buttonCreateKey").click();
  cy.wait(2000);
});

//TL1
Cypress.Commands.add("keySearch", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();
  cy.visit("/key-manager/keys");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]').type(data.key_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]').type("{enter}");
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

//TL2
Cypress.Commands.add("searhNoResult", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/keys");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]').type(data.key_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]').type("{enter}");
    cy.get(".ant-table-placeholder")
      .contains("Không tìm thấy dữ liệu")
      .should("be.visible");
  });
});

//TL3-TL4
Cypress.Commands.add("checkDetailKey", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/keys");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]').type(data.key_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]').type("{enter}");
    cy.get("td > a > span").contains(data.key_search).click();
    cy.get("input.ant-input.ant-input-disabled")
      .eq(0)
      .invoke("val")
      .should("eq", "");
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
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/keys");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]').type(data.key_search);
    cy.get('input[placeholder="Tìm kiếm theo tên Key"]').type("{enter}");
    cy.get("td > div > span").eq(0).click();
    Cypress.env("environment") === "production"
      ? cy.get(".btn-button-primary").should("be.visible").click()
      : cy.get("#okButton").should("be.visible").click();
    cy.wait(2000);
    cy.get("td > a > span").then($spans => {
      if ($spans.length > 0) {
        // Phần tử tồn tại
        cy.log("a");
      } else {
        // Phần tử không tồn tại
        cy.log("b");
      }
    });
  });
});

// TL7
Cypress.Commands.add("createKey", (fileData) => {
  // Load the data from the fixture
  cy.baseCreateKey(fileData);

  // Lấy đường dẫn URL hiện tại và trả về giá trị
  return cy.url().then((currentURL) => {
    if (currentURL === "/key-manager/keys") {
      cy.fixture(fileData).then((data) => {
        cy.get('input[placeholder="Tìm kiếm theo tên Key"]')
          .type(data.key_name)
          .should("be.visible");
        cy.get('input[placeholder="Tìm kiếm theo tên Key"]').type("{enter}");
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
  return cy.url().then((currentURL) => {
    if (currentURL === "/key-manager/keys") {
      cy.fail("Key chưa tồn tại");
    } else {
      const divSelector = ".ant-notification-notice-message";

      cy.get(divSelector)
        .contains("Tên key đã tồn tại trong project này")
        .should("be.visible");
    }
  });
});

// TL9
Cypress.Commands.add("createKeyEmpty", (fileData) => {
  // Load the data from the fixture
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/keys/AddKeys");
  cy.fixture(fileData).then((data) => {
    cy.get('span > span > input[type="text"].ant-input')
      .type(data.key_name)
      .clear();
    cy.get(
      'div[title="AES (Symmetric key used for Encrypt and Decrypt)"]'
    ).click();
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

  cy.get("#buttonCreateKey").click();
  cy.wait(2000);

  // Lấy đường dẫn URL hiện tại và trả về giá trị
  return cy.url().then((currentURL) => {
    if (currentURL === "/key-manager/keys") {
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
  // Load the data from the fixture
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/keys/AddKeys");
  cy.fixture(fileData).then((data) => {
    cy.get('span > span > input[type="text"].ant-input').type(data.key_name);
    cy.get(
      'div[title="AES (Symmetric key used for Encrypt and Decrypt)"]'
    ).click();
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

  cy.get("button.btn-button-tertiary").click();
  cy.wait(2000);
  return cy.url().then((currentURL) => {
    if (currentURL === "/key-manager/keys") {
      return true;
    } else {
      cy.fail("Lỗi không quay lại trang danh sách");
    }
  });
});

// TL11

Cypress.Commands.add("createKeySpecialCharacters", (fileData) => {
  // Load the data from the fixture
  cy.baseCreateKey(fileData);

  // Lấy đường dẫn URL hiện tại và trả về giá trị
  return cy.url().then((currentURL) => {
    if (currentURL === "/key-manager/keys") {
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
