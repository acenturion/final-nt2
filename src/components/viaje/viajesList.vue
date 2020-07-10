<template>
  
      <div class="table-fluid">
        <Paginate 
              :page-count="totalPage"
              :page-range="totalPage"
              :margin-pages="0"
              :click-handler="clickPaginationCallback"
              :prev-text="'<<'"
              :next-text="'>>'"
              :container-class="'pagination'"
              :page-class="'page-item'"
              :page-link-class="'page-link'"
              :prev-link-class="'page-link'"
              :next-link-class="'page-link'"
              :hide-prev-next="false"
            />
        <table class="table table-sm">
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
            
            <tr v-for="(item,index) in pagina" v-bind:key="item.idViaje">
                <th scope="row">{{item.idViaje}}</th>
                <td> {{item.fechaInicio | fechaddMMyyyy}}</td>
                <td> {{item.fechaFin | fechaddMMyyyy}} </td>
                <td>
                    <select v-if="index==idEditable"
                        v-model="item.idEmpleado"
                        class="form-control" style="width:8em">
                        <option v-for="empleado in empleados" v-bind:key="empleado.idEmpleado" :value="empleado.idEmpleado">
                            {{empleado.nombre}}
                        </option>
                    </select>
                    <input v-else type="text"  name="idEmpleado" :value="asignarNombreEmpleado(item.idEmpleado)"  style="width:8em" disabled>
                    
                </td>
                <td>
                    <input v-if="index==idEditable" type="text"  name="descripcion" v-model="item.descripcion" style="width:10em;height:2.3em; border-radius:2.5px ;">
                    <input v-else type="text"  name="descripcion" :value="item.descripcion"  style="width:10em; " disabled>
                </td>
                <td>
                    <input v-if="index==idEditable" type="text"  name="destino" v-model="item.destino" style="width:8em;">
                    <input v-else type="text"  name="destino" :value="item.destino" style="width:8em;" disabled>
                </td>
                <td>
                    <input v-if="index==idEditable" type="currency" name="presupuesto" v-model="item.presupuesto" style="width:8em; text-align:right">
                    <input v-else type="currency" name="presupuesto" :value="item.presupuesto | moneda" style="width:8em; text-align:right" disabled>
                </td>
                <td>
                    <select v-if="index==idEditable"
                        v-model="item.idPais"
                        class="form-control" id="exampleFormControlSelect1" style="width:8em">
                        <option v-for="pais in paises" v-bind:key="pais.idPais" :value="pais.idPais">
                            {{pais.nombre}}
                        </option>
                    </select>
                    <!-- <input v-if="index==idEditable" type="text"  name="idPais" :value="item.idPais" style="width:1.5em"> -->
                    <input v-else type="text"  name="idPais" :value="asignarNombrePais(item.idPais)" style="width:8em" disabled>
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
                      @click="enviarViajeEditado(item)"
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
                        @click="verGastos(item)" 
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
    import Paginate from 'vuejs-paginate'
    import Paginador from '../../paginacion.js'
    
    export default {
        name: 'src-components-viajesList',
        props: [],
        beforeMount() {
            this.cargarViajes(),
            this.cargarEmpleados(),
            this.cargarPaises()

        },
        data() {
            return {
                viajes: [],
                empleados: [],
                paises: [],
                idEditable: -1,
                message:null,
                registrosPorPagina: 5,
                pagina:[]                          
            }
        },
        components: {
           Paginate
        },
        methods: {
            cargarViajes(){
              ViajeService.getViajes().then(
                res => {                    
                    this.viajes = res.data;
                     this.clickPaginationCallback(1 )
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
                  this.cargarEmpleados();

                }
              ).catch(err => {
                this.message = `Ocurrio un error al eliminar el viaje ` + err
              });
            },
            editable(indice) {
                 this.idEditable=indice
            },
            enviarViajeEditado(viajeEditado) {

               ViajeService.editViaje(viajeEditado).then(
                res => {
                  this.message = `Se edito el viaje [${res.data.idViaje}]`
                }
              ).catch(err => {
                
                this.message = `Ocurrio un error al editar el viaje ` + err
              })

              this.idEditable=-1;
            },
            asignarNombreEmpleado(idEmpleado){
              let emp = this.empleados.find( empleado => {
                return empleado.idEmpleado === idEmpleado
              })

              if(!emp){
                return '';
              }
              return emp.nombre;
            },
            asignarNombrePais(idPais){
              let data = this.paises.find( pais => {
                return pais.idPais === idPais
              })

              if(!data){
                return '';
              }
              return data.nombre;
            },
            enviarViaje(data){
              this.$store.dispatch('guardaViaje',data) 
            },
            verGastos(data){
              this.$store.dispatch('cambiarMostrarGastos',true)    
              this.enviarViaje(data)
             
            },
            clickPaginationCallback (pageNumber) {
                this.pagina = Paginador.getPage(pageNumber, this.registrosPorPagina, this.viajes)
            }
            
        },
        computed :{
          totalPage(){
            return  Paginador.getTotalPage(this.registrosPorPagina, this.viajes)
          }
        }
           
    }    

</script>

<style scoped lang="css">
    
    input {
        border:none;   
             
    }
    input:disabled {
        color:black;
        background-color: #e1e2e1;
    }    
    .page-item {
        background-color: #e1e2e1;
    } 
    .pagination {
       background-color: #e1e2e1;
    } 
</style>
