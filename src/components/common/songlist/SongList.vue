<template>
  <div v-show="length > 10">
    <ul v-for="(item, index) in playLists" :key="index">
      <li v-for="(child, cIndex) in item" :key="cIndex">
        <song-list-item :song="child" :num="cIndex+(index*10)" :current-index="currentIndex"
                        @itemClick="itemClick"></song-list-item>
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
      }
    },
    data() {
      return {
        currentIndex: -1,
        playLists: [],
        length: 0,
        maxLength: 40
      }
    },
    components: {
      SongListItem
    },
    methods: {
      itemClick(num) {
        this.currentIndex = num;
      },
      getMusicDetail(id) {
        return new Promise(function (resolve, reject) {
          request('/music/detail?id=' + id)
              .then((res) => {
                if (res) {
                  // console.log(res.songs[0]);
                  resolve(res.songs[0]);
                } else {
                  reject()
                }
              }).catch(e => console.log(e));
        });
      },
      getListDetails(arr) {
        let request = arr.map(item => this.getMusicDetail(item.id));
        return Promise.all(request)
        /*Promise.all(
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
        ).then (res => console.log(res))*/
      },
      cutList(length) {
        let slist = [];
        this.list.forEach((item, index) => {
          if (length <= index && index < length + 10) {
            slist.push(item)
          }
        });
        return this.getListDetails(slist)
      },
      request() {
        if (this.length <= this.maxLength) {
          this.cutList(this.length).then(e => {
            this.playLists.push(e);
            this.length += 10;
            this.request();
          }).catch(e => this.request())
        }else {
          this.show = true
        }
      }
    },
    computed: {
      listLength() {
        return this.list.length
      }
    },
    watch: {
      list() {
        this.request()
      },
    }
  }
</script>

<style scoped>
  li {
    height: 20%;
  }
</style>