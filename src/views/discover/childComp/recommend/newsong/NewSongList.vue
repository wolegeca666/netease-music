<template>
  <div class="new-song-list">
    <ul class="list">
      <li v-for="(item,index) in list" :key="index"  :class="classHandle(index)">
          <song-list-item class="item" :num="index" :song="item" :song-msg="item.song"
                          :current-index="currentIndex" :odd-index="odd(index)"
                          @itemClick="clickHandle">
            <template v-slot:left>
              <img :src="item.picUrl" alt="">
            </template>
          </song-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import SongListItem from "../../../../../components/common/songlist/SongListItem";

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
      odd(num) {
        return num % 2 ? (num + 1)/ 2 :  (num + 2)/ 2;
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


  .list li img {
    width: 5rem;
    height: 5rem;
    margin:0.8rem 1rem 0.8rem 0;
  }

  .list .left {
    border-right: 1px solid var(--color-active);
  }

</style>