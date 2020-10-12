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
    overflow: hidden;
    position: relative;
    left: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    width: 20rem;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.02);
    font-size: 1.3rem;
  }

</style>