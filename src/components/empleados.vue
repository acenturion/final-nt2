<template>
  <div class="container text-left w-75 mt-3">
    <!--        formulario empleados -->
    <div>
      <h2>Agregar Empleados</h2>
      <hr />
      <vue-form :state="formState" @submit.prevent="sendForm()">
        <validate class="form-group" tag="div">
          <label for="description">Descripcion</label>
          <input
            type="text"
            class="form-control"
            id="description"
            name="description"
            v-model.trim="formData.description"
            :minlength="minLength"
            :maxlength="maxLength"
            required
          />
        </validate>
        <field-messages name="description" show="$dirty">
          <div slot="required" class="alert alert-danger my-1">La descripcion es requerida</div>
          <div slot="minlength" class="alert alert-danger my-1">
            La descripcion debe tener mas de {{minLength}}
            caracteres
          </div>
          <div slot="maxlength" class="alert alert-danger my-1">
            La descripcion debe tener menos de
            {{maxLength}}
            caracteres
          </div>
        </field-messages>

        <validate class="form-group" tag="div">
          <label for="name">Nombre</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            v-model.trim="formData.name"
            required
          />
        </validate>
        <field-messages name="name" show="$dirty">
          <div slot="required" class="alert alert-danger my-1">El nombre es requerido</div>
        </field-messages>

        <validate class="form-group" tag="div">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            v-model.trim="formData.email"
            required
          />
        </validate>
        <field-messages name="email" show="$dirty">
          <div slot="required" class="alert alert-danger my-1">el email es requerido</div>
          <div slot="email" class="alert alert-danger my-1">Email no válido</div>
        </field-messages>

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
          <tr v-for="(empleado) in $store.state.empleados" v-bind:key="empleado.IdEmpleado">
            <th scope="row">{{empleado.IdEmpleado}}</th>
            <td>{{empleado.Nombre}}</td>
            <td>{{empleado.UserName}}</td>
            <td>{{empleado.Categoria}}</td>
            <td>
              <button
                class="btn btn-danger"
                v-on:click="eliminarEmpleado(empleado.IdEmpleado)"
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
import axios from 'axios'

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
                minLength: 10,
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
            eliminarEmpleado(id){
                console.log(id);
                //esto llevarlo a la capa de servicios
                axios.delete('http://localhost:8080/api/empleado/'+id)
                .then(
                res => {    
                    console.log("Se elimino el empleado " + id);
                    console.log(res);
                    this.$store.dispatch('loadEmpleados')
                }, err => {
                    console.log(err.code);
                    this.error.msg = 'no se pudo eliminar el empleado'
                    this.error.status = true;        
                })
                
            }
        },
        computed: {

        }
    }


</script>

<style scoped lang="css">
</style>
