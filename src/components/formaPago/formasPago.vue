<template>
     <div class="container-xl">
       <div class="row">
        <div class="col-sm-10">
            <br>
            <h2>Formas de Pago</h2>
        </div>
        <div class="col-sm-2">
            <br>
            <button v-if="this.$store.state.mostrar" class="btn btn-success btn-sm"
                    v-on:click="muestraFormulario()">
                <i class="fas fa-plus-circle fa-2x"></i>
            </button>
        </div>
       </div> 
        <hr />
        <List v-if="this.$store.state.mostrar"/>

        <Form v-if="!this.$store.state.mostrar" />
     </div>
</template>

<script lang="js">
    import List from './formaPago.List.vue'
    import Form from './formaPago.Form.vue'
    export default {
        name: 'src-components-formaspago',
        components: {
        List,
        Form
        },
        props: [],
        beforeMount(){},
        mounted() {},
        data() {
            return {
            }
        },
        methods: {
          muestraFormulario(){
            return this.$store.dispatch('cambiarMostrar',false)    
          }
        },
        computed: {
        }
    }


</script>

<style scoped lang="css">
</style>
