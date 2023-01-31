import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { fileURLToPath, URL } from "node:url"

// https://vitejs.dev/config/  官方配置文档
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/dist/' : '/',  //开发或生产环境服务的公共基础路径
  build:{
    chunkSizeWarningLimit: 1500, //加大打包文件大小限制
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      //define global scss variable
      scss: {
        additionalData: `@import "@/assets/mixin.scss";`
      }
    }
  }
})
