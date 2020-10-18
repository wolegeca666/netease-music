<template>
  <div class="discover">
    <header>
      <div class="d-title">
        <v-title title="发现音乐"></v-title>
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
  import vTitle from "../../components/reusable/title/Title";
  import NavBar from "../../components/reusable/navbar/NavBar";

  export default {
    name: 'Home',
    data() {
      return {
        titles: [
          {name: "个性推荐", path: '/discover'},
          {name: "歌单", path: '/discover/playlist'},
          {name: "主播电台", path: ''},
          {name: "最新音乐"},
          {name: "歌手"}
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

  }
</script>

<style scoped>
  .discover {
    min-width: 100rem;
    background-color: #fff;
    padding-bottom: 20rem;
  }

  header {
    z-index: 99;
    padding: 2rem 2.5rem;
    background-color: #fff;
  }

  .d-title {
    background-color: #fff;
    margin-bottom: 1rem;
    font-size: 12px;
    font-weight: 600;
  }

  .d-nav {
    padding-top: 1rem;
  }

  main {
    width: 100rem;
    position: relative;
    top: 3rem;
    margin: 0 auto;
    padding: 0 2rem;
  }


</style>