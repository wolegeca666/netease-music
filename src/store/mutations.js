export default {
  // 同步方法

  // 登录
  login(state, uid) {
    state.uid = uid;
    state.login = true;
    localStorage.setItem('login', state.login);
  },

  // 登出
  logout(state) {
    state.uid = 0;
    state.login = false;
    localStorage.setItem('login', state.login);
  },

  // 播放音乐更改
  changePlaySong(state, playSong) {
    state.song = playSong;
    localStorage.setItem('song', playSong.id);
  },

  changePlaySongIndex(state, index) {
    state.playSongIndex = index;
    // console.log(index);
  },

  // 音乐播放时间
  timeChange(state, time) {
    state.songState.playtime = time
  },


  // 播放
  changePlay(state, play) {
    state.songState.play = play
  },

  // 播放顺序
  changeOrder(state, order) {
    state.songState.playOrder = order;
    localStorage.setItem('playOrder', order)
  },

  // 音量大小
  changeVoice(state, percent) {
    state.songState.voice = percent;
  },


  // 播放列表更改
  changePlayList(state, list) {
    state.playList = [...list]
  },

  // 播放列表添加
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

  // 下一首播放
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

  // 喜欢音乐
  liked(state, list) {
    state.likeList.push(...list)
  },

  // 取消喜欢音乐
  unlike(state, id) {
    let index = state.likeList.indexOf(id);
    state.likeList.splice(index, 1)
  },

  // 收藏音乐页面
  subListShow(state, id) {
    state.subId = id;
  },

  // 用户创建的歌单
  userList(state, list) {
    state.userPlaylist = list;
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