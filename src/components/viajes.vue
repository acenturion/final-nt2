<template>
     <div class="container-xl">
       <div v-show="!$store.state.mostrarGastos" class="row">
        <div class="col-sm-10">
            <br>
            <h2>Viajes</h2>
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
        
        <List v-if="$store.state.mostrar && !$store.state.mostrarGastos"/>

        <Form v-if="!$store.state.mostrar" />

        <Gastos v-if="$store.state.mostrarGastos" />

        
        
       
    </div>    

    
</template>

<script lang="js">
    import List from './viaje/viajesList.vue'
    import Form from './viaje/viajeForm.vue'
    import Gastos from './gastos.vue'
    
export default {
    name: "Viajes",
    components: {
        List,
        Form,
        Gastos
    },
    mounted() {

    },
    data() {
        return {
           
        }
    },
    methods: {
        muestraFormulario(){
            return this.$store.dispatch('cambiarMostrar',false)    
            }
    }     
}
</script>

<style scoped lang="css">

    h2 {
      text-align: Left;
        }
</style>