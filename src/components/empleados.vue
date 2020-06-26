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
            required
          />
        </validate>
        <field-messages name="name" show="$dirty">
          <div slot="required" class="alert alert-danger my-1">El nombre es requerido</div>
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
          <div slot="required" class="alert alert-danger my-1">El usuario es requerido</div>
          <div slot="minlength" class="alert alert-danger my-1">El usuario tiene que ser mayor a {{minLength}} caracteres
          </div>
          <div slot="maxlength" class="alert alert-danger my-1">El usuario tiene que ser menor a {{maxLength}} caracteres
          </div>
        </field-messages>

          <validate class="form-group" tag="div">
              <label for="pass">Contraseña</label>
              <input
                      type="passwordnpm"
                      class="form-control"
                      id="pass"
                      name="passs"
                      v-model.trim="formData.password"
                      required
              />
          </validate>
          <field-messages name="pass" show="$dirty">
              <div slot="required" class="alert alert-danger my-1">La contraseña es requerida</div>
          </field-messages>


        <div class="form-group">
          <label for="exampleFormControlSelect1">Categoria</label>
          <select
                  v-model="formData.idCategoriaEmpleado"
                  class="form-control" id="exampleFormControlSelect1">
            <option selected>Selecciona la categoria</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="formState.$invalid">Submit</button>
      </vue-form>
    </div>

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
            <th scope="col">Eliminiar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(empleado) in $store.state.empleados" v-bind:key="empleado.idEmpleado">
            <th scope="row">{{empleado.idEmpleado}}</th>
            <td>{{empleado.nombre}}</td>
            <td>{{empleado.userName}}</td>
            <td>{{empleado.idCategoriaEmpleado}}</td>
            <td>
              <button
                class="btn btn-danger"
                v-on:click="eliminarEmpleado(empleado.idEmpleado)"
              >Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="alert alert-danger" v-if="error.status" role="alert">{{error.msg}}</div>
    </div>
  </div>
</template>

<script lang="js">
import EmpleadoService from '../services/empleado.service.js'
    export default {
        name: 'src-components-respuestas',
        props: [],
        beforeMount(){
            this.$store.dispatch('loadEmpleados')
        },
        data() {
            return {
                formState: {},
                formData: this.getInitialData(),
                minLength: 5,
                maxLength: 50,
                error: {
                    status: false,
                    msg: ''
                }
            }
        },
        methods: {
            getInitialData() {
                return {
                    nombre: '',
                    userName: '',
                    password: '',
                    idCategoriaEmpleado: 0
                }
            },
            sendForm() {
                console.log(this.formData)
                EmpleadoService.addEmpleado(this.formData);
                //this.getInitialData()
                this.$store.dispatch('loadEmpleados');
            },
            eliminarEmpleado(id){
              EmpleadoService.delEmpleado(id);
              this.$store.dispatch('loadEmpleados');
            }
        },
        computed: {

        }
    }


</script>

<style scoped lang="css">
</style>
