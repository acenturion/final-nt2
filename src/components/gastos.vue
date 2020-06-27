<template>
    <div class="container text-left w-75 mt-3">
        <!--        formulario gastos -->
        <div>
            <h2>Agregar Gastos</h2>
            <hr/>
            <vue-form :state="formState" @submit.prevent="sendForm()">

                <validate class="form-group" tag="div">
                    <label for="idViaje">Identificador del Viaje</label>
                    <input
                            type="number"
                            class="form-control"
                            id="idViaje"
                            name="idViaje"
                            v-model.trim="formData.idViaje"
                            :minlength="minLength"
                            :maxlength="maxLength"
                            required
                    >
                </validate>
                <field-messages name="idViaje" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">El id del viaje es requerida</div>
                    <div slot="minlength" class="alert alert-danger my-1">El id del viaje debe tener mas de {{minLength}} caracteres</div>
                    <!-- <div slot="maxlength" class="alert alert-danger my-1">La idViaje debe tener menos de {{maxLength}} caracteres</div> -->
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="idTipoGasto">Tipo de Gasto</label>
                    <input
                            type="number"
                            class="form-control"
                            id="idTipoGasto"
                            name="idTipoGasto"
                            v-model.trim="formData.idTipoGasto"
                            :minlength="minLength"
                            :maxlength="maxLength"
                            required
                    >
                </validate>
                <field-messages name="idTipoGasto" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La idTipoGasto es requerida</div>
                    <div slot="minlength" class="alert alert-danger my-1">La idTipoGasto debe tener mas de {{minLength}} caracteres</div>
                    <!-- <div slot="maxlength" class="alert alert-danger my-1">La idTipoGasto debe tener menos de {{maxLength}} caracteres</div> -->
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="importe">Importe</label>
                    <input
                            type="number"
                            class="form-control"
                            id="importe"
                            name="importe"
                            v-model.trim="formData.importe"
                            :minlength="minLength"
                            :maxlength="maxLength"
                            required
                    >
                </validate>
                <field-messages name="importe" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La importe es requerida</div>
                    <div slot="minlength" class="alert alert-danger my-1">La importe debe tener mas de {{minLength}} caracteres</div>
                    <!-- <div slot="maxlength" class="alert alert-danger my-1">La importe debe tener menos de {{maxLength}} caracteres</div> -->
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="notas">Notas</label>
                    <input
                            type="text"
                            class="form-control"
                            id="notas"
                            name="notas"
                            v-model.trim="formData.notas"
                            :minlength="minLength"
                            :maxlength="maxLength"
                            required
                    >
                </validate>
                <field-messages name="notas" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La notas es requerida</div>
                    <div slot="minlength" class="alert alert-danger my-1">La notas debe tener mas de {{minLength}} caracteres</div>
                    <div slot="maxlength" class="alert alert-danger my-1">La notas debe tener menos de {{maxLength}} caracteres</div>
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="idFormaPago">Medio de Pago</label>
                    <input
                            type="number"
                            class="form-control"
                            id="idFormaPago"
                            name="idFormaPago"
                            v-model.trim="formData.idFormaPago"
                            :minlength="minLength"
                            :maxlength="maxLength"
                            required
                    >
                </validate>
                <field-messages name="idFormaPago" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">El medio de pago es requerida</div>
<!--                     <div slot="minlength" class="alert alert-danger my-1">La idFormaPago debe tener mas de {{minLength}} caracteres</div>
                    <div slot="maxlength" class="alert alert-danger my-1">La idFormaPago debe tener menos de {{maxLength}} caracteres</div> -->
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="fecha">Fecha del Ticket</label>
                    <input
                            type="date"
                            class="form-control"
                            id="fecha"
                            name="fecha"
                            v-model.trim="formData.fecha"
                            :minlength="minLength"
                            :maxlength="maxLength"
                            required
                    >
                </validate>
                <field-messages name="fecha" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La fecha es requerida</div>
