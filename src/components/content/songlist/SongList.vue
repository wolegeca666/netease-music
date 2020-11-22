<template>
  <div class="list">
    <div @click="playSong(0)" class="play-bar" v-if="allShow">
      <svg class="icon" height="128" p-id="7602" t="1603614206566"
           version="1.1" viewBox="0 0 1024 1024" width="128"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M904.1 347c-21.4-50.6-52-96-91-135s-84.4-69.6-135-91c-52.4-22.2-108-33.4-165.4-33.4s-113 11.2-165.4 33.4c-50.6 21.4-96 52-135 91s-69.6 84.4-91 135c-22.2 52.4-33.4 108-33.4 165.4 0 57.3 11.2 113 33.4 165.4 21.4 50.6 52 96 91 135s84.4 69.6 135 91c52.4 22.2 108 33.4 165.4 33.4s113-11.2 165.4-33.4c50.6-21.4 96-52 135-91s69.6-84.4 91-135c22.2-52.4 33.4-108 33.4-165.4 0-57.3-11.3-113-33.4-165.4zM512.6 877.3c-201.2 0-364.9-163.7-364.9-364.9s163.7-364.9 364.9-364.9 364.9 163.7 364.9 364.9-163.7 364.9-364.9 364.9z"
              fill="#d81e06" p-id="7603"></path>
        <path d="M709.9 512.2L417.4 343.3V681z" fill="#d81e06"
              p-id="7604"></path>
      </svg>
      <p class="bar">播放全部<span
              v-if="listLength">{{'（' +  listLength + '）' }}</span></p>
    </div>
    <ul>
      <li :key="index" v-for="(item, index) in playLists">
        <song-list-item :current-index="currentIndex" :num="index" :song="item"
                        @itemClick="itemClick"
                        @play="playSong">
        </song-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import SongListItem from "./SongListItem";
  import {request} from "../../../api/request";

  export default {
    name: "SongList",
    props: {
      list: {
        type: Array
      },
      allShow: {
        type: Boolean,
        default: true
      },
      loadShow: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        currentIndex: -1,
        playLists: [],
        length: 0,
        listLength: 0,
        maxLength: 8,
        flag: false
      }
    },
    components: {
      SongListItem
    },
    methods: {
      itemClick(num) {
        this.currentIndex = num;
      },
      // 获取单曲信息
      getMusicDetail(id) {
        return new Promise(function (resolve, reject) {
          request('/song/detail/dynamic?ids=' + id)
              .then((res) => {
                if (res) {
                  // console.log(res.songs);
                  resolve(res.songs);
                } else {
                  reject()
                }
              }).catch(e => console.log(e));
        });
      },

      add() {
        let Ids = this.list.map(item => item.id);
        if (Ids.length > 1000) {
          this.bigIds(Ids)
        } else {
          this.getMusicDetail(Ids.join(',')).then(res => {
            // console.log(res);
            res = res || [];
            this.playLists = [...res];
            this.$nextTick(this.isShow)
          })
        }
      },

      bigIds(Ids) {
        let arr = [];
        for (let i = Ids.length / 500; i > 0; i--) {
          arr.push(Ids.splice(0, 500))
        }
        this.getList(arr, 0);
      },

      getList(arr, i) {
        if (i < arr.length) {
          this.getMusicDetail(arr[i].join(',')).then(res => {
            res = res || [];
            this.playLists = [...this.playLists, ...res];
            this.getList(arr, ++i);
            this.$nextTick(this.isShow)
          })
        }
      },

      isShow() {
        this.$emit('show', true);
      },

      playSong(num) {
        if (!this.flag) {
          this.$store.commit('changePlaySong', this.playLists[num]);
          this.flag = true;
          this.$store.commit('changePlayList', this.playLists);
        }
        this.$store.commit('changePlaySongIndex', num)
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
        // console.log(1)
        this.flag = false;
        this.$emit('show', false);
        this.listLength = this.list.length;
        this.currentIndex = -1;
        this.playLists = this.loadShow ? this.playLists : [];
        this.add();
      },
      playLists() {
        if (this.flag) {
          /*this.$store.commit('changePlayList', [...this.playLists.map(item => {
            return {
              id: item.id,
              name: item.name,
              author: this.authorHandle(item),
              picUrl: item.al.picUrl
            }
          })])*/
          this.$store.commit('changePlayList', this.playLists)
        }
      }
    }
  }
</script>

<style scoped>

  .list {
    width: 100%;
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