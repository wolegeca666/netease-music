<template>
  <div id="nav">
    <div @click="cutList">=</div>
    <div class="home">
      <aside-bar :show="show"></aside-bar>
    </div>
  </div>
</template>

<script>
  import AsideBar from "./AsideBar";

  export default {
    name: "Aside",
    data() {
      return {show: true}
    },
    components: {
      AsideBar
    },
    methods: {
      cutList() {
        this.show = !this.show;
        const nav = document.getElementById('nav');
        if (this.show) {
          nav.style.width = '18rem';
        }else {
          nav.style.width = '4rem';
        }
        this.$emit('asideShow', this.show)
      }
    }
  }
</script>

<style scoped>
  #nav {
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    width: 18rem;
    height: 100vh;
    background-color: var(--color-bgc);
    font-size: 1.3rem;
  }

  .home {
    width: 100%;
    height: 100%;
  }

</style>