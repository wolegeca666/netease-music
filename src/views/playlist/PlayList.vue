<template>
  <div class="play-list">
    <div class="play-list-msg">
      <album :item="playlist" :length="30"/>
      <song-list :list="playlist.trackIds"></song-list>
    </div>
  </div>

</template>

<script>
  import Album from "./PlatListAlbum";
  import SongList from "../../components/common/songlist/SongList";

  import {request} from "../../api/request";

  export default {
    name: "PlayList",
    components: {
      Album, SongList
    },
    data() {
      return {
        playlist: {},
      }
    },
    created() {
      const Id = this.$route.query.id;
      request('/playlist/detail?id=' + Id).then(res => {
        // console.log(res);
        this.playlist = res.playlist;
      })
    }
  }
</script>

<style scoped>
  .play-list {
    padding-bottom: 20rem;
  }

  img {
    width: 20rem;
    height: 20rem;
  }
</style>