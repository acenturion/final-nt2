<template>
    <div class="container text-left w-75 mt-3">
        <h2>Login</h2>
        <hr/>
        <vue-form :state="formState" @submit.prevent="sendForm()">

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
                <label for="pass">Contraseña</label>
                <input
                        type="password"
                        class="form-control"
                        id="pass"
                        name="pass"
                        v-model.trim="formData.pass"
                        required
                >
            </validate>
            <field-messages name="pass" show="$dirty">
                <div slot="required" class="alert alert-danger my-1">La contraseña es requerida</div>
            </field-messages>

            <button type="submit" class="btn btn-primary">Login</button>
        </vue-form>
    </div>

</template>

<script lang="js">

    export default {
        name: 'src-components-login',
        props: [],
        beforeMount() {
            this.$store.commit('setLogin', false);
        },
        data() {
            return {
                formState: {},
                formData: this.getInitialData()
            }
        },
        methods: {
            getInitialData() {
                return {
                    name: 'root',
                    pass: '1234'
                }
            },
            sendForm() {
                console.log(this.formData)
                if(this.formData.name === 'root' && this.formData.pass === '1234'){
                    this.$router.push('tareas')
                    this.$store.commit('setLogin', true);
                }
                else{
                    this.formData = this.getInitialData();
                }
            }

        },
        computed: {}
    }


</script>

<style scoped lang="css">
    .src-components-login {

    }
</style>
