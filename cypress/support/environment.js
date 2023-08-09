export const environment = {
    development: {
      baseUrl: 'https://10.240.234.71', // Điều chỉnh URL phù hợp với môi trường phát triển
    },
    production: {
      baseUrl: 'https://console.viettelcloud.vn', // Điều chỉnh URL phù hợp với môi trường sản phẩm
    },
  };
  
  // Xác định môi trường hiện tại
  const currentEnvironment = Cypress.env('environment') || 'development';
  const config = environment[currentEnvironment];
  
  // Gán baseUrl vào biến toàn cục cho Cypress
  Cypress.config('baseUrl', config.baseUrl);