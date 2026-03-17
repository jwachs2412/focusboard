import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"], // only your project tests
    exclude: ["node_modules"] // explicitly exclude node_modules
  }
})
