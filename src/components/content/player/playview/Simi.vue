<template>
  <div class="simi-list">
    <div class="title">包含这首歌的歌单</div>
    <div class="hr"></div>
    <simi-playlist :list="playlists" @close="view"
                   v-if="playlistsShow"></simi-playlist>
    <div class="noc" v-show="!playlistsShow">无歌单</div>
    <div class="title">相似歌曲</div>
    <div class="hr"></div>
    <simi-song :list="songs" v-if="songsShow"></simi-song>
    <div class="noc" v-show="!songsShow">无相似歌曲</div>
  </div>
</template>

<script>
  import {request} from "../../../../api/request";
  import SimiPlaylist from "./simi/SimiPlaylist";
  import SimiSong from "./simi/SimiSong";

  export default {
    name: "Simi",
    props: {
      active: {
        type: Boolean
      }
    },
    components: {SimiSong, SimiPlaylist},
    data() {
      return {
        id: '',
        playlists: [],
        songs: [],
        playlistsShow: true,
        songsShow: true
      }
    },
    methods: {
      init() {
        if (this.active) {
          this.playlistsShow = true;
          this.songsShow = true;
          this.playlists = [];
          this.songs = [];
          this.getList();
        }
      },

      getList() {
        this.getPlaylists();
        this.getSongList();
      },
      getPlaylists() {
        request('/simi/playlist?id=' + this.playSong.id).then(res => {
          // console.log(res);
          if (res.playlists.length) {
            this.playlistsShow = true;
            this.playlists = res.playlists;
          } else {
            this.playlistsShow = false;
          }
        }).catch(e => {
          this.getPlaylists();
          console.log(e);
        })
      },
      getSongList() {
        request('/simi/song?id=' + this.playSong.id).then(res => {
          // console.log(res);
          if (res.songs.length) {
            this.songsShow = true;
            this.songs = res.songs;
          } else {
            this.songsShow = false;
          }
        }).catch(e => {
          this.getSongList();
          console.log(e);
        })
      },
      view() {
        this.$emit('close')
      }
    },
    computed: {
      playSong() {
        return this.$store.state.song;
      }
    },
    watch: {
      playSong: {
        handler() {
          this.init();
        },
        immediate: true
      },
      active() {
        this.init();
      }
    }
  }
</script>

<style scoped>
  .simi-list {
    margin-top: -1rem;
    font-size: 15px;
  }

  .title {
    font-size: 16px;
    padding: 2rem 0 1rem;
  }

  .noc {
    font-size: 15px;
    padding: 3rem 0;
    height: 10rem;
    text-align: center;
  }
</style>