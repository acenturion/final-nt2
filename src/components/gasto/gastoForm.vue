<template>
    <div class="container text-left ">
        <div>
            <h2 class="bg-dark text-white">Agregar Gastos</h2>
            <hr/>
            <vue-form :state="formState" @submit.prevent="sendForm()">
              <div class="row">
                <div class="col-3">
                  <validate class="form-group" tag="div">
                      <label for="fecha">Fecha del Ticket</label>
                      <input
                              type="date"
                              class="form-control"
                              id="fecha"
                              name="fecha"
                              v-model.trim="formData.fecha"
                              required
                      >
                  </validate>
                  <field-messages name="fecha" show="$dirty">
                      <div slot="required" class="alert alert-danger my-1">La fecha es requerida</div>
                  </field-messages>
                </div>
                <div class="col-3">
                  <div class="form-group">
                      <label for="idTipoGasto">Tipo de Gasto</label>
                      <select 
                              v-model="formData.idTipoGasto" 
                              class="form-control" 
                              id="idTipoGasto" 
                              name="idTipoGasto"
                      >
                          <option selected>Seleccione un Tipo de Gasto</option>
                          <option v-for="tipo in tiposGasto" :key="tipo.idTipoGasto" :value="tipo.idTipoGasto">
                            {{tipo.descripcion}}
                        </option>
                      </select>
                  </div>
                </div>
                <div class="col-3">
                  <div class="form-group">
                      <label for="idFormaPago">Medio de Pago</label>
                      <select 
                              v-model="formData.idFormaPago" 
                              class="form-control" 
                              id="idFormaPago" 
                              name="idFormaPago"
                      >
                          <option selected>Seleccione un Medio de Pago</option>
                          <option v-for="forma in formasPago" :key="forma.idFormaPago" :value="forma.idFormaPago">
                            {{forma.descripcion}}
                        </option>
                      </select>
                  </div>
                </div>
                <div class='col-3'>
                  <validate class="form-group" tag="div">
                      <label for="importe">Importe</label>
                      <input
                              type="number"
                              class="form-control"
                              id="importe"
                              name="importe"
                              v-model.trim="formData.importe"
                              required
                      >
                  </validate>
                  <field-messages name="importe" show="$dirty">
                      <div slot="required" class="alert alert-danger my-1">La importe es requerida</div>
                      <div slot="minlength" class="alert alert-danger my-1">La importe debe tener mas de {{minLength}} caracteres</div>
                  </field-messages>
                </div>  
              </div>
                <validate class="form-group" tag="div">
                    <label for="notas">Notas</label>
                    <input
                            type="text"
                            class="form-control"
                            id="notas"
                            name="notas"
                            v-model.trim="formData.notas"
                            required
                    >
                </validate>
                <field-messages name="notas" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La notas es requerida</div>
                    <div slot="minlength" class="alert alert-danger my-1">La notas debe tener mas de {{minLength}} caracteres</div>
                    <div slot="maxlength" class="alert alert-danger my-1">La notas debe tener menos de {{maxLength}} caracteres</div>
                </field-messages>     
                <validate tag="div">
                    <label for="foto">Foto del ticket de compra</label>
                    <input
                            type="file"
                            class="form-control p-1"
                            id="foto"
                            name="foto"
                    >
                </validate>
                <button type="submit" class="btn btn-primary" :disabled="formState.$invalid"><i class="fas fa-cloud-upload-alt"></i></button>
                <button type="button" v-on:click="volveraLista()" class="btn btn-warning mx-4"><i class="far fa-arrow-alt-circle-left"></i></button>
               
            </vue-form>
        </div>
        <!--    Alert!-->
        <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>
    </div>
</template>      

 <script lang="js">
    import GastosService from '../../services/gasto.service.js'
    import TipoGastoService from '../../services/tipogasto.service.js'
    import FormaPagoService from '../../services/formapago.service.js'
    
    
    export default {
        name: 'src-components-gasto',
        props: ['viaje'],
        beforeMount(){
          this.cargarFormasPago(),
          this.cargarTiposGasto()
        },
        mounted() {
        },
        data() {
            return {
                tiposGasto: [],
                formasPago: [],
                gastos: [],
                formState: {},
                formData: {
                  idViaje: this.viaje.idViaje,
                    fecha:new Date(this.viaje.fechaInicio).toISOString().slice(0,10)
                },
                minLength: 1,
                maxLength: 50,
                message: null,
                error: {
                    status: false,
                    msg: ''
                }
            }
        },
        methods: {
            sendForm() {
              GastosService.addGasto(this.formData)
                .then(
                res => {
                  this.message = `Se agrego el gasto [${res.data.idDetalle}] al viaje nro. [${this.formData.idViaje}]`
                })
                .catch(
                  err => {
                  this.message = `Ocurrio un error al agregar un gasto ` + err.message
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
            cargarFormasPago(){
              FormaPagoService.getFormaPagos().then(
                res => {
                    this.formasPago = res.data;
                }
              ).catch(err => {
                this.message = `Ocurrio un error al cargar los medio de pago ` + err
              })
            },
            volveraLista() {
                this.$store.dispatch('cambiarMostrarDetalle',true) 
            },
            initialData(){

            }

        },
        computed: {
        }
    }


</script>

<style scoped lang="css">
</style>
