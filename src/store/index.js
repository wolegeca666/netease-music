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
      picUrl: 'http://p3.music.126.net/VKsQu4n0zJF9sG508S9gQQ==/3429376768246424.jpg'
    },
    songState: {
      play: false,
      playOrder: 'loop',
      voice: 1
    },
    windowWidth: ''
  },
  mutations: {
    changePlaySong(state, playSong) {
      state.song = playSong
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
