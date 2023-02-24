import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

import { fileURLToPath, URL } from "node:url"

// https://vitejs.dev/config/  官方配置文档
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/dist/' : '/',  //开发或生产环境服务的公共基础路径
  server: {
    // port: 4000, // 设置服务启动端口号
    // open: true, // 设置服务启动时是否自动打开浏览器
    // cors: true, // 允许跨域
    // host: '0.0.0.0' // 开始ip
 
    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/')
    //   }
    // }
  },
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
      '@': resolve(__dirname,'./src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', 'tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      //define global scss variable
      scss: {
        additionalData: `@import "@/assets/styles/mixin.scss";`
      }
    }
  }
})
