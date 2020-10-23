<template>
  <div class="search">
    <div class="search-bar">
      <input id="search" type="text" autocomplete="off" v-model="input"
             @keydown.enter="searchHandle" @input="suggestHandle">
      <label for="search"></label>
      <div v-for="item in order" v-if="suggest">
        <div v-for="msg in suggest[item]" @click="sugSearch(msg.name)">
          {{msg.name}}
        </div>
      </div>
    </div>

    <div v-if="most">
      <div v-for="item in most.orders">
        <div v-for="msg in most[item]">
          {{msg.name}}
        </div>
      </div>
    </div>
    <div class="list" v-if="result">
      <song-list :list="result" :all-show="false"></song-list>
    </div>
  </div>
</template>

<script>
  import {request} from "../../api/request";
  import SongList from "../../components/content/songlist/SongList";

  export default {
    name: "Search",
    components: {SongList},
    data() {
      return {
        input: '',
        keywords: '',
        suggest: '',
        order: '',
        result: [],
        most: ''
      }
    },
    methods: {

      suggestHandle() {
        if (this.input) {
          this.getSug();
        }
      },

      searchHandle() {
        if (this.input && this.keywords !== this.input) {
          this.keywords = this.input;
          this.search();
          this.suggest = '';
        }
      },

      sugSearch(msg) {
        this.input = msg;
        this.searchHandle();
      },

      // 搜索建议
      getSug() {
        // console.log(this.input);
        request('/search/suggest?keywords=' + this.input).then(res => {
          // console.log(res);
          this.order = res.result.order || '';
          this.suggest = res.result;
        }).catch(e => {
          console.log(e);
          this.order = ''
        })
      },

      // 搜索结果
      search() {
        request('/cloudsearch?keywords=' + this.keywords).then(res => {
          // console.log(res);
          this.result = res.result.songs
        }).catch(e => console.log(e));
        request('/search/multimatch?keywords=' + this.keywords).then(res => {
          console.log(res);
          this.most = res.result
        }).catch(e => console.log(e))
      }
    },
    watch: {
      input() {
        if (!this.input) {
          this.suggest = '';
          this.suggest = '';
          this.order = '';
          this.result = [];
          this.most = '';
        }
      }
    }
  }
</script>

<style scoped>

  .list {
    margin: 2rem 2rem 5rem;
  }
</style>