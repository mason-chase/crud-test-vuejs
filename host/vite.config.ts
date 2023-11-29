import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";

const path = require("path")
// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 3000
  },
  plugins: [
    vue(),
    federation({
      name: "host",  //app name
      remotes: {
        customer: "http://localhost:3001/assets/customer.js",  //remote path containing the port configured on remote side, the build path, and the filename also configured on the remote side
      },
      shared: ["vue"],
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