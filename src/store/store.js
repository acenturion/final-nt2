import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogin: false,
        mostrar: true,
        mostrarGastos: false,
        mostrarDetalle: true,
        tope:{
            mostrarLista: true
        }
    },
    actions: {
       
        mostrarTopeForm({commit}) {
            commit('setMostrarTopeList', false)
        },
        mostrarTopeList({commit}) {
            commit('setMostrarTopeList', true)
        },
        cambiarMostrar({commit},value) {
            commit('setMostrar',value)
        },
        guardaViaje({commit},data) {
            commit('setViaje',data)
        },
        cambiarMostrarGastos({commit},value) {
            commit('setMostrarGastos',value)
        },
        cambiarMostrarDetalle({commit},value) {
            commit('setMostrarDetalle',value)
        }

    },
    mutations: {
        
        setLogin(state, value){
            state.isLogin = value;
        },
        setMostrar(state,value){
            state.mostrar = value;
        },
        setMostrarGastos(state,value){
            state.mostrarGastos = value;
        },
        setMostrarDetalle(state,value){
            state.mostrarDetalle = value;
        },
        setMostrarTopeList(state,value){
            state.tope.mostrarLista = value
        },
        setViaje(state,data){
            state.viaje = data
        }

    }
})

export default store
