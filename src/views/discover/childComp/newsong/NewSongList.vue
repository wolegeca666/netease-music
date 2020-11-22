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
      <p>播放全部<span v-if="list.length">{{'（' +  list.length + '）' }}</span></p>
    </div>
    <ul>
      <li :key="index" v-for="(item, index) in playLists">
        <song-list-item :current-index="currentIndex" :num="index" :song="item"
                        @itemClick="itemClick"
                        @play="playSong">
          <template v-slot:left>
            <div class="pic">
              <img :src="item.al.picUrl" @error="errorload(index)"
                   @load="imgLoad(index)" alt="404" v-show="loadItem.includes(index)">
            </div>
          </template>
        </song-list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import SongListItem
    from "../../../../components/content/songlist/SongListItem";
  import {request} from "../../../../api/request";

  export default {
    name: "NewSongList",
    props: {
      list: {
        type: Array
      },
      allShow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentIndex: -1,
        loadIndex: 0,
        loadItem: [],
        errIndex: [],
        playLists: [],
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

      imgLoad(index) {
        this.loadItem.push(index);
        this.loadIndex++;
      },
      errorload(index) {
        this.errIndex.push(index);
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
        // console.log(2);
        let Ids = this.list.map(item => item.id);
        // console.log(Ids.join(','))
        this.getMusicDetail(Ids.join(',')).then(res => {
          res = res || [];
          this.playLists = [...res];
          this.$emit('show', true);
        })
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
    computed: {
      isLoad() {
        if (this.list.length) {
          return this.loadIndex >= this.list.length / 10
        }
      }
    },
    watch: {
      list() {
        // console.log(1)
        this.flag = false;
        this.currentIndex = -1;
        this.loadIndex = 0;
        this.playLists = [];
        this.add();
      },
      isLoad() {
        if (this.isLoad) {
          this.$emit('isload')
        }
      }
    }
  }
</script>

<style scoped>

  .play-bar {
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
    margin: 1rem 1rem 1rem 0;
  }

  .pic img {
    width: 5rem;
    height: 5rem;
    border-radius: 0.5rem;
  }

  li:nth-child(odd) {
    background-color: var(--color-bgc);
  }

  li:hover {
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.06);
  }

</style>