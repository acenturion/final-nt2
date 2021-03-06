import GenericServices from './generic.service.js'
import URL from '../constants.js'
import Axios from "axios";

function getGastos() {
    return GenericServices.getData(URL.urlGasto)
}

function delGasto(id) {
    let data = {idDetalle: id}
    return GenericServices.delData(data,URL.urlGasto)
}

function addGasto(gasto) {
    return GenericServices.addData(gasto, URL.urlGasto)
}

function editGasto(gasto) {
    return GenericServices.editData(gasto, URL.urlGasto);
}

function gastosPorViaje(idViaje) {
    let viaje={idViaje:idViaje}
    return GenericServices.getDataId(viaje,URL.urlGastoReporte)
}

function aprobarGasto(idGasto){
    let gasto = { 'idGasto' : idGasto}
    return Axios.put(URL.urlAprobarGasto, gasto);
}

export default {
    getGastos,
    delGasto,
    addGasto,
    editGasto,
    gastosPorViaje,
    aprobarGasto
}
