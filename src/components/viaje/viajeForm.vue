<template>
    <div class="container text-left ">
        <div>
            <h2 class="bg-dark text-white">Agregar Viajes</h2>
            <hr/>
            <vue-form :state="formState" @submit.prevent="sendForm()">
            <div class="row">
              <div class="col-6">
                <validate class="form-group" tag="div">
                    <label for="fechaInicio" class="mb-2 mr-sm-3">Fecha Inicio</label>
                    <input
                            type="date"
                            class="form-control mb-2 mr-sm-2"
                            id="fechaInicio"
                            name="fechaInicio"
                            v-model.trim="formData.fechaInicio"
                            required
                    >
                </validate>
                <field-messages name="fechaInicio" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La Fecha es Requerida</div>
                </field-messages>
              </div>
              <div class="col-6">
                <validate class="form-group" tag="div">
                    <label for="fechaFin" class="mb-2 mr-sm-3">Fecha Fin</label>
                    <input
                            type="date"
                            class="form-control mb-2 mr-sm-2"
                            id="fechaFin"
                            name="fechaFin"
                            v-model.trim="formData.fechaFin"
                            required
                    >
                </validate>
                <field-messages name="fechaFin" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La Fecha es Requerida</div>
                </field-messages>
              </div> 
            </div>
            <div class="row">
              <div class="col-6">
                <div class="form-group" tag="div">
                    <label for="idPais" class="mb-2 mr-sm-3">Pais</label>
                    <select 
                            v-model="formData.idPais" 
                            class="form-control mb-2 mr-sm-2" 
                            id="idPais" 
                            name="idPais"
                    >
                        <option selected>Seleccione un Tipo de Gasto</option>
                        <option v-for="(item, index) in paises" :key="index">
                            {{item.idPais}}
                        </option>
                    </select>
                </div>
              </div>
              <div class="col-6">
                  <validate class="form-group" tag="div">
                    <label for="destino" class="mb-2 mr-sm-2">Destino</label>
                    <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
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
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <validate class="form-group">
                    <label for="idEmpleado" class="mb-2 mr-sm-2">Empleado</label>
                    <select 
                            v-model="formData.idEmpleado" 
                            class="form-control mb-2 mr-sm-2" 
                            id="idEmpleado" 
                            name="Nombre"
                            
                    >
                        <option selected>Seleccione un Viajante</option>
                        <option v-for="(item, index) in empleados" :key="index">
                            {{item.idEmpleado}}
                        </option>
                    </select>
                </validate>
              </div>
              <div class="col-6">
                <validate class="form-group" tag="div">
                    <label for="presupuesto" class="mb-2 mr-sm-2">Presupuesto</label>
                    <input
                            type="number"
                            class="form-control mb-2 mr-sm-2"
                            id="presupuesto"
                            name="presupuesto"
                            v-model.trim="formData.presupuesto"
                            required
                    >
                </validate>
                <field-messages name="presupuesto" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La presupuesto es requerido</div>
                </field-messages>
              </div>
            </div>
                 <validate class="form-group" tag="div">
                    <label for="descripcion" class="mb-2 mr-sm-2">Descripcion</label>
                    <input
                            type="text"
                            class="form-control mb-2 mr-sm-2"
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
 

                <button type="submit" class="btn btn-primary" :disabled="formState.$invalid"><i class="fas fa-cloud-upload-alt"></i></button>
                <button type="button" v-on:click="volveraLista()" class="btn btn-warning mx-4"><i class="far fa-arrow-alt-circle-left"></i></button>

            </vue-form>

            </div>

            <!--    Alert!-->
            <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>

            
            
    </div>
</template>
<script lang="js">
    import ViajeService from '../../services/viaje.service.js'
    import EmpleadoService from '../../services/empleado.service.js'
    import PaisService from '../../services/pais.service.js'
    
    
    export default {
        name: 'src-components-viajes',
        props: [],
        beforeMount() {
            this.cargarEmpleados(),
            this.cargarPaises()
        },
        data() {
            return {
                paises: this.cargarPaises(),
                empleados: [],
                paises: [],
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
                    this.getInitialData()
                    this.$store.commit('setMostrar',true)    
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
            editarViaje(item) {
              this.formData = item
              this.formData.fechaInicio = new Date(item.fechaInicio).toISOString().substr(0, 10)
              this.formData.fechaFin = new Date(item.fechaFin).toISOString().substr(0, 10)
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
