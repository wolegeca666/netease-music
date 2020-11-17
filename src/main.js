import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

import state from '../src/store/index';

// document.addEventListener("keypress", e => {
//   e.preventDefault();
//   const space = 'Space';
//   if (e.code === space) {
//     // console.log(state);
//     state.commit('changePlay', !state.state.songState.playview);
//   }
// });

window.onload = e =>{
  state.commit('width', document.documentElement.clientWidth);
  state.commit('height', document.documentElement.clientHeight);
};

function commitWidth() {
  state.commit('width', document.documentElement.clientWidth);
}

window.onresize = e => {
  window.requestAnimationFrame(commitWidth)
};


