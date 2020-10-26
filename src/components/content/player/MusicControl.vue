<template>
  <div class="music-control">
    <div class="forward" @click="changeIndex(-1)">
      <svg t="1602217693236" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg" p-id="28290" width="128"
           height="128">
        <path d="M422.1 529.7l207.6 141.9c10.4 7.1 24.5 4.4 31.6-5.9 2.6-3.8 4-8.3 4-12.8V369c0-12.6-10.2-22.8-22.8-22.8-4.6 0-9.1 1.4-12.8 4L422.1 492.1c-10.4 7.1-13 21.3-5.9 31.6 1.6 2.4 3.6 4.4 5.9 6z m-80.8-142.9v250.4c0 12.5 10.2 22.7 22.8 22.7 12.7 0 22.8-10.2 22.8-22.7V386.8c0-12.5-10.2-22.7-22.8-22.7-12.7 0-22.8 10.2-22.8 22.7zM512 1024C229.2 1024 0 794.8 0 512S229.2 0 512 0s512 229.2 512 512-229.2 512-512 512z"
              p-id="28291" fill="#d81e06"></path>
      </svg>
    </div>
    <div class="play" @click="cut(!play)"> <!--切换播放-->
      <svg v-show="play" t="1602216999432" class="icon-play"
           viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg" p-id="16320" width="128"
           height="128">
        <path d="M974.894 316.454c-25.302-59.822-61.526-113.548-107.664-159.686s-99.862-82.36-159.684-107.662C645.61 22.91 579.82 9.628 512 9.628c-67.82 0-133.611 13.282-195.546 39.478-59.822 25.302-113.548 61.526-159.686 107.662s-82.36 99.863-107.662 159.686C22.91 378.389 9.628 444.18 9.628 512c0 67.819 13.282 133.61 39.478 195.546 25.302 59.822 61.526 113.546 107.662 159.684s99.863 82.36 159.686 107.664c61.935 26.196 127.726 39.478 195.546 39.478 67.819 0 133.61-13.282 195.546-39.478 59.822-25.302 113.546-61.526 159.684-107.664s82.36-99.862 107.664-159.684c26.196-61.936 39.478-127.727 39.478-195.546 0-67.82-13.282-133.611-39.478-195.546zM576.01 675.545V349.837c0-29.801 24.496-54.047 54.605-54.047 14.564 0 28.266 5.628 38.59 15.847 10.321 10.22 16.003 23.788 16 38.208v325.7c0 29.806-24.488 54.055-54.588 54.055-30.11-0.002-54.607-24.249-54.607-54.055z m-125.245-321.54v325.7c0 29.806-24.489 54.054-54.59 54.054-30.11 0-54.607-24.247-54.607-54.054V353.998c0-29.801 24.496-54.045 54.607-54.045 14.562 0 28.266 5.628 38.588 15.847 10.323 10.22 16.007 23.79 16.002 38.206z"
              fill="#d81e06" p-id="16321"></path>
      </svg>
      <svg v-show="!play" t="1602216950051" class="icon-play"
           viewBox="0 0 1024 1024"
           version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14196"
           width="128" height="128">
        <path d="M0 512C0 229.248 229.248 0 512 0s512 229.248 512 512-229.248 512-512 512S0 794.752 0 512z m400.96-231.1552c-32.896-18.1248-59.6224-2.4832-59.6224 35.0592v392.1536c0 37.2736 26.688 53.2224 59.6224 35.0592l359.1168-198.208c32.8448-18.1632 32.9088-47.6544 0-65.8432L400.96 280.832z"
              fill="#d81e06" p-id="14197"
              data-spm-anchor-id="a313x.7781069.0.i6" class="selected"></path>
        <path d="M400.96 280.8448c-32.896-18.1248-59.6224-2.4832-59.6224 35.0592v392.1536c0 37.2736 26.688 53.2224 59.6224 35.0592l359.1168-198.208c32.8448-18.1632 32.9088-47.6544 0-65.8432L400.96 280.832z"
              fill="#FFFFFF" p-id="14198"></path>
      </svg>
    </div>
    <div class="next" @click="changeIndex(1)">
      <svg t="1602218059775" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg" p-id="28479" width="128"
           height="128">
        <path d="M601.9 494.3l-207.6-141.9c-10.4-7.1-24.5-4.4-31.6 5.9-2.6 3.8-4 8.3-4.00000001 12.8L358.69999999 655c0 12.6 10.2 22.8 22.80000001 22.80000001 4.6 0 9.1-1.39999999 12.8-4.00000001L601.89999999 531.9c10.4-7.1 13-21.29999999 5.90000001-31.6-1.6-2.39999999-3.6-4.4-5.9-6z m80.79999999 142.9l0-250.4c0-12.49999999-10.2-22.7-22.79999999-22.7-12.7 0-22.8 10.2-22.8 22.7L637.1 637.2c0 12.49999999 10.2 22.7 22.8 22.7 12.7 0 22.8-10.2 22.79999999-22.7zM512 0C794.8 0 1024 229.2 1024 512S794.8 1024 512 1024s-512-229.2-512-512 229.2-512 512-512z"
              fill="#d81e06" p-id="28480"></path>
      </svg>
    </div>
    <music-audio @cIndex="changeIndex"></music-audio>
  </div>
</template>

<script>
  import MusicAudio from "./MusicAudio";
  import {mapState} from "vuex";

  export default {
    name: "musicControl",
    data() {
      return {
        random: 'random',
      }
    },
    components: {
      MusicAudio
    },
    methods: {
      cut(flag) {
        this.$store.commit('changePlay', flag);
      },
      changeIndex(num) {
        let index = this.index + num;
        if (index < 0) {
          index = this.playlist.length - 1
        }
        if (this.playOrder === this.random) {
          index = Math.floor(Math.random()*this.playlist.length)
        }else {
          index = index >= this.playlist.length ? 0 : index;
        }
        this.$store.commit('changePlaySongIndex', index);
      }
    },
    computed: {
      ...mapState({
        play: state => state.songState.play,
        index: state => state.playSongIndex,
        playlist: state => state.playList,
        playOrder: state => state.songState.playOrder
      })
    }
  }
</script>

<style scoped>
  .music-control {
    z-index: 999;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    background-color: #fff;
  }

  .music-control .forward,
  .music-control .next {
    padding: 0 1rem;
  }

  .music-control .next {
    padding-right: 3rem;
  }

  .music-control .play {
    padding: 0 1rem;
  }

  .music-control .icon {
    width: 3rem;
    height: 3rem;
  }

  .music-control .icon-play {
    width: 3.5rem;
    height: 3.5rem;
  }
</style>