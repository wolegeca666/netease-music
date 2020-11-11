<template>
  <div class="simi-songs">
    <div class="load" v-show="!simiSong.length">
      <loading :show="!simiSong.length"></loading>
    </div>
    <ul>
      <li v-for="item in simiSong" :key="item.id">
        <scale>
          <template v-slot:item>
            <div class="song" @click="musicPlay(item)">
              <div class="pic">
                <img :src="item.al.picUrl" alt="">
                <div class="play">
                  <play></play>
                </div>
              </div>
              <div class="song-text">
                <div class="msg">
                  <p class="name">{{item.name}}</p>
                  <p class="alia" v-if="(item.al.length || 0)!==0">
                    {{ ' (' + item.al[0] + ')' }}</p>
                  <div class="play-bar">
                  </div>
                </div>
                <div class="author">{{ authorHandle(item) }}</div>
              </div>
            </div>
          </template>
        </scale>
      </li>
    </ul>
  </div>
</template>

<script>
  import Scale from "../../../../common/Scale";
  import Loading from "../../../../common/loading/Loading";
  import {request} from "../../../../../api/request";
  import Play from "../../../../common/Play";

  export default {
    name: "SimiSong",
    components: {
      Play,
      Loading,
      Scale
    },
    props: {
      list: {
        type: Array
      }
    },
    data() {
      return {
        simiSong: []
      }
    },
    methods: {
      musicPlay(item) {
        this.$store.commit('playlistAdd', item);
      },

      init() {
        let ids = [];
        this.list.map(song => {
          ids.push(song.id)
        });
        this.getMusicDetail(ids.join(','))
      },

      getMusicDetail(ids) {
        request('/song/detail?ids=' + ids)
            .then((res) => {
              // console.log(res);
              if (res.songs) {
                this.simiSong = res.songs
              }
            }).catch(e => {
          console.log(e);
          this.getMusicDetail(ids);
        });
      },

      authorHandle(obj) {
        let arr = [];
        let authors = obj.ar;
        authors.forEach(function (item) {
          arr.push(item.name)
        });
        return arr.join(' / ');
      },
    },
    watch: {
      list() {
        this.simiSong = [];
        if (this.list.length) {
          this.init();
        }
      }
    }
  }
</script>

<style scoped>

  .simi-songs {
    padding-top: 0.5rem;
  }

  .song {
    display: flex;
    align-items: center;
  }

  .song:hover {
    background-color: var(--color-active);
  }

  .pic {
    position: relative;
    width: 5rem;
    height: 5rem;
    margin: 0.5rem;
  }

  .play {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.5rem;
    height: 2.5rem;
    transform: translate(-50%, -50%);
    border-radius: 2.5rem;
    background-color: #333;
    opacity: 0.6;
  }

  .play:hover {
    opacity: 0.8;
  }

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 5px;
  }

  .song-text {
    margin-left: 0.5rem;
    width: 80%;
    height: 5rem;
    display: flex;
    flex-direction: column;
  }

  .msg {
    display: flex;
  }

  .name,
  .alia {
    line-height: 2.5rem;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .alia {
    color: var(--color-text);
  }

  .author {
    line-height: 2.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 13px;
    color: var(--color-text);
  }

  .load {
    height: 20rem;
  }
</style>