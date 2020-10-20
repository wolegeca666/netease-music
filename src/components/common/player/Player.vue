<template>
  <div id="player">
    <div class="pic">
      <img :src="url" alt="0">
    </div>
    <music-control></music-control>
    <music-handle></music-handle>
  </div>

</template>

<script>
  import MusicControl from "./MusicControl";
  import MusicHandle from "./MusicHandle";

  export default {
    name: "player",
    components: {
      MusicControl,MusicHandle
    },
    computed: {
      url() {
        return this.$store.state.song.picUrl || 'http://p3.music.126.net/VKsQu4n0zJF9sG508S9gQQ==/3429376768246424.jpg'
      },
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
    border-radius: 0.5rem;
  }
</style>