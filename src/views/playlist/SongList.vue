<template>
  <div class="list">
    <div class="play-bar" @click="playSong(0)">播放全部({{ listLength || '' }})</div>
    <ul>
      <li v-for="(item, index) in playLists" :key="index">
        <song-list-item :song="item" :num="index" :current-index="currentIndex"
                        @itemClick="itemClick"
                        @play="playSong"></song-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import SongListItem from "./SongListItem";
  import {request} from "../../api/request";

  export default {
    name: "SongList",
    props: {
      list: {
        type: Array
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
          request('/song/detail?ids=' + id)
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
        // console.log(Ids.join(','))
        this.getMusicDetail(Ids.join(',')).then(res => {
          this.playLists = [...res];
          this.$emit('show', true);
        })
      },
/*      // 列表获取
      getListDetails(arr) {
        let request = arr.map(item => this.getMusicDetail(item.id));
        return Promise.all(request)
        /!*Promise.all(
            new Promise(function (resolve, reject) {
              this.getMusicDetail().then(res => {
                resolve(res)
              }).catch(e =>reject(e))
            }),
            new Promise(function (resolve, reject) {
              this.getMusicDetail().then(res => {
                resolve(res)
              }).catch(e =>reject(e))
            }),
        ).then (res => console.log(res))*!/
      },
      // 剪切列表
      cutList(length) {
        let slist = [];
        this.list.forEach((item, index) => {
          if (length <= index && index < length + 10) {
            slist.push(item)
          }
        });
        return this.getListDetails(slist)
      },
      // 循环获取数据
      callBack() {
        this.cutList(this.length).then(e => {
          this.playLists.push(...e);
          this.length += 10;
          this.request();
        }).catch(e => this.request())
      },

      request() {
        if (this.length < this.listLength) {
          this.callBack();
          if (this.length > this.maxLength) {
            this.show = true;
            this.$emit('show', true);
          }
        } else {

          // console.log(this.playLists[0]);
        }
      },*/

      playSong(num) {
        /*this.$store.commit('changePlaySong', {
          id: this.playLists[num].id,
          name: this.playLists[num].name,
          author: this.authorHandle(this.playLists[num]),
          picUrl: this.playLists[num].al.picUrl
        });*/
        if (!this.flag) {
          this.$store.commit('changePlaySong', {
            id: this.playLists[num].id,
            name: this.playLists[num].name,
            author: this.authorHandle(this.playLists[num]),
            picUrl: this.playLists[num].al.picUrl
          });
        }
        this.flag = true;
        this.$store.commit('changePlayList', this.playLists);
        this.$store.commit('changePlaySongIndex', num)
      },

      authorHandle(obj) {
        let arr = [];
        let authors = obj.ar;
        authors.forEach(function (item) {
          arr.push(item.name)
        });
        return this.cutContext(arr.join(' / '));
      },

      cutContext(str) {
        if (str.length > 35) {
          return str.substring(0, 30) + '...'
        } else {
          return str
        }
      },
    },
    watch: {
      list() {
        this.flag = false;
        this.$emit('show', false);
        this.listLength = this.list.length;
        this.currentIndex = -1;
        this.playLists = [];
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

  .play-bar {
    font-size: 14px;
    padding: 3rem 0 2rem;
  }

</style>