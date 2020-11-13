import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 正在播放的歌曲
    song: {
      id: 27580521,
      name: '',
      ar: [''],
      al: [''],
      alia: []
    },
    songState: {
      play: false,
      playtime: 0,
      playOrder: 'loop',
      voice: 0.5
    },
    playList: [],
    playSongIndex: -1,
    load: false,
    windowsWidth: '',
    widowsHeight: ''
  },
  mutations,
  actions,
  getters
})
