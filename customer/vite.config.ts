import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import federation from "@originjs/vite-plugin-federation"

const APPLICATION_PORT = 3001
const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    cssCodeSplit: false,
    target: "esnext",
  },
  server: {
    port: APPLICATION_PORT,
  },
  preview: {
    port: APPLICATION_PORT,
  },
  plugins: [
    vue(),
    federation({
      name: "customer",
      filename: "customer.js",
      exposes: {
        "./App": "./src/App.vue",
      },
      shared: ["vue", 'pinia'],
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "assets": path.resolve(__dirname, "./src/presentation/assets"),
      "components": path.resolve(__dirname, "./src/infrastructure/components"),
    },
  },
})
