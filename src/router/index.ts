import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path:"/",
        redirect:"/threejs"
    },
    {
        path:"/threejs",
        component: () => import("../views/threejs.vue")
    }
]

const router = createRouter({
    // history: createWebHistory(process.env.NODE_ENV === 'production' ? 'dist' : ''),
    history: createWebHashHistory(process.env.NODE_ENV === '/'),
    routes
})

router.beforeEach((to, from) => {
    console.log("当前环境=============", process.env.NODE_ENV)
})

export default router