import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path:"/",
        redirect:"/home"
    },
    {
        path:"/home",
        component: () => import("../views/home.vue")
    }
]

const router = createRouter({
    history: createWebHistory('dist'),
    routes
})

router.beforeEach((to, from) => {
    console.log("=============")
})

export default router