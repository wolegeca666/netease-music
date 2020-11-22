<template>
  <div class="new-song">
    新歌速递
    <div class="isload" v-show="loading">
      <loading :show="loading"></loading>
    </div>
    <div v-show="!loading">
      <song-list :list="songs" @isload="isLoad"></song-list>
    </div>

  </div>
</template>

<script>
  import SongList from "./NewSongList";
  import {request} from "../../../../api/request";
  import Loading from "../../../../components/common/loading/Loading";

  export default {
    name: "NewSong",
    data() {
      return {
        playlists: [],
        songs: [],
        loading: true,
        playlistsShow: false,
        songsShow: false
      }
    },
    components: {Loading, SongList},
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        // this.getPlaylists();
        this.getSongList();
      },

      isLoad() {
        this.loading = false;
      },
      // getPlaylists() {
      //   request('/album/new?area=ALL').then(res => {
      //     console.log(res);
      //     if (res) {
      //       // this.playlists = res.playlists;
      //     }
      //   }).catch(e => {
      //     this.getPlaylists();
      //     console.log(e);
      //   })
      // },
      getSongList() {
        request('/personalized/newsong?limit=50').then(res => {
          // console.log(res);
          if (res.result?.length) {
            this.songs = res.result;
            // console.log(this.songs);
          }
        }).catch(e => {
          this.getSongList();
          console.log(e);
        })
      }
    }
  }
</script>

<style scoped>

  .new-song {
    min-height: 100vh;
  }

  .isload {
    height: 30rem;
  }

</style>