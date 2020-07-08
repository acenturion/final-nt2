<template>
  <div class="container-xl">
  <div class="row">
  <div class="col-sm-10">
      <br>
      <h2>Topes</h2>
  </div>
  <div class="col-sm-2">
    <br>
    <button v-if="this.$store.state.tope.mostrarLista" class="btn btn-success btn-sm" v-on:click="muestraFormulario()">
      <i class="fas fa-plus-circle fa-2x"></i>
    </button>
  </div>
  </div> 
  <hr />
  <Form v-if="!this.$store.state.tope.mostrarLista"/>
  <List v-if="this.$store.state.tope.mostrarLista"/>
</div>    
</template>

<script lang="js">
  import List from './tope/topeList.vue'
  import Form from './tope/topeForm.vue'
  export default {
      name: "Topes",
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
          this.$store.dispatch('mostrarTopeForm')
        }
      }     
  }
</script>

<style scoped lang="css">

    h2 {
      text-align: Left;
        }
</style>