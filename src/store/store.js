import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URL = "http://localhost:8080"

const store = new Vuex.Store({
    state: {
        empleados: [],
        isLogin: false
    },
    actions: {
        loadEmpleados({commit}) {
            console.log("Cargando empleados...")
            axios.get(URL + '/api/empleado').then(
                res =>{
                    console.log('res', res.data);
                    commit('updateEmpleados', res.data)
                },
                err =>{
                    console.log(err);   
                }
            )
        },
        // addTarea({commit}, tarea){
        //     console.log("Agregando tarea...")
        //     axios.post(URL, tarea).then(
        //         res =>{
        //             console.log(tarea)
        //             commit('setTarea', res.data)
        //         }
        //     )

        // }
    },
    mutations: {
        updateEmpleados(state, empleados){
            state.empleados = empleados;
        },
        // setTarea(state, tarea){
        //     state.tareas.push(tarea);
        // },
        setLogin(state, value){
            state.isLogin = value;
        }
    }
})

export default store
