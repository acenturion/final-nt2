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
        <table class="table table-sm">
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Descripcion</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <Loader :isLoading="isLoading"/>
            <tbody>
            <tr v-for="(item, index) in this.pagina" v-bind:key="index">
                <th scope="row">{{item.idFormaPago}}</th>
                <td>
                    <input v-if="index==idEditable" type="text"  name="descripcion" v-model="item.descripcion" style="width:10em;height:2.3em; border-radius:2.5px ;">
                    <input v-else type="text"  name="descripcion" :value="item.descripcion"  style="width:10em; " disabled>
                </td>
                <td class="spacing">
                    <button v-show="index!=idEditable"
                         class="btn btn-warning btn-sm"
                        @click="editable(index)"
                    ><i class="fas fa-pencil-alt"></i>
                     </button>
                      <button v-show="index==idEditable"
                      class="btn btn-success btn-sm"
                      @click="enviarFormaPagoEditada(item)"  
                    ><i class="fas fa-cloud-upload-alt"></i> 
                    </button>
                    <button v-show="index!=idEditable"
                        class="btn btn-danger btn-sm"
                        @click="eliminarFormaPago(item.idFormaPago)"
                    ><i class="fas fa-trash-alt"></i>
                    </button>
                </td>
                </tr>
            </tbody>
        </table>
      
      </div>  
        
</template>

<script lang="js">
  import FormaPagoService from '../../services/formapago.service.js'
  import Paginador from '../../utils/paginacion.js'
  import Paginate from 'vuejs-paginate'
  import Loader from "../loader";

    export default {
        name: 'FormaPago.List',
        props: [],
        beforeMount() {
          this.cargarFormasPago()
        },
        data() {
            return {
                formasPago: [],
                pagina: [],
                registrosPorPagina: 5,
                idEditable: -1,
                message:null,
                isLoading: true
            }
        },
        components: {
            Loader,
          Paginate
        },
        methods: {
              clickPaginationCallback (pageNumber) {
                this.pagina = Paginador.getPage(pageNumber, this.registrosPorPagina, this.formasPago)
              },
             cargarFormasPago(){
                FormaPagoService.getFormaPagos().then(
                  res => {
                      this.formasPago = res.data;
                      this.clickPaginationCallback(1)
                      this.isLoading = false;
                  }).catch(err => {
                  this.message = `Ocurrio un error al cargar las Formas de Pago ` + err
                })
              },
            eliminarFormaPago(formapago) {
            FormaPagoService.delFormaPago(formapago).then(
              res => {
                this.message = `Se elimino la forma de pago [${res.data.idFormaPago}]`
                this.cargarFormasPago();
              }
            ).catch(err => {
              this.message = `Ocurrio un error al eliminar la Forma de Pago ` + err
            });
            },
            editable(indice) {
                 this.idEditable = indice
            },
            enviarFormaPagoEditada(formaPagoEditado) {
              FormaPagoService.editFormaPago(formaPagoEditado).then(
                res => {
                  this.message = `Se edito la Forma de Pago [${res.data.idFormaPago}]`
  
                }
              ).catch(err => {
                this.message = `Ocurrio un error al editar la Forma de Pago ` + err
              })

              this.idEditable=-1;
            }
        },
        computed :{
          totalPage(){
            return  Paginador.getTotalPage(this.registrosPorPagina, this.formasPago)
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
