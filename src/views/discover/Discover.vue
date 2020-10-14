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
      <personalized></personalized>
      <private></private>
      <new-song></new-song>
      <re-mv></re-mv>
    </main>
  </div>
</template>

<script>
  import vTitle from "../../components/reusable/title/Title";
  import NavBar from "../../components/reusable/navbar/NavBar";

  import Personalized from "./recommend/Personalized";
  import Private from "./recommend/Private";
  import NewSong from "./recommend/newsong/NewSong";
  import ReMv from "./recommend/ReMv";

  export default {
    name: 'Home',
    data() {
      return {
        titles: [
          "个性推荐", "歌单", "主播电台", "最新音乐", "歌手"
        ],
        title: '个性推荐'
      }
    },
    components: {
      vTitle, NavBar,
      Personalized, Private, NewSong, ReMv
    },
    methods: {
      titleClick(title) {
        this.title = title;
      }
    }
  }
</script>

<style scoped>
  .discover {
    min-width: 90rem;
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
    width: 90rem;
    position: relative;
    top: 3rem;
    margin: 0 auto;
    padding: 0 2.5rem;
  }


</style>