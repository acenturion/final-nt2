import Axios from 'axios'

function getPaises() {
    return Axios.get('http://localhost:8080/api/pais')
}

function delPais(id) {
    return Axios.delete('http://localhost:8080/api/pais', {
        data: {
            idPais: id
        }
    })
}

function addPais(nuevo) {
    return Axios.post('http://localhost:8080/api/pais', nuevo)
}

function editPais(modificado) {
    return Axios.put('http://localhost:8080/api/pais', modificado);
}

export default {
    getPaises,
    delPais,
    addPais,
    editPais
}
