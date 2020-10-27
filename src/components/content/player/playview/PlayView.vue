<template>
  <div id="play-view">
    <div class="header">
      <div class="background">
        <img :src="playSong.picUrl" alt="">
      </div>
      <div class="container">
        <div class="msg">
          <play-img :active="active"></play-img>
        </div>
        <div class="content">
          <lyric></lyric>
        </div>
      </div>
    </div>
    <div class="about">
      <div class="comment"></div>
      <div class="simi"></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import PlayImg from "./PlayImg";
  import Lyric from "./Lyric";

  export default {
    name: "PlayView",
    props: {
      active: {
        type: Boolean,
        default: false
      }
    },
    components: {Lyric, PlayImg},
    computed: {
      ...mapState({
        id: state => state.song.id,
        play: state => state.songState.play,
        playSong: state => state.song,
      })
    },
  }
</script>

<style scoped>
  #play-view {
    z-index: 1;
    overflow: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    background-color: #ddd;
  }

  .header {
    position: relative;
    margin-bottom: 10rem;
  }

  .background {
    width: 100%;
    position: absolute;
    top: 0;
  }

  .background img {
    width: 100%;
    height: 50rem;
    filter: blur(200px);
  }
  
  .container {
    margin: 0 auto;
    min-width: 100rem;
    width: 60%;
    height: 50rem;
  }

  .msg {
    z-index: 50;
    width: 50%;
    height: 100%;
  }

  .content {
    z-index: 50;
    width: 50%;
    height: 100%;
  }

  .about {
    z-index: 50;
    display: flex;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;
  }

  .comment {
    width: 68%;
    background-color: #fff;
    height: 100rem;
  }

  .simi {
    width: 28%;
    background-color: #000;
    height: 50rem;
  }

</style>