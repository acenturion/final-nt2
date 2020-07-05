import GenericServices from './generic.service.js'
import URL from '../constants.js'

function getGastos() {
    return GenericServices.getData(URL.urlGasto)
}

function delGasto(idGasto) {
    return GenericServices.delData({idDetalle: idGasto},URL.urlGasto)
}

function addGasto(gasto) {
    return GenericServices.addData(gasto, URL.urlGasto)
}

function editGasto(gasto) {
    return GenericServices.editData(gasto, URL.urlGasto);
}

export default {
    getGastos,
    delGasto,
    addGasto,
    editGasto
}
