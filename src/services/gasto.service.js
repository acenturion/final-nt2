import Axios from 'axios'

function getGastos() {
    return Axios.get('http://localhost:8080/api/detallegasto')
}

function delGasto(id) {
    return Axios.delete('http://localhost:8080/api/detallegasto', {
        data: {
            idDetalle: id
        }
    })
}

function addGasto(gasto) {
    return Axios.post('http://localhost:8080/api/detallegasto', gasto)
}

function editGasto(gasto) {
    return Axios.put('http://localhost:8080/api/detallegasto', gasto);
}

export default {
    getGastos,
    delGasto,
    addGasto,
    editGasto
}
