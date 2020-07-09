<template>
    <div class="container text-left ">
        <div>
            <h2 class="bg-dark text-white">Agregar Categorias</h2>
            <hr/>
            <vue-form :state="formState" @submit.prevent="sendForm()">
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
 

                <button type="submit" class="btn btn-primary" :disabled="formState.$invalid" ><i class="fas fa-cloud-upload-alt"></i></button>
                <button type="button" v-on:click="volveraLista()" class="btn btn-warning mx-4"><i class="far fa-arrow-alt-circle-left"></i></button>

            </vue-form>


            <!--    Alert!-->
            <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>

        </div>   
            
    </div>
</template>
<script lang="js">
   import CategoriaService from '../../services/categoria.service.js'
    export default {
        name: 'CategoriasForm',
        props: [],
        beforeMount() {
            this.cargarCategorias()
        },
        data() {
            return {
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
                this.message = `Se agrego la Categoria [${res.data.idCategoria}]`
                this.getInitialData()
                this.$store.commit('setMostrar',true)
              })
              .catch(
                err => {
                this.message = `Ocurrio un error al agregar una Categoria ` + err.message
            })
            },
            
            volveraLista() {
                this.$store.commit('setMostrar',true) 
            }
        },
        computed: {}
    }


</script>

<style scoped lang="css">
   h2{
       text-align: center;
       border-radius:3px
   }

   .svg-inline--fa.fa-w-20 {
    width: 2.75em;
    height: 1em;
    }
    .svg-inline--fa.fa-w-16 {
    width: 2.75em;
    height: 1em;
    }
</style>
