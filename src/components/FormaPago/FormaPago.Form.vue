<template>
    <div class="container text-left ">
        <div>
            <h2 class="bg-dark text-white">Agregar Formas de Pago</h2>
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
   import FormaPagoService from '../../services/formapago.service.js'
    export default {
        name: 'src-components-viajes',
        props: [],
        beforeMount() {
            this.cargarFormasPago
        },
        data() {
            return {
                formasPago: this.cargarFormasPago(),
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
                  idFormaPago: 0,
                  descripcion: "Nueva Forma de Pago"
              }
            },
             sendForm() {
            FormaPagoService.addFormaPago(this.formData)
              .then(
              res => {
                this.message = `Se agrego la forma de pago [${res.data.idFormaPago}]`
                this.getInitialData()
                this.$store.commit('setMostrar',true)
              })
              .catch(
                err => {
                this.message = `Ocurrio un error al agregar una Forma de pago ` + err.message
            })
            },
            cargarFormasPago(){
            FormaPagoService.getFormaPagos().then(
              res => {
                  this.formasPago = res.data;
              }
            
            ).catch(err => {
              this.message = `Ocurrio un error al cargar las Formas de Pago ` + err
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
