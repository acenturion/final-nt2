<template>

    <div class="container text-left w-75 mt-3">
        <!--        Formulario Viajes -->
        <div>
            <h2>Agregar Viajes</h2>
            <hr/>
            <vue-form :state="formState" @submit.prevent="sendForm()">

                <validate class="form-group" tag="div">
                    <label for="fechaInicio">Fecha de Inicio del Viaje</label>
                    <input
                            type="date"
                            class="form-control"
                            id="fechaInicio"
                            name="fechaInicio"
                            v-model.trim="formData.fechaInicio"
                            required
                    >
                </validate>
                <field-messages name="fechaInicio" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La Fecha es Requerida</div>
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="fechaFin">Fecha de Fin del Viaje</label>
                    <input
                            type="date"
                            class="form-control"
                            id="fechaFin"
                            name="fechaFin"
                            v-model.trim="formData.fechaFin"
                            required
                    >
                </validate>
                <field-messages name="fechaFin" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La Fecha es Requerida</div>
                </field-messages>

                <div class="form-group">
                    <label for="idEmpleado">Identificador del Empleado</label>
                    <select 
                            v-model="formData.idEmpleado" 
                            class="form-control" 
                            id="idEmpleado" 
                            name="idEmpleado"
                    >
                        <option selected>Seleccione un Medio de Pago</option>
                        <option v-for="(item, index) in empleados" :key="index">
                            {{item.idEmpleado}}
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
                    <div slot="minlength" class="alert alert-danger my-1">La descripcion debe tener mas de {{minLength}} caracteres</div>
                    <div slot="maxlength" class="alert alert-danger my-1">La descripcion debe tener menos de {{maxLength}} caracteres</div>
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="destino">Destino</label>
                    <input
                            type="text"
                            class="form-control"
                            id="destino"
                            name="destino"
                            v-model.trim="formData.destino"
                            required
                    >
                </validate>
                <field-messages name="destino" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La destino es requerida</div>
                    <div slot="minlength" class="alert alert-danger my-1">La destino debe tener mas de {{minLength}} caracteres</div>
                    <div slot="maxlength" class="alert alert-danger my-1">La destino debe tener menos de {{maxLength}} caracteres</div>
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="presupuesto">Presupuesto</label>
                    <input
                            type="number"
                            class="form-control"
                            id="presupuesto"
                            name="presupuesto"
                            v-model.trim="formData.presupuesto"
                            required
                    >
                </validate>
                <field-messages name="presupuesto" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La presupuesto es requerido</div>
                </field-messages>

                <div class="form-group">
                    <label for="idPais">Pais</label>
                    <select 
                            v-model="formData.idPais" 
                            class="form-control" 
                            id="idPais" 
                            name="idPais"
                    >
                        <option selected>Seleccione un Tipo de Gasto</option>
                        <option v-for="(item, index) in paises" :key="index">
                            {{item.idPais}}
                        </option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary" :disabled="formState.$invalid">Enviar</button>
                <button type="button" v-on:click="enviarViajeEditado()" class="btn btn-warning mx-4" :disabled="formState.$invalid">Editar</button>

            </vue-form>

        </div>

        <!--    Alert!-->
        <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>

        <!--    Display viajes -->
        <div class="mt-5 mb-5">
            <h2>Viajes</h2>
            <hr />
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">idViaje</th>
                    <th scope="col">fechaInicio</th>
                    <th scope="col">fechaFin</th>
                    <th scope="col">idEmpleado</th>
                    <th scope="col">descripcion</th>
                    <th scope="col">destino</th>
                    <th scope="col">presupuesto</th>
                    <th scope="col">idPais</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Borrar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item) in this.viajes" v-bind:key="item.idDetalle">
                    <th scope="row">{{item.idViaje}}</th>
                    <td>{{item.fechaInicio | formatDate}}</td>
                    <td>{{item.fechaFin | formatDate}}</td>
                    <td>{{item.idEmpleado}}</td>
                    <td>{{item.descripcion}}</td>
                    <td>{{item.destino}}</td>
                    <td>{{item.presupuesto}}</td>
                    <td>{{item.idPais}}</td>
                    <td>
                        <button
                            class="btn btn-warning"
                            v-on:click="editarViaje(item)"
                        >Editar
                        </button>
                    </td>
                    <td>
                        <button
                            class="btn btn-danger"
                            v-on:click="eliminarViaje(item.idViaje)"
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
    import EmpleadoService from '../services/empleado.service.js'
    import ViajeService from '../services/viaje.service.js'
    import PaisService from '../services/pais.service.js'
    export default {
        name: 'src-components-viajes',
        props: [],
        mounted() {
        },
        data() {
            return {
                viajes: this.cargarViajes(),
                empleados: this.cargarEmpleados(),
                paises: this.cargarPaises(),
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
            cargarViajes(){
              ViajeService.getViajes().then(
                res => {
                    this.viajes = res.data;
                }
              ).catch(err => {
                this.message = `Ocurrio un error al cargar los viajes ` + err
              })
            },
            getInitialData() {
                let ini = new Date()
                let fin = new Date(ini.getFullYear(), ini.getMonth()+3, ini.getDate())
                return {
                    idViaje: 0,
                    fechaInicio: ini.toISOString().substr(0, 10),
                    fechaFin: fin.toISOString().substr(0, 10),
                    idEmpleado: '2',
                    descripcion: 'viaje de 3 meses',
                    destino: 'altamar',
                    presupuesto: 65000.12,
                    idPais: 1
                }
            },
            sendForm() {
              ViajeService.addViaje(this.formData)
                .then(
                    res => {
                    this.message = `Se agrego el viaje nro. [${res.data[0]}]`
                    this.cargarViajes()
                    this.getInitialData()
                })
                .catch(
                    err => {
                    this.message = `Ocurrio un error al agregar un viaje ` + err.message
              })
            },
            cargarEmpleados(){
              EmpleadoService.getEmpleados().then(res => {
                this.empleados = res.data;
              })
            },
            cargarPaises(){
              PaisService.getPaises().then(res => {
                this.paises = res.data;
              })
            },
            eliminarViaje(id) {
              ViajeService.delViaje(id).then(
                res => {
                  this.message = `Se elimino el viaje [${res.data.idViaje}]`
                  this.cargarViajes();
                }
              ).catch(err => {
                //console.log(err)
                //todo cambiar en el back la respuesta
                this.message = `Ocurrio un error al eliminar el viaje ` + err
              });
            },
            editarViaje(item) {
              this.formData = item
              this.formData.fechaInicio = new Date(item.fechaInicio).toISOString().substr(0, 10)
              this.formData.fechaFin = new Date(item.fechaFin).toISOString().substr(0, 10)
            },
            enviarViajeEditado() {
              ViajeService.editViaje(this.formData).then(
                res => {
                  this.message = `Se edito el viaje [${res.data.idViaje}]`
                  this.cargarViajes()
                  this.formData = this.getInitialData();
                }
              ).catch(err => {
                this.message = `Ocurrio un error al editar el viaje ` + err
              })
            }
        },
        computed: {}
    }


</script>

<style scoped lang="css">
    .src-components-viajes {

    }
</style>
