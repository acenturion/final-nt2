<template>
    <div class="container text-left w-75 mt-3">
        <!--        Formulario Categorias -->
        <div>
            <h2>Agregar Categorias</h2>
            <hr/>
            <vue-form :state="formState" @submit.prevent="sendForm()">

                <div class="form-group">
                    <label for="idCategoria">Identificador de la categoria</label>
                    <select 
                            v-model="formData.idCategoria" 
                            class="form-control" 
                            id="idCategoria" 
                            name="idCategoria"
                    >
                        <option v-for="(item, index) in categorias" :key="index">
                            {{item.idCategoria}}
                        </option>
                    </select>                    
                </div>
               <validate class="form-group" tag="div">
                    <label for="descripcion">Descripcion</label>
                    <input
                            type="text"
                            class="form-control"
                            id="descripcion"
                            name="descripcion"
                            v-model.trim="formData.descripcion"
                            required
                    >
                </validate>
                <field-messages name="descripcion" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La descripcion es requerida</div>
                </field-messages>
                
               

                <button type="submit" class="btn btn-primary" :disabled="formState.$invalid">Enviar</button>
                <button type="button" v-on:click="enviarCategoriaEditado()" class="btn btn-warning mx-4" :disabled="formState.$invalid">Editar</button>
            </vue-form>
        </div>
        <!--    Alert!-->
        <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>

        <!--    Display Categorias -->
        <div class="mt-5 mb-5">
            <h2>Categoria del Empleado</h2>
            <hr />
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Borrar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in this.categorias" v-bind:key="index">
                    <th scope="row">{{item.idCategoria}}</th>
                    <td>{{item.descripcion}}</td>
                    <td>
                        <button
                            class="btn btn-warning"
                            v-on:click="editarCategoria(item)"
                        >Editar
                        </button>
                    </td>
                    <td>
                        <button
                            class="btn btn-danger"
                            v-on:click="eliminarCategoria(item)"
                        >Borrar
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="js">

    import CategoriaService from '../services/categoria.service.js'
    export default {
        name: 'src-components-categoria',
        props: [],
        beforeMount(){},
        mounted() {},
        data() {
            return {
                categorias: this.cargarCategorias(),
                formState: {},
                formData: this.getInitialData(),
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
                  idCategoria: 0,
                  descripcion: "Nueva Categoria"
              }
          },
          sendForm() {
            CategoriaService.addCategoria(this.formData)
              .then(
              res => {
                this.message = `Se agrego la categoria [${res.data.idCategoria}]`
                this.getInitialData()
                this.cargarCategorias()
              })
              .catch(
                err => {
                this.message = `Ocurrio un error al agregar una Categoria ` + err.message
            })
          },
          editarCategoria(categoria) {
            this.formData = categoria
          },
          eliminarCategoria(categoria) {
            CategoriaService.delCategoria(categoria).then(
              res => {
                this.message = `Se elimino la categoria [${res.data.idCategoria}]`
                this.getInitialData()
                this.cargarCategorias()
              }
            ).catch(err => {
              this.message = `Ocurrio un error al eliminar la categoria ` + err
            });
          },
          enviarCategoriaEditado() {
            CategoriaService.editCategoria(this.formData).then(
              res => {
                this.message = `Se edito la categoria [${res.data.idCategoria}]`
                this.getInitialData()
                this.cargarCategorias()
              }
            ).catch(err => {
              this.message = `Ocurrio un error al editar la categoria ` + err
            })
          },
          cargarCategorias(){
            CategoriaService.getCategorias().then(
              res => {
                  this.categorias = res.data;
              }
            
            ).catch(err => {
              this.message = `Ocurrio un error al cargar las categorias ` + err
            })
          }
        },
        computed: {
        }
    }


</script>

<style scoped lang="css">
</style>
