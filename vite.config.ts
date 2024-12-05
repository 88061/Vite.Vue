import path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import { visualizer } from "rollup-plugin-visualizer"; /** @buildWatch */
import viteCompression from "vite-plugin-compression"; /** @Gzip */
import AutoImport from "unplugin-auto-import/vite";
import UnoCSS from "unocss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); /** Must start with "VITE_" */
  return {
    server: {
      proxy: {
        "^/api": {
          target: env.VITE_PROXY_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        include: [/\.[tj]s?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: ["vue", "vue-router"],
        dirs: [
          // "./src/hooks",
          // "./src/modules/**/store.ts",
        ],
        dts: "@types/auto-import.d.ts",
        eslintrc: {
          enabled: true,
          filepath: "@types/auto-import-eslint.js",
          globalsPropValue: true,
        },
      }),
      UnoCSS(),
      visualizer(),
      viteCompression(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/modules"),
        "#": path.resolve(__dirname, "./src/components"),
        "#business": path.resolve(__dirname, "./src/business"),
        "@hooks": path.resolve(__dirname, "./src/hooks/index.ts"),
        "@layout": path.resolve(__dirname, "./src/layout"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@style": path.resolve(__dirname, "./src/style"),
        "@i18n": path.resolve(__dirname, "./src/i18n.ts"),
        "@router": path.resolve(__dirname, "./src/router.ts"),
        "@request": path.resolve(__dirname, "./src/request.ts"),
      },
      extensions: [".ts", ".js", ".json"],
    },
    build: {
      outDir: env.VITE_OUT_DIR,
    },
  };
});
