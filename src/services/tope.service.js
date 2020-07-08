import Axios from 'axios'
import URL from '../constants.js'

function getTopes() {
    return Axios.get(URL.urlTopeGasto)
}

function delTope(tope) {
    return Axios.delete(URL.urlTopeGasto, {
        data: {
            idViaje: tope.idViaje,
            idTipoGasto: tope.idTipoGasto
        }
    })
}

function addTope(nuevo) {
    return Axios.post(URL.urlTopeGasto, nuevo)
}

function editTope(modificado) {
    return Axios.put(URL.urlTopeGasto, modificado);
}

export default {
    getTopes,
    delTope,
    addTope,
    editTope
}
