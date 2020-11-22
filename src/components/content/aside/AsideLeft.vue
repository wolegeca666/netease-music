<template>
  <div class="aside">
    <nav-aside @asideShow="navShow"></nav-aside>
    <div class="nav-page" v-show="aside"></div>
    <div class="nav-list" v-show="!aside"></div>
  </div>
</template>

<script>
  import navAside from "./Aside";

  export default {
    name: "AsideLeft",
    data() {
      return {
        aside: true
      }
    },
    components: {
      navAside
    },
    methods: {
      navShow(flag) {
        this.aside = flag
      },
    }
  }
</script>

<style scoped>

  .aside {
    overflow: hidden;
  }

  .nav-page {
    width: 18rem;
    border-right: 1px solid transparent;
  }

  .nav-list {
    position: relative;
    width: 4rem;
    border-right: 1px solid transparent;
  }
</style>