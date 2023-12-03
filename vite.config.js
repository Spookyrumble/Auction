/* eslint-disable no-undef */
import path from "path";

export default {
  build: {
    outDir: path.resolve(__dirname, "./dist"), // Specify the output directory here
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
