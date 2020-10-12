import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: 27580521, // 正在播放的歌曲的id
    playOrder: 'loop',
    voice: 1
  },
  mutations: {
    changeId(state, id) {
      state.id = id;
    },
    changeOrder(state, order) {
      state.playOrder = order
    },
    changeVoice(state, percent) {
      state.voice = percent;
    }
  },
  actions: {

  },
  modules: {

  }
})
