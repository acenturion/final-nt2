<template>
    <div class="container-xl">
       <div class="row">
        <div class="col-sm-10">
            <br>
            <h2>Categorias</h2>
        </div>
        <div class="col-sm-2">
            <br>
            <button v-if="$store.state.mostrar" class="btn btn-success btn-sm"
                    v-on:click="muestraFormulario()">
                <i class="fas fa-plus-circle fa-2x"></i>
            </button>
        </div>
       </div> 
        <hr />
        <List v-if="$store.state.mostrar"/>

        <Form v-if="!$store.state.mostrar" />
      </div>
</template>

<script lang="js">
    import List from './Categoria/Categoria.List.vue'
    import Form from './Categoria/Categoria.Form.vue'

    export default {
        name: 'categoria',
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
