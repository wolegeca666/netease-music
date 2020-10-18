<template>
  <div id="app">
    <div class="container">
      <nav-aside @asideShow="navShow"></nav-aside>
      <div class="nav-page" v-show="aside"></div>
      <div class="nav-list" v-show="!aside"></div>
      <div id="view">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
    <footer>
      <player></player>
    </footer>
  </div>
</template>

<script>
  import Player from "./components/common/player/Player";
  import navAside from "./components/common/aside/Aside";

  export default {
    name: "app",
    data() {
      return {
        aside: true
      }
    },
    components: {
      Player, navAside
    },
    methods: {
      navShow(flag) {
        this.aside = flag
      }
    }
  }
</script>

<style lang="less">
  @import "assets/css/base.css";

  #app {
    width: 100vw;
    height: 100vh;
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .nav-page {
    width: 18rem;
    border-right: 1px solid transparent;
  }

  .nav-list {
    width: 4rem;
    border-right: 1px solid transparent;
  }

  #view {
    flex: 1;
    height: 100%;
    overflow: scroll;
  }

</style>
