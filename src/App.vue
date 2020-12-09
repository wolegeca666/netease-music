<template>
  <div id="app">
    <div id="aside">
      <aside-left></aside-left>
    </div>
    <div id="container">
      <container></container>
    </div>
    <section class="sub-list">
      <sub-list></sub-list>
    </section>
    <to-top-bar></to-top-bar>
    <div id="footer">
      <player></player>
    </div>
  </div>
</template>

<script>
  import AsideLeft from "./components/content/aside/AsideLeft";
  import Container from "./views/Container";
  import Player from "./components/content/player/Player";
  import ToTopBar from "./components/content/ToTopBar";
  import LoginView from "./components/content/LoginView";
  import SubList from "./components/content/subList/SubList";

  export default {
    name: "app",
    data() {
      return {}
    },
    components: {
      SubList,
      LoginView,
      ToTopBar,
      Container, Player, AsideLeft
    },
    methods: {},
    computed: {}
  }
</script>

<style lang="less">
  @import "assets/css/base.css";

  body {
    width: 100vw;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  #body::-webkit-scrollbar {
    display: none;
  }

  #body {
    overflow-y: hidden;
  }

  #app {
    width: 100vw;
    display: flex;
  }

  #container {
    width: 80vw;
    flex: 1;
  }

  #footer {
    z-index: 200;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
  }

  .sub-list {
    z-index: 999;
  }

</style>
