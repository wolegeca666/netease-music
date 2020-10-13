<template>
  <div class="personalized">
    <nav-bar :msg="['推荐歌单']">
      <template v-slot:img>
        <img class="personalized-img" src="./icon/tuijian.svg" alt="">
      </template>
    </nav-bar>
    <main>
      <ul class="music-list">
        <li class="album" v-for="(item, index) in musicList" :key="index">
          <album :item="item"></album>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  import NavBar from "../../components/reusable/navbar/NavBar";
  import Album from "../../components/reusable/album/Album";

  import {request} from "../../api/request";

  export default {
    name: "personalized",
    data() {
      return {
        musicList: []
      }
    },
    components: {
      NavBar,Album
    },
    created() {
      request('/personalized').then(res => {
        // console.log(res.result);
        res.result.splice(5, 5);
        this.musicList = res.result
      }).catch(e => console.log(e))
    }
  }
</script>

<style scoped>
  .personalized-img {
    opacity: 0.6;
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
  }

  .music-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 1rem auto 2rem;
  }

</style>