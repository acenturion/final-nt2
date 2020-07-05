<template>
   <div>
        <table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Inicio</th>
                <th scope="col">Fin</th>
                <th scope="col">Empleado</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Destino</th>
                <th scope="col">Presupuesto</th>
                <th scope="col">Pais</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item) in this.viajes" v-bind:key="item.idViaje">
                <th scope="row">{{item.idViaje}}</th>
                <td>{{item.fechaInicio | fechaddMMyyyy}}</td>
                <td>{{item.fechaFin | fechaddMMyyyy}}</td>
                <td>{{item.idEmpleado}}</td>
                <td>{{item.descripcion}}</td>
                <td>{{item.destino}}</td>
                <td>{{item.presupuesto | formatearNumero}}</td>
                <td>{{item.idPais}}</td>
                <td>
                    <button
                        class="btn btn-warning btn-sm"
                        
                    ><i class="fas fa-pencil-alt"></i>
                    </button>
                </td>
                <td>
                    <button
                        class="btn btn-danger btn-sm"
                        v-on:click="eliminarViaje(item.idViaje)"
                    ><i class="fas fa-trash-alt"></i>
                    </button>
                </td>
                <td>
                    <button
                        class="btn btn-primary btn-sm"
                        
                    ><i class="fas fa-list-alt"></i>
                    </button>
                </td>
                
            </tr>
            </tbody>
        </table>
        
    </div>   
</template>

<script lang="js">
    import ViajeService from '../../services/viaje.service.js'
    
    export default {
        name: 'src-components-viajesList',
        props: [],
        mounted() {
        },
        data() {
            return {
                viajes: this.cargarViajes()                
            }
        },
        methods: {
            cargarViajes(){
              ViajeService.getViajes().then(
                res => {
                    console.log('aaa',res);
                    
                    this.viajes = res.data;
                }
              ).catch(err => {
                this.message = `Ocurrio un error al cargar los viajes ` + err
              })
            },
            eliminarViaje(id) {
              ViajeService.delViaje(id).then(
                res => {
                  this.message = `Se elimino el viaje [${res.data.idViaje}]`
                  this.cargarViajes();
                }
              ).catch(err => {
                this.message = `Ocurrio un error al eliminar el viaje ` + err
              });
            }
        }   
    }    

</script>

<style scoped lang="css">
    
    table, td, th {  
      text-align: center;
       padding: 5px;
    }

    td {
        text-align: center;
    }
    input {
        background-color: #e1e2e1;
        border: none;
    }
</style>
