import mdx from "@mdx-js/rollup";
import preact from "@preact/preset-vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "rolldown-vite";
import { visualizer } from "rollup-plugin-visualizer";
import { watchContent } from "./plugins/watch-content";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        jsxImportSource: "preact",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    watchContent(),
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
        additionalPrerenderRoutes: ["/404"],
        previewMiddlewareEnabled: true,
        previewMiddlewareFallback: "/404",
      },
    }),
    visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    rollupOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: "preact", test: /\/preact$|\/preact\// },
            { name: "preact-iso", test: /\/preact-iso$|\/preact-iso\// },
          ],
        },
      },
    },
  },
});
