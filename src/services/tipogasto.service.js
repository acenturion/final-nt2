import Axios from 'axios'

function getTipoGastos() {
    return Axios.get('http://localhost:8080/api/tipogasto')
}

function delTipoGasto(id) {
    return Axios.delete('http://localhost:8080/api/tipogasto', {
        data: {
            idTipoGasto: id
        }
    })
}

function addTipoGasto(nuevo) {
    return Axios.post('http://localhost:8080/api/tipogasto', nuevo)
}

function editTipoGasto(modificado) {
    return Axios.put('http://localhost:8080/api/tipogasto', modificado);
}

export default {
    getTipoGastos,
    delTipoGasto,
    addTipoGasto,
    editTipoGasto
}
