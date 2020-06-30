import Vue from  'vue'
import VueRouter from 'vue-router'

import Empleados from "./components/empleados.vue";
import Gastos from "./components/gastos.vue";
import Login from "./components/login.vue";
import Topes from "./components/topes.vue";
import Viajes from "./components/viajes.vue";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
      {path: '/', redirect: '/login'},
      {path: '/empleados', component: Empleados},
      {path: '/gastos', component: Gastos},
      {path: '/login', component: Login},
      {path: '/topes', component: Topes},
      {path: '/viajes', component: Viajes}
    ]
})