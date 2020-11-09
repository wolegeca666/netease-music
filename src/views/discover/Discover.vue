<template>
  <div class="discover">
    <header>
      <div class="d-title">
        <v-title :title="{name: '发现音乐'}"></v-title>
      </div>
      <div class="d-nav">
        <nav-bar :msg="titles" :active-title="title" :left-icon="false"
                 @titleClick="titleClick"></nav-bar>
      </div>
    </header>
    <main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>
  </div>
</template>

<script>
  import vTitle from "../../components/common/title/Title";
  import NavBar from "../../components/common/navbar/NavBar";

  export default {
    name: 'Home',
    data() {
      return {
        titles: [
          {name: "个性推荐", path: '/discover'},
          {name: "歌单", path: '/discover/playlist'},
          {name: "主播电台", path: ''},
          {name: "排行榜"},
          {name: "歌手"},
          {name: "最新音乐"},
        ],
        path: [

        ],
        title: '个性推荐'
      }
    },
    components: {
      vTitle, NavBar
    },
    methods: {
      titleClick(title) {
        this.title = title;
      }
    },
    watch: {
      $route() {
        if (this.$route.path === '/') {
          this.title = this.titles[0].name
        }
      }
    },
    activated() {
      const view = document.getElementById('view');
      view.scrollTop = 0;
    }
  }
</script>

<style scoped>
  .discover {
    position: relative;
    min-width: 100rem;
    background-color: #fff;
    padding-bottom: 20rem;
  }

  header {
    z-index: 99;
    padding: 2rem 2.5rem;
    background-color: #fff;
  }



  .d-nav {
    padding-top: 1rem;
  }

  main {
    width: 100rem;
    position: relative;
    margin: 0 auto;
    padding: 0 2rem;
  }


</style>