<template>
     <div class="container-xl">
       <div class="row">
        <div class="col-sm-10">
            <h2>Viajes</h2>
        </div>
        <div class="col-sm-2">
            <button class="btn btn-primary btn-sm"
                    v-on:click="muestraFormulario()">
                Nuevo
            </button>
        </div>
       </div> 
        <hr />
        <List v-if="this.$store.state.mostrar"/>
        <Form v-if="!this.$store.state.mostrar" />
        
        
       
    </div>    

    
</template>

<script lang="js">
    import List from './viaje/viajesList.vue'
    import Form from './viaje/viajeForm.vue'

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