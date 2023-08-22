Cypress.Commands.add("certificateSearch", (fileData) => {
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
  cy.fixture(fileData).then((data) => {
    cy.wait(1000);
    cy.get(".btn-location").click();
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
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type(
      data.region_search
    );
    cy.get(".btn-location").click();
    cy.get("li").contains(data.region_search).should("be.visible").click();
    cy.get(".ant-table-placeholder")
      .contains("Không tìm thấy dữ liệu")
      .should("be.visible");
  });
});

// tạo
Cypress.Commands.add("AddCheckExist", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get("#certificateForm_name")
      .type(data.certificate_name)
      .should("be.visible");
    cy.get("#certificateForm_region").type(data.region).should("be.visible");
    cy.get("#certificateForm_certificate")
      .type(data.certificate, { delay: 0 })
      .should("be.visible");
    cy.get("#certificateForm_intermediates")
      .type(data.intermediates, { delay: 0 })
      .should("be.visible");
    cy.get("#certificateForm_private_key")
      .type(data.private_key, { delay: 0 })
      .should("be.visible");
    cy.get("#certificateForm_private_key_passphrase")
      .type(data.passphrase, { delay: 0 })
      .should("be.visible");
    cy.get("#buttonCreateCertificate").click();
    cy.wait(2000)
    return cy.url().then((currentURL) => {
      if (
        currentURL ==
        currentURL.split("key-manager")[0] + "key-manager/ssl-certificate"
      ) {
        cy.fail("Tên chứng chỉ chưa tồn tại");
      } else {
        const divSelector = ".ant-notification-notice-message";
        cy.get(divSelector, { timeout: 10000 })
          .contains("Tên chứng chỉ đã tồn tại trong propject này")
          .should("be.visible");
      }
    });
  });
});
Cypress.Commands.add("addSuccessingTL23", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.wait(1000);
    cy.get("#certificateForm_name")
      .type(data.certificate_name)
      .should("be.visible");
    cy.get("#certificateForm_region").type(data.region).should("be.visible");
    if (data.intermediates !== "" && data.intermediates !== undefined) {
      cy.get("#certificateForm_intermediates")
        .should("be.visible", { delay: 0 })
        .type(data.intermediates);
    }
    if (data.certificate !== "" && data.certificate !== undefined) {
      cy.get("#certificateForm_certificate")
        .should("be.visible")
        .type(data.certificate, { delay: 0 });
    }
    cy.get("#certificateForm_private_key")
      .should("be.visible")
      .type(data.private_key, { delay: 0 });
    if (data.passphrase !== "" && data.passphrase !== undefined) {
      cy.get("#certificateForm_private_key_passphrase")
        .should("be.visible")
        .type(data.passphrase, { delay: 0 });
    }
    cy.get("#buttonCreateCertificate").click();
    cy.wait(2000)
    return cy.url().then((currentURL) => {
      try {
        if (
          currentURL ===
          currentURL.split("key-manager")[0] + "key-manager/ssl-certificate"
        ) {
          cy.detailCertificateCheckName(fileData)
        } else {
          cy.fail("Tạo không thành công");
        }
      } catch (error) {
        cy.fail("Tạo không thành công");
      }
    });
  });
});
Cypress.Commands.add("addSuccessingTL24", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get("#certificateForm_name")
      .type(data.certificate_name)
      .should("be.visible");
    cy.get("#certificateForm_region").type(data.region).should("be.visible");
    if (data.intermediates !== "" && data.intermediates !== undefined) {
      cy.get("#certificateForm_intermediates")
        .should("be.visible", { delay: 0 })
        .type(data.intermediates);
    }
    if (data.certificate !== "" && data.certificate !== undefined) {
      cy.get("#certificateForm_certificate")
        .should("be.visible")
        .type(data.certificate, { delay: 0 });
    }
    cy.get("#certificateForm_private_key")
      .should("be.visible")
      .type(data.private_key, { delay: 0 });
    if (data.passphrase !== "" && data.passphrase !== undefined) {
      cy.get("#certificateForm_private_key_passphrase")
        .should("be.visible")
        .type(data.passphrase, { delay: 0 });
    }
    cy.get("#buttonCreateCertificate").click();
    return cy.url().then((currentURL) => {
      if (
        currentURL ==
        currentURL.split("key-manager")[0] + "key-manager/ssl-certificate"
      ) {
        cy.fail("Tạo không thành công");
      } else {
        const divSelector = ".ant-notification-notice-message";
        cy.get(divSelector, { timeout: 10000 })
          .contains("Tạo SSL Certificate thành công")
          .should("be.visible");
      }
    });
  });
});
Cypress.Commands.add("addSuccessingTL25", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get("#certificateForm_name")
      .type(data.certificate_name)
      .should("be.visible");
    cy.get("#certificateForm_region").type(data.region).should("be.visible");
    if (data.intermediates !== "" && data.intermediates !== undefined) {
      cy.get("#certificateForm_intermediates")
        .should("be.visible", { delay: 0 })
        .type(data.intermediates);
    }
    if (data.certificate !== "" && data.certificate !== undefined) {
      cy.get("#certificateForm_certificate")
        .should("be.visible")
        .type(data.certificate, { delay: 0 });
    }
    cy.get("#certificateForm_private_key")
      .should("be.visible")
      .type(data.private_key, { delay: 0 });
    if (data.passphrase !== "" && data.passphrase !== undefined) {
      cy.get("#certificateForm_private_key_passphrase")
        .should("be.visible")
        .type(data.passphrase, { delay: 0 });
    }
    cy.get("#buttonCreateCertificate").click();
    cy.wait(2000)
    return cy.url().then((currentURL) => {
      try {
        if (
          currentURL ===
          currentURL.split("key-manager")[0] + "key-manager/ssl-certificate"
        ) {
          cy.detailCertificateCheckName(fileData)
        } else {
          cy.fail("Tạo không thành công");
        }
      } catch (error) {
        cy.fail("Tạo không thành công");
      }
    });
  });
});

