<template>
  <div class="new-song-list">
    <ul class="list">
      <li :class="classHandle(index)" :key="index" v-for="(item,index) in list">
        <song-list-item :current-index="currentIndex" :num="index" :song="item"
                        :song-msg="item.song"
                        @itemClick="clickHandle"
                        class="item">
          <template v-slot:left>
            <img :src="item.picUrl" alt="">
          </template>
        </song-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import SongListItem from "./NewSongListItem";

  export default {
    name: "SongList",
    components: {
      SongListItem
    },
    props: {
      list: {
        type: Array,
      }
    },
    data() {
      return {
        currentIndex: -1
      }
    },
    methods: {
      clickHandle(num) {
        this.currentIndex = num
      },
      classHandle(num) {
        return num % 2 ? 'right' : 'left'
      }
    }
  }
</script>

<style scoped>
  .new-song-list {
    margin-bottom: 5rem;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }

  .list li {
    width: 50%;
    background-color: #fff;
  }

  .list li:nth-child(4n+2),
  .list li:nth-child(4n+1) {
    background-color: var(--color-bgc);
  }

  .list li img {
    width: 5rem;
    height: 5rem;
    margin: 0.8rem 1rem 0.8rem 0;
  }

  .list .left {
    border-right: 1px solid var(--color-active);
  }

</style>