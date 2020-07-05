import Axios from 'axios'
import GenericServices from './generic.service.js'
import URL from '../constants.js'

function getCategorias() {
    return GenericServices.getData(URL.urlCategoria);
}

function delCategoria(categoria) {
    return Axios.delete('http://localhost:8080/api/categoriaempleado', {
        data: {
            idCategoria: categoria.idCategoria
        }
    })
}

function addCategoria(nuevo) {
    return Axios.post('http://localhost:8080/api/categoriaempleado', nuevo)
}

function editCategoria(modificado) {
    return Axios.put('http://localhost:8080/api/categoriaempleado', modificado);
}

export default {
    getCategorias,
    delCategoria,
    addCategoria,
    editCategoria
}
