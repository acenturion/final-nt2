<template>
    <div class="container text-left">
        <div>
            <h2 class="bg-dark text-white">Agregar empleado</h2>
            <hr/>
            <vue-form :state="formState" @submit.prevent="sendForm()">

                <validate class="form-group" tag="div">
                    <label for="name">Nombre</label>
                    <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            v-model.trim="formData.nombre"
                            :maxlength=maxNameLength
                            autocomplete="off"
                            required
                    />
                </validate>
                <field-messages name="name" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">El nombre es requerido</div>
                    <div slot="maxlength" class="alert alert-danger my-1">El usuario tiene que ser menor a {{maxNameLength}}
                        caracteres
                    </div>
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="usuario">Usuario</label>
                    <input
                            type="text"
                            class="form-control"
                            id="usuario"
                            name="usuario"
                            v-model.trim="formData.userName"
                            :minlength="minLength"
                            :maxlength="maxLength"
                            autocomplete="off"
                            required
                    />
                </validate>
                <field-messages name="usuario" show="$dirty">
                    <div slot="minlength" class="alert alert-danger my-1">El usuario tiene que ser mayor a {{minLength}}
                        caracteres
                    </div>
                    <div slot="maxlength" class="alert alert-danger my-1">El usuario tiene que ser menor a {{maxLength}}
                        caracteres
                    </div>
                </field-messages>

                <validate class="form-group" tag="div">
                    <label for="pass">Contraseña</label>
                    <input
                            type="password"
                            class="form-control"
                            id="pass"
                            name="pass"
                            v-model.trim="formData.password"
                            :minlength="minLength"
                            :maxlength="maxLength"
                            required
                    />
                </validate>
                <field-messages name="pass" show="$dirty">
                    <div slot="minlength" class="alert alert-danger my-1">La constraseña tiene que ser mayor a
                        {{minLength}} caracteres
                    </div>
                    <div slot="maxlength" class="alert alert-danger my-1">La constraseña tiene que ser menor a
                        {{maxLength}} caracteres
                    </div>
                </field-messages>


                <div class="form-group">
                    <label for="exampleFormControlSelect1">Categoria</label>
                    <select
                            v-model="formData.idCategoriaEmpleado"
                            class="form-control" id="exampleFormControlSelect1">
                        <option v-for="categoria in categorias" v-bind:key="categoria.idCategoria"
                                :value="categoria.idCategoria">
                            {{categoria.descripcion}}
                        </option>
                    </select>
                </div>

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
    import EmpleadoService from '../../services/empleado.service.js'
    import CategoriaService from '../../services/categoria.service.js'

    export default {
        data() {
            return {
                categorias:[],
                formState: {},
                formData: this.getInitialData(),
                message: null,
                minLength: 5,
                maxLength: 10,
                maxNameLength:50
            }
        },
        beforeMount() {
          this.cargarCategorias();
        },
        methods: {
            getInitialData() {
                return {
                    idEmpleado: 0,
                    nombre: '',
                    userName: '',
                    password: '',
                    idCategoriaEmpleado: 0
                }
            },
            sendForm() {
                console.log("Agregar ", this.formData)
                EmpleadoService.addEmpleado(this.formData).then(
                    res => {
                        this.message = `Se agrego el empleado [${res.data[0]}] ${this.formData.nombre}`
                        this.cargarEmpleados();
                        this.limpiar();
                    }
                ).catch(() => {
                    this.message = `Ocurrio un error al agregar un empleado`
                })
            },

            enviarEmpleadoEditado() {
                console.log("Editar ", this.formData)
                EmpleadoService.editEmpleado(this.formData).then(
                    res => {
                        this.message = `Se edito el empleado [${res.data[0].idEmpleado}]`
                        this.cargarEmpleados()
                        this.limpiar();
                    }, () => {
                        this.message = `Ocurrio un error al eliminar el empleado`
                    }
                )
            },
            cargarEmpleados() {
                EmpleadoService.getEmpleados().then(res => {
                    this.empleados = res.data;
                })
            },
            limpiar() {
                this.formData = this.getInitialData();
                this.edit = false;
            },
            cargarCategorias() {
                return CategoriaService.getCategorias().then(
                    res => {
                        this.categorias = res.data;
                    }
                ).catch();
            },
            volveraLista(){
                this.$store.commit('setMostrar',true)
            }
        }
    }
</script>

<style scoped>
    h2 {
        text-align: center;
        border-radius: 3px
    }
</style>
