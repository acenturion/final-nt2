import GenericServices from './generic.service.js'
import URL from '../constants.js'
function getEmpleados() {
    return GenericServices.getData(URL.urlEmpleado);
}

function delEmpleado(id) {
    let data = {idEmpleado: id}
    return GenericServices.delData(data, URL.urlEmpleado)
}

function addEmpleado(empleado) {
    return GenericServices.addData(empleado, URL.urlEmpleado)
}

function editEmpleado(empleado) {
    return GenericServices.editData( empleado, URL.urlEmpleado);
}

export default {
    getEmpleados,
    addEmpleado,
    editEmpleado,
    delEmpleado
}
