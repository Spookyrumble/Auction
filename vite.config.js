/* eslint-disable no-undef */
import path from "path";

export default {
  build: {
    outDir: path.resolve(__dirname, "./dist"), // Specify the output directory here
    rollupOptions: {
      input: {
        main: "src/main.js",
        // Add paths to your HTML files here
        auction: "src/HTML/auction/index.html",
        profile: "src/HTML/profile/index.html",
        // Add more paths if needed for other HTML files
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
  },
};
