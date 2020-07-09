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
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in this.categorias" v-bind:key="index">
   
                <th scope="row">{{item.idCategoria}}</th>
                <td>
                    <input v-if="index==idEditable" type="text"  name="descripcion" v-model="formData.descripcion" style="width:10em;height:2.3em; border-radius:2.5px ;">
                    <input v-else type="text"  name="descripcion" :value="item.descripcion"  style="width:10em; " disabled>
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
                      @click="enviarCategoriaEditado()"  
                    ><i class="fas fa-cloud-upload-alt"></i> 
                    </button>
                    <button v-show="index!=idEditable"
                        class="btn btn-danger btn-sm"
                        @click="eliminarCategoria(item.idCategoria)"
                    ><i class="fas fa-trash-alt"></i>
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
  import CategoriaService from '../../services/categoria.service.js'
  import Paginate from 'vuejs-paginate'

    export default {
        name: 'Categoria.List',
        props: [],
        beforeMount() {
          this.cargarFormasPago()
        },
        data() {
            return {
                categorias: [],
                topesPaginado: [],
                topes: this.cargarCategorias(0),
                registrosPorPagina: 5,
                idEditable: -1,
                formData:{},
                message:null            
            }
        },
        components: {
          Paginate
        },
        methods: {
              clickPaginationCallback (pageNumber) {
                this.topesPaginado = []
                let inicioIndex = (pageNumber-1)*this.registrosPorPagina;
                let finIndex = inicioIndex + this.registrosPorPagina
                if (finIndex > this.topes.length){
                  finIndex = this.topes.length
                }
                for (let index = inicioIndex; index < finIndex; index++) {
                  let tope = this.topes[index]
                  this.topesPaginado.push(tope)
                }
              },
             cargarCategorias(){
                  CategoriaService.getData().then(
                    res => {
                        this.categorias = res.data;
                    }
                  
                  ).catch(err => {
                    this.message = `Ocurrio un error al cargar las categorias ` + err
                  })
              },
            eliminarCategoria(categoria) {
              CategoriaService.delData(categoria).then(
                res => {
                  this.message = `Se elimino la categoria [${res.data.idCategoria}]`
                  this.cargarCategorias()
                }
              ).catch(err => {
                this.message = `Ocurrio un error al eliminar la categoria ` + err
              })
            },
            editable(indice) {
                 this.idEditable=indice
                 if (indice>-1){
                 this.formData=this.formasPago[indice]
                 }
            },
           enviarCategoriaEditado() {
            CategoriaService.editData(this.formData).then(
              res => {
                this.message = `Se edito la categoria [${res.data.idCategoria}]`
                this.cargarCategorias()
                this.formData = {}
              }
            ).catch(err => {
              this.message = `Ocurrio un error al editar la categoria ` + err
            })

              this.idEditable=-1;
            }
        },
        computed :{
          totalPage(){
            let paginas = 1;
            try{
              let tamanio = this.topes.length
              paginas = Math.floor(tamanio/this.registrosPorPagina)
              if (tamanio%this.registrosPorPagina > 0){
                paginas++
              }
            }catch (err){
              paginas = 1
            }
            return paginas
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
</style>
