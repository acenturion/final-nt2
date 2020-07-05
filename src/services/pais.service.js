import GenericServices from './generic.service.js'
import URL from '../constants.js'
function getPaises() {
    return GenericServices.getData(URL.urlPais);
}

function delPais(id) {
    let data = {idPais: id}
    return GenericServices.delData(data, URL.urlPais)
}

function addPais(pais) {
    return GenericServices.addData(pais, URL.urlPais)
}

function editPais(pais) {
    return GenericServices.editData(pais, URL.urlPais);
}

export default {
    getPaises,
    addPais,
    editPais,
    delPais
}
