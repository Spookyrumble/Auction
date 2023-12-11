/* eslint-disable no-undef */
import path from "path";

export default {
  build: {
    outDir: path.resolve(__dirname, "./dist"),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        auction: path.resolve(__dirname, "src/HTML/auction/index.html"),
        profile: path.resolve(__dirname, "src/HTML/profile/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
};
