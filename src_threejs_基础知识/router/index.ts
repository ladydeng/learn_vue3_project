import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

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
    history: createWebHistory(process.env.NODE_ENV === 'production' ? 'dist' : ''),
    routes
})

router.beforeEach((to, from) => {
    console.log("当前环境=============", process.env.NODE_ENV)
})

export default router