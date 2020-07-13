<template>
    <div class="table-fluid">
        <Paginate
                :page-count="this.totalPage"
                :page-range="this.totalPage"
                :margin-pages="0"
                :click-handler="clickPaginationCallback"
                :prev-text="'<<'"
                :next-text="'>>'"
                :container-class="'pagination'"
                :page-class="'page-item'"
                :page-link-class="'page-link'"
                :prev-link-class="'page-link'"
                :next-link-class="'page-link'"
                :hide-prev-next="false"
        />
        <table class="table table-sm">
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <Loader :isLoading="isLoading"/>
            <tbody>
            <tr v-for="(item,index) in pagina" v-bind:key="item.idPais">
                <td scope="row">{{item.idPais}}</td>
                <td>
                    <input v-if="index==idEditable" type="text"  name="descripcion" v-model="item.nombre" style="width:10em;height:2.3em; border-radius:2.5px ;">
                    <input v-else type="text"  name="descripcion" :value="item.nombre"  style="width:10em; " disabled>
                </td>
                <td class="spacing">
                    <button v-show="index!=idEditable"
                            class="btn btn-warning btn-sm"
                            @click="editable(index)"
                    ><i class="fas fa-pencil-alt"></i>
                    </button>
                    <button v-show="index==idEditable"
                            class="btn btn-success btn-sm"
                            @click="enviarPaisEditado(item)"
                    ><i class="fas fa-cloud-upload-alt"></i>
                    </button>
                    <button v-show="index!=idEditable"
                            class="btn btn-danger btn-sm"
                            @click="eliminarPais(item.idPais)"
                    ><i class="fas fa-trash-alt"></i>
                    </button>

                    <button v-show="index==idEditable"
                            class="btn btn-danger btn-sm"
                            v-on:click="editable(-1)"
                    ><i class="fas fa-times-circle"></i>
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
    import Paginate from 'vuejs-paginate'
    import {MisMixins} from '../../utils/pagmixins.js'
    import Loader from "../loader";

    export default {
        name: 'src-components-viajesList',
        components: {
            Loader,
            Paginate
        },
         mixins: [MisMixins],
        beforeMount() {
                this.cargarPaises()
        },
        data() {
            return {
                paises: [],
                idEditable: -1,
                message: null,
                pagina:[],
                registrosPorPagina: 5,
                isLoading: true
            }
        },
        methods: {
            clickPaginationCallback (pageNumber) {
                this.pagina = this.getPage(pageNumber, this.registrosPorPagina, this.paises)
            },
            cargarPaises() {
                PaisService.getPaises().then(res => {
                    this.paises = res.data;
                    this.clickPaginationCallback(1)
                    this.isLoading = false;
                }).catch(
                    (err) =>{
                        console.log(err)
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
            },
            enviarPaisEditado(paisEditado) {
                PaisService.editPais(paisEditado).then(
                    res => {
                        this.message = `Se edito el pais [${res.data.idPais}]`
                    }
                ).catch(err => {
                    this.message = `Ocurrio un error al editar el pais ` + err
                })

                this.idEditable = -1;
            },
        },
        computed:{
            totalPage(){
                return  this.getTotalPage(this.registrosPorPagina, this.paises)
            }
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
    .spacing button{
        margin-right: 5%;
        margin-bottom: 5%;
    }
</style>
