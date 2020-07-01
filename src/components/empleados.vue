<template>
  <div class="container text-left w-75 mt-3">
    <!--        formulario empleados -->
    <div>
      <h2>Agregar Empleados</h2>
      <hr />
      <vue-form :state="formState" @submit.prevent="sendForm()">

        <validate class="form-group" tag="div">
          <label for="name">Nombre</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            v-model.trim="formData.nombre"
            :maxlength='50'
            required
          />
        </validate>
        <field-messages name="name" show="$dirty">
          <div slot="required" class="alert alert-danger my-1">El nombre es requerido</div>
          <div slot="maxlength" class="alert alert-danger my-1">El usuario tiene que ser menor a {{maxLength}} caracteres</div>
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
                  required
          />
        </validate>
        <field-messages name="usuario" show="$dirty">
          <!--<div slot="required" class="alert alert-danger my-1">El usuario es requerido</div>-->
          <div slot="minlength" class="alert alert-danger my-1">El usuario tiene que ser mayor a {{minLength}} caracteres</div>
          <div slot="maxlength" class="alert alert-danger my-1">El usuario tiene que ser menor a {{maxLength}} caracteres</div>
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
              <!-- <div slot="required" class="alert alert-danger my-1">La contraseña es requerida</div> -->
              <div slot="minlength" class="alert alert-danger my-1">La constraseña tiene que ser mayor a {{minLength}} caracteres</div>
              <div slot="maxlength" class="alert alert-danger my-1">La constraseña tiene que ser menor a {{maxLength}} caracteres</div>
          </field-messages>


        <div class="form-group">
          <label for="exampleFormControlSelect1">Categoria</label>
          <select
                  v-model="formData.idCategoriaEmpleado"
                  class="form-control" id="exampleFormControlSelect1">
            <option v-for="categoria in $store.state.categorias" v-bind:key="categoria.idCategoria" :value="categoria.idCategoria">
              {{categoria.descripcion}}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary mr-4" v-if="!edit" :disabled="formState.$invalid">Enviar</button>
        <button type="button" v-on:click="enviarEmpleadoEditado()" v-else class="btn btn-warning mr-4" :disabled="formState.$invalid">Editar</button>
        <button type="button" class="btn btn-dark" v-on:click="limpiar()">Limpiar</button>
      </vue-form>
    </div>
    <!--    Alert!-->
    <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>

    <!--    Display empleados -->
    <div class="mt-5 mb-5">
      <h2>Empleados</h2>
      <hr />
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">User Name</th>
            <th scope="col">Categoria</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminiar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(empleado) in empleados" v-bind:key="empleado.idEmpleado">
            <th scope="row">{{empleado.idEmpleado}}</th>
            <td>{{empleado.nombre}}</td>
            <td>{{empleado.userName}}</td>
            <td>{{empleado.idCategoriaEmpleado}}</td>
            <td>
              <button
                    class="btn btn-warning"
                    v-on:click="editarEmpleado(empleado)"
            >Editar
            </button>
            </td>
            <td>
              <button
                class="btn btn-danger"
                v-on:click="eliminarEmpleado(empleado.idEmpleado)"
              >Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="js">
import EmpleadoService from '../services/empleado.service.js'
import CategoriaService from '../services/categoria.service.js'
    export default {
      name: 'src-components-respuestas',
      props: [],
      data() {
            return {
                empleados: this.cargarEmpleados(),
                formState: {},
                formData: this.getInitialData(),
                minLength: 5,
                maxLength: 10,
                message: null,
                edit: false,
                categorias: this.cargarCategorias(),
                error: {
                    status: false,
                    msg: ''
                }
            }
        },
        methods: {
            getInitialData() {
                return {
                    idEmpleado:0,
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
            editarEmpleado(empleado){
              this.formData = empleado
              this.edit = true;
            },
            eliminarEmpleado(id){
              EmpleadoService.delEmpleado(id).then(
                res =>{
                  this.message = `[${res.data}] Se elimino el empleado`
                  this.cargarEmpleados();
                }
              ).catch((err) => {
                console.log(err)
                //todo cambiar en el back la respuesta
                this.message = `Ocurrio un error al eliminar el empleado`
              });
            },
            enviarEmpleadoEditado(){
              console.log("Editar ", this.formData)
              EmpleadoService.editEmpleado(this.formData).then(
                res =>{
                  this.message = `Se edito el empleado [${res.data[0].idEmpleado}]`
                  this.cargarEmpleados()
                  this.limpiar();
                },() => {
                this.message = `Ocurrio un error al eliminar el empleado`
              }
              )
            },
            cargarEmpleados(){
              EmpleadoService.getEmpleados().then(res => {
                this.empleados = res.data;
              })
            },
          limpiar(){
            this.formData = this.getInitialData();
            this.edit = false;
          },
          cargarCategorias(){
              return CategoriaService.getCategorias().then(
                res =>{
                  this.categorias = res.data;
                }
              ).catch();
          }
        },
        computed: {

        }
    }


</script>

<style scoped lang="css">
</style>
