<template>
    <div class="table-fluid">
        <table class="table table-sm">
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in this.paises" v-bind:key="item.idPais">
                <td>{{item.idPais}}</td>

                <td>
                    <input v-if="index==idEditable" type="text"  name="descripcion" v-model="formData.nombre" style="width:10em;height:2.3em; border-radius:2.5px ;">
                    <input v-else type="text"  name="descripcion" :value="item.nombre"  style="width:10em; " disabled>
                </td>
                <td>

                    <button v-show="index!=idEditable"
                            class="btn btn-warning btn-sm"
                            @click="editable(index)"
                    ><i class="fas fa-pencil-alt"></i>
                    </button>
                </td>
                <td>
                    <button v-show="index==idEditable"
                            class="btn btn-success btn-sm"
                            @click="enviarPaisEditado()"
                    ><i class="fas fa-cloud-upload-alt"></i>
                    </button>
                    <button v-show="index!=idEditable"
                            class="btn btn-danger btn-sm"
                            @click="eliminarPais(item.idPais)"
                    ><i class="fas fa-trash-alt"></i>
                    </button>
                </td>
                <td>
                    <button v-show="index==idEditable"
                            class="btn btn-danger btn-sm"
                            v-on:click="editable(-1)"
                    ><i class="fas fa-times-circle"></i>
                    </button>
                    <button v-show="index!=idEditable"
                            class="btn btn-primary btn-sm"

                    ><i class="fas fa-list-alt"></i>
                    </button>
                </td>

            </tr>
            </tbody>
        </table>

        <!--    Alert!-->
        <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>
    </div>

</template>

<script lang="js">
    import PaisService from '../../services/pais.service.js'

    export default {
        name: 'src-components-viajesList',
        props: [],
        beforeMount() {
                this.cargarPaises()
        },
        data() {
            return {
                paises: [],
                idEditable: -1,
                formData: {},
                message: null
            }
        },
        methods: {
            cargarPaises() {
                PaisService.getPaises().then(res => {
                    this.paises = res.data;
                }).catch(
                    () =>{
                        this.message = `Ocurrio un error al traer paises`
                    }
                )
            },
            eliminarPais(id) {
                PaisService.delPais(id).then(
                    res => {
                        this.message = `Se elimino el pais [${res.data.idPais}]`
                        this.cargarPaises();
                    }
                ).catch(err => {
                    this.message = `Ocurrio un error al eliminar el pais ` + err
                });
            },
            editable(indice) {
                this.idEditable = indice
                if (indice > -1) {
                    this.formData = this.paises[indice]
                }
            },
            enviarPaisEditado() {
                PaisService.editPais(this.formData).then(
                    res => {
                        this.message = `Se edito el pais [${res.data.idPais}]`
                        this.formData = {};
                        this.cargarPaises();
                    }
                ).catch(err => {
                    this.message = `Ocurrio un error al editar el pais ` + err
                })

                this.idEditable = -1;
            },
        }
    }

</script>

<style scoped lang="css">

    input {
        border: none;

    }

    input:disabled {
        color: black;
        background-color: #e1e2e1;
    }
</style>
