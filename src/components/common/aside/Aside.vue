<template>
  <div id="nav">
    <router-link to="/">
      <nav-bar></nav-bar>
    </router-link>
  </div>
</template>

<script>
  import NavBar from "./NavBar";

  export default {
    name: "Aside",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  #nav {
    z-index: 200;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    width: 20rem;
    height: 100vh;
    background-color: #f5f5f5;
    font-size: 1.3rem;
  }

</style>