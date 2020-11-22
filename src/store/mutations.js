export default {
  // 同步方法
  login(state, uid) {
    state.uid = uid;
    state.login = true;
    localStorage.setItem('login', state.login);
  },

  logout(state) {
    state.uid = 0;
    state.login = false;
    localStorage.setItem('login', state.login);
  },

  changePlaySong(state, playSong) {
    state.song = playSong;
    localStorage.setItem('song', playSong.id);
  },

  timeChange(state, time) {
    state.songState.playtime = time
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
    localStorage.setItem('playOrder', order)
  },

  changeVoice(state, percent) {
    state.songState.voice = percent;
  },

  changePlayList(state, list) {
    state.playList = [...list]
  },

  playlistAdd(state, song) {
    let include = false;
    let playindex = 0;
    state.playList.map((item, index) => {
      if (item.id === song.id) {
        include = true;
        playindex = index;
      }
    });
    if (!include) {
      state.playList.splice(state.playSongIndex + 1, 0, song);
      playindex = state.playSongIndex + 1;
    }
    state.playSongIndex = playindex;
  },

  playSongNext(state, song) {
    let include = false;
    let playindex;
    state.playList.map((item, index) => {
      if (item.id === song.id) {
        include = true;
        playindex = index;
      }
    });
    if (!include) {
      state.playList.splice(state.playSongIndex + 1, 0, song);
    } else {
      state.playSongIndex = playindex;
    }
  },

  liked(state, list) {
    state.likeList.push(...list)
  },

  unlike(state, id) {
    let index = state.likeList.indexOf(id);
    state.likeList.splice(index, 1)
  },

  load(state, flag) {
    state.load = flag;
  },

  width(state, width) {
    state.windowsWidth = width;
  },

  height(state, height) {
    state.windowsHeight = height
  }


};