import Vue from 'vue'
import VueRouter from 'vue-router'
import tareas from "../components/tareas";
import respuestas from "../components/respuestas";
import login from "../components/login";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/login'
    },
    {
        path: '/tareas',
        name: 'Tareas',
        component: tareas
    },
    {
        path: '/respuestas',
        name: 'respuestas',
        component: respuestas
    },
    {
        path: '/login',
        name: 'login',
        component: login
    }
]

const router = new VueRouter({
    routes
})

export default router
