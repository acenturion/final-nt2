<template>
     <div class="container-xl">
       <div v-if="$store.state.mostrar" class="row">
        <div class="col-sm-10">
            <br>
            <h2>Viajes</h2>
        </div>
        <div class="col-sm-2">
            <br>
            <button  class="btn btn-success btn-sm"
                    v-on:click="muestraFormulario()">
                <i class="fas fa-plus-circle fa-2x"></i>
            </button>
        </div>
       </div> 
        <hr />
        
        <List v-if="$store.state.mostrar "/>
        <Form v-if="!$store.state.mostrar" />

       
        
        
       
    </div>    

    
</template>

<script lang="js">
    import List from './viajesList.vue'
    import Form from './viajeForm.vue'
    
export default {
    name: "Viajes",
    components: {
        List,
        Form
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
