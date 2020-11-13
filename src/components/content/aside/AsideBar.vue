<template>
  <div class="aside-bar">
    <nav-bar title="搜索" :index="0" path="/search"
             :current-index="currentIndex">
      <template v-slot:img>
        <img src="../../../assets/imgs/icon/aside/search.svg" alt="">
      </template>
    </nav-bar>
    <nav-bar title="发现音乐" :index="1" path="/"
             :current-index="currentIndex">
      <template v-slot:img>
        <img src="../../../assets/imgs/icon/aside/discover.svg" alt="">
      </template>
    </nav-bar>
    <nav-bar title="视频" :index="2" path="/mv"
             :current-index="currentIndex">
      <template v-slot:img>
        <img src="../../../assets/imgs/icon/aside/video.svg" alt="">
      </template>
    </nav-bar>
    <nav-bar title="最近播放" :index="3" path="/"
             :current-index="currentIndex">
      <template v-slot:img>
        <img src="../../../assets/imgs/icon/aside/record.svg" alt="">
      </template>
    </nav-bar>
    <nav-bar title="我喜欢的音乐" :index="4" path="/"
             :current-index="currentIndex">
      <template v-slot:img>
        <img src="../../../assets/imgs/icon/aside/likemusic.svg" alt="">
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "./NavBar";

  export default {
    name: "AsideBar",
    components: {
      NavBar
    },
    data() {
      return {
        currentIndex: -1,
        path: [
          'search',
          'discover',
          'mv'
        ]
      }
    },
    watch: {
      $route: {
        handler() {
          let path = this.$route.path.split('/')[1];
          for (let i = 0; i < this.path.length; i++) {
            if (this.path[i] === path) {
              this.currentIndex = i;
              break;
            }else this.currentIndex = -1;
          }
          if (this.$route.path === '/') {
            this.currentIndex = 1;
          }
        },
        immediate: true
      }
    }
  }
</script>

<style scoped>

  .aside-bar {
    min-width: 10rem;
  }

  img {
    border-radius: 0;
  }
</style>