<template>
  <div class="list" v-show="list.length">
    <div @click="playSong(0)" class="play-bar">
      <svg class="icon" height="128" p-id="7602" t="1603614206566"
           version="1.1" viewBox="0 0 1024 1024" width="128"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M904.1 347c-21.4-50.6-52-96-91-135s-84.4-69.6-135-91c-52.4-22.2-108-33.4-165.4-33.4s-113 11.2-165.4 33.4c-50.6 21.4-96 52-135 91s-69.6 84.4-91 135c-22.2 52.4-33.4 108-33.4 165.4 0 57.3 11.2 113 33.4 165.4 21.4 50.6 52 96 91 135s84.4 69.6 135 91c52.4 22.2 108 33.4 165.4 33.4s113-11.2 165.4-33.4c50.6-21.4 96-52 135-91s69.6-84.4 91-135c22.2-52.4 33.4-108 33.4-165.4 0-57.3-11.3-113-33.4-165.4zM512.6 877.3c-201.2 0-364.9-163.7-364.9-364.9s163.7-364.9 364.9-364.9 364.9 163.7 364.9 364.9-163.7 364.9-364.9 364.9z"
              fill="#d81e06" p-id="7603"></path>
        <path d="M709.9 512.2L417.4 343.3V681z" fill="#d81e06"
              p-id="7604"></path>
      </svg>
      <p>播放全部<span v-if="list.length">{{'（' +  list.length + '）' }}</span></p>
    </div>
    <ul>
      <li :key="item.id" v-for="(item, index) in list">
        <song-list-item :current-index="currentIndex" :num="index" :song="item"
                        @itemClick="itemClick"
                        @play="playSong">
        </song-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import SongListItem from "./SongListItem";

  export default {
    name: "SongList",
    props: {
      list: {
        type: Array
      }
    },
    data() {
      return {
        currentIndex: -1,
        flag: false
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
        if (!this.flag) {
          this.$store.commit('changePlaySong', this.list[num]);
          this.flag = true;
          this.$store.commit('changePlayList', this.list);
        }
        this.$store.commit('changePlaySongIndex', num)
      }
    },
    watch: {
      list() {
        // console.log(1)
        this.flag = false;
        this.$emit('show', false);
        this.currentIndex = -1;
      }
    }
  }
</script>

<style scoped>

  .play-bar {
    width: 20rem;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 3rem 0 2rem;
  }

  .icon {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 0.5rem;
  }

  .pic {
    width: 5rem;
    height: 5rem;
    margin: 0.5rem;
  }

  .pic img {
    width: 5rem;
    height: 5rem;
  }

  li:nth-child(odd) {
    background-color: var(--color-bgc);
  }

  li:hover {
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.06);
  }

</style>