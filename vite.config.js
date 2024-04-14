import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import compressPlugin from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
// 按需自动引入导入element plus。
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import process from "node:process";

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  return {
    plugins: [
      vue(),
      vueJsx(),
      visualizer({
        open: true, //在默认用户代理中打开生成的文件
        gzipSize: true, // 收集 gzip 大小并将其显示
        brotliSize: true, // 收集 brotli 大小并将其显示
        filename: "stats.html", // 分析图生成的文件名
      }),
      compressPlugin({
        //gzip压缩
        threshold: 10240, //启用压缩的文件大小限制，单位是字节，默认为0
        deleteOriginFile: false, //压缩后是否删除原文件
        ext: ".gz",
      }),
      // 按需导入element plus组件 组件的有效文件扩展名。
      Components({
        dirs: [], //  避免解析到src/components 要搜索组件的目录的相对路径。
        deep: false, //不搜索子目录
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.jsx$/],
        resolvers: [
          //自定义组件的解析器
          ElementPlusResolver({
            importStyle: "sass", //导入带有组件的样式css或sass
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/element/index.scss" as *;',
        },
      },
    },
    build: {
      // 设置为false，便不会出现源码，
      sourcemap: false,
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
          entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
          assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
          // 最小化拆分包
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
    base: viteEnv.VITE_BASE_PATH,
    server: {
      open: true,
    },
  };
});
