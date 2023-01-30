import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from './router/index'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)
// 定义全局变量
app.config.globalProperties.websiteTitle = "***管理系统";
app.config.globalProperties.$router = router;
app.use(router).use(ElementPlus)
app.mount('#app')
