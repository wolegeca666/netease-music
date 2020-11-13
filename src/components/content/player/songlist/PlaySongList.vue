<template>
  <div class="song-list-s">
    <div class="close-bar" @click="$emit('close')">
      <img src="../../../../assets/imgs/icon/close/close.svg">
    </div>
    <div class="song-list" :class="{'show': !show}">
      <ul v-if="playLists">
        <li v-for="(item, index) in playLists" :key="index">
          <song-list-item :song="item" :num="index"
                          :current-index="currentIndex"
                          @itemClick="itemClick"
                          @play="playSong"></song-list-item>
        </li>
        <li v-if="!playLists.length" class="no-song">没有歌曲啦>_<</li>
      </ul>
    </div>
  </div>

</template>

<script>
  import SongListItem from "./PlaySongListItem";
  import {mapState} from "vuex"

  export default {
    name: "SongList",
    props: {
      show: {
        type: Boolean
      }
    },
    data() {
      return {
        currentIndex: -1
      }
    },
    components: {
      SongListItem
    },
    methods: {
      itemClick(num) {
        this.currentIndex = num;
      },
      playSong(num) {
        // console.log(this.playLists);
        this.$store.commit('changePlaySong', this.playLists[num]);
        if (num !== this.index) {
          this.$store.commit('changePlaySongIndex', num)
        }
      },

      authorHandle(obj) {
        let arr = [];
        let authors = obj.ar ?? obj.artists;
        authors.forEach(function (item) {
          arr.push(item.name)
        });
        return arr.join(' / ');
      }
    },
    computed: {
      ...mapState({
        playLists: state => state.playList,
        index: state => state.playSongIndex
      })
    },
    watch: {
      index() {
        // console.log(this.index);
        if (this.index < 0 || this.index >= this.playLists.length) {
          this.$store.commit('changePlay', false);
        } else {
          this.playSong(this.index);
        }
      },
      show() {
        // console.log(this.show)
        if (!this.show) {
          this.currentIndex = -1
        }
      }
    }
  }
</script>

<style scoped>
  .song-list {
    transition: all 500ms;
    position: relative;
    overflow: scroll;
    overflow-x: hidden;
    background-color: transparent;
    height: 45rem;
    width: 50rem;
  }

  .show {
    visibility: hidden;
  }

  .close-bar {
    z-index: 9999;
    position: absolute;
    top: 1.3rem;
    right: 2.5rem;
  }

  .close-bar img {
    width: 2rem;
    height: 2rem;
    opacity: 0.5;
  }

  .no-song {
    font-size: 14px;
    text-align: center;
    line-height: 4.5rem;
  }

  li:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.02);
  }

  li:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
</style>