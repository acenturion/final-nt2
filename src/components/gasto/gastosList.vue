 <template>  
  <div class="total">
      <div class="row row-cols-3 ">
        <p>Total Aprobados:  {{totalGastos.totalAprobado | moneda}}</p>
        <p>Total Sin aprobar:  {{totalGastos.totalNoAprobado | moneda}}</p>
        <p>Total Gastos:  {{totalGastos.totalGeneral | moneda}}</p>      
      </div>  
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
                  <th scope="col">Gasto</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Tipo Gasto</th>
                  <th scope="col">Forma de Pago</th>
                  <th scope="col">Importe</th>
                  <th scope="col">Notas</th>
                  <th scope="col">Aprobado</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th v-show="-1!=idEditable" scope="col"></th>
              </tr>
              </thead>
              <Loader style="top:375px" :isLoading="isLoading"/>
              <tbody>
              <tr v-for="(gasto,index) in pagina" :key="gasto.idDetalle">
                  <th scope="row">{{gasto.idDetalle}}</th>
                  <td>
                      <input type="date" name="fecha" :value="gasto.fecha | formatDate" style="width:9em; text-align:center" disabled>
                  </td>
                  <td>
                          <select v-if="index==idEditable"
                              v-model="gasto.idTipoGasto"
                              class="form-control" id="exampleFormControlSelect1" style="width:8em">
                              <option v-for="tipo in tipoGastos" v-bind:key="tipo.idTipoGasto" :value="tipo.idTipoGasto">
                                  {{tipo.descripcion}}
                              </option>
                          </select>

                          <input v-else type="text"  name="idTipoGasto" :value="asignarNombreTipoGasto(gasto.idTipoGasto)"  style="width:8em" disabled>
                  </td>      
                  <td>
                      <select v-if="index==idEditable"
                          v-model="gasto.idFormaPago"
                          class="form-control" style="width:8em">
                          <option v-for="forma in formaPagos" v-bind:key="forma.idFormaPago" :value="forma.idFormaPago">
                              {{forma.descripcion}}
                          </option>
                      </select>

                      <input v-else type="text" name="formaPago" :value="asignarNombreFormaPago(gasto.idFormaPago)" style="width:8em; text-align:left" disabled>
                  </td>  
                  <td> 
                      <input v-if="index==idEditable" type="currency" name="importe" v-model="gasto.importe" style="width:8em; text-align:right">
                      <input v-else type="currency" name="importe" :value="gasto.importe | moneda" style="width:8em; text-align:right" disabled>
                  </td>
                  <td>
                      <input v-if="index==idEditable" type="text" name="notas" v-model="gasto.notas" style="width:8em; text-align:left">
                      <input v-else type="text" name="notas" :value="gasto.notas" style="width:8em; text-align:left" disabled>
                  </td>
                
                  <td>
                    <input type="checkbox" name="aprobado" v-model="gasto.aprobado" style="width:5em; text-align:center" :disabled="gasto.aprobado" v-on:click="aprobarGasto(gasto)">
                  </td>
                  <td>
                      <button v-show="index!=idEditable"
                          class="btn btn-warning btn-sm"
                          v-on:click="editable(index)"
                      ><i class="fas fa-pencil-alt"></i>
                      </button>
                  </td>
                  <td>
                      <button v-show="index==idEditable"
                        class="btn btn-success btn-sm"
                        @click="enviarGastoEditado()"  
                      ><i class="fas fa-cloud-upload-alt"></i> 
                      </button>
                      <button v-show="index!=idEditable"
                          class="btn btn-danger btn-sm"
                          v-on:click="eliminarGasto(gasto.idDetalle)"
                      ><i class="fas fa-trash-alt"></i>
                      </button>
                  </td>
                  <td>
                    <button v-show="index==idEditable"
                          class="btn btn-danger btn-sm"
                          v-on:click="editable(-1)"
                      ><i class="fas fa-times-circle"></i>
                      </button>
                  </td>
                  
              </tr>
              </tbody>
          </table>
          <!--    Alert!-->
          <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>
      </div>  
  </div>      
</template>

