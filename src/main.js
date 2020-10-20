import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

import state from '../src/store/index';

window.onload = e =>{
  state.commit('width', document.documentElement.clientWidth);
  state.commit('height', document.documentElement.clientHeight);
};

window.onresize = e => {
  state.commit('width', document.documentElement.clientWidth);
};


