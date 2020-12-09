import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 登录
    uid: 0,
    login: false,
    // 正在播放的歌曲
    song: {
      id: '27580521'
    },
    // 播放状态
    songState: {
      play: false,
      playtime: 0,
      playOrder: 'loop',
      voice: 0.5
    },
    // 播放列表
    playList: [],
    playSongIndex: -1,
    // 喜欢音乐列表
    likeList: [],
    // 要收藏的音乐
    subId: 0,
    // 用户创建的歌单
    userPlaylist: [],
    load: false,
    windowsWidth: '',
    widowsHeight: ''
  },
  mutations,
  actions,
  getters
})
