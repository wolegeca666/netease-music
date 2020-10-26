<template>
  <div class="play-img">
    <div class="play-img-rotate">
      <img :src="url" alt="">
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "PlayImg",
    props: {
      active: {
        type: Boolean
      }
    },
    data() {
      return {
        rotate: 0
      }
    },
    mounted() {
      let img = document.getElementsByTagName('img');
      img.forEach(function (item) {
        item.onmousedown = function(e){
          e.preventDefault()
        };
      });
    },
    methods: {
      rotateTo() {
        const el = document.querySelector('.play-img-rotate');
        el.style.transform = `rotateZ(${this.rotate}deg)`
      },
      startTimer() {
        this.rotateTimer = window.setInterval(() => {
          this.rotate+= 0.02;
          this.rotateTo();
        }, 2)
      },
      stopTimer() {
        window.clearInterval(this.rotateTimer);
      },
    },
    computed: {
      url() {
        return this.playSong.picUrl
      },
      start() {
        return this.play && this.active
      },
      ...mapState({
        playSong: state => state.song,
        play: state => state.songState.play,
      })
    },
    watch: {
      start() {
        this.start ? this.startTimer() : this.stopTimer()
      },
    }
  }
</script>

<style scoped>
  .play-img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .play-img-rotate {
    transition: transform 2ms;
  }

  .play-img-rotate img {
    width: 25rem;
    border-radius: 20rem;
  }
</style>