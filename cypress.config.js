const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
        env: {
            environment: "development", // Hoặc "production" tùy theo môi trường bạn muốn sử dụng
        },
        viewportWidth: 2560,
        viewportHeight: 1241,
    },
});
