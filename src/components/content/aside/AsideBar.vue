<template>
  <div class="aside-bar">
    <ul class="list" ref="list">
      <li>
        <nav-bar :current-index="currentIndex" :index="0" path="/search"
                 title="搜索">
          <template v-slot:img>
            <img alt="" src="../../../assets/imgs/icon/aside/search.svg">
          </template>
        </nav-bar>
      </li>
      <li>
        <nav-bar :current-index="currentIndex" :index="1" path="/"
                 title="发现音乐">
          <template v-slot:img>
            <img alt="" src="../../../assets/imgs/icon/aside/discover.svg">
          </template>
        </nav-bar>
        <nav-bar :current-index="currentIndex" :index="2" path="/mv"
                 title="视频">
          <template v-slot:img>
            <img alt="" src="../../../assets/imgs/icon/aside/video.svg">
          </template>
        </nav-bar>
      </li>

      <li v-show="show">
        <div class="title" v-show="show">我的音乐</div>
      </li>
      <li v-show="show">
        <nav-bar :current-index="currentIndex" :index="3" path="/record"
                 title="播放记录">
          <template v-slot:img>
            <img alt="" src="../../../assets/imgs/icon/aside/record.svg">
          </template>
        </nav-bar>
      </li>
      <li v-show="show && login">
        <nav-bar :current-index="currentIndex" :index="4" path="/cloud"
                 title="我的音乐云盘">
          <template v-slot:img>
            <img alt="" src="../../../assets/imgs/icon/aside/cloud.svg">
          </template>
        </nav-bar>
      </li>
      <li v-show="show && login">
        <nav-bar :current-index="currentIndex" :index="5" path="/"
                 title="我的电台">
          <template v-slot:img>
            <img alt="" src="../../../assets/imgs/icon/aside/rario.svg">
          </template>
        </nav-bar>
      </li>
      <li v-show="show && login">
        <nav-bar :current-index="currentIndex" :index="6" path="/"
                 title="我的收藏">
          <template v-slot:img>
            <img alt="" src="../../../assets/imgs/icon/aside/sub_add.svg">
          </template>
        </nav-bar>
      </li>

      <li v-show="show">
        <div class="title">创建的歌单</div>
      </li>
      <li v-show="!createPlaylist.length && show">
        <nav-bar :current-index="currentIndex" :index="7" path="/likedmusic"
                 title="我喜欢的音乐">
          <template v-slot:img>
            <img alt="" src="../../../assets/imgs/icon/aside/likemusic.svg">
          </template>
        </nav-bar>
      </li>
      <li :key="item.id"
          v-for="(item, index) in createPlaylist" v-show="createPlaylist.length && show">
        <nav-bar :current-index="currentIndex"
                 :index="item.id" :path="'/playlist?id='+item.id"
                 :title="index === 0 ? '我喜欢的音乐' : item.name">
          <template v-slot:img>
            <img alt=""
                 src="../../../assets/imgs/icon/aside/likemusic.svg" v-show="index === 0">
            <img alt=""
                 src="../../../assets/imgs/icon/aside/playlist.svg" v-show="index !== 0">
          </template>
        </nav-bar>
      </li>

      <li v-show="subPlaylist.length && show">
        <div class="title">收藏的歌单</div>
      </li>
      <li :key="item.id" v-for="item in subPlaylist" v-show="show">

        <nav-bar :current-index="currentIndex" :index="item.id"
                 :path="'/playlist?id='+item.id"
                 :title="item.name">
          <template v-slot:img>
            <img alt="" src="../../../assets/imgs/icon/aside/playlist.svg">
          </template>
        </nav-bar>
      </li>
    </ul>

    <div class="login">
      <div class="hr"></div>
      <login :show="show"></login>
    </div>
  </div>
</template>

<script>
  import NavBar from "./NavBar";
  import Login from "../login";
  import {request} from "../../../api/request";

  export default {
    name: "AsideBar",
    components: {
      Login,
      NavBar
    },
    props: {
      show: Boolean
    },
    data() {
      return {
        currentIndex: -1,
        path: [
          'search',
          'discover',
          'mv'
        ],
        createPlaylist: [],
        subPlaylist: []
      }
    },
    methods: {
      init() {
        this.createPlaylist = [];
        this.subPlaylist = [];
        this.$nextTick(() => {
          this.$refs.list.style.overflowY = 'hidden'
        })
      },

      userPlaylists() {
        request('/user/playlist?uid=' + this.uid).then(res => {
          if (res.code === 200) {
            this.handle(res.playlist);
          }
        }).catch(e => {
          console.log(e);
        });
      },

      handle(arr) {
        if (arr.length > 3) {
          this.$refs.list.style.overflowY = 'scroll'
        }
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].subscribed) {
            index = i;
            break
          }
        }
        this.createPlaylist = arr.splice(0, index);
        this.subPlaylist = arr;
        this.$store.commit('userList', this.createPlaylist)
      },
    },
    computed: {
      login() {
        return this.$store.state.login
      },
      uid() {
        return this.$store.state.uid
      }
    },
    watch: {
      $route: {
        handler() {
          let path = this.$route.path.split('/')[1];
          for (let i = 0; i < this.path.length; i++) {
            if (this.path[i] === path) {
              this.currentIndex = i;
              break;
            } else this.currentIndex = -1;
          }
          if (this.$route.path === '/') {
            this.currentIndex = 1;
          } else if (this.$route.path === '/playlist') {
            this.currentIndex = parseInt(this.$route.query.id);
          }
        },
        immediate: true
      },
      uid: {
        handler() {
          if (this.login) {
            this.init();
            this.userPlaylists();
          } else {
            this.init();
          }
        },
        immediate: true
      },
      login() {
        if (!this.login) {
          this.createPlaylist = [];
          this.subPlaylist = [];
          this.$store.commit('userList', this.createPlaylist)
        }
      }
    }
  }
</script>

<style scoped>

  .aside-bar {
    min-width: 10rem;
    height: 100%;
  }

  .list {
    height: 100%;
    padding-bottom: 3.5rem;
    overflow: hidden;
  }

  .list::-webkit-scrollbar {
    width: 0.5rem;
  }

  /* 滚动条滑块 */
  .list::-webkit-scrollbar-thumb {
    border-radius: 1.5rem;
    background: rgba(0, 0, 0, 0.2);
  }

  img {
    border-radius: 0;
  }

  .title {
    margin: 3rem 0 1rem;
    padding: 0 1.2rem;
    font-size: 12px;
    color: var(--color-text);
    font-weight: 600;
  }

  .login {
    position: fixed;
    bottom: 7rem;
    left: 0;
    background-color: var(--color-bgc);
  }

  .hr {
    background-color: var(--color-hover);
  }
</style>