<!--                     <div slot="minlength" class="alert alert-danger my-1">La fecha debe tener mas de {{minLength}} caracteres</div>
                    <div slot="maxlength" class="alert alert-danger my-1">La fecha debe tener menos de {{maxLength}} caracteres</div> -->
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="foto">Foto</label>
                    <input
                            type="file"
                            class="form-control"
                            id="foto"
                            name="foto"
                    >
                </validate>
                <field-messages name="foto" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La foto es requerida</div>
                </field-messages>

                <button type="submit" class="btn btn-primary" :disabled="formState.$invalid">Enviar</button>
                <button type="button" v-on:click="enviarGastoEditado()" class="btn btn-warning mx-4" :disabled="formState.$invalid">Editar</button>
            </vue-form>
        </div>
        <!--    Alert!-->
        <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>

        <!--    Display gastos -->
        <div class="mt-5 mb-5">
            <h2>Gastos</h2>
            <hr />
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">Gasto</th>
                    <th scope="col">Viaje</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Importe</th>
                    <th scope="col">Notas</th>
                    <th scope="col">Medio</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Aprobado</th>
                    <th scope="col">Foto</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Borrar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(gasto) in this.gastos" v-bind:key="gasto.idDetalle">
                    <th scope="row">{{gasto.idDetalle}}</th>
                    <td>{{gasto.idViaje}}</td>
                    <td>{{gasto.idTipoGasto}}</td>
                    <td>{{gasto.importe}}</td>
                    <td>{{gasto.notas}}</td>
                    <td>{{gasto.idFormaPago}}</td>
                    <td>{{gasto.fecha | formatDate }}</td>
                    <td>{{gasto.aprobado}}</td>
                    <div v-if="gasto.foto != null">
                        <!-- <td><img :src="gasto.foto.data" :alt="gasto.notas"></td> -->
                        <td>:)</td>
                    </div>
                    <div v-else>
                        <td>x</td>
                    </div>
                    <td>
                        <button
                            class="btn btn-warning"
                            v-on:click="editarGasto(gasto)"
                        >Editar
                        </button>
                    </td>
                    <td>
                        <button
                            class="btn btn-danger"
                            v-on:click="eliminarGasto(gasto.idDetalle)"
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
    import GastoService from '../services/gasto.service.js'
    export default {
        name: 'src-components-gasto',
        props: [],
        mounted() {},
        data() {
            return {
                gastos: this.cargarGastos(),
                formState: {},
                formData: this.getInitialData(),
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
            getInitialData() {
                return {
                    //idDetalle: '',
                    idViaje: '14',
                    idTipoGasto: '10',
                    importe: '123.45',
                    notas: 'taxi',
                    idFormaPago: '3',
                    fecha: '2020-01-05',
                    aprobado: ''
                    //foto: ''
                }
            },
            sendForm() {
              GastoService.addGasto(this.formData).then(
                res => {
                  this.message = `Se agrego el gasto [${res.data.idDetalle}] ${this.formData.idViaje}`
                  this.cargarGastos();
                  this.getInitialData()
                }
              ).catch(err => {
                this.message = `Ocurrio un error al agregar un gasto` + err
              })
            },
            editarGasto(gasto) {
              this.formData = gasto
            },
            eliminarGasto(id) {
              GastoService.delGasto(id).then(
                res => {
                  this.message = `[${res.data.idDetalle}] Se elimino el gasto`
                  this.cargarGastos();
                }
              ).catch(err => {
                //console.log(err)
                //todo cambiar en el back la respuesta
                this.message = `Ocurrio un error al eliminar el gasto` + err
              });
            },
            enviarGastoEditado() {
              GastoService.editGasto(this.formData).then(
                res => {
                  this.message = `Se edito el gasto [${res.data.idDetalle}]`
                  this.cargarGastos()
                  this.formData = this.getInitialData();
                }
              ).catch(err => {
                this.message = `Ocurrio un error al editar un gasto` + err
              })
            },
            cargarGastos(){
              GastoService.getGastos().then(
                res => {
                    this.gastos = res.data;
                }
              ).catch(err => {
                this.message = `Ocurrio un error al cargar un gastos` + err
              })
            }
        },
        computed: {
        }
    }


</script>

<style scoped lang="css">
</style>
