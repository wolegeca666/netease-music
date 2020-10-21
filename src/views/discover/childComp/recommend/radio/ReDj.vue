<template>
  <div class="recommend-song">
    <div class="song-nav">
      <nav-bar :msg="[{name: '主播电台'}]">
        <template v-slot:img>
          <img class="personalized-img" src="../../icon/dj.svg" alt="">
        </template>
      </nav-bar>
    </div>
    <div class="music-list">
      <song-list :list="musicList"></song-list>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../../../../components/common/navbar/NavBar";
  import SongList from "./ReDjList";

  import {request} from "../../../../../api/request";

  export default {
    name: "ReDj",
    components: {
      NavBar, SongList
    },
    data() {
      return {
        musicList: []
      }
    },
    mounted() {
      request('/personalized/djprogram').then(res => {
        // console.log(res.result);
        this.musicList = res.result;
      }).catch(e => console.log(e))
    }
  }
</script>

<style scoped>
  .song-nav img {
    opacity: 0.8;
    margin-right: 0.8rem;
    width: 2.2rem;
    height: 2.2rem;
  }

  .music-list {
    padding-top: 1rem;
    font-size: 14px;
  }

</style>