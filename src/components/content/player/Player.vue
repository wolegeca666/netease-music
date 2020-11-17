<template>
    <div id="player">
      <div class="view" :class="{'un-play': !play}">
        <play-view :active="play" @close="view"></play-view>
      </div>
      <div class="pic" @click="view">
        <img :src="url" alt="0">
      </div>
      <music-control></music-control>
      <music-handle @list="listShow"></music-handle>
      <div id="play-list-s" class="list" :class="{'show': !show}" @click.stop ref="list">
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
        play: false,
      }
    },
    components: {
      PlayView,MusicControl,MusicHandle,SongList
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
  @keyframes play {
    0% {
      width: 0;
      height: 0;
    }
    25% {
      width: 25vw;
      height: 25vh;
    }
    50% {
      width: 50vw;
      height: 50vh;
    }
    75% {
      width: 75vw;
      height: 75vh;
    }
    100% {
      width: 100vw;
      height: 100vh;
    }
  }

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
    transition: all 500ms;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .un-play {
    transform: translate3d(-60%, 80%, 0);
    visibility: hidden;
  }

  .scale{
    transform: scale3d(0.3, 0.3, 0);
  }

  .list {
    transition: all 500ms;
    z-index: 200;
    background-color: #fff;
    position: absolute;
    right: 1rem;
    bottom: 6rem;
    height: 50rem;
    border: 1px solid var(--color-active);
  }
  
  .show {
    transform: translate3d(0,100%,0);
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