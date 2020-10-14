<template>
  <div class="personalized">

    <nav-bar :msg="['独家放送']">
      <template v-slot:img>
        <img class="personalized-img" src="../icon/dujia.svg" alt="">
      </template>
    </nav-bar>

    <main>
      <ul class="music-list">
        <li class="album" v-for="(item, index) in musicList" :key="index">

          <album :item="item" :size="imgSize"></album>

        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  import NavBar from "../../../components/reusable/navbar/NavBar";
  import Album from "../../../components/common/album/Album";

  import {request} from "../../../api/request";

  export default {
    name: "private",
    data() {
      return {
        musicList: [],
        imgSize: {
          width: '26.5rem',
          height: '15rem'
        }
      }
    },
    components: {
      NavBar,Album
    },
    created() {
      request('/personalized/privatecontent').then(res => {
        // console.log(res.result);
        this.musicList = res.result
      }).catch(e => console.log(e))
    }
  }
</script>

<style scoped>
  .personalized-img {
    opacity: 0.8;
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
  }

  .music-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 1rem auto 5rem;
  }
</style>