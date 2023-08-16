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
    cy.get('#certificateForm_name').type(data.certificate_name)
    cy.get('#certificateForm_region').type(data.region)
    cy.get('#certificateForm_certificate').type(data.certificate)
    cy.get('#certificateForm_intermediates').type(data.intermediates)
    cy.get('#certificateForm_private_key').type(data.private_key)
    cy.get('#certificateForm_private_key_passphrase').type(data.passphrase)
    cy.get('#buttonCreateCertificate').click();
    return cy.url().then((currentURL) => {
    if (currentURL === "/key-manager/ssl-certificate") {
      cy.fail("Tên chứng chỉ chưa tồn tại");
    } else {
      const divSelector = ".ant-notification-notice-message";
      cy.get(divSelector)
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
    cy.get('#certificateForm_name').type(data.certificate_name)
    cy.get('#certificateForm_region').type(data.region)
    if(data.certificate !== '' && data.certificate !== undefined){
      cy.get('#certificateForm_certificate').type(data.certificate)
    }
    if(data.intermediates !== '' && data.intermediates !== undefined){
      cy.get('#certificateForm_intermediates').type(data.intermediates)
    }
    cy.get('#certificateForm_private_key').type(data.private_key)
    if(data.passphrase !== '' && data.passphrase !== undefined){
      cy.get('#certificateForm_private_key_passphrase').type(data.passphrase)
    }
    cy.get('#buttonCreateCertificate').click();
    cy.wait(1000)
    return cy.url().then((currentURL) => {
      if (currentURL === "/key-manager/ssl-certificate") {
        cy.fail("Tạo không thành công");
      } else {
        const divSelector = ".ant-notification-notice-message";
        cy.get(divSelector)
          .contains("Tạo SSL Certificate thành công")
          .should("be.visible");
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
    cy.get('#certificateForm_name').type(data.certificate_name)
    cy.get('#certificateForm_region').type(data.region)
    cy.get('#certificateForm_certificate').type(data.certificate)
    if(data.intermediates !== '' && data.intermediates !== undefined){
      cy.get('#certificateForm_intermediates').type(data.intermediates)
    }
    cy.get('#certificateForm_private_key').type(data.private_key)
    if(data.passphrase !== '' && data.passphrase !== undefined){
      cy.get('#certificateForm_private_key_passphrase').type(data.passphrase)
    }
    cy.get('#buttonCreateCertificate').click();
    return cy.url().then((currentURL) => {
      if (currentURL === "/key-manager/ssl-certificate") {
        cy.fail("Tạo không thành công");
      } else {
        const divSelector = ".ant-notification-notice-message";
        cy.get(divSelector)
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
    cy.get('#certificateForm_name').type(data.certificate_name)
    cy.get('#certificateForm_region').type(data.region)
    cy.get('#certificateForm_certificate').type(data.certificate)
    if(data.intermediates !== '' && data.intermediates !== undefined){
      cy.get('#certificateForm_intermediates').type(data.intermediates)
    }
    cy.get('#certificateForm_private_key').type(data.private_key)
    if(data.passphrase !== '' && data.passphrase !== undefined){
      cy.get('#certificateForm_private_key_passphrase').type(data.passphrase)
    }
    cy.get('#buttonCreateCertificate').click();
    return cy.url().then((currentURL) => {
      if (currentURL === "/key-manager/ssl-certificate") {
        cy.fail("Tạo không thành công");
      } else {
        const divSelector = ".ant-notification-notice-message";
        cy.get(divSelector)
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
    cy.get('#certificateForm_name').type(data.certificate_name)
    cy.get('#certificateForm_region').type(data.region)
    cy.get('#certificateForm_certificate').type(data.certificate)
    cy.get('#certificateForm_intermediates').type(data.intermediates)
    cy.get('#certificateForm_private_key').type(data.private_key)
    cy.get('#certificateForm_private_key_passphrase').type(data.passphrase)
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
    cy.get('#certificateForm_name').type(data.certificate_name)
    cy.get('#certificateForm_region').type(data.region)
    cy.get('#certificateForm_certificate').type(data.certificate)
    cy.get('#certificateForm_intermediates').type(data.intermediates)
    cy.get('#certificateForm_private_key').type(data.private_key)
    cy.get('#certificateForm_private_key_passphrase').type(data.passphrase)
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
      cy.get('#certificateForm_name').type(data.certificate_name)
    }
    if(data.region !== '' && data.region !== undefined){
      cy.get('#certificateForm_region').type(data.region)
    }
    if(data.certificate !== '' && data.certificate !== undefined){
      cy.get('#certificateForm_certificate').type(data.certificate)
    }
    if(data.intermediates !== '' && data.intermediates !== undefined){
      cy.get('#certificateForm_intermediates').type(data.intermediates)
    }
    if(data.private_key !== '' && data.private_key !== undefined){
      cy.get('#certificateForm_private_key').type(data.private_key)
    }
    if(data.passphrase !== '' && data.passphrase !== undefined){
      cy.get('#certificateForm_private_key_passphrase').type(data.passphrase)
    }
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
});

Cypress.Commands.add("addCheckPriKeyNoPass", (fileData) => {
  Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();

  cy.visit("/key-manager/ssl-certificate/AddSSLCertificate");
  cy.fixture(fileData).then((data) => {
    cy.get('#certificateForm_name').type(data.certificate_name)
    cy.get('#certificateForm_region').type(data.region)
    if(data.intermediates !== ''){
      cy.get('#certificateForm_intermediates').type(data.intermediates)
    }
    cy.get('#certificateForm_certificate').type(data.certificate)
    cy.get('#certificateForm_private_key').type(data.private_key)
    cy.get('#certificateForm_private_key_passphrase').type(data.passphrase)
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
    cy.get('#certificateForm_name').type(data.certificate_name)
    cy.get('#certificateForm_region').type(data.region)
    cy.get('#certificateForm_intermediates').type(data.intermediates)
    cy.get('#certificateForm_certificate').type(data.certificate)
    cy.get('#certificateForm_private_key').type(data.private_key)
    cy.get('#certificateForm_private_key_passphrase').type(data.passphrase)
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