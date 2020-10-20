<template>
  <div class="song-list" v-show="show">
    <ul v-if="playLists">
      <li v-for="(item, index) in playLists" :key="index">
        <song-list-item :song="item" :num="index" :current-index="currentIndex"
                        @itemClick="itemClick"
                        @play="playSong"></song-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import SongListItem from "./SongListItem";
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
        this.$store.commit('changePlaySong', {
          id: this.playLists[num].id,
          name: this.playLists[num].name,
          author: this.authorHandle(this.playLists[num]),
          picUrl: this.playLists[num].al.picUrl
        });
      },
      authorHandle(obj) {
        let arr = [];
        let authors = obj.ar;
        authors.forEach(function (item) {
          arr.push(item.name)
        });
        return this.cutContext(arr.join(' / '));
      },

      cutContext(str) {
        if (str.length > 35) {
          return str.substring(0, 30) + '...'
        } else {
          return str
        }
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
        }else {
          this.playSong(this.index);
        }
      },
      show() {
        if (!this.show) {
          this.currentIndex = -1
        }
      }
    }
  }
</script>

<style scoped>
  .song-list {
    position: relative;
    overflow: scroll;
    background-color: transparent;
    height: 40rem;
    width: 50rem;
  }
</style>