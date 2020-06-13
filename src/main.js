import Vue from 'vue'
import App from './App.vue'
import VueForm from "vue-form/src/main";

import './filters/filters.js'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import router from './router'
import store from "./store/store";

Vue.config.productionTip = false

Vue.use(VueForm);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
