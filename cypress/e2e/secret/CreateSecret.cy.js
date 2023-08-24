describe('Chức năng 1: Tạo Secret', () => {
  beforeEach(() => {
    Cypress.env("environment") === "production"
    ? cy.loginProduction()
    : cy.loginDevelopment();
    cy.visit("/key-manager/secrets");
    cy.get('.ant-card-head button').click(); 
  });
  it('Kiểm tra Tạo thành công', () => {
    cy.createSecretSuccess("secret/TL_33_data_test.json")
  })
  it('Kiểm tra Tạo không thành công (để trông thông tin)', () => {
    cy.createSecretFaild34("secret/TL_34_data_test.json")
  })
  it('Kiểm tra Tạo không thành công (trùng key)', () => {
    cy.createSecretFaild35("secret/TL_35_data_test.json")
  })
  it('Kiểm tra Tạo không thành công (Ấn hủy)', () => {
    cy.createSecretFaild36("secret/TL_36_data_test.json")
  })
})
