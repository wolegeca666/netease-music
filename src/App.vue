<template>
  <div id="app">
    <div id="aside">
      <aside-left></aside-left>
    </div>
    <div id="container">
      <container></container>
    </div>
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

  export default {
    name: "app",
    data() {
      return {

      }
    },
    components: {
      ToTopBar,
      Container, Player, AsideLeft
    },
    methods: {
      play() {
        this.$store.commit('changePlay', !this.playState)
      }
    },
    computed: {
      playState() {
        return this.$store.state.songState.play
      }
    }
  }
</script>

<style lang="less">
  @import "assets/css/base.css";

  body {
    width: 100vw;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  #body::-webkit-scrollbar{
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
    flex: 1;
  }

  #footer {
    z-index: 999;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
  }


</style>
