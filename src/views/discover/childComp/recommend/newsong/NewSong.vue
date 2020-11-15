<template>
  <div class="recommend-song">
    <div class="song-nav">
      <nav-bar :msg="[{name:'最新音乐', path: '/discover/newsong'}]">
        <template v-slot:img>
          <img class="personalized-img" src="../../../../../assets/imgs/icon/discover/newsong.svg" alt="">
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
  import SongList from "./NewSongList";

  import {request} from "../../../../../api/request";

  export default {
    name: "NewSong",
    components: {
      NavBar,SongList
    },
    data() {
      return {
        musicList: [],
      }
    },
    mounted() {
      request('/personalized/newsong').then(res => {
        // console.log(res.result);
        this.musicList = res.result;
      }).catch(e => console.log(e))
    }
  }
</script>

<style scoped>
  .song-nav img{
    opacity: 0.8;
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
  }

  .music-list {
    padding-top: 1rem;
    font-size: 14px;
  }


</style>