<template>
  <div class="discover">
    <header>
      <div class="d-title">
        <v-title :title="{name: '发现音乐'}"></v-title>
      </div>
      <div class="d-nav">
        <nav-bar :msg="titles" :active-title="title" :left-icon="false"
                 @titleClick="titleClick"></nav-bar>
      </div>
    </header>
    <main>
      <transition :name="name">
        <keep-alive><router-view/></keep-alive>
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
          {name: "排行榜"},
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
    methods: {
      titleClick(title) {
        this.title = title;
      }
    },
    watch: {
      $route(to,from) {
        if (this.$route.path === '/') {
          this.title = this.titles[0].name;
          this.name ="left"
        }else if (to.path.split('/').includes('discover')) {
          if(to.meta.index < from.meta.index){
            this.name ="right"
          }else{
            this.name ="left"
          }
        }
      }
    },
    activated() {
      document.documentElement.scrollTop = 0;
    },
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


  .left-enter{
    transform:translateX(6rem);
  }
  .left-enter-to{
    transform:translateX(0);
  }
  .left-enter-active{
    transition: 0.6s;
  }
  .left-leave-to{
    transform:translateX(-6rem);
    opacity: 0;
  }
  .left-leave-active{
    transition: 0.1s;
  }

  .right-enter{
    transform:translateX(-6rem);
  }
  .right-enter-to{
    transform:translateX(0);
  }
  .right-enter-active{
    transition: 0.6s;
  }
  .right-leave-to{
    transform:translateX(6rem);
    opacity: 0;
  }
  .right-leave-active{
    transition: 0.1s;
  }

</style>