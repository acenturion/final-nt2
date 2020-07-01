<template>
    <div class="container text-left w-75 mt-3">
        <!--        Formulario  Formas de pago -->
        <div>
            <h2>Agregar Formas de Pago</h2>
            <hr/>
            <vue-form :state="formState" @submit.prevent="sendForm()">

                <div class="form-group">
                    <label for="idFormaPago">Identificador de la forma de pago</label>
                    <select 
                            v-model="formData.idFormaPago" 
                            class="form-control" 
                            id="idFormaPago" 
                            name="idFormaPago"
                    >
                        <option v-for="(item, index) in formasPago" :key="index">
                            {{item.idFormaPago}}
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
                <button type="button" v-on:click="enviarFormaPagoEditada()" class="btn btn-warning mx-4" :disabled="formState.$invalid">Editar</button>
            </vue-form>
        </div>
        <!--    Alert!-->
        <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>

        <!--    Display Formas de Pago -->
        <div class="mt-5 mb-5">
            <h2>Forma de pago del Empleado</h2>
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
                <tr v-for="(item, index) in this.formasPago" v-bind:key="index">
                    <th scope="row">{{item.idFormaPago}}</th>
                    <td>{{item.descripcion}}</td>
                    <td>
                        <button
                            class="btn btn-warning"
                            v-on:click="editarFormaPago(item)"
                        >Editar
                        </button>
                    </td>
                    <td>
                        <button
                            class="btn btn-danger"
                            v-on:click="eliminarFormaPago(item)"
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

    import FormaPagoService from '../services/formapago.service.js'
    export default {
        name: 'src-components-formaspago',
        props: [],
        beforeMount(){},
        mounted() {},
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
                this.cargarFormasPago()
              })
              .catch(
                err => {
                this.message = `Ocurrio un error al agregar una Forma de pago ` + err.message
            })
          },
          editarFormaPago(formapago) {
            this.formData = formapago
          },
          eliminarFormaPago(formapago) {
            FormaPagoService.delFormaPago(formapago).then(
              res => {
                this.message = `Se elimino la forma de pago [${res.data.idFormaPago}]`
                this.getInitialData()
                this.cargarFormasPago()
              }
            ).catch(err => {
              this.message = `Ocurrio un error al eliminar la Forma de Pago ` + err
            });
          },
          enviarFormaPagoEditada() {
            FormaPagoService.editFormaPago(this.formData).then(
              res => {
                this.message = `Se edito la Forma de Pago [${res.data.idFormaPago}]`
                this.getInitialData()
                this.cargarFormasPago()
              }
            ).catch(err => {
              this.message = `Ocurrio un error al editar la Forma de Pago ` + err
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
          }
        },
        computed: {
        }
    }


</script>

<style scoped lang="css">
</style>
