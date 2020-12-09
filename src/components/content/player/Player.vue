<template>
  <div id="player">
    <div :class="{'un-play': !play}" class="view">
      <play-view :active="play" @close="view"></play-view>
    </div>
    <div @click="view" class="pic">
      <scale>
        <img :src="url" alt="0">
      </scale>
    </div>
    <music-control></music-control>
    <music-handle @list="listShow"></music-handle>
    <div :class="{'show': !show}" @click.stop @scroll.stop class="list"
         id="play-list-s" ref="list">
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
  import Scale from "../../common/Scale";

  export default {
    name: "player",
    data() {
      return {
        show: false,
        play: false,
      }
    },
    components: {
      PlayView, MusicControl, MusicHandle, SongList, Scale
    },
    computed: {
      url() {
        return this.$store.state.song.al?.picUrl || 'http://p3.music.126.net/VKsQu4n0zJF9sG508S9gQQ==/3429376768246424.jpg'
      },
    },
    methods: {
      listShow() {
        this.show = !this.show;
        if (this.show) {
          document.onclick = e => {
            // console.log(e)
            this.show = false;
            document.onclick = null;
          }
        }
      },
      view() {
        this.play = !this.play;
        document.body.id = this.play ? 'body' : '';
      },
      top() {
        this.$refs.list.style.transform = `translateY()`
      },
      bottom() {

      }
    },
    watch: {
      // show() {
      //   if (this.show) {
      //     this.top();
      //   }else {
      //     this.bottom();
      //   }
      // }
    }
  }
</script>

<style scoped>

  #player {
    z-index: 999;
    width: 100vw;
    min-width: 100em;
    position: relative;
    display: flex;
    border-top: 1px solid #ccc;
    box-shadow: 0 -2px 1px var(--color-active);
    background-color: #fff;
    perspective: 1000px;
  }

  #player .pic {
    z-index: 999;
    background-color: #fff;
    padding: 2px 0.5rem;
  }

  #player .pic img {
    width: 6rem;
    height: 6rem;
    border-radius: 0.5rem;
  }

  .view {
    transition: transform 500ms;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transform-origin: 0 100%;
  }

  .un-play {
    transition: all 500ms;
    opacity: 0;
    transform: scale3d(0.05, 0.09, 1);
  }

  .list {
    transition: transform 500ms;
    z-index: 200;
    background-color: #fff;
    position: absolute;
    right: 1rem;
    bottom: 6rem;
    height: 50rem;
    border: 1px solid var(--color-active);
  }

  .show {
    transform: translate3d(0, 100%, 0);
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