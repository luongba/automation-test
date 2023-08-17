describe("Chức năng 2: Chi tiết Certificate:", () => {
    it("Test xem chi tiết certicate", () => {
      cy.detailCertificate("certificate/TL_32_data_test_2.json").then((success) => {
        if (success) {
          cy.log("success");
        } else {
          cy.log("Thất bại");
        }
      });
    });
});