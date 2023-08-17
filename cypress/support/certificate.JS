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

Cypress.Commands.add("deleteCretificate", (fileData) => {
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

Cypress.Commands.add("deleteCretificateNo", (fileData) => {
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
// tạo 
Cypress.Commands.add("AddCheckExist", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  cy.fixture(fileData).then((data) => {
    cy.get('#certificateForm_name').type(data.certificate_name).should('be.visible');
    cy.get('#certificateForm_region').type(data.region).should('be.visible');
    cy.get('#certificateForm_certificate').type(data.certificate).should('be.visible');
    cy.get('#certificateForm_intermediates').type(data.intermediates).should('be.visible');
    cy.get('#certificateForm_private_key').type(data.private_key).should('be.visible');
    cy.get('#certificateForm_private_key_passphrase').type(data.passphrase).should('be.visible');
    cy.get('#buttonCreateCertificate').click();
    return cy.url().then((currentURL) => {
    if (currentURL === "/key-manager/ssl-certificate") {
      cy.fail("Tên chứng chỉ chưa tồn tại");
    } else {
      const divSelector = ".ant-notification-notice-message";
      cy.get(divSelector,{ timeout: 10000 })
        .contains("Tên chứng chỉ đã tồn tại trong propject này")
        .should("be.visible");
    }
    });
    });
});
Cypress.Commands.add("addSuccessingTL23", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  cy.fixture(fileData).then((data) => {
    cy.get('#certificateForm_name').type(data.certificate_name).should('be.visible');
    cy.get('#certificateForm_region').type(data.region).should('be.visible');
    if(data.intermediates !== '' && data.intermediates !== undefined){
      cy.get('#certificateForm_intermediates').invoke('val', data.intermediates).trigger('focus')
    }
    if(data.certificate !== '' && data.certificate !== undefined){
      cy.get('#certificateForm_certificate').type(data.certificate, {force: true, delay: 0})
    }
    cy.get('#certificateForm_private_key').type(data.private_key)
    if(data.passphrase !== '' && data.passphrase !== undefined){
      cy.get('#certificateForm_private_key_passphrase').type(data.passphrase).should('be.visible');
    }
    cy.get('#buttonCreateCertificate').click();
    return cy.url().then((currentURL) => {
       try {
        if (currentURL === "/key-manager/ssl-certificate") {
          cy.fail("Tạo không thành công");
        } else {
          const divSelector = ".ant-notification-notice-message";
          cy.get(divSelector,{ timeout: 20000 })
            .contains("Tạo SSL Certificate thành công")
            .should("be.visible");
        }
       } catch (error) {
        cy.fail("Tạo không thành công");
       }
      });
  });
});
Cypress.Commands.add("addSuccessingTL24", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  cy.fixture(fileData).then((data) => {
    cy.get('#certificateForm_name').type(data.certificate_name).should('be.visible');
    cy.get('#certificateForm_region').type(data.region).should('be.visible');
    cy.get('#certificateForm_certificate').type(data.certificate)
    if(data.intermediates !== '' && data.intermediates !== undefined){
      cy.get('#certificateForm_intermediates').type(data.intermediates)
    }
    cy.get('#certificateForm_private_key').type(data.private_key).should('be.visible');
    if(data.passphrase !== '' && data.passphrase !== undefined){
      cy.get('#certificateForm_private_key_passphrase').type(data.passphrase).should('be.visible');
    }
    cy.get('#buttonCreateCertificate').click();
    return cy.url().then((currentURL) => {
      if (currentURL === "/key-manager/ssl-certificate") {
        cy.fail("Tạo không thành công");
      } else {
        const divSelector = ".ant-notification-notice-message";
        cy.get(divSelector,{ timeout: 10000 })
          .contains("Tạo SSL Certificate thành công")
          .should("be.visible");
      }
      });
  });
});
Cypress.Commands.add("addSuccessingTL25", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  cy.fixture(fileData).then((data) => {
    cy.get('#certificateForm_name').type(data.certificate_name).should('be.visible');
    cy.get('#certificateForm_region').type(data.region).should('be.visible');
    cy.get('#certificateForm_certificate').type(data.certificate).should('be.visible');
    if(data.intermediates !== '' && data.intermediates !== undefined){
      cy.get('#certificateForm_intermediates').type(data.intermediates).should('be.visible');
    }
    cy.get('#certificateForm_private_key').type(data.private_key).should('be.visible');
    if(data.passphrase !== '' && data.passphrase !== undefined){
      cy.get('#certificateForm_private_key_passphrase').type(data.passphrase).should('be.visible');
    }
    cy.get('#buttonCreateCertificate').click();
    return cy.url().then((currentURL) => {
      if (currentURL === "/key-manager/ssl-certificate") {
        cy.fail("Tạo không thành công");
      } else {
        const divSelector = ".ant-notification-notice-message";
        cy.get(divSelector,{ timeout: 10000 })
          .contains("Tạo SSL Certificate thành công")
          .should("be.visible");
      }
      });
  });
});