<script lang="js">
    import GastosService from '../../services/gasto.service.js'
    import TipoGastoService from '../../services/tipogasto.service.js'
    import FormaPagoService from '../../services/formapago.service.js'
    import Paginate from 'vuejs-paginate'
    import Paginador from '../../utils/paginacion.js'
    import Loader from "../loader";
    
    export default {
        name: 'src-components-gastosList',
        props: ['viaje'],
        beforeMount() {
            this.cargarGastos()
            this.cargarTipoGastos()
            this.cargarFormaPagos()
        },    
        mounted() {

        },
        data() {
            return {
                gastos: [],
                tipoGastos: [],
                formaPagos: [],
                idEditable: -1,
                message:null,
                idViaje:0,
                registrosPorPagina: 5,
                pagina:[],
                isLoading: true
            }
        },
        components: {
            Loader,
          Paginate
        },
        methods: {
            cargarGastos(){
              GastosService.gastosPorViaje(this.viaje.idViaje).then(
                res => {
                this.gastos = res.data;
                this.clickPaginationCallback(1)
                this.isLoading= false
                }
              ).catch(err => {
                this.message = `Ocurrio un error al cargar los Gastos ` + err
              })
            },
            eliminarGasto(id) {
              GastosService.delGasto(id).then(
                res => {
                  this.message = `Se elimino el Gasto [${res.data.idDetalle}]`
                  this.cargarGastos();
                }
              ).catch(err => {
                this.message = `Ocurrio un error al eliminar el Gasto ` + err
              });
            },
            editable(indice) {
                 this.idEditable=indice
                 if (indice>-1){
                 this.formData=this.gastos[indice]
                 }
            },
            enviarGastoEditado() {
               GastosService.editGasto(this.formData).then(
                res => {
                  this.message = `Se edito el Gasto [${res.data[0].idDetalle}]`
                  this.cargarGastos()
                  this.formData = {};
                }
              ).catch(err => {
                
                this.message = `Ocurrio un error al editar el Gasto ` + err
              })

              this.idEditable=-1;
            },
             cargarTipoGastos(){
              TipoGastoService.getTipoGastos().then(res => {
                this.tipoGastos = res.data;
              })
            },
            cargarFormaPagos(){
              FormaPagoService.getFormaPagos().then(res => {
                this.formaPagos = res.data;
              })
            },
            asignarNombreTipoGasto(idTipoGasto){
              let tip = this.tipoGastos.find( tipo => {
                return tipo.idTipoGasto === idTipoGasto
              })

              if(!tip){
                return '';
              }
              return tip.descripcion;
            },
            asignarNombreFormaPago(id){              
              let data = this.formaPagos.find( forma => {
                return forma.idFormaPago === id
              })
              if(!data){
                return '';
              }
            return data.descripcion;
            },
            clickPaginationCallback (pageNumber) {
                this.pagina = Paginador.getPage(pageNumber, this.registrosPorPagina, this.gastos)
            },
            aprobarGasto(gasto){
                GastosService.aprobarGasto(gasto.idDetalle)
                .then(
                    res => {
                        gasto.aprobado = res.data.aprobado;
                        this.message = `${res.data.msg}`
                    }
                )
                .catch(
                    err =>{
                        this.message = err.data
                        gasto.aprobado = false;
                        console.log("Ocurrio un error al aprobar el gasto ", err)
                    }
                )
            }
            
        }, 
        computed: {
          totalGastos(){
            let totalA = 0
            let totalN = 0
            this.gastos.forEach(function(detalle) {
              if (typeof detalle.importe == "number"){
                if(detalle.aprobado) totalA += parseFloat(detalle.importe)
                else totalN += parseFloat(detalle.importe)
              }  
            })
            return {
                totalNoAprobado: totalN,
                totalAprobado: totalA,
                totalGeneral: parseFloat(totalA + totalN)
            }
          },
          totalPage(){
            return  Paginador.getTotalPage(this.registrosPorPagina, this.gastos)
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
    p {
      text-align: right;
      padding-left: 3em; 
      padding-right: 3em;
      font-weight: bold;
      color: red;
    }
</style>
