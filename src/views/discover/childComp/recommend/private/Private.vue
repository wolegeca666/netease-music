<template>
  <div class="personalized" v-show="load">

    <nav-bar :msg="[{name: '独家放送'}]">
      <template v-slot:img>
        <img class="personalized-img" src="../../../../../assets/imgs/icon/discover/dujia.svg" alt="">
      </template>
    </nav-bar>

    <main>
      <ul class="music-list">
        <li class="album" v-for="(item, index) in musicList" :key="index">

          <album :item="item" :length="23" :size="imgSize" @imgLoad="show(index)"></album>

        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  import NavBar from "../../../../../components/common/navbar/NavBar";
  import Album from "../../../../../components/content/coverimg/Album";

  import {request} from "../../../../../api/request";

  export default {
    name: "private",
    data() {
      return {
        musicList: [],
        imgSize: {
          width: '30rem',
          height: '17rem'
        },
        load: false
      }
    },
    components: {
      NavBar,Album
    },
    mounted() {
      request('/personalized/privatecontent').then(res => {
        // console.log(res.result);
        this.musicList = res.result
      }).catch(e => console.log(e))
    },
    methods: {
      show(num) {
        if ((++num) >= this.musicList.length) {
          this.load = true
        }
      }
    }
  }
</script>

<style scoped>
  .personalized-img {
    opacity: 0.8;
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 0;
  }

  .music-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 1rem auto 5rem;
  }
</style>