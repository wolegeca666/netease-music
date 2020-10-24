<template>
  <div class="search">
    <div class="search-bar">
      <input id="search" type="text" autocomplete="off" spellcheck="false"
             v-model="input" @keydown.enter="searchHandle" @input="suggestHandle"/>
      <label for="search"></label>
      <div class="icon">
        <img src="../../assets/imgs/icon/search/search.svg" alt="">
      </div>
      <div class="suggest" v-show="suggest">
        <div class="head">相关结果</div>
        <div v-if="suggest.songs">
          <div class="title"><img src="../../assets/imgs/icon/search/song.svg" alt="">单曲</div>
          <div class="item" v-for="msg in suggest.songs" @click="sugSearch(msg.name)">
            {{msg.name }}
          </div>
        </div>
        <div v-if="suggest.albums">
          <div class="title"><img src="../../assets/imgs/icon/search/album.svg" alt="">专辑</div>
          <div class="item" v-for="msg in suggest.albums" @click="sugSearch(msg.name)">
            {{msg.name }}
          </div>
        </div>
        <div v-if="suggest.artists">
          <div class="title"><img src="../../assets/imgs/icon/search/artist.svg" alt="">歌手</div>
          <div class="item" v-for="msg in suggest.artists" @click="sugSearch(msg.name)">
            {{msg.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="hot-search">

    </div>
    <main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>
  </div>
</template>

<script>
  import {request} from '../../api/request';
  import VTitle from "../../components/common/title/Title";

  export default {
    name: 'Search',
    components: {VTitle},
    data() {
      return {
        input: '',
        keywords: '',
        suggest: '',
        order: '',
        flag: true
      };
    },
    activated() {
      if (this.$route.path === '/search/multimatch') {
        this.input = this.$route.query.keywords;
      }else if (this.$route.path === '/search') {
        this.input = '';
      }
    },
    methods: {
      suggestHandle() {
        // console.log(2)
        if (this.input) {
          this.flag = true;
          this.getSug();
        } else {
          this.init();
          if (this.$route.path !== '/search')
            this.$router.push({name: 'Search'});
        }
      },

      init() {
        this.keywords = '';
        this.suggest = '';
        this.order = '';
        this.most = '';
        this.playlist = []
      },

      searchHandle() {
        if (this.input && this.input !== this.$route.query.keywords) {
          this.keywords = this.input;
          this.$router.push({
            name: 'SearchResult',
            query: {keywords: this.keywords}
          });
          this.suggest = '';
        }
      },

      sugSearch(msg) {
        this.input = msg;
        this.suggest = '';
        this.searchHandle();
      },

      // 搜索建议
      getSug() {
        // console.log(this.input);
        request('/search/suggest?keywords=' + this.input)
            .then(res => {
              console.log(res);
              if (this.flag && res.result.order) {
                this.order = res.result.order || '';
                this.suggest = res.result || '';
              }
            })
            .catch(e => {
              console.log(e);
              this.order = '';
            });
      }
    },
    watch: {
      input() {
        if (!this.input) {
          this.flag = false
        }
      }
    }
  };
</script>

<style scoped>
  .search {
    font-size: 13px;
    min-width: 95rem;
    padding: 2rem 3rem 10rem;
  }

  .icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .icon img {
    width: 2.5rem;
    height: 2.5rem;
  }

  .search-bar {
    position: relative;
  }

  #search {
    font-size: 14px;
    width: 100%;
    height: 4.5rem;
    padding: 1.5rem;
    caret-color: hsla(228, 4%, 24%, 0.6);
    outline: none;
    border: 1px solid var(--color-active);
  }

  .suggest {
    z-index: 200;
    position: absolute;
    width: 100%;
    padding: 1rem 0;
    margin-top: 1rem;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 0 1rem #ccc;
  }

  .suggest .head {
    padding: 0 2rem 1rem;
  }

  .suggest .title {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 1rem;
  }

  .suggest .title img {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
  }

  .suggest .item {
    padding: 1rem 4rem;
  }

  .suggest .item:hover {
    background-color: var(--color-hover);
  }

  main {
    padding-top: 2rem;
  }
  
</style>
