<template>
  <div id="play-view">
    <div class="background">
      <div class="image">
        <img :src="playSong.picUrl" alt="">
      </div>
    </div>
    <div class="main">
      <div class="header">
        <div class="cover"></div>
        <div class="container">
          <div class="msg">
            <play-img :active="active"></play-img>
          </div>
          <div class="content">
            <lyric></lyric>
          </div>
        </div>
      </div>
      <div class="cross"></div>
      <div class="about">
        <div class="cover"></div>
        <div class="container">
          <div class="comment"></div>
        <div class="simi"></div>
        </div>
      </div>
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
    min-width: 100rem;
    overflow: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }
  
  .background {
    z-index: -2;
    position: absolute;
    top: 0;
    background-color: #ccc;
    width: 100%;
    height: 100%;
  }

  .image {
    z-index: -1;
    width: 100%;
    position: absolute;
    top: -35rem;
  }

  .image  img {
    transition: all 1s;
    width: 100%;
    filter: blur(80px);
  }
  
  .main {
    position: relative;
    width: 100%;
  }
  
  .header {
    position: relative;
    padding-bottom: 2rem;
  }
  
  .header .container {
    margin: 0 auto;
    min-width: 100rem;
    width: 70%;
    height: 45rem;
  }
  
  .header .cover {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #bbb;
    opacity: 0.5;
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
  
  .cross {
    height: 8rem;
    background-image: linear-gradient(to bottom, rgba(187, 187, 187, 0.5), rgba(204, 204, 204, 0.9));
    padding-bottom: 1rem;
  }
  
  .about {
    z-index: 50;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #ccc;
    opacity: 0.9;
    padding: 1rem 0;
  }
  
  .about .container {
    display: flex;
    justify-content: space-between;
    width: 70%;
    min-width: 100rem;
    margin: 0 auto;
  }
  .comment {
    width: 68%;
    background-color: #ddd;
    height: 100rem;
  }

  .simi {
    width: 28%;
    background-color: #ddd;
    height: 100rem;
  }

</style>