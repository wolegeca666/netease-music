<template>
  <div class="aside" :class="{'show': aside, 'un-show': !aside}">
    <nav-aside @asideShow="navShow"></nav-aside>
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

  .aside::after {
    clear: both;
    content: "";
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .show {
    width: 18rem;
  }

  .un-show {
    width: 4rem;
  }
</style>