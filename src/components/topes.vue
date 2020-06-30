<template>
    <div class="container text-left w-75 mt-3">
        <!--        Formulario Topes -->
        <div>
            <h2>Agregar Topes</h2>
            <hr/>
            <vue-form :state="formState" @submit.prevent="sendForm()">

                <div class="form-group">
                    <label for="idViaje">Identificador del Viaje</label>
                    <select 
                            v-model="formData.idViaje" 
                            class="form-control" 
                            id="idViaje" 
                            name="idViaje"
                            @change="onChangeIdViaje($event)"
                    >
                        <option v-for="(item, index) in viajes" :key="index">
                            {{item.idViaje}}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="idTipoGasto">Identificador del Tipo de Gasto</label>
                    <select 
                            v-model="formData.idTipoGasto" 
                            class="form-control" 
                            id="idTipoGasto" 
                            name="idTipoGasto"
                    >
                        <option v-for="(item, index) in tiposGasto" :key="index">
                            {{item.idTipoGasto}}
                        </option>

                    </select>
                </div>

                <validate class="form-group" tag="div">
                    <label for="importe">Importe Tope</label>
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
                    <div slot="required" class="alert alert-danger my-1">La importe tope es requerida</div>
                </field-messages>

                <button type="submit" class="btn btn-primary" :disabled="formState.$invalid">Enviar</button>
                <button type="button" v-on:click="enviarTopeEditado()" class="btn btn-warning mx-4" :disabled="formState.$invalid">Editar</button>
            </vue-form>
        </div>
        <!--    Alert!-->
        <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>

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
                    <th scope="col">Editar</th>
                    <th scope="col">Borrar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in this.topes" v-bind:key="index">
                    <th scope="row">{{index+1}}</th>
                    <td>{{item.idViaje}}</td>
                    <td>{{item.idTipoGasto}}</td>
                    <td>{{item.importe}}</td>
                    <td>
                        <button
                            class="btn btn-warning"
                            v-on:click="editarTope(item)"
                        >Editar
                        </button>
                    </td>
                    <td>
                        <button
                            class="btn btn-danger"
                            v-on:click="eliminarTope(item)"
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
    import ViajeService from '../services/viaje.service.js'
    import TipoGastoService from '../services/tipogasto.service.js'
    import TopeService from '../services/tope.service.js'
    export default {
        name: 'src-components-gasto',
        props: [],
        beforeMount(){},
        mounted() {},
        data() {
            return {
                viajes: this.cargarViajes(),
                tiposGasto: this.cargarTiposGasto(),
                topes: [],
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
          onChangeIdViaje(event) {
            this.cargarTopes(event.target.value)
          },
          getInitialData() {
              return {
                  importe: '12345.67'
              }
          },
          sendForm() {
            TopeService.addTope(this.formData)
              .then(
              res => {
                this.message = `Se agrego el gasto [${res.data.idViaje}] al viaje nro. [${this.formData.idTipoGasto}]`
                this.getInitialData()
                this.cargarTopes(res.data.idViaje)
              })
              .catch(
                err => {
                this.message = `Ocurrio un error al agregar un gasto ` + err.message
            })
          },
          editarTope(tope) {
            this.formData = tope
          },
          eliminarTope(tope) {
            TopeService.delTope(tope).then(
              res => {
                this.message = `Se elimino el tope [${res.data.idViaje}] [${res.data.idTipoGasto}]`
                this.getInitialData()
                this.cargarTopes(res.data.idViaje)
              }
            ).catch(err => {
              this.message = `Ocurrio un error al eliminar el tope ` + err
            });
          },
          enviarTopeEditado() {
            TopeService.editTope(this.formData).then(
              res => {
                this.message = `Se edito el Tope [${res.data.idViaje}] [${res.data.idTipoGasto}]`
                this.getInitialData()
                this.cargarTopes(res.data.idViaje)
              }
            ).catch(err => {
              this.message = `Ocurrio un error al editar un tope ` + err
            })
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
                //let idViaje = this.formData.idViaje
                this.tiposGasto = res.data;
              }
            ).catch(err => {
              this.message = `Ocurrio un error al cargar los tipos de gasto ` + err
            })
          }
        },
        computed: {
        }
    }


</script>

<style scoped lang="css">
</style>
