import Vue from 'vue'
import VueRouter from 'vue-router'

import tareas from "../components/gasto/gastos";
import login from "../components/login";
import viajes from "../components/viaje/viajes";
import empleados from "../components/empleado/empleados";
import gastos from "../components/gasto/gastos";
import topes from "../components/tope/topes";
import categorias from "../components/categoria/categorias";
import formaPago from "../components/formaPago/formasPago";
import pais from "../components/pais/pais";

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
    },
    {
        path: '/gastos',
        component: gastos
    },
    {
        path: '/topes',
        component: topes
    },
    {
        path: '/categorias',
        component: categorias
    },
    {
        path: '/formaspago',
        component: formaPago
    },
    {
        path: '/pais',
        component: pais
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
