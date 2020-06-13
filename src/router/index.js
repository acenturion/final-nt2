import Vue from 'vue'
import VueRouter from 'vue-router'
import tareas from "../components/gastos";
import login from "../components/login";
import viajes from "../components/viajes";
import empleados from "../components/empleados";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/login'
    },
    {
        path: '/gastos',
        name: 'Gastos',
        component: tareas
    },
    {
        path: '/empleados',
        name: 'Empleados',
        component: empleados
    },
    {
        path: '/viajes',
        name: 'Viajes',
        component: viajes
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
