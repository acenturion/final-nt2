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
                <th scope="col">User Name</th>
                <th scope="col">Categoria</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <Loader :isLoading="isLoading" />
            <tbody>
            <tr v-for="(item, index) in pagina" v-bind:key="item.idEmpleado">
                <th scope="row">{{item.idEmpleado}}</th>
                <td>
                    <input v-if="index==idEditable" type="text"  name="descripcion" v-model="item.nombre" style="width:10em;height:2.3em; border-radius:2.5px ;">
                    <input v-else type="text"  name="nombre" :value="item.nombre"  style="width:10em; " disabled>
                </td>
                <td>{{item.userName}}</td>
                <select v-if="index==idEditable"
                        v-model="item.idCategoriaEmpleado"
                        class="form-control" id="categoria-select" style="width:8em">
                    <option v-for="categoria in categorias" v-bind:key="categoria.idCategoria" :value="categoria.idCategoria">
                        {{categoria.descripcion}}
                    </option>
                </select>
                <input v-else type="text"  name="idPais" :value="asignarNombre(item.idCategoriaEmpleado)" style="width:8em" disabled>
                <td class="spacing">
                    <button v-show="index!=idEditable"
                            class="btn btn-warning btn-sm"
                            @click="editable(index)"
                    ><i class="fas fa-pencil-alt"></i>
                    </button>
                    <button v-show="index==idEditable"
                            class="btn btn-success btn-sm"
                            @click="enviarEmpleadoEditado(item)"
                    ><i class="fas fa-cloud-upload-alt"></i>
                    </button>
                    <button v-show="index!=idEditable"
                            class="btn btn-danger btn-sm"
                            @click="eliminarEmpleado(item.idEmpleado)"
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

<script>
    import EmpleadoService from "../../services/empleado.service";
    import CategoriaService from '../../services/categoria.service.js'
    import Paginador from "../../utils/paginacion";
    import Paginate from "vuejs-paginate";
    import Loader from "../loader";

    export default {
        data() {
            return {
                empleados: [],
                categorias: [],
                idEditable: -1,
                pagina:[],
                registrosPorPagina: 5,
                message: null,
                isLoading: true
            }
        },
        beforeMount() {
            this.cargarEmpleados();
            this.cargarCategorias();
        },
        components: {
            Loader,
            Paginate
        },
        methods: {
            eliminarEmpleado(id) {
                EmpleadoService.delEmpleado(id).then(
                    () => {
                        this.message = `Se elimino el empleado`
                        this.cargarEmpleados();
                    }
                ).catch((err) => {
                    console.log(err)
                    this.message = `Ocurrio un error al eliminar el empleado`
                });
            },
            cargarEmpleados() {
                EmpleadoService.getEmpleados().then(res => {
                    this.empleados = res.data;
                    this.clickPaginationCallback(1)
                    this.isLoading = false;
                }).catch(
                    () =>{
                        console.log("Ocurrio un error al cargar los empleados")
                    }
                );
            },
            asignarNombre(idCategoriaEmpleado) {
                let cat = this.categorias.find(categoria => {
                    return categoria.idCategoria === idCategoriaEmpleado
                })

                if (!cat) {
                    return '';
                }
                return cat.descripcion;
            },
            cargarCategorias() {
                return CategoriaService.getCategorias().then(
                    res => {
                        this.categorias = res.data;
                    }
                ).catch(
                    () =>{
                        console.log("Ocurrio un error al cargar las categorias")
                    }
                );
            },
            editable(indice) {
                this.idEditable = indice
            },
            enviarEmpleadoEditado(empleadoEditado) {
                EmpleadoService.editEmpleado(empleadoEditado).then(
                    res => {
                        console.log(res)
                        this.message = `Se edito el el empleado [${res.data[0].idEmpleado}]`
                    }
                ).catch(err => {
                    this.message = `Ocurrio un error al editar el empleado ` + err
                })
                this.idEditable = -1;
            },
            clickPaginationCallback (pageNumber) {
                this.pagina = Paginador.getPage(pageNumber, this.registrosPorPagina, this.empleados)
            }
        },
        computed :{
            totalPage(){
                return  Paginador.getTotalPage(this.registrosPorPagina, this.empleados)
            }
        }
    }
</script>

<style scoped>
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
