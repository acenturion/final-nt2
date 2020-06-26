import Axios from 'axios'

function getEmpleados() {
    Axios.get('http://localhost:8080/api/empleado')
        .then(res => {
                console.log("Empleados from service:", res);
            },
            err => {
                console.log("Error from service,", err);
            }
        )
}

function delEmpleado(id) {
    console.log('Desde servicio empleados', id);
    Axios.delete('http://localhost:8080/api/empleado', {
        data: {
            idEmpleado: id
        }
    })
        .then(
            res => {
                console.log("Se elimino el empleado " + id);
                console.log(res);
            }, err => {
                console.log(err);
                this.error.msg = 'no se pudo eliminar el empleado'
                this.error.status = true;
            })
}

function addEmpleado(empleado) {
 Axios.post('http://localhost:8080/api/empleado',empleado)
     .then(
         res =>{
             console.log("Agregado empleado from service:", res);
             console.log(res)
         },
         err =>{
             console.log("Error al agregar empleado from service:", err);
             console.log(err)
         }
     )
}

export default {
    getEmpleados,
    addEmpleado,
    delEmpleado
}
