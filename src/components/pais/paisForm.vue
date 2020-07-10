<template>
    <div class="container text-left">
        <div>
            <h2 class="bg-dark text-white">Agregar Pais</h2>
            <hr/>
            <vue-form :state="formState" @submit.prevent="sendForm()">
                <validate class="form-group" tag="div">
                    <label for="nombre">Nombre del pais</label>
                    <input
                            type="text"
                            class="form-control"
                            id="nombre"
                            name="nombre"
                            v-model.trim="formData.nombre"
                            required
                    >
                </validate>

                <button type="submit"
                        class="btn btn-primary"
                        :disabled="formState.$invalid"><i
                        class="fas fa-cloud-upload-alt"></i>
                </button>
                <button type="button"
                        v-on:click="volveraLista()"
                        class="btn btn-warning mx-4"><i
                        class="far fa-arrow-alt-circle-left"></i>
                </button>
            </vue-form>
        </div>
        <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>
    </div>
</template>

<script>
    import PaisService from "../../services/pais.service.js";

    export default {
        name: "pais.vue",
        data() {
            return {
                formState: {},
                formData: this.getInitialData(),
                message: ''
            }
        },
        methods: {
            sendForm() {
                PaisService.addPais(this.formData)
                    .then(
                        res => {
                            console.log(res)
                            this.message = `Se agrego el pais [${res.data.idPais}] - ${res.data.nombre}`
                            this.formData = this.getInitialData()
                        })
                    .catch(
                        err => {
                            this.message = `Ocurrio un error al agregar un pais ` + err.message
                        })
            },
            getInitialData() {
                return {
                    idPais: 0,
                    nombre: ''
                }
            },
            volveraLista() {
                this.$store.commit('setMostrar',true)
            }
        }
    }
</script>

<style scoped lang="css">
    h2 {
        text-align: center;
        border-radius: 3px
    }
</style>
