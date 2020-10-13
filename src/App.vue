<template>
  <div id="app">
    <div class="container">
      <nav-aside></nav-aside>
      <div class="nav-page"></div>
      <div id="view">
        <router-view/>
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
    components: {
      Player, navAside
    }
  }
</script>

<style lang="less">
  @import "assets/css/base.css";
  #app{
    width: 100vw;
    height: 100vh;
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .nav-page {
    width: 20rem;
  }
  #view {
    flex: 1;
    height: 100%;
    overflow: scroll;
  }

</style>
