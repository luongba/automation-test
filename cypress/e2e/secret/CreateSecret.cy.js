describe('Chức năng 1: Tạo Secret', () => {
    it('Kiểm tra Tạo thành công', () => {
      cy.createSecretSuccess("secret/TL_33_data_test.json")
    })
})