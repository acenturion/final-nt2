<template>
    <div class="container-xl">
        <div class="row">
            <div class="col-sm-10">
                <br>
                <h2>Pais</h2>
            </div>
            <div class="col-sm-2">
                <br>
                <button v-if="this.$store.state.mostrar"
                        class="btn btn-success btn-sm"
                        v-on:click="muestraFormulario()">
                    <i class="fas fa-plus-circle fa-2x"></i>
                </button>
            </div>
        </div>
        <hr/>
        <List v-if="this.$store.state.mostrar"/>
        <Form v-if="!this.$store.state.mostrar" />
    </div>
</template>

<script>
    import List from "./pais/paisList.vue";
    import Form from "./pais/paisForm.vue";

    export default {
        name: "pais.vue",
        components: {
            List,
            Form
        },
        data(){
            return{
            }
        },
        methods: {
            muestraFormulario(){
                return this.$store.commit('setMostrar',false)
            }
        }
    }

</script>

<style scoped lang="css">

    h2 {
        text-align: Left;
    }
</style>
