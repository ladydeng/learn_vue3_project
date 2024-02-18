// app-params.d.ts 
// 对main.js绑定的app.config.globalProperties全局参数进行声明
import { ComponentCustomProperties } from 'vue'
import { Route } from 'vue-router'

console.log(Store)

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    websiteTitle: String,
    $router: Route,
    $store: any
  }
}