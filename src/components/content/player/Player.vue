<template>
  <div id="player">
    <div class="pic">
      <img :src="url" alt="0">
    </div>
    <music-control></music-control>
    <music-handle @list="listShow"></music-handle>
    <div class="list" v-show="show">
      <div class="title">播放列表</div>
      <song-list :show="show"></song-list>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
  import MusicControl from "./MusicControl";
  import MusicHandle from "./MusicHandle";
  import SongList from "./songlist/SongList";

  export default {
    name: "player",
    data() {
      return {
        show: false
      }
    },
    components: {
      MusicControl,MusicHandle,SongList
    },
    computed: {
      url() {
        return this.$store.state.song.picUrl || 'http://p3.music.126.net/VKsQu4n0zJF9sG508S9gQQ==/3429376768246424.jpg'
      },
    },
    methods: {
      listShow() {
        this.show = !this.show;
      }
    }
  }
</script>

<style scoped>
  #player {
    z-index: 999;
    width: 100vw;
    min-width: 100em;
    padding: 1px 0.5rem;
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

  .list {
    background-color: #fff;
    position: absolute;
    right: 0;
    bottom: 6rem;
    border: 1px solid var(--color-active);
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

  .footer {
    z-index: 200;
    position: absolute;
    background-color: #fff;
    bottom: 0;
    width: 100%;
    height: 2rem;
  }
</style>