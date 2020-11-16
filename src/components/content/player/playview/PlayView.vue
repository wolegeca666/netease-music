<template>
  <div id="play-view" :class="{'scale': !active}">
    <div class="background">
      <div class="image">
        <img :src="url" alt="">
      </div>
    </div>
    <div class="main">
      <div class="close" @click="view">
        <img src="../../../../assets/imgs/icon/close/innerclose.svg" alt=""/>
      </div>
      <div class="header">
        <div class="cross"></div>
        <div class="cover"></div>
        <div class="container">
          <div class="msg">
            <play-img :active="active"></play-img>
          </div>
          <div class="content">
            <lyric :show="active"></lyric>
          </div>
        </div>
      </div>
      <div class="cross"></div>
      <div class="about">
        <div class="cover"></div>
        <div class="container">
          <div class="comment">
            <comment :active="active"></comment>
          </div>
          <div class="simi">
            <Simi @close="view" :active="active"></Simi>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import PlayImg from "./PlayImg";
  import Lyric from "./Lyric";
  import Comment from "./Comment";
  import Simi from "./Simi";

  export default {
    name: "PlayView",
    props: {
      active: {
        type: Boolean,
        default: false
      },
    },
    components: {Simi, Comment, Lyric, PlayImg},
    methods: {
      view() {
        this.$emit('close');
      }
    },
    computed: {
      ...mapState({
        id: state => state.song.id,
        playSong: state => state.song,
        play: state => state.songState.play
      }),
      url() {
        return this.playSong.al?.picUrl || 'http://p3.music.126.net/VKsQu4n0zJF9sG508S9gQQ==/3429376768246424.jpg'
      }
    },
    watch: {
      id() {
        this.$el.scrollTop = 0;
      },
      active() {
        if (this.active) {
          document.onkeypress = e => {
            e.preventDefault();
            const space = 'Space';
            if (e.code === space) {
              this.$store.commit('changePlay', !this.play);
            }
          };
        } else {
          document.onkeypress = null;
        }

      }
    }
  }
</script>

<style scoped>
  #play-view {
    z-index: 1;
    min-width: 100rem;
    overflow: scroll;
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
    transition: all 500ms;
  }

  .scale{
    transform: scale(0.3);
  }

  .background {
    z-index: -2;
    position: absolute;
    top: 0;
    background-color: #ccc;
    min-width: 100rem;
    width: 100vw;
    height: 100vh;
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
    filter: blur(60px);
  }
  
  .main {
    position: relative;
    width: 100%;
  }

  .main .close {
    z-index: 999;
    position: fixed;
    bottom: 90vh;
    right: 5rem;
    width: 3rem;
    height: 3rem;
    background-color: #eee;
    border-radius: 5px;
    box-shadow: 0 0 10px #666;
  }

  .main .close img {
    width: 3rem;
    height: 3rem;
  }
  
  .header {
    position: relative;
    padding-bottom: 2rem;
  }
  
  .header .container {
    padding:0 5rem;
    margin: 0 auto;
    min-width: 100rem;
    width: 75%;
    height: 43rem;
    display: flex;
  }

  .header .cross {
    z-index: 1;
    position: absolute;
    top: 0;
    width: 100%;
    height: 20%;
    background-image: linear-gradient(to top, rgba(187, 187, 187, 0.5), rgba(221, 221, 221, 0.8));
    padding-bottom: 1rem;
  }

  .header .cover {
    z-index: 1;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80%;
    background-color: #bbbbbb;
    opacity: 0.5;
  }


  .msg {
    z-index: 50;
    width: 45%;
    height: 100%;
  }
  
  .content {
    z-index: 50;
    width: 55%;
    height: 100%;
  }
  
  .cross {
    height: 5rem;
    background-image: linear-gradient(to bottom, rgba(187, 187, 187, 0.5), rgba(221, 221, 221, 0.9));
    padding-bottom: 2rem;
  }
  
  .about {
    z-index: 50;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #dddddd;
    opacity: 0.9;
    padding-bottom: 10rem;
  }
  
  .about .container {
    display: flex;
    justify-content: space-between;
    width: 75%;
    padding:0 5rem;
    min-width: 100rem;
    margin: 0 auto;
  }


  .comment {
    width: 60%;
    min-height: 30rem;
  }

  .simi {
    width: 35%;
    min-height: 30rem;
  }

</style>