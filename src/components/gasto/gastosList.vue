 <template>  
    <table class="table">
        <thead class="thead-dark">
        <tr>
            <th scope="col">Gasto</th>
            <th scope="col">Viaje</th>
            <th scope="col">Tipo</th>
            <th scope="col">Importe</th>
            <th scope="col">Notas</th>
            <th scope="col">Medio</th>
            <th scope="col">Fecha</th>
            <th scope="col">Aprobado</th>
            <th scope="col">Foto</th>
            <th scope="col">Editar</th>
            <th scope="col">Borrar</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(gasto) in this.gastos" v-bind:key="gasto.idDetalle">
            <th scope="row">{{gasto.idDetalle}}</th>
            <td>{{gasto.idViaje}}</td>
            <td>{{gasto.idTipoGasto}}</td>
            <td>{{gasto.importe | formatearNumero}}</td>
            <td>{{gasto.notas}}</td>
            <td>{{gasto.idFormaPago}}</td>
            <td>{{gasto.fecha | fechaddMMyyyy}}</td>
            <td>{{gasto.aprobado}}</td>
            <div v-if="gasto.foto != null">
                <!-- <td><img :src="gasto.foto.data" :alt="gasto.notas"></td> -->
                <td>:)</td>
            </div>
            <div v-else>
                <td>x</td>
            </div>
            <td>
                <button
                    class="btn btn-warning"
                    v-on:click="editarGasto(gasto)"
                ><i class="fas fa-pencil-alt"></i>
                </button>
            </td>
            <td>
                <button
                    class="btn btn-danger"
                    v-on:click="eliminarGasto(gasto.idDetalle)"
                ><i class="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="js">
    import service from '../../services/generic.service.js'
    import api from '../../constants.js'
    
    export default {
        name: 'src-components-gastosList',
        props: [],
        mounted() {
        },
        data() {
            return {
                viajes: this.cargarGastos()                
            }
        },
        methods: {
            cargarGastos(){
              service.getData(api.urlGasto).then(
                res => {
                    this.viajes = res.data;
                }
              ).catch(err => {
                this.message = `Ocurrio un error al cargar los viajes ` + err
              })
            },
            eliminarViaje(id) {
              service.delData(id,api.urlGasto).then(
                res => {
                  this.message = `Se elimino el viaje [${res.data.idViaje}]`
                  this.cargarGastos();
                }
              ).catch(err => {
                this.message = `Ocurrio un error al eliminar el viaje ` + err
              });
            }
        }   
    }    

</script>

<style scoped lang="css">
    
    table, td, th {  
      text-align: center;
       padding: 5px;
    }

    td {
        text-align: center;
    }
    input {
        background-color: #e1e2e1;
        border: none;
    }
</style>