Cypress.Commands.add("addCertificateprivateKey", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get("#certificateForm_name")
      .type(data.certificate_name)
      .should("be.visible");
    cy.get("#certificateForm_region").type(data.region).should("be.visible");
    if (data.intermediates !== "" && data.intermediates !== undefined) {
      cy.get("#certificateForm_intermediates")
        .should("be.visible", { delay: 0 })
        .type(data.intermediates);
    }
    if (data.certificate !== "" && data.certificate !== undefined) {
      cy.get("#certificateForm_certificate")
        .should("be.visible")
        .type(data.certificate, { delay: 0 });
    }
    cy.get("#certificateForm_private_key")
      .should("be.visible")
      .type(data.private_key, { delay: 0 });
    if (data.passphrase !== "" && data.passphrase !== undefined) {
      cy.get("#certificateForm_private_key_passphrase")
        .should("be.visible")
        .type(data.passphrase, { delay: 0 });
    }
    cy.get("#buttonCreateCertificate").click();
    return cy.url().then((currentURL) => {
      if (
        currentURL ==
        currentURL.split("key-manager")[0] + "key-manager/ssl-certificate"
      ) {
        cy.fail("Lỗi trường Certificate/private những vẫn thêm thành công");
      } else {
        const divSelector = ".ant-form-explain";

        cy.get(divSelector).contains("Sai định dạng PEM").should("be.visible");
      }
    });
  });
});

Cypress.Commands.add("addNull", (fileData) => {
  cy.get("#buttonCreateCertificate").click();
  return cy.url().then((currentURL) => {
    if (
      currentURL ==
      currentURL.split("key-manager")[0] + "key-manager/ssl-certificate"
    ) {
      cy.fail("Lỗi các trường không bỏ trống");
    } else {
      const divSelector = ".ant-form-explain";
      cy.get(divSelector)
        .contains("Vui lòng nhập thông tin")
        .should("be.visible");
    }
  });
});

