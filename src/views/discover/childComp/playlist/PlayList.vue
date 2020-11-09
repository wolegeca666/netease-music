<template>
  <div class="play-list" v-show="msg">
    <div class="high">精品歌单</div>
    <div id="cat-list" v-show="catShow">
      <div id="all" @click="toHome">全部歌单</div>
      <div class="hr"></div>
      <div class="title" v-for="(title, key) in category">
        <div class="title-name">{{ title }}</div>
        <div class="all-cat-list">
          <a @click="routerTo(item.name)" class="cat"
             v-for="item in catList[key]">{{item.name}}</a>
        </div>
      </div>
    </div>
    <div class="cat-list">
      <div @click="catShow = !catShow" class="all-cat">
        <p>{{nowCat}}</p>
        <div v-show="!catShow">
          <svg class="icon" height="128" p-id="8135"
               t="1603280462713" version="1.1" viewBox="0 0 1024 1024"
               width="128" xmlns="http://www.w3.org/2000/svg">
            <path d="M509.002 664.125a22.334 22.334 0 0 1-15.86-6.562L239.688 404.11a22.421 22.421 0 0 1 31.72-31.676l253.454 253.41a22.421 22.421 0 0 1-15.86 38.282"
                  fill="#8a8a8a" p-id="8136"></path>
            <path d="M509.002 664.125a22.334 22.334 0 0 1-15.86-38.238l259.45-259.407a22.421 22.421 0 0 1 31.677 31.676L524.905 657.563a22.508 22.508 0 0 1-15.903 6.562"
                  fill="#8a8a8a" p-id="8137"></path>
          </svg>
        </div>
      </div>
      <div class="hot-cat-list">
        <div :key="index" class="cat-hot" v-for="(item, index) in cat">
          |
          <div @click="routerTo(item)" class="cat-hot-msg">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="load" v-show="!show">
      <loading :show="!show"></loading>
    </div>
    <ul class="list" v-show="show">
      <li :key="index" class="play-list" v-for="(item, index) in musicList">
        <album :item="item" :length="11" :playlist-to="true"
               @imgLoad="isImgLoad(index)">
          <template v-slot:icon>
            <svg class="icon" height="1.3rem" p-id="8018"
                 t="1602600869883"
                 version="1.1" viewBox="0 0 1365 1024" width="1.3rem"
                 xmlns="http://www.w3.org/2000/svg">
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
  import Loading from "../../../../components/common/loading/Loading";
  import {request} from "../../../../api/request";

  export default {
    name: "PlayList",
    data() {
      return {
        musicList: [],
        hot: [],
        cat: [],
        catList: {},
        category: [],
        show: false,
        catShow: false,
        msg: false,
        action: false,
        active: false,
        order: '',
        offset: 0
      }
    },
    components: {
      Loading,
      Title,
      Album
    },
    mounted() {
      this.playlistAll();
      // 歌单分类
      request('/playlist/catlist').then(res => {
        let list = {...res.categories};
        this.category = {...list};
        for (let key in list) {
          list[key] = []
        }
        res.sub.map(cat => {
          list[cat.category].push(cat);
        });
        this.catList = list;
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
        this.catShow = false;
        if (cat !== this.$route.query.cat)
        this.$router.push({name: 'DPlayList', query: {cat: cat}})
      },

      playlistAll() {
        // 推荐歌单
        this.show = false;
        this.order = false;
        request('/top/playlist').then(res => {
          // console.log(res);
          this.musicList = res.playlists
        }).catch(e => {
          console.log(e)
        });
      },

      toHome() {
        this.catShow = false;
        this.$router.push({name: 'DPlayList'});
        this.playlistAll();
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
          request('/top/playlist?' + (this.order ? 'cat=' + this.order + '&' : '') + 'offset=' + this.offset).then(res => {
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
      this.order = this.$route.query.cat || this.order;
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
          this.offset = 0
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
    margin-top: -1rem;
  }

  .cat-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
    padding: 2rem 0;
  }

  .all-cat {
    position: relative;
    z-index: 99;
    margin-right: -2px;
    padding: 0.5rem 2rem 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .all-cat .icon {
    position: absolute;
    top: 3px;
    right: 0;
    width: 2rem;
    height: 2rem;
  }

  #cat-list {
    z-index: 200;
    position: absolute;
    top: 6rem;
    width: 70%;
    padding-bottom: 5rem;
    background-color: #fff;
    font-size: 13px;
    box-shadow: 0 0 2px var(--color-active);
  }

  #all {
    padding: 2rem 3rem;
  }

  .title {
    display: flex;
    padding: 2rem 0;
  }

  .title-name {
    width: 15%;
    padding: 1.2rem 0 0 3rem;
    font-weight: 600;
    opacity: 0.2;
  }

  .all-cat-list {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
  }

  .cat {
    width: 16%;
    padding: 1rem 0;
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

  .load {
    width: 100%;
    height: 30rem;
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