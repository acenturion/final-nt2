import Axios from 'axios'

function getTopes() {
    return Axios.get('http://localhost:8080/api/topeportipogastoviaje')
}

function delTope(tope) {
    return Axios.delete('http://localhost:8080/api/topeportipogastoviaje', {
        data: {
            idViaje: tope.idViaje,
            idTipoGasto: tope.idTipoGasto
        }
    })
}

function addTope(nuevo) {
    return Axios.post('http://localhost:8080/api/topeportipogastoviaje', nuevo)
}

function editTope(modificado) {
    return Axios.put('http://localhost:8080/api/topeportipogastoviaje', modificado);
}

export default {
    getTopes,
    delTope,
    addTope,
    editTope
}