Cypress.Commands.add("addClickCencel", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get("#certificateForm_name")
      .type(data.certificate_name)
      .should("be.visible");
    cy.get("#certificateForm_region").type(data.region).should("be.visible");
    if (data.intermediates !== "" && data.intermediates !== undefined) {
      cy.get("#certificateForm_intermediates")
        .should("be.visible", { delay: 0 })
        .type(data.intermediates);
    }
    if (data.certificate !== "" && data.certificate !== undefined) {
      cy.get("#certificateForm_certificate")
        .should("be.visible")
        .type(data.certificate, { delay: 0 });
    }
    cy.get("#certificateForm_private_key")
      .should("be.visible")
      .type(data.private_key, { delay: 0 });
    if (data.passphrase !== "" && data.passphrase !== undefined) {
      cy.get("#certificateForm_private_key_passphrase")
        .should("be.visible")
        .type(data.passphrase, { delay: 0 });
    }
    cy.get("#buttonCreateCertificate").click();
    return cy.url().then((currentURL) => {
      if (
        currentURL ==
        currentURL.split("key-manager")[0] + "key-manager/ssl-certificate"
      ) {
        cy.fail("Sảy ra lỗi");
      }
    });
  });
});
Cypress.Commands.add("addCheck", (fileData) => {
  cy.fixture(fileData).then((data) => {
    if (data.certificate_name !== "" && data.certificate_name !== undefined) {
      cy.get("#certificateForm_name")
        .type(data.certificate_name)
        .should("be.visible");
    }
    if (data.region !== "" && data.region !== undefined) {
      cy.get("#certificateForm_region").type(data.region).should("be.visible");
    }
    if (data.intermediates !== "" && data.intermediates !== undefined) {
      cy.get("#certificateForm_intermediates")
        .should("be.visible", { delay: 0 })
        .type(data.intermediates);
    }
    if (data.certificate !== "" && data.certificate !== undefined) {
      cy.get("#certificateForm_certificate")
        .should("be.visible")
        .type(data.certificate, { delay: 0 });
    }
    cy.get("#certificateForm_private_key")
      .should("be.visible")
      .type(data.private_key, { delay: 0 });
    if (data.passphrase !== "" && data.passphrase !== undefined) {
      cy.get("#certificateForm_private_key_passphrase")
        .should("be.visible")
        .type(data.passphrase, { delay: 0 });
    }
    cy.get("#buttonCreateCertificate").click();
    return cy.url().then((currentURL) => {
      if (
        currentURL ==
        currentURL.split("key-manager")[0] + "key-manager/ssl-certificate"
      ) {
        cy.fail("Lỗi các trường sai dinh dang");
      } else {
        const divSelector = ".ant-form-explain";

        cy.get(divSelector)
          .contains(
            "Tên chứng chỉ chỉ có thể chứa các chữ cái (a-z, A-Z), số (0-9), dấu gạch ngang (-) và dấu gạch dưới (_)" ||
              "Sai định dạng PEM"
          )
          .should("be.visible");
      }
    });
  });
});

