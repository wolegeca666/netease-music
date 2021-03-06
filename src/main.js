import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import state from '../src/store/index';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

Vue.config.productionTip = false;

// Vue.config.errorHandler = function (err, vm, info) {
//
// };


if (window.addEventListener) {
  window.addEventListener('error', function (err) {
    // 过滤非资源加载的错误
    let ERR_TYPE = {
      "SCRIPT": 2,
      "LINK": 3,
    };
    if (err.target !== window) {
      //过滤window的异常,避免与onerror重复
      let errNode = err.target.nodeName;
      if (errNode && ERR_TYPE[errNode.toUpperCase()]) {
        let uri = err.target.src || err.target.href;
        window.console && window.console.log('资源缺失:' + uri);
      }
    }
  }, true);
}

window.onload = e => {
  state.commit('width', document.documentElement.clientWidth);
  state.commit('height', document.documentElement.clientHeight);
};

function commitWidth() {
  state.commit('width', document.documentElement.clientWidth);
}

window.onresize = e => {
  window.requestAnimationFrame(commitWidth)
};


