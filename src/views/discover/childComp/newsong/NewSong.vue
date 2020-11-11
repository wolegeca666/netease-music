<template>
  <div class="new-song">
    新歌速递
    <song-list :list="songs" :pic="true"></song-list>
  </div>
</template>

<script>
  import SongList from "../../../../components/content/songlist/SongList";
  import {request} from "../../../../api/request";
  export default {
    name: "NewSong",
    data() {
      return {
        playlists: [],
        songs: [],
        playlistsShow: false,
        songsShow: false
      }
    },
    components: {SongList},
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        // this.getPlaylists();
        this.getSongList();
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
        request('/personalized/newsong?limit=100&area=JP').then(res => {
          // console.log(res);
          if (res.result?.length) {
            this.songs = res.result;
            console.log(this.songs);
          }
        }).catch(e => {
          this.getSongList();
          console.log(e);
        })
      },
    }
  }
</script>

<style scoped>

</style>