<template>
    <div id="player">
      <div class="view" :class="{'un-play': !play}">
        <play-view :active="play"></play-view>
        <div class="close" @click="view">
          <img src="../../../assets/imgs/icon/close/innerclose.svg"/>
        </div>
      </div>
      <div class="pic" @click="view">
        <img :src="url" alt="0">
      </div>
      <music-control></music-control>
      <music-handle @list="listShow"></music-handle>
      <div id="play-list-s" class="list" :class="{'show': !show}" @click="stop($event)">
        <div class="title">
          <p>播放列表</p>
        </div>
        <song-list :show="show" @close="listShow"></song-list>
      </div>
    </div>
</template>

<script>
  import PlayView from "./playview/PlayView";
  import MusicControl from "./MusicControl";
  import MusicHandle from "./MusicHandle";
  import SongList from "./songlist/PlaySongList";

  export default {
    name: "player",
    data() {
      return {
        show: false,
        play: false
      }
    },
    components: {
      PlayView,MusicControl,MusicHandle,SongList
    },
    computed: {
      url() {
        return this.$store.state.song.picUrl || 'http://p3.music.126.net/VKsQu4n0zJF9sG508S9gQQ==/3429376768246424.jpg'
      },
    },
    methods: {
      listShow() {
        this.show = !this.show;
        if (this.show) {
          document.onclick = e => {
            // console.log(e)
            this.show = false
            document.onclick = null;
          }
        }
      },
      view() {
        this.play = !this.play;
        document.querySelector('.view')
      },
      stop(e) {
        // console.log(e);
        e.stopPropagation()
      }
    }
  }
</script>

<style scoped>
  #player {
    z-index: 999;
    width: 100vw;
    min-width: 100em;
    padding: 2px 0 2px 0.5rem;
    display: flex;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ccc;
    box-shadow: 0 -2px 1px var(--color-active);
    background-color: #fff;
  }
  #player .pic img {
    width: 6rem;
    height: 6rem;
    border-radius: 0.5rem;
  }

  .view {
    transition: all 600ms;
    overflow: hidden;
    position: absolute;
    bottom: 6.5rem;
    left: 0;
    width: 100vw;
    min-width: 100rem;
    height: 91vh;
  }

  .un-play {
    visibility: hidden;
    opacity: 0;
  }
  
  .view .close {
    z-index: 999;
    position: fixed;
    top: 2.5rem;
    right: 5rem;
  }
  
  .view .close img {
    width: 3rem;
  }

  .list {
    transition: all 500ms;
    z-index: 200;
    background-color: #fff;
    position: absolute;
    right: 0;
    bottom: 6rem;
    height: 50rem;
    border: 1px solid var(--color-active);
  }
  
  .show {
    height: 0;
    visibility: hidden;
  }

  .title {
    z-index: 200;
    position: relative;
    background-color: #fff;
    width: 100%;
    height: 4.5rem;
    line-height: 4.5rem;
    font-size: 14px;
    padding-left: 4rem;
    box-shadow: 0 2px 2px #CCCCCC;
  }

</style>