<template>
    <div class="container text-left w-75 mt-3">
        <!--        Formulario Topes -->
        <div>
            <h2 class="bg-dark text-white">Agregar Topes</h2>
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
                        <option v-for="(item, index) in viajes" :key="index" :value="item.idViaje">
                            {{item.idViaje}} - {{item.destino}}
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
                        <option v-for="(item, index) in this.tiposDeGasto" :key="index" :value="item.idTipoGasto">
                            {{item.idTipoGasto}} - {{item.descripcion}}
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

                <button type="submit" class="btn btn-primary" :disabled="formState.$invalid"><i class="fas fa-cloud-upload-alt"></i></button>
                <button type="button" v-on:click="volveraLista()" class="btn btn-warning mx-4"><i class="far fa-arrow-alt-circle-left"></i></button>
            </vue-form>
        </div>
        <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>
    </div>
</template>

<script lang="js">
    import ViajeService from '../../services/viaje.service.js'
    import TipoGastoService from '../../services/tipogasto.service.js'
    import TopeService from '../../services/tope.service.js'
    export default {
        name: 'src-components-gasto',
        props: [],
        beforeMount(){},
        mounted() {},
        data() {
            return {
                viajes: this.cargarViajes(),
                tiposGasto: [],
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
            this.cargarTiposGasto()
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
                this.message = `Se agrego el tope al viaje [${res.data.idViaje}] y tipo de gasto [${this.formData.idTipoGasto}]`
                this.getInitialData()
                this.cargarTopes(res.data.idViaje)
                this.cargarTiposGasto()
              })
              .catch(
                err => {
                this.message = `Ocurrio un error al agregar un tope ` + err.message
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
          cargarTiposGasto(){
            let aExcluir = []
            this.topes.forEach(t => {
                aExcluir.push(t.idTipoGasto)
            });
            TipoGastoService.getTipoGastos().then(
              res => {
                if (aExcluir.length > 0){
                    console.log('Tipos de gasto excluidos: ', aExcluir);
                    this.tiposGasto = res.data.filter(t => aExcluir.indexOf(t.idTipoGasto) === -1)
                } else {
                    console.log('Se cargan todos los tipos de gasto');
                    this.tiposGasto = res.data;
                }
              }
            ).catch(err => {
              this.message = `Ocurrio un error al cargar los tipos de gasto ` + err
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
          volveraLista() {
              this.$store.dispatch('mostrarTopeList')
          }
        },
        computed: {
            tiposDeGasto(){
                return this.tiposGasto
            }
        }
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
