<template>
  <div class="new-song-list">
    <ul class="list">
      <li v-for="(item,index) in list" :key="index" :class="{'center': !classHandle(index)}">
        <song-list-item class="item" :num="index" :song="item" :radio-name="item.program.radio.name"
                        :current-index="currentIndex"
                        @itemClick="clickHandle">
          <template v-slot:left>
            <img :src="item.picUrl" alt=" " @load="show(index)"/>
          </template>
        </song-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import SongListItem
    from "./RadioListItem";

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
        return ++num % 2  ? (++num / 2) % 2 : (num / 2) % 2
      },
      show(num) {
        this.$emit('imgLoad', num)
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