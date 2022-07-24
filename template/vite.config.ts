import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import prismjs from "vite-plugin-prismjs";

const htmlPlugin = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return html.replace(
        /<title>(.*?)<\/title>/,
        `<title>${"Diff-board"}</title>`
      );
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    htmlPlugin(),
    prismjs({
      languages: ["javascript", "gherkin"],
      plugins: [],
      css: false,
    }),
  ],
  server: {
    port: 5034,
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: "../build",
    emptyOutDir: true,
  },
  publicDir: "../../diff-reports",
});
