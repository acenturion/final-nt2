import Axios from 'axios'

function getCategorias() {
    return Axios.get('http://localhost:8080/api/categoriaempleado')
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
