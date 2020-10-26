<template>
  <div class="list" >
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <list-item :song="item" :num="index" :current-index="currentIndex"
                        @itemClick="itemClick">
          <template v-slot:left>
            <div class="image">
              <img v-show="isLoad" :src="item.img1v1Url" alt="" @load="imgLoad">
            </div>
          </template>
        </list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import ListItem from "./ListItem";

  export default {
    name: "ArtistList",
    props: {
      list: {
        type: Array
      },
    },
    data() {
      return {
        currentIndex: -1,
        loadIndex: 0
      }
    },
    components: {
      ListItem
    },
    methods: {
      itemClick(num) {
        this.currentIndex = num;
      },
      imgLoad() {
        this.loadIndex++;
      },
    },
    computed: {
      isLoad() {
        if (this.list.length) {
          return  this.loadIndex >= this.list.length
        }
      }
    },
    watch: {
      list() {
        this.currentIndex = -1;
        this.loadIndex = 0
      }
    }
  }
</script>

<style scoped>

  .image img {
    border-radius: 2px;
    width: 5rem;
    height: 5rem;
    margin-right: -1rem;
  }

  .image {
    border-radius: 2px;
    width: 5.1rem;
    height: 5.1rem;
    margin-right: 1rem;
  }

</style>