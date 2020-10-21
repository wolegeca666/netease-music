<template>
  <div class="play-list" v-show="msg">
    <div class="cat-list">
      <div class="all-cat" @click="">
        <p>{{nowCat}}</p>
      </div>
      <div class="hot-cat-list">
        <div class="cat-hot" v-for="(item, index) in cat" :key="index">
          |
          <div class="cat-hot-msg" @click="routerTo(item)">{{item}}</div>
        </div>
      </div>
      <div class="high">精品歌单</div>
    </div>
    <ul class="list" v-show="show">
      <li class="play-list" v-for="(item, index) in musicList" :key="index">
        <album :item="item" :length="11" @imgLoad="isImgLoad(index)"
               :playlist-to="true">
          <template v-slot:icon>
            <svg t="1602600869883" class="icon" viewBox="0 0 1365 1024"
                 version="1.1"
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
      </li>
    </ul>
    <div v-show="offset === 800">到底啦>_<</div>
  </div>
</template>

<script>
  import Album from "../../../../components/content/album/Album";
  import Title from "../../../../components/common/title/Title";
  import {request} from "../../../../api/request";

  export default {
    name: "PlayList",
    data() {
      return {
        musicList: [],
        hot: [],
        cat: [],
        show: false,
        msg: false,
        action: false,
        order: '',
        offset: 0
      }
    },
    components: {
      Title,
      Album
    },
    mounted() {
      // 推荐歌单
      request('/top/playlist').then(res => {
        // console.log(res);
        this.musicList = res.playlists;
      }).catch(e => {
        console.log(e)
      });

      // 歌单分类
      request('/playlist/catlist').then(res => {
        // console.log(res);
      }).catch(e => console.log(e));

      // 热门歌单分类
      request('/playlist/hot').then(res => {
        // console.log(res.tags);
        this.cat = res.tags.map(item => item.name);
        this.msg = true;
      }).catch(e => console.log(e))
    },
    methods: {
      isImgLoad(num) {
        if (++num >= this.musicList.length) {
          this.show = true
        }
      },

      routerTo(cat) {
        this.$router.push({name: 'DPlayList', query: {cat: cat}})
      },

      catPlaylist() {
        request('/top/playlist' + (this.order ? '?cat=' + this.order : '')).then(res => {
          // console.log(res);
          this.musicList = res.playlists;
        }).catch(e => {
          console.log(e);
          this.catPlaylist()
        });
      },

      // 底部刷新
      updateData() {
        if (!this.action && this.offset < 600) {
          this.action = true;
          this.offset += 50;
          request('/top/playlist?' + (this.order ? 'cat=' + this.order : '') + 'offset=' + this.offset).then(res => {
            // console.log(res.playlists);
            if (res.playlists) {
              this.musicList.push(...res.playlists);
            }
            this.action = false;
            if (this.offset >= 600) {
              this.offset = 800
            }
          }).catch(e => {
            this.action = false;
            console.log(e)
          })
        }
      }
    },

    activated() {
      this.active = true;
      this.order = this.$route.query.cat || false;
    },
    deactivated() {
      this.active = false
    },
    computed: {
      load() {
        // console.log(this.$store.state.load);
        return this.$store.state.load
      },
      nowCat() {
        return this.order || '全部歌单'
      }
    },
    watch: {
      load() {
        if (this.load) {
          this.updateData()
        }
      },
      $route() {
        if (this.active) {
          this.order = this.$route.query.cat || false;
          // console.log(this.order);
        }
      },
      order() {
        if (this.order) {
          this.show = false;
          this.catPlaylist()
        }
      }
    }
  }
</script>

<style scoped>
  .play-list {
    max-width: 95rem;
  }

  .cat-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
    padding: 2rem 0;
  }

  .all-cat {
    z-index: 99;
    margin-right: -2px;
    padding: 0.5rem 2rem 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .hot-cat-list,
  .cat-hot {
    display: flex;
    flex-direction: row;
    opacity: 0.6;
  }

  .cat-hot-msg {
    padding: 0 1rem;
  }

  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 1rem auto;
  }

  .play-list {
    margin-bottom: 3rem;
  }
</style>