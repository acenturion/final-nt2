import GenericServices from './generic.service.js'
import URL from '../constants.js'

function getFormaPagos() {
    return GenericServices.getData(URL.urlFormaPago)
}

function delFormaPago(idFormaPago) {
    return GenericServices.delData({ idFormaPago: idFormaPago}, URL.urlFormaPago);
}

function addFormaPago(formaPago) {
    return GenericServices.addData( formaPago, URL.urlFormaPago)
}

function editFormaPago(formaPago) {
    return GenericServices.editData(formaPago, URL.urlFormaPago);
}

export default {
    getFormaPagos,
    delFormaPago,
    addFormaPago,
    editFormaPago
}
