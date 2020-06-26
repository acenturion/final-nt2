import Axios from 'axios'

function getGastos() {
    Axios.get('http://localhost:8080/api/detallegasto')
        .then(res => {
                console.log("Gatos from service:", res);
                return res;
            },
            err => {
                console.log("Error from service,", err);
            }
        )
}

function delGasto(id) {
    console.log('Desde servicio Gatos', id);
    Axios.delete('http://localhost:8080/api/detallegasto', {
        data: {
            idGasto: id
        }
    })
        .then(
            res => {
                console.log("Se elimino el gasto " + id);
                console.log(res);
            }, err => {
                console.log(err);
                this.error.msg = 'no se pudo eliminar el gasto'
                this.error.status = true;
            })
}

function addGasto(gasto) {
 Axios.post('http://localhost:8080/api/detallegasto',gasto)
     .then(
         res =>{
             console.log("Agregado gasto from service:", res);
             console.log(res)
         },
         err =>{
             console.log("Error al agregar gasto from service:", err);
             console.log(err)
         }
     )
}

export default {
    getGastos,
    delGasto,
    addGasto
}
