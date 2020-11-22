<template>
  <div class="discover">
    <header>
      <div class="d-title">
        <v-title :title="{name: '发现音乐'}"></v-title>
      </div>
      <div class="d-nav">
        <nav-bar :active-title="title" :left-icon="false" :msg="titles"
                 @titleClick="titleClick"></nav-bar>
      </div>
    </header>
    <main>
      <transition :name="name">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </main>
  </div>
</template>

<script>
  import vTitle from "../../components/common/title/Title";
  import NavBar from "../../components/common/navbar/NavBar";

  export default {
    name: 'Home',
    data() {
      return {
        titles: [
          {name: "个性推荐", path: '/discover'},
          {name: "歌单", path: '/discover/playlist'},
          {name: "主播电台", path: ''},
          {name: "排行榜", path: '/discover/toplist'},
          {name: "歌手"},
          {name: "最新音乐", path: '/discover/newsong'},
        ],
        name: 'left',
        title: '个性推荐'
      }
    },
    components: {
      vTitle, NavBar
    },
    activated() {
      window.scrollTo(0, 0);
    },
    methods: {
      titleClick(title) {
        this.title = title;
      }
    },
    watch: {
      $route(to, from) {
        if (this.$route.path === '/') {
          this.title = this.titles[0].name;
          this.name = "left"
        } else if (to.path.split('/').includes('discover')) {
          window.scrollTo(0, 0);
          if (to.meta.index < from.meta.index) {
            this.name = "right"
          } else {
            this.name = "left"
          }
        }
      }
    }
  }
</script>

<style scoped>
  .discover {
    position: relative;
    min-width: 100rem;
    background-color: #fff;
    padding-bottom: 20rem;
  }

  header {
    z-index: 99;
    padding: 2rem 2.5rem;
    background-color: #fff;
  }

  .d-nav {
    padding-top: 1rem;
  }

  main {
    width: 100rem;
    position: relative;
    margin: 0 auto;
    padding: 0 2rem;
  }


  .left-enter {
    transform: translate3d(4rem, 0, 0);
  }

  .left-enter-to {
    transform: translate3d(0, 0, 0);
  }

  .left-enter-active {
    transition: 0.4s;
  }

  .left-leave-to {
    transform: translate3d(-4rem, 0, 0);
    opacity: 0;
  }

  .left-leave-active {
    transition: 0.1s;
  }

  .right-enter {
    transform: translate3d(-4rem, 0, 0);
  }

  .right-enter-to {
    transform: translate3d(0, 0, 0);
  }

  .right-enter-active {
    transition: 0.4s;
  }

  .right-leave-to {
    transform: translate3d(4rem, 0, 0);
    opacity: 0;
  }

  .right-leave-active {
    transition: 0.1s;
  }

</style>