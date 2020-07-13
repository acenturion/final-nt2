<template>
    <div class="container-xl">

      <div class="row">
              <div class="col-sm-10">
                  <h3>Detalle Gastos</h3>
                  <h5>
                      Del Viaje: {{viajes.idViaje}}
                      del {{viajes.fechaInicio | fechaddMMyyyy}}
                      al {{viajes.fechaFin | fechaddMMyyyy}}
                      Destino: {{viajes.destino}} <br>
                      Descripcion: {{viajes.descripcion}}
                  </h5>    
              </div>
              <div class="col-sm-1">
                  <button v-if="$store.state.mostrarDetalle" class="btn btn-success btn-sm"
                          @click="muestraFormulario()">
                      <i class="fas fa-plus-circle fa-2x"></i>
                  </button>
              </div>
              <div class="col-sm-1">    
                    <button v-if="$store.state.mostrarDetalle" 
                        class="btn btn-warning btn-sm"
                        @click="volverAViaje()">
                        <i class="far fa-arrow-alt-circle-left fa-2x"></i>
                    </button>
              </div>
            </div> 
              <hr />
              <List v-if="$store.state.mostrarDetalle" :viaje="viajes"/>
              <Form v-if="!$store.state.mostrarDetalle" :viaje="viajes" />
    </div>
      
    
</template>

<script lang="js">
    import List from './gastosList.vue'
    import Form from './gastoForm.vue'
    
    export default {
        name: 'src-components-gasto',
        components: {
          List,
          Form
        },
        props: [],
        
        data() {
            return {
            }
        },
        methods: {
           muestraFormulario(){
            return this.$store.dispatch('cambiarMostrarDetalle',false)  
            },
            volverAViaje(){
                this.$router.push('viajes')
            }            
        }, 
        computed: {
            viajes(){
              return   this.$store.state.viaje
            } 
        }
    }


</script>

<style scoped lang="css">
    h3{
        color:black;  
        text-align: left;
    }
    h5{
        color:black; 
        text-align: left;
    }
</style>
