import Vue from 'vue';
import App from './App.vue';

import './form';
import './axios';
import './alerts';
import { router } from '../src/router';

import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
