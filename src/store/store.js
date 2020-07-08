import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import apis from 'constants'

Vue.use(Vuex)

//const URL = "http://localhost:8080"

const store = new Vuex.Store({
    state: {
        categorias: [],
        isLogin: false,
        mostrar: true,
        paises: [],
        pais:{},
        tope:{
            mostrarLista: true
        }
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
        },
        cagarPaises({commit}) {
            console.log("Cargando paises...")
            axios.get(apis.urlPais).then(
                res =>{
                    console.log('res', res.data);
                    commit('loadPaises', res.data)
                },
                (err) =>{
                    console.log("Ocurrio un error al cargar Los Paises");
                    console.log(err)
                }
            )
        },
        mostrarTopeForm({commit}) {
            commit('setMostrarTopeList', false)
        },
        mostrarTopeList({commit}) {
            commit('setMostrarTopeList', true)
        }

    },
    mutations: {
        loadCategorias(state, categoria){
            state.categorias = categoria;
        },
        loadPais(state, pais){
            state.paises = pais;
        },
        setLogin(state, value){
            state.isLogin = value;
        },
        setMostrar(state,value){
            state.mostrar = value;
        },
        buscarPais(state,value){
           state.pais = state.paises.find(data => data.idPais = value)
        },
        setMostrarTopeList(state,value){
            state.tope.mostrarLista = value
        }
    }
})

export default store
