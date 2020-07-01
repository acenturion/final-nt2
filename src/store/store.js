import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URL = "http://localhost:8080"

const store = new Vuex.Store({
    state: {
        categorias: [],
        isLogin: false
    },
    actions: {
        cagarCategorias({commit}) {
            console.log("Cargando categorias...")
            axios.get(URL + '/api/categoriaempleado').then(
                res =>{
                    console.log('res', res.data);
                    commit('loadCategorias', res.data)
                },
                (err) =>{
                    console.log("Ocurrio un error al cargar las categorias");
                    console.log(err)
                }
            )
        }
    },
    mutations: {
        loadCategorias(state, categoria){
            state.categorias = categoria;
        },
        setLogin(state, value){
            state.isLogin = value;
        }
    }
})

export default store