Cypress.Commands.add("addCertificateprivateKey", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  cy.fixture(fileData).then((data) => {
    cy.get('#certificateForm_name').type(data.certificate_name).should('be.visible');
    cy.get('#certificateForm_region').type(data.region).should('be.visible');
    cy.get('#certificateForm_certificate').type(data.certificate).should('be.visible');
    cy.get('#certificateForm_intermediates').type(data.intermediates).should('be.visible');
    cy.get('#certificateForm_private_key').type(data.private_key).should('be.visible');
    cy.get('#certificateForm_private_key_passphrase').type(data.passphrase).should('be.visible');
    cy.get('#buttonCreateCertificate').click();
    return cy.url().then((currentURL) => {
      if (currentURL === "/key-manager/ssl-certificate") {
        cy.fail("Lỗi trường Certificate/private những vẫn thêm thành công");
      } else {
        const divSelector = ".ant-form-explain";
  
        cy.get(divSelector)
          .contains(
            "Sai định dạng PEM"
          )
          .should("be.visible");
      }
    });
  });
});

Cypress.Commands.add("addNull", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  cy.get('#buttonCreateCertificate').click();
  return cy.url().then((currentURL) => {
    if (currentURL === "/key-manager/ssl-certificate") {
      cy.fail("Lỗi các trường không bỏ trống");
    } else {
      const divSelector = ".ant-form-explain";

      cy.get(divSelector)
        .contains(
          "Vui lòng nhập thông tin"
        )
        .should("be.visible");
    }
  });
});

Cypress.Commands.add("addClickCencel", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  cy.fixture(fileData).then((data) => {
    cy.get('#certificateForm_name').type(data.certificate_name).should('be.visible');
    cy.get('#certificateForm_region').type(data.region).should('be.visible');
    cy.get('#certificateForm_certificate').type(data.certificate).should('be.visible');
    cy.get('#certificateForm_intermediates').type(data.intermediates).should('be.visible');
    cy.get('#certificateForm_private_key').type(data.private_key).should('be.visible');
    cy.get('#certificateForm_private_key_passphrase').type(data.passphrase).should('be.visible');
    cy.get('.btn-button-tertiary').click();
    return cy.url().then((currentURL) => {
      if (currentURL === "/key-manager/ssl-certificate") {
        cy.fail("Sảy ra lỗi");
      } 
    });
  });
});
Cypress.Commands.add("addCheck", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  cy.fixture(fileData).then((data) => {
    if(data.certificate_name !== '' && data.certificate_name !== undefined){
      cy.get('#certificateForm_name').type(data.certificate_name).should('be.visible');
    }
    if(data.region !== '' && data.region !== undefined){
      cy.get('#certificateForm_region').type(data.region).should('be.visible');
    }
    if(data.certificate !== '' && data.certificate !== undefined){
      cy.get('#certificateForm_certificate').type(data.certificate).should('be.visible');
    }
    if(data.intermediates !== '' && data.intermediates !== undefined){
      cy.get('#certificateForm_intermediates').type(data.intermediates).should('be.visible');
    }
    if(data.private_key !== '' && data.private_key !== undefined){
      cy.get('#certificateForm_private_key').type(data.private_key).should('be.visible');
    }
    if(data.passphrase !== '' && data.passphrase !== undefined){
      cy.get('#certificateForm_private_key_passphrase').type(data.passphrase).should('be.visible');
    }
    cy.get('#buttonCreateCertificate').click();
    return cy.url().then((currentURL) => {
      if (currentURL === "/key-manager/ssl-certificate") {
        cy.fail("Lỗi các trường sai dinh dang");
      } else {
        const divSelector = ".ant-form-explain";
  
        cy.get(divSelector)
          .contains(
            "Tên chứng chỉ chỉ có thể chứa các chữ cái (a-z, A-Z), số (0-9), dấu gạch ngang (-) và dấu gạch dưới (_)" || "Sai định dạng PEM"
          )
          .should("be.visible");
      }
    });
  });
});

