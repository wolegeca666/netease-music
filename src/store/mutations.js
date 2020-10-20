export default {
  // 同步方法
  changePlaySong(state, playSong) {
    if (state.song.id === playSong.id && !state.songState.play && state.song.id !== 27580521) {
      state.songState.play = true
    }
    state.song = playSong;
    // console.log(state.song);
  },

  changePlaySongIndex(state, index) {
    state.playSongIndex = index;
    // console.log(index);
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

  changePlayList(state, list) {
    state.playList = [...list]
  },

  getPicUrl(state, url) {
    if (url !== state.song.picUrl) {
      state.song.picUrl = url;
    }
  },

  width(state, width) {
    state.windowsWidth = width;
  },

  height(state, height) {
    state.windowsHeight = height
  }


};