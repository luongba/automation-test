describe("Chức năng 4: Tạo Key", () => {
  it("Test thêm mới key", () => {
    cy.createKey("key/TL_7_data_test_1.json").then((success) => {
      if (success) {
        cy.log("success");
      } else {
        cy.log("Thất bại");
      }
    });
  });

  it("Test thêm mới key", () => {
    cy.createKey("key/TL_7_data_test_2.json").then((success) => {
      if (success) {
        cy.log("success");
      } else {
        cy.log("Thất bại");
      }
    });
  });
  it("Test thêm mới key đã tồn tại", () => {
    cy.createKeyExist("key/TL_8_data_test_1.json").then((success) => {
      if (success) {
        cy.log("success");
      } else {
        cy.log("Thất bại");
      }
    });
  });
  it("Test thêm mới key không nhập dữ liệu require", () => {
    cy.createKeyEmpty("key/TL_9_data_test_1.json").then((success) => {
      if (success) {
        cy.log("success");
      } else {
        cy.log("Thất bại");
      }
    });
  });
  it("Test thêm mới key nhấn button hủy", () => {
    cy.createKeyCancel("key/TL_7_data_test_1.json").then((success) => {
      if (success) {
        cy.log("success");
      } else {
        cy.log("Thất bại");
      }
    });
  });
  it("Test thêm mới key nhấn button hủy", () => {
    cy.createKeySpecialCharacters("key/TL_11_data_test_1.json").then((success) => {
      if (success) {
        cy.log("success");
      } else {
        cy.log("Thất bại");
      }
    });
  });
});
