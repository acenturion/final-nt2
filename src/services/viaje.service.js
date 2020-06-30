import Axios from 'axios'

function getViajes() {
    return Axios.get('http://localhost:8080/api/viaje')
}

function delViaje(id) {
    return Axios.delete('http://localhost:8080/api/viaje', {
        data: {
            idViaje: id
        }
    })
}

function addViaje(nuevo) {
    return Axios.post('http://localhost:8080/api/viaje', nuevo)
}

function editViaje(modificado) {
    return Axios.put('http://localhost:8080/api/viaje', modificado);
}

export default {
    getViajes,
    delViaje,
    addViaje,
    editViaje
}
