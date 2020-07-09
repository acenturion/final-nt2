import GenericServices from './generic.service.js'
import URL from '../constants.js'

function getCategorias() {
    return GenericServices.getData(URL.urlCategoria)
}

function delCategoria(categoria) {
    return GenericServices.delData({ idCategoria: categoria.idCategoria}, URL.urlCategoria);
}

function addCategoria(categoria) {
    return GenericServices.addData( categoria, URL.urlCategoria)
}

function editCategoria(categoria) {
    return GenericServices.editData(categoria, URL.urlCategoria);
}

export default {
    getCategorias,
    delCategoria,
    addCategoria,
    editCategoria
}
