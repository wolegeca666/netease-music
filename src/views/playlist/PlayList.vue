<template>
  <div class="play-list">
    <div class="title">歌单</div>
    <div v-show="show">
      <div class="play-list-msg">
        <album :item="playlist" :length="30" @imgLoad="show = true">
          <template v-slot:icon>
            <svg t="1602600869883" class="icon" viewBox="0 0 1365 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="8018" width="1.3rem"
                 height="1.3rem">
              <path d="M279.722667 469.333333h9.443555c52.337778 0 94.833778 42.439111 94.833778 94.833778v322.332445c0 52.337778-42.439111 94.833778-94.833778 94.833777h-9.443555c-52.337778 0-94.833778-42.439111-94.833778-94.833777V564.167111c0-52.337778 42.439111-94.833778 94.833778-94.833778z m0 85.333334a9.500444 9.500444 0 0 0-9.500445 9.500444v322.332445c0 5.233778 4.266667 9.500444 9.500445 9.500444h9.443555a9.500444 9.500444 0 0 0 9.500445-9.500444V564.167111a9.500444 9.500444 0 0 0-9.500445-9.500444h-9.443555zM1019.278222 469.333333h9.443556c52.337778 0 94.833778 42.439111 94.833778 94.833778v322.332445c0 52.337778-42.439111 94.833778-94.833778 94.833777h-9.443556c-52.337778 0-94.833778-42.439111-94.833778-94.833777V564.167111c0-52.337778 42.439111-94.833778 94.833778-94.833778z m0 85.333334a9.500444 9.500444 0 0 0-9.500444 9.500444v322.332445c0 5.233778 4.266667 9.500444 9.500444 9.500444h9.443556a9.500444 9.500444 0 0 0 9.500444-9.500444V564.167111a9.500444 9.500444 0 0 0-9.500444-9.500444h-9.443556z"
                    fill="#ffffff" p-id="8019"></path>
              <path d="M256 455.111111C113.720889 455.111111 0 576.910222 0 725.333333s113.720889 270.222222 256 270.222223v-113.777778c-77.653333 0-142.222222-69.176889-142.222222-156.444445S178.346667 568.888889 256 568.888889V455.111111zM1080.888889 455.111111c142.279111 0 256 121.799111 256 270.222222S1223.168 995.555556 1080.888889 995.555556v-113.777778c77.653333 0 142.222222-69.176889 142.222222-156.444445S1158.542222 568.888889 1080.888889 568.888889V455.111111z"
                    fill="#ffffff" p-id="8020"></path>
              <path d="M284.444444 967.111111V485.262222C284.444444 279.950222 450.048 113.777778 654.222222 113.777778S1024 280.007111 1024 485.262222V967.111111a56.888889 56.888889 0 0 0 113.777778 0V485.262222C1137.777778 217.315556 921.315556 0 654.222222 0S170.666667 217.315556 170.666667 485.262222V967.111111a56.888889 56.888889 0 0 0 113.777777 0z"
                    fill="#ffffff" p-id="8021"></path>
            </svg>
          </template>
        </album>
      </div>
      <div class="play-bar" v-show="load">播放全部({{ length || '' }})</div>
      <div class="play-lists">
        <song-list :list="playlist.trackIds" @show="listLoad"></song-list>
      </div>
    </div>
  </div>

</template>

<script>
  import Album from "./PlatListAlbum";
  import SongList from "./SongList";

  import {request} from "../../api/request";

  export default {
    name: "PlayList",
    components: {
      Album, SongList
    },
    data() {
      return {
        playlist: {},
        length: '',
        show: false,
        load: false
      }
    },
    created() {
      this.Id = this.$route.query.id;
      this.update();
    },
    methods: {
      update() {
        request('/playlist/detail?id=' + this.Id).then(res => {
          // console.log(res.playlist);
          if (res.playlist) {
            this.playlist = res.playlist;
            this.length = this.playlist.trackIds.length;
          }
        });
      },
      listLoad(flag) {
        this.load = flag
      }
    },
    activated() {
      if (this.Id !== this.$route.query.id) {
        this.show = false;
        this.load = false;
        this.Id = this.$route.query.id;
        this.update();
      }
    },
    watch: {
      Id() {
        this.update()
      }
    }
  }
</script>

<style scoped>
  .play-list {
    padding: 2rem 3rem 20rem;
    min-width: 100rem;
  }

  .play-list .title {
    opacity: 0.5;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  .play-list-msg {
    width: 100%;
    font-size: 14px;
  }

  .play-bar {
    font-size: 14px;
    padding: 2rem 0;
  }

  .play-lists {
    font-size: 13px;
  }

  img {
    width: 20rem;
    height: 20rem;
  }
</style>