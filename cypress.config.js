const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    env: {
      environment: "production", // Hoặc "production" tùy theo môi trường bạn muốn sử dụng
    },
    viewportWidth: 2560,
    viewportHeight: 1241,
    parseSpecialCharSequences: false,
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