Cypress.Commands.add("addCheckPriKeyNoPass", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  cy.fixture(fileData).then((data) => {
    cy.get('#certificateForm_name').type(data.certificate_name).should('be.visible');
    cy.get('#certificateForm_region').type(data.region).should('be.visible');
    if(data.intermediates !== ''){
      cy.get('#certificateForm_intermediates').type(data.intermediates).should('be.visible');
    }
    cy.get('#certificateForm_certificate').type(data.certificate).should('be.visible');
    cy.get('#certificateForm_private_key').type(data.private_key).should('be.visible');
    cy.get('#certificateForm_private_key_passphrase').type(data.passphrase).should('be.visible');
    cy.get('#buttonCreateCertificate').click();
    return cy.url().then((currentURL) => {
      if (currentURL === "/key-manager/ssl-certificate") {
        cy.fail("Lỗi");
      } else {
        const divSelector = ".ant-notification-notice-message";
        cy.get(divSelector)
          .contains("Không thể giải mã private key với passphrase đã nhập")
          .should("be.visible");
      }
      });
  });
});
Cypress.Commands.add("addCheckPriKeyAndPassphrase", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  cy.fixture(fileData).then((data) => {
    cy.get('#certificateForm_name').type(data.certificate_name).should('be.visible');
    cy.get('#certificateForm_region').type(data.region).should('be.visible');
    cy.get('#certificateForm_intermediates').type(data.intermediates).should('be.visible');
    cy.get('#certificateForm_certificate').type(data.certificate).should('be.visible');
    cy.get('#certificateForm_private_key').type(data.private_key).should('be.visible');
    cy.get('#certificateForm_private_key_passphrase').type(data.passphrase).should('be.visible');
    cy.get('#buttonCreateCertificate').click();
    return cy.url().then((currentURL) => {
      if (currentURL === "/key-manager/ssl-certificate") {
        cy.fail("Lỗi");
      } else {
        const divSelector = ".ant-notification-notice-message";
        cy.get(divSelector)
          .contains("Không thể giải mã private key với passphrase đã nhập")
          .should("be.visible");
      }
      });
  });
});
// xem chi tiết ceri
Cypress.Commands.add("detailCertificate", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate");
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type(
      data.certificate_name
    );
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type("{enter}");
    cy.get("td > a > span")
      .filter((index, element) => element.innerText.trim() === data.certificate_name)
      .click();
      cy.get(':nth-child(2) > :nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-input').eq(0)
      .invoke("val")
      .should("eq", data.common_name);
    cy.get(':nth-child(1) > :nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-input').eq(0)
    .invoke("val")
    .should("eq", data.certificate_name);
    cy.get(':nth-child(3) > :nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-input').eq(0)
    .invoke("val")
    .should("eq", data.series_numer);
    cy.get(':nth-child(4) > :nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-input').eq(0)
    .invoke("val")
    .should("eq", data.public_key);
    cy.get(':nth-child(5) > :nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-input').eq(0)
    .invoke("val")
    .should("eq", data.signature_algorithm);
  });
});
