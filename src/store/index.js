import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 正在播放的歌曲
    song: {
      id: 27580521,
      name: 'Libertus',
      author: 'Chen-U',
      picUrl: ''
  },
    songState: {
      play: false,
      playOrder: 'loop',
      voice: 0.5
    },
    windowWidth: ''
  },
  mutations: {
    changePlaySong(state, playSong) {
      if (state.song.id === playSong.id && !state.songState.play && state.song.id!==27580521) {
         state.songState.play = true
      }
      state.song = playSong;
      // console.log(state.song);
    },

    changePlay(state, play) {
      state.songState.play = play
    },

    changeOrder(state, order) {
      state.songState.playOrder = order;
    },

    changeVoice(state, percent) {
      state.songState.voice = percent;
    },

    getPicUrl(state, url) {
      if (url !== state.song.picUrl) {
        state.song.picUrl = url;
      }
    },

    width(state, width) {
      state.windowWidth = width;
    }
  },
  actions: {

  },
  modules: {

  }
})
