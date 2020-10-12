<template>
  <div id="app">
    <div class="container">
      <nav-aside></nav-aside>
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
  .container {
    display: flex;
  }

  #view {
    flex: 1;
  }

</style>
