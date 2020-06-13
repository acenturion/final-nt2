<template>
    <div class="container text-left w-75 mt-3">
        <!--        formulario tareasl -->
        <div>
            <h2>Agregar gastos</h2>
            <hr/>
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
                    >
                </validate>
                <field-messages name="description" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">La descripcion es requerida</div>
                    <div slot="minlength" class="alert alert-danger my-1">La descripcion debe tener mas de {{minLength}}
                        caracteres
                    </div>
                    <div slot="maxlength" class="alert alert-danger my-1">La descripcion debe tener menos de {{maxLength}}
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
                    >
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
                    >
                </validate>
                <field-messages name="email" show="$dirty">
                    <div slot="required" class="alert alert-danger my-1">el email es requerido</div>
                    <div slot="email" class="alert alert-danger my-1">Email no válido</div>
                </field-messages>

                <button type="submit" class="btn btn-primary" :disabled="formState.$invalid">Submit</button>

            </vue-form>


        </div>

        <!--    Display tareas -->
        <div class="mt-5 mb-5">
            <h2>Tareas</h2>
            <hr/>
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Fecha de creacion</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(tarea) in $store.state.tareas" v-bind:key="tarea.id">
                    <th scope="row">{{tarea.id}}</th>
                    <td>{{tarea.description}}</td>
                    <td>{{tarea.name}}</td>
                    <td>{{tarea.email}}</td>
                    <td>{{tarea.createdAt | formatDate }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="js">

    export default {
        name: 'src-components-tareas',
        props: [],
        beforeCreate() {
            this.$store.commit('setLogin', true);
            this.$store.dispatch('loadTareas')
        },
        data() {
            return {
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
            }
        },
        computed: {}
    }


</script>

<style scoped lang="css">
</style>
