import Axios from 'axios'

function getEmpleados() {
    return Axios.get('http://localhost:8080/api/empleado')
}

function delEmpleado(id) {
    return Axios.delete('http://localhost:8080/api/empleado', {
        data: {
            idEmpleado: id
        }
    })
}

function addEmpleado(empleado) {
    return Axios.post('http://localhost:8080/api/empleado', empleado)
}

function editEmpleado(empleado) {
    return Axios.put('http://localhost:8080/api/empleado', empleado);
}

export default {
    getEmpleados,
    addEmpleado,
    editEmpleado,
    delEmpleado
}
