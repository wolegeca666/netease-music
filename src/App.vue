<template>
  <div id="app">
    <div id="container">
      <nav-aside @asideShow="navShow"></nav-aside>
      <div class="nav-page" v-show="aside" ></div>
      <div class="nav-list" v-show="!aside"></div>
      <div id="view" @scroll="scroll($event)">
        <keep-alive>
          <router-view/>
        </keep-alive>
        <div class="to-top-bar" v-show="barShow"  @click="toTop">
          <to-top></to-top>
        </div>
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
  import ToTop from "./components/reusable/ToTop";

  export default {
    name: "app",
    data() {
      return {
        aside: true,
        barShow: false
      }
    },
    components: {
      Player, navAside, ToTop
    },
    methods: {
      navShow(flag) {
        this.aside = flag
      },
      resize() {
        this.$store.commit('width', document.documentElement.clientWidth);
        console.log(1);
      },

      // 回到顶部
      scroll(e) {
         e.target.scrollTop > this.height/1.5 ?
             this.barShow = true :
             this.barShow = false;
        // console.log(e.target.scrollTop);
      },

      toTop() {
        const view = document.getElementById('view');

        let step;

        view.timer = setInterval(function () {
          // 设置步长（缓动效果）
          step = (view.scrollTop) / 15;
          step > 0 ? Math.ceil(step) : Math.floor(step);
          if (view.scrollTop === 0) {
            // 停止动画
            clearInterval(view.timer)
          }
          view.scrollTop = view.scrollTop - step;

        }, 15);
      }

    },
    computed: {
      height() {
        return this.$store.state.windowsHeight
      }
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
    display: flex;
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

  #view {
    flex: 1;
    height: 100%;
    overflow: scroll;
  }
  
  #view .to-top-bar {
    position: fixed;
    bottom: 15rem;
    right: 3rem;
  }

</style>
