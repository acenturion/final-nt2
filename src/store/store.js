import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URL = "https://5eaca2f64bf71e00166a0a11.mockapi.io/tareas"

const store = new Vuex.Store({
    state: {
        tareas: [],
        isLogin: false
    },
    actions: {
        loadTareas({commit}) {
            console.log("Cargando tareas...")
            axios.get(URL).then(
                res =>{
                    commit('updateTareas', res.data)
                }
            )
        },
        addTarea({commit}, tarea){
            console.log("Agregando tarea...")
            axios.post(URL, tarea).then(
                res =>{
                    console.log(tarea)
                    commit('setTarea', res.data)
                }
            )

        }
    },
    mutations: {
        updateTareas(state, tareas){
            state.tareas = tareas;
        },
        setTarea(state, tarea){
            state.tareas.push(tarea);
        },
        setLogin(state, value){
            state.isLogin = value;
        }
    }
})

export default store
