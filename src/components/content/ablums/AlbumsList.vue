<template>
  <div class="list" v-show="list.length > 30 || isLoad">
    <ul>
      <li :key="index" v-for="(item, index) in list"
          v-show="!(errIndex.includes(index))">
        <list-item :current-index="currentIndex" :num="index" :song="item"
                   @itemClick="itemClick">
          <template v-slot:left>
            <div class="image">
              <img :src="item.picUrl" @error="errorload(index)" @load="imgLoad"
                   alt="404">
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
    name: "AlbumList",
    props: {
      list: {
        type: Array
      },
    },
    data() {
      return {
        currentIndex: -1,
        loadIndex: 0,
        errIndex: []
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
      errorload(index) {
        this.errIndex.push(index);
      }
    },
    computed: {
      isLoad() {
        if (this.list.length) {
          return this.loadIndex >= (this.list.length - this.errIndex.length)
        }
      }
    },
    watch: {
      list() {
        this.currentIndex = -1;
      },
      isLoad() {
        if (this.isLoad) {
          this.$emit('isload')
        }
      }
    }
  }
</script>

<style scoped>

  .loading {
    width: 100%;
    height: 20rem;
  }

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