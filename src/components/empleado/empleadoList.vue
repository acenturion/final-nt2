<template>
    <div class="table-fluid">
        <table class="table table-sm">
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">User Name</th>
                <th scope="col">Categoria</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in empleados" v-bind:key="item.idEmpleado">
                <th scope="row">{{item.idEmpleado}}</th>
                <td>
                    <input v-if="index==idEditable" type="text"  name="descripcion" v-model="formData.nombre" style="width:10em;height:2.3em; border-radius:2.5px ;">
                    <input v-else type="text"  name="nombre" :value="item.nombre"  style="width:10em; " disabled>
                </td>
                <td>{{item.userName}}</td>
                <select v-if="index==idEditable"
                        v-model="formData.idCategoriaEmpleado"
                        class="form-control" id="categoria-select" style="width:8em">
                    <option v-for="categoria in categorias" v-bind:key="categoria.idCategoria" :value="categoria.idCategoria">
                        {{categoria.descripcion}}
                    </option>
                </select>
                <input v-else type="text"  name="idPais" :value="asignarNombre(item.idCategoriaEmpleado)" style="width:8em" disabled>
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
                            @click="enviarEmpleadoEditado()"
                    ><i class="fas fa-cloud-upload-alt"></i>
                    </button>
                    <button v-show="index!=idEditable"
                            class="btn btn-danger btn-sm"
                            @click="eliminarEmpleado(item.idEmpleado)"
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
    </div>
</template>

<script>
    import EmpleadoService from "../../services/empleado.service";
    import CategoriaService from '../../services/categoria.service.js'

    export default {
        data() {
            return {
                empleados: [],
                categorias: [],
                idEditable: -1,
                formData:{}
            }
        },
        beforeMount() {
            this.cargarEmpleados();
            this.cargarCategorias();
        },

        methods: {
            eliminarEmpleado(id) {
                EmpleadoService.delEmpleado(id).then(
                    res => {
                        this.message = `[${res.data}] Se elimino el empleado`
                        this.cargarEmpleados();
                    }
                ).catch((err) => {
                    console.log(err)
                    //todo cambiar en el back la respuesta
                    this.message = `Ocurrio un error al eliminar el empleado`
                });
            },
            cargarEmpleados() {
                EmpleadoService.getEmpleados().then(res => {
                    this.empleados = res.data;
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
                if (indice > -1) {
                    this.formData = this.empleados[indice]
                }
            },
            enviarEmpleadoEditado() {
                console.log("editar empleado", this.formData)
                EmpleadoService.editEmpleado(this.formData).then(
                    res => {
                        this.message = `Se edito el el empleado [${res.data.idEmpleado}]`
                        this.formData = {};
                        this.cargarEmpleados();
                    }
                ).catch(err => {
                    this.message = `Ocurrio un error al editar el empleado ` + err
                })
                this.idEditable = -1;
            },
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
</style>