Cypress.Commands.add("addCheckPriKeyNoPass", (fileData) => {
  cy.fixture(fileData).then((data) => {
    if (data.certificate_name !== "" && data.certificate_name !== undefined) {
      cy.get("#certificateForm_name")
        .type(data.certificate_name)
        .should("be.visible");
    }
    if (data.region !== "" && data.region !== undefined) {
      cy.get("#certificateForm_region").type(data.region).should("be.visible");
    }
    if (data.intermediates !== "" && data.intermediates !== undefined) {
      cy.get("#certificateForm_intermediates")
        .should("be.visible", { delay: 0 })
        .type(data.intermediates);
    }
    if (data.certificate !== "" && data.certificate !== undefined) {
      cy.get("#certificateForm_certificate")
        .should("be.visible")
        .type(data.certificate, { delay: 0 });
    }
    cy.get("#certificateForm_private_key")
      .should("be.visible")
      .type(data.private_key, { delay: 0 });
    if (data.passphrase !== "" && data.passphrase !== undefined) {
      cy.get("#certificateForm_private_key_passphrase")
        .should("be.visible")
        .type(data.passphrase, { delay: 0 });
    }
    cy.get("#buttonCreateCertificate").click();
    return cy.url().then((currentURL) => {
      if (
        currentURL ==
        currentURL.split("key-manager")[0] + "key-manager/ssl-certificate"
      ) {
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
  cy.fixture(fileData).then((data) => {
    if (data.certificate_name !== "" && data.certificate_name !== undefined) {
      cy.get("#certificateForm_name")
        .type(data.certificate_name)
        .should("be.visible");
    }
    if (data.region !== "" && data.region !== undefined) {
      cy.get("#certificateForm_region").type(data.region).should("be.visible");
    }
    if (data.intermediates !== "" && data.intermediates !== undefined) {
      cy.get("#certificateForm_intermediates")
        .should("be.visible", { delay: 0 })
        .type(data.intermediates);
    }
    if (data.certificate !== "" && data.certificate !== undefined) {
      cy.get("#certificateForm_certificate")
        .should("be.visible")
        .type(data.certificate, { delay: 0 });
    }
    cy.get("#certificateForm_private_key")
      .should("be.visible")
      .type(data.private_key, { delay: 0 });
    if (data.passphrase !== "" && data.passphrase !== undefined) {
      cy.get("#certificateForm_private_key_passphrase")
        .should("be.visible")
        .type(data.passphrase, { delay: 0 });
    }
    cy.get("#buttonCreateCertificate").click();
    return cy.url().then((currentURL) => {
      if (
        currentURL ==
        currentURL.split("key-manager")[0] + "key-manager/ssl-certificate"
      ) {
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
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type(
      data.certificate_name
    );
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type("{enter}");
    cy.get("td > a > span")
      .filter(
        (index, element) => element.innerText.trim() === data.certificate_name
      )
      .click();
    cy.get(
      ":nth-child(2) > :nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-input"
    )
      .eq(0)
      .invoke("val")
      .should("eq", data.common_name);
    cy.get(
      ":nth-child(1) > :nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-input"
    )
      .eq(0)
      .invoke("val")
      .should("eq", data.certificate_name);
    cy.get(
      ":nth-child(3) > :nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-input"
    )
      .eq(0)
      .invoke("val")
      .should("eq", data.series_numer);
    cy.get(
      ":nth-child(4) > :nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-input"
    )
      .eq(0)
      .invoke("val")
      .should("eq", data.public_key);
    cy.get(
      ":nth-child(5) > :nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-input"
    )
      .eq(0)
      .invoke("val")
      .should("eq", data.signature_algorithm);
  });
});
Cypress.Commands.add("detailCertificateCheckName", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type(
      data.certificate_name
    );
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type("{enter}");
    cy.get("td > a > span")
      .filter(
        (index, element) => element.innerText.trim() === data.certificate_name
      )
      .click();
    cy.get(
      ":nth-child(1) > :nth-child(1) > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-input"
    )
      .eq(0)
      .invoke("val")
      .should("eq", data.certificate_name);
  });
});
//TL 17
Cypress.Commands.add("deleteSslSuccess", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type(
      data.itemDelete
    );
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type("{enter}");
    let itemSelected = "";
    cy.get("tbody")
      .find("tr")
      .eq(0)
      .find("td > a")
      .invoke("attr", "href")
      .then((href) => {
        itemSelected = href;
        cy.get("tbody").find("tr").eq(0).find("td > div > span").last().click();
        cy.get("#okButton").click();
        cy.get(".ant-notification-notice-message")
          .contains("Xóa SSL Certificate thành công")
          .should("be.visible");
        cy.visit(itemSelected);
        cy.get(".ant-notification-notice-message")
          .contains("Không tìm thấy")
          .should("be.visible");
      });
  });
});

//TL 17-1
Cypress.Commands.add("deleteMultiSslSuccess", (fileData) => {
  cy.fixture(fileData).then((data) => {
    let listHref = [];
    cy.wrap(data.itemsDelete)
      .each((item) => {
        findAndClickItem(item, true, listHref);
      })
      .then(() => {
        cy.get(".btn-button-delete").click();
        cy.get("#okButton").click();
        cy.get(".ant-notification-notice-message")
          .contains("Xóa SSL Certificate thành công")
          .should("be.visible");
        cy.wrap(listHref).each((href) => {
          cy.visit(href);
          cy.get(".ant-notification-notice-message")
            .contains("Không tìm thấy")
            .should("be.visible");
        });
      });
  });
});

// TL_18
Cypress.Commands.add("deleteSslFaild", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type(
      data.itemDelete
    );
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type("{enter}");
    cy.get("tbody").find("tr").eq(0).find("td > div > span").last().click();
    cy.get("#okButton").click();
    cy.get(".ant-notification-notice-message")
      .contains("Cần xóa Load Balancer đang sử dụng chứng chỉ số này trước.")
      .should("be.visible");
  });
});

