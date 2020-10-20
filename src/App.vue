<template>
  <div id="app">
    <div id="container">
      <container></container>
    </div>
    <footer>
      <player></player>
    </footer>
  </div>
</template>

<script>
  import Player from "./components/common/player/Player";
  import Container from "./views/Container";

  export default {
    name: "app",
    data() {
      return {

      }
    },
    components: {
      Container, Player,
    }
  }
</script>

<style lang="less">
  @import "assets/css/base.css";

  #app {
    width: 100vw;
    height: 100vh;
  }

  #container {
    width: 100%;
    height: 100%;
  }


</style>
