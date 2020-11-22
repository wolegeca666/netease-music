import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 正在播放的歌曲
    uid: 0,
    login: false,
    song: {
      id: '27580521'
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
    likeList: [],
    windowsWidth: '',
    widowsHeight: ''
  },
  mutations,
  actions,
  getters
})
