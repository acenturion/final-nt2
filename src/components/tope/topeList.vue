<template>
  <div class="table-fluid">
    <Paginate
      :page-count="this.totalPage"
      :page-range="this.totalPage"
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
    <!-- Display Topes -->
    <table class="table">
        <thead class="thead-dark">
        <tr>
            <th scope="col">Viaje</th>
            <th scope="col">Tipo</th>
            <th scope="col">Importe</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <Loader :isLoading="isLoading"/>
        <tbody>
        <tr v-for="(item, index) in topesPaginado" v-bind:key="index">
            <td>
              <label style="width:8em; text-align:left">
                {{item.idViaje}} - {{getViaje(item.idViaje)?getViaje(item.idViaje).destino:''}}
              </label>
              <input 
                type="hidden" 
                name="idViaje" 
                v-model.number="item.idViaje" 
                style="width:8em; text-align:left" 
                disabled
              >
            </td>

            <td>
              <label style="width:8em; text-align:left">
                {{item.idTipoGasto}} - {{getTipoGasto(item.idTipoGasto)?getTipoGasto(item.idTipoGasto).descripcion:''}}
              </label>
              <input 
                type="hidden" 
                name="idTipoGasto" 
                v-model.number="item.idTipoGasto" 
                style="width:8em; text-align:left"
              >
            </td>

            <td>
              <input 
                type="number" 
                name="importe" 
                v-model.number="item.importe" 
                style="width:8em; text-align:left" 
                :disabled="index!=idEditable"
              >
            </td>

            <td class="spacing">
                <button v-show="index!=idEditable"
                  class="btn btn-warning btn-sm"
                  @click="editable(index)"
                ><i class="fas fa-pencil-alt"></i>
                </button>

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

                <button v-show="index==idEditable"
                  class="btn btn-danger btn-sm"
                  @click="editable(-1)"
                ><i class="fas fa-times-circle"></i>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
  </div>
</template>

<script lang="js">
    import ViajeService from '../../services/viaje.service.js'
    import TipoGastoService from '../../services/tipogasto.service.js'
    import TopeService from '../../services/tope.service.js'
    import {MisMixins} from '../../utils/pagmixins.js'
    import Paginate from 'vuejs-paginate'
    import Loader from "../loader";
    export default {
        name: 'src-components-gasto',
        props: [],
        mixins: [MisMixins],
        beforeMount(){
            this.cargarTopes(0);
            this.cargarTiposGasto();
            this.cargarViajes();
        },
        data() {
            return {
                viajes: [],
                tiposGasto: [],
                topes: [],
                topesPaginado: [],
                registrosPorPagina: 5,
                formState: {},
                formData: {},
                idEditable: -1,
                message: null,
                error: {
                    status: false,
                    msg: ''
                },
                isLoading: true,
            }
        },
        components: {
            Loader,
          Paginate
        },
        methods: {
          clickPaginationCallback (pageNumber) {
            this.topesPaginado = this.getPage(pageNumber, this.registrosPorPagina, this.topes)
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
            TopeService.editTope(tope).then(
              res => {
                this.message = `Se edito el Tope [${res.data.idViaje}] [${res.data.idTipoGasto}]`
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
                this.clickPaginationCallback(1)
                  this.isLoading = false;
              }
            ).catch(err => {
              this.message = `Ocurrio un error al cargar los topes ` + err
            })
          },
          getViaje(idViaje){
            if (this.viajes){
              return this.viajes.find(v => v.idViaje == idViaje)
            }
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
          getTipoGasto(idTipoGasto){
            if (this.tiposGasto){
              return this.tiposGasto.find(tg => tg.idTipoGasto == idTipoGasto)
            }
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
          }
        },
        computed: {
          totalPage(){
            return  this.getTotalPage(this.registrosPorPagina, this.topes)
          },
          totalReembolsable(){
            let monto = 0
            if (this.topes){
              this.topes.forEach(t => {
                monto += t.importe
              })
            }
            return Math.round(monto)
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
    text-align: center;
    padding-left: 3em; 
    padding-right: 3em;
    font-weight: bold;
    color: red;
  }
  .spacing button{
        margin-right: 5%;
        margin-bottom: 5%;
    }
</style>
