<template>
  
      <div class="table-responsive">
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
            <tr v-for="(item,index) in this.viajes" v-bind:key="item.idViaje">
    <!--             <th scope="row">{{item.idViaje}}</th>
                <td>{{item.fechaInicio | fechaddMMyyyy}}</td>
                <td>{{item.fechaFin | fechaddMMyyyy}}</td>
                <td>{{item.idEmpleado}}</td>
                <td>{{item.descripcion}}</td>
                <td>{{item.destino}}</td>
                <td>{{item.presupuesto | formatearNumero}}</td>
                <td>{{item.idPais}}</td>
 -->
                <!-- Edicion en Linea -->
               
                <th scope="row">{{item.idViaje}}</th>
                <td>{{item.fechaInicio | fechaddMMyyyy}}</td>
                <td>{{item.fechaFin | fechaddMMyyyy}}</td>
                <td>
                    <select v-if="index==idEditable"
                        v-model="formData.idEmpleado"
                        class="form-control" id="exampleFormControlSelect1" style="width:8em">
                        <option v-for="empleado in empleados" v-bind:key="empleado.idEmpleado" :value="empleado.idEmpleado">
                            {{empleado.nombre}}
                        </option>
                    </select>

                    <!-- <input v-if="index==idEditable" type="selected"  name="idEmpleado"  style="width:5em" 
                     v-model="formData.idEmpleado">-->
                    <input v-else type="text"  name="idEmpleado" :value="item.idEmpleado" style="width:1em" disabled>
                </td>
                <td>
                    <input v-if="index==idEditable" type="text"  name="descripcion" :value="item.descripcion" style="width:13em;">
                    <input v-else type="text"  name="descripcion" :value="item.descripcion" style="width:13em;" disabled>
                </td>
                <td>
                    <input v-if="index==idEditable" type="text"  name="destino" :value="item.destino" style="width:12em;">
                    <input v-else type="text"  name="destino" :value="item.destino" style="width:12em;" disabled>
                </td>
                <td>
                    <input v-if="index==idEditable" type="number" name="presupuesto" :value="item.presupuesto" style="width:8em; text-align:right">
                    <input v-else type="number" name="presupuesto" :value="item.presupuesto" style="width:8em; text-align:right" disabled>
                </td>
                <td>
                    <select v-if="index==idEditable"
                        v-model="formData.idPais"
                        class="form-control" id="exampleFormControlSelect1" style="width:8em">
                        <option v-for="pais in paises" v-bind:key="pais.idPais" :value="pais.idPais">
                            {{pais.nombre}}
                        </option>
                    </select>
                    <!-- <input v-if="index==idEditable" type="text"  name="idPais" :value="item.idPais" style="width:1.5em"> -->
                    <input v-else type="text"  name="idPais" :value="item.idPais" style="width:1.5em" disabled>
                </td>
                <td>
                    
                    <button v-show="index!=idEditable"
                         class="btn btn-warning btn-sm"
                        @click="editable(index)"
                    ><i class="fas fa-pencil-alt"></i>
                     </button>
                </td>
                <td>
                    <button v-show="index==idEditable"
                      class="btn btn-success btn-sm"
                      @click="enviarViajeEditado()"  
                    ><i class="fas fa-cloud-upload-alt"></i> 
                    </button>
                    <button v-show="index!=idEditable"
                        class="btn btn-danger btn-sm"
                        @click="eliminarViaje(item.idViaje)"
                    ><i class="fas fa-trash-alt"></i>
                    </button>
                </td>
                <td>
                    <button v-show="index==idEditable"
                        class="btn btn-danger btn-sm"
                        v-on:click="editable(-1)"
                    ><i class="fas fa-times-circle"></i>
                    </button>
                    <button v-show="index!=idEditable"
                        class="btn btn-primary btn-sm"
                        
                    ><i class="fas fa-list-alt"></i>
                    </button>
                </td>
              
            </tr>
            </tbody>
        </table>
    
    <!--    Alert!-->
        <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>
     </div>  
        
</template>

<script lang="js">
    import ViajeService from '../../services/viaje.service.js'
    import EmpleadoService from '../../services/empleado.service.js'
    import PaisService from '../../services/pais.service.js'
    
    export default {
        name: 'src-components-viajesList',
        props: [],
        mounted() {
        },
        data() {
            return {
                viajes: this.cargarViajes(),
                empleados: this.cargarEmpleados(),
                paises: this.cargarPaises(),
                idEditable: -1,
                formData:{},
                message:null            
            }
        },
        methods: {
            cargarViajes(){
              ViajeService.getViajes().then(
                res => {                    
                    this.viajes = res.data;
                }
              ).catch(err => {
                this.message = `Ocurrio un error al cargar los viajes ` + err
              })
            },
             cargarEmpleados(){
              EmpleadoService.getEmpleados().then(res => {
                this.empleados = res.data;
              })
            },
            cargarPaises(){
              PaisService.getPaises().then(res => {
                this.paises = res.data;
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
            },
            editable(indice) {
                 console.log('aaaa',indice);
                 
                 this.idEditable=indice
                 if (indice>-1){
                 this.formData=this.viajes[indice]
                 }
            },
            enviarViajeEditado() {
                console.log('aa',this.formData);
                
               ViajeService.editViaje(this.formData).then(
                res => {
                  this.message = `Se edito el viaje [${res.data.idViaje}]`
                  this.cargarViajes()
                  this.formData = {};
                  console.log('res',res);
                  
                }
              ).catch(err => {
                console.log('bbb',err);
                
                this.message = `Ocurrio un error al editar el viaje ` + err
              })

              this.idEditable=-1;
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
        border:none;
        /*width: 8vw;*/
    }
    input:disabled {
        color:black;
        background-color: #e1e2e1;
    }    
</style>
