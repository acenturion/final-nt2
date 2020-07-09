<template>
  
      <div class="table-fluid">
        <table class="table table-sm">
            <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Descripcion</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in this.formasPago" v-bind:key="index">
   
                <th scope="row">{{item.idFormaPago}}</th>
                <td>
                    <input v-if="index==idEditable" type="text"  name="descripcion" v-model="formData.descripcion" style="width:10em;height:2.3em; border-radius:2.5px ;">
                    <input v-else type="text"  name="descripcion" :value="item.descripcion"  style="width:10em; " disabled>
                </td>
                <td>
                    <button v-show="index!=idEditable"
                         class="btn btn-warning btn-sm"
                        @click="editable(index)"
                    ><i class="fas fa-pencil-alt"></i>
                     </button>
                </td>
                <td>
                    <button v-show="index==idEditable"
                      class="btn btn-success btn-sm"
                      @click="enviarFormaPagoEditada()"  
                    ><i class="fas fa-cloud-upload-alt"></i> 
                    </button>
                    <button v-show="index!=idEditable"
                        class="btn btn-danger btn-sm"
                        @click="eliminarFormaPago(item.idFormaPago)"
                    ><i class="fas fa-trash-alt"></i>
                    </button>
                </td>
              
              </tr>
            </tbody>
        </table>
    
    <!--    Alert!-->
        <div class="alert alert-primary my-5" v-if="message" role="alert">{{message}}</div>
     </div>  
        
</template>

<script lang="js">
  import FormaPagoService from '../../services/formapago.service.js'

    export default {
        name: 'FormaPago.List',
        props: [],
        beforeMount() {
          this.cargarFormasPago()
        },
        data() {
            return {
                formasPago: [],
                idEditable: -1,
                formData:{},
                message:null            
            }
        },
        methods: {
             cargarFormasPago(){
                FormaPagoService.getFormaPagos().then(
                  res => {
                      this.formasPago = res.data;
                  }).catch(err => {
                  this.message = `Ocurrio un error al cargar las Formas de Pago ` + err
                })
              },
            eliminarFormaPago(formapago) {
            FormaPagoService.delFormaPago(formapago).then(
              res => {
                this.message = `Se elimino la forma de pago [${res.data.idFormaPago}]`
                this.cargarFormasPago();
              }
            ).catch(err => {
              this.message = `Ocurrio un error al eliminar la Forma de Pago ` + err
            });
            },
            editable(indice) {
                 this.idEditable=indice
                 if (indice>-1){
                 this.formData=this.formasPago[indice]
                 }
            },
            enviarFormaPagoEditada() {
              FormaPagoService.editFormaPago(this.formData).then(
                res => {
                  this.message = `Se edito la Forma de Pago [${res.data.idFormaPago}]`
                  this.cargarFormasPago();
                  this.formData = {}
                }
              ).catch(err => {
                this.message = `Ocurrio un error al editar la Forma de Pago ` + err
              })

              this.idEditable=-1;
            }
        },
        computed :{
          
        }
           
    }    

</script>

<style scoped lang="css">
    
    input {
        border:none;   
             
    }
    input:disabled {
        color:black;
        background-color: #e1e2e1;
    }    
</style>
