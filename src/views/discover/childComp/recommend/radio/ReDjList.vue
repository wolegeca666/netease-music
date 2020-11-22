<template>
  <div class="new-song-list">
    <ul class="list">
      <li :class="{'center': !classHandle(index)}" :key="index"
          v-for="(item,index) in list">
        <song-list-item :current-index="currentIndex" :num="index" :radio-name="item.program.radio.name"
                        :song="item"
                        @itemClick="clickHandle"
                        class="item">
          <template v-slot:left>
            <img :src="item.picUrl" alt=" "/>
          </template>
        </song-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import SongListItem from "./RadioListItem";

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
        return ++num % 2 ? (++num / 2) % 2 : (num / 2) % 2
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
    margin-top: -1rem;
  }

  .list li {
    width: 50%;
    background-color: #fff;
  }

  .list li img {
    width: 8rem;
    height: 8rem;
    margin: 0 1rem 0 0;
  }

  .list li.center {
    padding: 1rem 0;
    margin: 1rem 0;
    border-top: 1px solid var(--color-active);
    border-bottom: 1px solid var(--color-active);
  }
</style>