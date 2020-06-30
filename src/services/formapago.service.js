import Axios from 'axios'

function getFormaPagos() {
    return Axios.get('http://localhost:8080/api/formapago')
}

function delFormaPago(id) {
    return Axios.delete('http://localhost:8080/api/formapago', {
        data: {
            idFormaPago: id
        }
    })
}

function addFormaPago(nuevo) {
    return Axios.post('http://localhost:8080/api/formapago', nuevo)
}

function editFormaPago(modificado) {
    return Axios.put('http://localhost:8080/api/formapago', modificado);
}

export default {
    getFormaPagos,
    delFormaPago,
    addFormaPago,
    editFormaPago
}
