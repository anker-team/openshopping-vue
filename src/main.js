
import Vue from 'vue';
import { router } from './config/router';
import './config/rem';
import App from './App.vue';
import VueLazyload from 'vue-lazyload'
import components from './config/components.js';
import 'font-awesome/css/font-awesome.min.css';
import Vconsole from 'vconsole'
let vConsole = new Vconsole()
Vue.use(components);

Vue.use(VueLazyload)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
