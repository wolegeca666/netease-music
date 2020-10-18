<template>
  <div class="aside-bar">
    <nav-bar title="搜索" :index="0" path="/search"
             :current-index="currentIndex" @active="activeIndex">
      <template v-slot:img>
        <img src="./icon/discover.svg" alt="">
      </template>
    </nav-bar>
    <nav-bar title="发现音乐" :index="1" path="/"
             :current-index="currentIndex" @active="activeIndex">
      <template v-slot:img>
        <img src="./icon/discover.svg" alt="">
      </template>
    </nav-bar>
    <nav-bar title="MV" :index="2" path="/mv"
             :current-index="currentIndex" @active="activeIndex">
      <template v-slot:img>
        <img src="./icon/discover.svg" alt="">
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
        currentIndex: 1,
        path: [
            '/',
            '/search',
            '/mv',
            '/discover'
        ]
      }
    },
    methods: {
      activeIndex(index) {
        this.currentIndex = index;
      }
    }
  }
</script>

<style scoped>

</style>