import GenericServices from './generic.service.js'
import URL from '../constants.js'
function getViajes() {
    return GenericServices.getData(URL.urlViaje);
}

function delViaje(id) {
    let data = {idViaje: id}
    return GenericServices.delData(data, URL.urlViaje)
}

function addViaje(viaje) {
    return GenericServices.addData(viaje, URL.urlViaje)
}

function editViaje(viaje) {
    return GenericServices.editData( viaje, URL.urlViaje);
}

export default {
    getViajes,
    addViaje,
    editViaje,
    delViaje
}