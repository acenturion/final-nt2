import Vue from 'vue'
import App from './App.vue'
import VueForm from "vue-form/src/main";

import './filters/filters.js'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import router from './router/router'
import store from "./store/store";

Vue.config.productionTip = false

Vue.use(VueForm);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
