<template>
    <div class="container text-left w-75 mt-3">
        <!--        formulario tareasl -->
        <div>
            <h2>Agregar gastos</h2>
            <hr/>
            <vue-form :state="formState" @submit.prevent="sendForm()">

                <validate class="form-group" tag="div">
                    <label for="idViaje">idViaje</label>
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
                    <div slot="required" class="alert alert-danger my-1">La idViaje es requerida</div>
                    <div slot="minlength" class="alert alert-danger my-1">La idViaje debe tener mas de {{minLength}}
                        caracteres
                    </div>
                    <div slot="maxlength" class="alert alert-danger my-1">La idViaje debe tener menos de {{maxLength}}
                        caracteres
                    </div>
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="name">idTipoGasto</label>
                    <input
                            type="number"
                            class="form-control"
                            id="name"
                            name="name"
                            v-model.trim="formData.name"
                            required
                    >
                </validate>
                <field-messages name="name" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">El nombre es requerido</div>
                </field-messages>


                <validate class="form-group" tag="div">
                    <label for="importe">importe</label>
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
                    <div slot="required" class="alert alert-danger my-1">el importe es requerido</div>
                    <div slot="importe" class="alert alert-danger my-1">Importe no válido</div>
                </field-messages>

                <button type="submit" class="btn btn-primary" :disabled="formState.$invalid">Submit</button>

            </vue-form>


        </div>

        <!--    Display tareas -->
        <div class="mt-5 mb-5">
            <h2>Gastos</h2>
            <hr/>
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">idDetalle</th>
                    <th scope="col">idViaje</th>
                    <th scope="col">idTipoGasto</th>
                    <th scope="col">importe</th>
                    <th scope="col">notas</th>
                    <th scope="col">idFormaPago</th>
                    <th scope="col">fecha</th>
                    <th scope="col">aprobado</th>
                    <th scope="col">foto</th>
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
                    <td>#link</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="js">
    //import gastoService from '../services/gasto.service.js'
    import Axios from 'axios'
    export default {
        name: 'src-components-tareas',
        props: [],
        mounted(){
            this.getGastos()
        },
        beforeCreate() {
            //this.$store.commit('setLogin', true);
        },
        data() {
            return {
                gastos:[],
                formState: {},
                formData: this.getInitialData(),
                minLength: 10,
                maxLength: 50
            }
        },
        methods: {
            getInitialData() {
                return {
                    description: '',
                    name: '',
                    email: '',
                }
            },
            sendForm() {
                console.log(this.formData)
                this.$store.dispatch('addTarea', this.formData)
                this.getInitialData()
            },
            getGastos(){
                Axios.get('http://localhost:8080/api/detallegasto')
                .then(res => {
                        this.gastos = res.data
                        console.log(res.data)
                })
                .catch(err => {
                    console.log("Error from service,", err)
                })
            }
        },
        computed: {
        }
    }


</script>

<style scoped lang="css">
</style>
