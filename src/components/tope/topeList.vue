<template>
    <div class="container text-left w-75 mt-3">
        <!--    Display topes -->
        <div class="mt-5 mb-5">
            <h2>Topes por Viaje y Tipo de Gasto</h2>
            <hr />
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Viaje</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Importe</th>
                    <th scope="col">+</th>
                    <th scope="col">-</th>
                    <th scope="col">*</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in this.topes" v-bind:key="index">
                    <th scope="row">{{index+1}}</th>
                    <!-- <td>{{item.idViaje}}</td> -->
                    <!-- <select v-if="index==idEditable"
                        v-model="formData.idViaje"
                        class="form-control" id="exampleFormControlSelect1" style="width:8em">
                        <option v-for="(item, index) in viajes" :key="index" :value="item.idViaje">
                            {{item.idViaje}}
                        </option>
                    </select>
                    <input v-else type="text" name="idViaje" :value="item.idViaje"  style="width:8em" disabled> -->
                    
                    <td>
                        <input v-if="index==idEditable" type="number" name="idViaje" v-model.number="formData.idViaje" style="width:8em; text-align:right" disabled>
                        <input v-else type="number" name="idViaje" :value="item.idViaje" style="width:8em; text-align:right" disabled>
                    </td>

                    <!-- <td>{{item.idTipoGasto}}</td> -->
                    <!-- <select v-if="index==idEditable"
                        v-model="formData.idTipoGasto"
                        class="form-control" id="exampleFormControlSelect1" style="width:8em">
                        <option v-for="(item, index) in tiposGasto" :key="index" :value="item.idTipoGasto">
                            {{item.idTipoGasto}}
                        </option>
                    </select>
                    <input v-else type="text" name="idTipoGasto" :value="item.idTipoGasto"  style="width:8em" disabled> -->
                    <td>
                        <input v-if="index==idEditable" type="number" name="idTipoGasto" v-model.number="formData.idTipoGasto" style="width:8em; text-align:right" disabled>
                        <input v-else type="number" name="idTipoGasto" :value="item.idTipoGasto" style="width:8em; text-align:right" disabled>
                    </td>

                    <!-- <td>{{item.importe}}</td> -->
                    <td>
                        <input v-if="index==idEditable" type="number" name="importe" v-model.number="formData.importe" style="width:8em; text-align:right">
                        <input v-else type="number" name="importe" :value="item.importe" style="width:8em; text-align:right" disabled>
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
                          @click="enviarTopeEditado(item)"  
                        ><i class="fas fa-cloud-upload-alt"></i> 
                        </button>
                        <button v-show="index!=idEditable"
                          class="btn btn-danger btn-sm"
                          @click="eliminarTope(item)"
                        ><i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                    <td>
                        <button v-show="index==idEditable"
                          class="btn btn-danger btn-sm"
                          @click="editable(-1)"
                        ><i class="fas fa-times-circle"></i>
                        </button>
                        <button v-show="index!=idEditable"
                          class="btn btn-primary btn-sm"
                          @click="verDetalle(item)"
                        ><i class="fas fa-list-alt"></i>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="js">
    import ViajeService from '../../services/viaje.service.js'
    import TipoGastoService from '../../services/tipogasto.service.js'
    import TopeService from '../../services/tope.service.js'
    export default {
        name: 'src-components-gasto',
        props: [],
        beforeMount(){},
        mounted() {},
        data() {
            return {
                viajes: this.cargarViajes(),
                tiposGasto: this.cargarTiposGasto(),
                topes: this.cargarTopes(0),
                formState: {},
                formData: this.getInitialData(),
                idEditable: -1,
                message: null,
                error: {
                    status: false,
                    msg: ''
                }
            }
        },
        methods: {
          getInitialData() {
              return {
                idViaje: 0,
                idTipoGasto: 0,
                importe: 12345.67
              }
          },
          eliminarTope(tope) {
            TopeService.delTope(tope).then(
              res => {
                this.message = `Se elimino el tope [${res.data.idViaje}] [${res.data.idTipoGasto}]`
                this.cargarTopes(0)
              }
            ).catch(err => {
              this.message = `Ocurrio un error al eliminar el tope ` + err
            });
          },
          enviarTopeEditado(tope) {
            console.log(this.formData);
            console.log(tope);
            TopeService.editTope(this.formData).then(
              res => {
                this.message = `Se edito el Tope [${res.data.idViaje}] [${res.data.idTipoGasto}]`
                this.getInitialData()
                this.cargarTopes(0)
              }
            ).catch(err => {
              this.message = `Ocurrio un error al editar un tope ` + err
            })
            this.idEditable=-1;
          },
          cargarTopes(idViaje){
            TopeService.getTopes().then(
              res => {
                if (idViaje > 0){
                  this.topes = res.data.filter(t => t.idViaje == idViaje).sort((a,b) => a.idTipoGasto - b.idTipoGasto)
                } else {
                  this.topes = res.data;
                }
              }
            ).catch(err => {
              this.message = `Ocurrio un error al cargar los topes ` + err
            })
          },
          cargarViajes(){
            ViajeService.getViajes().then(
              res => {
                  this.viajes = res.data;
              }
            ).catch(err => {
              this.message = `Ocurrio un error al cargar los viajes ` + err
            })
          },
          cargarTiposGasto(){
            TipoGastoService.getTipoGastos().then(
              res => {
                this.tiposGasto = res.data;
              }
            ).catch(err => {
              this.message = `Ocurrio un error al cargar los tipos de gasto ` + err
            })
          },
          editable(indice) {
                this.idEditable=indice
                if (indice>-1){
                this.formData=this.topes[indice]
                }
          },
          verDetalle(tope){
            console.log('TODO: ', tope)
          }
        },
        computed: {
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
</style>