// TL_19
Cypress.Commands.add("deleteMultiSslFaild", (fileData) => {
  cy.fixture(fileData).then((data) => {
    let listHref = [];
    cy.wrap(data.itemsDelete)
      .each((item, index) => {
        findAndClickItem(item, index == 0 ? true : false, listHref);
      })
      .then(() => {
        cy.get(".btn-button-delete").click();
        cy.get("#okButton").click();
        cy.get(".ant-notification-notice-message")
          .contains(
            "Cần xóa Load Balancer đang sử dụng chứng chỉ số này trước."
          )
          .should("be.visible");
        for (const href of listHref) {
          cy.visit(href);
          cy.contains("Load Balancer đang sử dụng")
            .should("be.visible")
            .get(".layer-content")
            .find(".ant-input")
            .eq(0)
            .invoke("val")
            .then((value) => {
              if (value !== "") {
                cy.get(".ant-tag").should("exist");
              } else {
                cy.get(".ant-notification-notice-message")
                  .contains("Không tìm thấy")
                  .should("be.visible");
              }
            });
        }
      });
  });
});

// TL_20

Cypress.Commands.add("deleteSslFaildByCancel", (fileData) => {
  cy.fixture(fileData).then((data) => {
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type(
      data.itemDelete
    );
    cy.get('input[placeholder="Tìm kiếm theo tên chứng chỉ"]').type("{enter}");
    let itemSelected = "";
    cy.get("tbody")
      .find("tr")
      .eq(0)
      .find("td > a")
      .invoke("attr", "href")
      .then((href) => {
        itemSelected = href;
        cy.get("tbody").find("tr").eq(0).find("td > div > span").last().click();
        cy.get("#cancelButtonDetailBackup").click();
        cy.visit(itemSelected);
        cy.contains("Load Balancer đang sử dụng")
          .should("be.visible")
          .get(".layer-content")
          .find(".ant-input")
          .eq(0)
          .invoke("val")
          .then((value) => {
            expect(value).not.to.equal("");
          });
      });
  });
});

function getRowValid(item) {
  return new Promise((resolve, reject) => {
    let status = "continue";
    let rowValid = null;
    cy.get("tbody")
      .find("tr")
      .then((rows) => {
        cy.wrap(rows)
          .each((row) => {
            cy.wrap(row)
              .find("td")
              .eq(1)
              .find("a > span")
              .should((ele) => {
                if (ele.text().toString().trim() === item) {
                  // Click to delete
                  rowValid = row;
                  status = "stop";
                }
              });
          })
          .then(() => {
            resolve([status, rowValid]);
          });
      });
  });
}

async function findAndClickItem(item, isFirstTime, listHref, index = 0) {
  // Require all item test in one page
  if (index >= 10) return;
  // Click to first page
  // if (isFirstTime) cy.get(".ant-pagination-item").eq(0).click();
  // get row valid
  const [result, rowValid] = await getRowValid(item);
  if (result === "continue") {
    // CLick next page
    cy.get(".ant-pagination-next").eq(0).click();
    // call findAndClickItem again
    findAndClickItem(item, isFirstTime, listHref, index + 1);
    return;
  } else {
    if (isFirstTime) cy.get(".ant-pagination-prev").eq(0).click();
    cy.wrap(rowValid)
      .invoke("attr", "data-row-key")
      .then((attributeValue) => {
        cy.get(`tr[data-row-key=${attributeValue}]`).find("td").eq(0).click();
        cy.get(`tr[data-row-key=${attributeValue}]`)
          .find("td > a")
          .invoke("attr", "href")
          .then((href) => {
            listHref.push(href);
            return true;
          });
      });
  }
}
