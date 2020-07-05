import GenericServices from './generic.service.js'
import URL from '../constants.js'

function getTipoGastos() {
    return GenericServices.getData(URL.urlTipoGasto)
}

function delTipoGasto(idTipoGasto) {
    return GenericServices.delData({idDetalle: idTipoGasto},URL.urlTipoGasto)
}

function addTipoGasto(tipoGasto) {
    return GenericServices.addData(tipoGasto, URL.urlTipoGasto)
}

function editTipoGasto(tipoGasto) {
    return GenericServices.editData(tipoGasto, URL.urlTipoGasto);
}

export default {
    getTipoGastos,
    delTipoGasto,
    addTipoGasto,
    editTipoGasto
}
