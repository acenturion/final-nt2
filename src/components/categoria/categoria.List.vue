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
   
                <th scope="row">{{item.idCategoria}}</th>
                <td>
                    <input 
                      type="text" 
                      name="descripcion" 
                      v-model="item.descripcion" 
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
                      @click="enviarCategoriaEditado(item)"  
                    ><i class="fas fa-cloud-upload-alt"></i> 
                    </button>
                    <button v-show="index!=idEditable"
                        class="btn btn-danger btn-sm ml-2"
                        @click="eliminarCategoria(item)"
                    ><i class="fas fa-trash-alt"></i>
                    </button>
                </td>
              
              </tr>
            </tbody>
        </table>

      </div>  
        
</template>

<script lang="js">
  import CategoriaService from '../../services/categoria.service.js'
  import Paginate from 'vuejs-paginate'
  import {MisMixins} from '../../utils/pagmixins.js'
  import Loader from "../loader";

    export default {
        name: 'Categoria.List',
        props: [],
        mixins: [MisMixins],
        beforeMount() {
          this.cargarCategorias()
        },
        data() {
            return {
                categorias: [],
                pagina: [],
                registrosPorPagina: 5,
                idEditable: -1,
                formData:{},
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
               this.pagina = this.getPage(pageNumber, this.registrosPorPagina, this.categorias)
              },
             cargarCategorias(){
                  CategoriaService.getCategorias().then(
                    res => {
                        this.categorias = res.data;
                        this.clickPaginationCallback(1)
                        this.isLoading = false;
                    }
                  ).catch(err => {
                    this.message = `Ocurrio un error al cargar las categorias ` + err
                  })
              },
            eliminarCategoria(categoria) {
              CategoriaService.delCategoria(categoria).then(
                res => {
                  this.message = `Se elimino la categoria [${res.data.idCategoria}]`
                  //let index = this.categorias.findIndex(c => c.idCategoria == categoria.idCategoria)
                  //this.categorias.splice(index,1)
                  this.cargarCategorias()
                }
              ).catch(err => {
                this.message = `Ocurrio un error al eliminar la categoria ` + err
              })
            },
            editable(indice) {
                 this.idEditable=indice
                 if (indice>-1){
                 this.formData=this.categorias[indice]
                 }
            },
           enviarCategoriaEditado(item) {
            CategoriaService.editCategoria(item).then(
              res => {
                this.message = `Se edito la categoria [${res.data.idCategoria}]`
                this.categorias
                //this.cargarCategorias()
              }
            ).catch(err => {
              this.message = `Ocurrio un error al editar la categoria ` + err
            })

              this.idEditable=-1;
            }
        },
        computed :{
          totalPage(){
           return  this.getTotalPage(this.registrosPorPagina, this.categorias)
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
    .spacing button{
        margin-right: 5%;
        margin-bottom: 5%;
    }    
</style>
