<template>
  <div class="cloud">
    <div class="load" v-show="!list.length">
      <loading :show="!list.length"></loading>
    </div>
    <div @click="playSong(0)" class="play-bar" v-show="list.length !== 0">
      <svg class="icon" height="128" p-id="7602" t="1603614206566"
           version="1.1" viewBox="0 0 1024 1024" width="128"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M904.1 347c-21.4-50.6-52-96-91-135s-84.4-69.6-135-91c-52.4-22.2-108-33.4-165.4-33.4s-113 11.2-165.4 33.4c-50.6 21.4-96 52-135 91s-69.6 84.4-91 135c-22.2 52.4-33.4 108-33.4 165.4 0 57.3 11.2 113 33.4 165.4 21.4 50.6 52 96 91 135s84.4 69.6 135 91c52.4 22.2 108 33.4 165.4 33.4s113-11.2 165.4-33.4c50.6-21.4 96-52 135-91s69.6-84.4 91-135c22.2-52.4 33.4-108 33.4-165.4 0-57.3-11.3-113-33.4-165.4zM512.6 877.3c-201.2 0-364.9-163.7-364.9-364.9s163.7-364.9 364.9-364.9 364.9 163.7 364.9 364.9-163.7 364.9-364.9 364.9z"
              fill="#d81e06" p-id="7603"></path>
        <path d="M709.9 512.2L417.4 343.3V681z" fill="#d81e06"
              p-id="7604"></path>
      </svg>
      <p>播放全部<span>{{'（' +  list.length + '）' }}</span></p>
    </div>
    <ul>
      <li :key="item.id" v-for="(item, index) in list">
        <song-list-item :current-index="currentIndex" :num="index" :song="item"
                        @itemClick="itemClick"
                        @play="playSong">
        </song-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import {request} from "../../api/request";
  import SongListItem from "../../components/content/songlist/SongListItem";
  import Loading from "../../components/common/loading/Loading"

  export default {
    name: "Cloud",
    components: {SongListItem, Loading},
    data() {
      return {
        list: [],
        count: 0,
        currentIndex: -1,
        flag: false,
        active: false
      }
    },
    activated() {
      this.active = true;
      this.getList();
    },
    deactivated() {
      this.active = false;
      this.list = []
    },
    methods: {
      getList() {
        if (this.count === 0) {
          request('/user/cloud')
            .then(res => {
              // console.log(res);
              this.count = res.count;
              this.getAll();
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          this.getAll();
        }
      },

      getAll() {
        request('/user/cloud?limit=' + this.count)
            .then(res => {
              // console.log(res);
              if (res.code === 200) {
                this.list = res.data.map(item => {
                  return item.simpleSong
                })
              }
            })
            .catch(e => {
              console.log(e);
            });
      },

      itemClick(num) {
        this.currentIndex = num;
      },
      playSong(num) {
        if (!this.flag) {
          this.$store.commit('changePlaySong', this.list[num]);
          this.flag = true;
          this.$store.commit('changePlayList', this.list);
        }
        this.$store.commit('changePlaySongIndex', num)
      }
    },

    watch: {
      list() {
        // console.log(1)
        this.flag = false;
        this.$emit('show', false);
        this.currentIndex = -1;
      }
    }
  }
</script>

<style scoped>
  .cloud {
    padding: 2rem 3rem 10rem;
    min-width: 100rem;
    width: 100%;
  }
  
  .load {
    height: 50rem
  }

  .play-bar {
    width: 20rem;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 3rem 0 2rem;
  }

  .icon {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 0.5rem;
  }

  .pic {
    width: 5rem;
    height: 5rem;
    margin: 0.5rem;
  }

  .pic img {
    width: 5rem;
    height: 5rem;
  }

  li:nth-child(odd) {
    background-color: var(--color-bgc);
  }

  li:hover {
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.06);
  }
</style>