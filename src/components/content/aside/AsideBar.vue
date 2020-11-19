<template>
  <div class="aside-bar">
    <ul :class="{'list': login}">
      <li>
        <nav-bar title="搜索" :index="0" path="/search"
                 :current-index="currentIndex">
          <template v-slot:img>
            <img src="../../../assets/imgs/icon/aside/search.svg" alt="">
          </template>
        </nav-bar>
      </li>
      <li>
        <nav-bar title="发现音乐" :index="1" path="/"
                 :current-index="currentIndex">
          <template v-slot:img>
            <img src="../../../assets/imgs/icon/aside/discover.svg" alt="">
          </template>
        </nav-bar>
        <nav-bar title="视频" :index="2" path="/mv"
                 :current-index="currentIndex">
          <template v-slot:img>
            <img src="../../../assets/imgs/icon/aside/video.svg" alt="">
          </template>
        </nav-bar>
      </li>

      <li>
        <div class="title" v-show="show">我的音乐</div>
      </li>
      <li>
        <nav-bar title="最近播放" :index="3" path="/record"
                 :current-index="currentIndex">
          <template v-slot:img>
            <img src="../../../assets/imgs/icon/aside/record.svg" alt="">
          </template>
        </nav-bar>
      </li>
      <li v-show="login">
        <nav-bar title="我的音乐云盘" :index="4" path="/"
                 :current-index="currentIndex">
          <template v-slot:img>
            <img src="../../../assets/imgs/icon/aside/record.svg" alt="">
          </template>
        </nav-bar>
      </li>
      <li v-show="login">
        <nav-bar title="我的电台" :index="5" path="/"
                 :current-index="currentIndex">
          <template v-slot:img>
            <img src="../../../assets/imgs/icon/aside/record.svg" alt="">
          </template>
        </nav-bar>
      </li>
      <li v-show="login">
        <nav-bar title="我的收藏" :index="6" path="/"
                 :current-index="currentIndex">
          <template v-slot:img>
            <img src="../../../assets/imgs/icon/aside/record.svg" alt="">
          </template>
        </nav-bar>
      </li>

      <li v-show="show">
        <div class="title">创建的歌单</div>
      </li>
      <li v-show="!createPlaylist.length">
        <scale>
          <nav-bar title="我喜欢的音乐" :index="7" path="/likedmusic"
                   :current-index="currentIndex">
            <template v-slot:img>
              <img src="../../../assets/imgs/icon/aside/likemusic.svg" alt="">
            </template>
          </nav-bar>
        </scale>
      </li>
      <li v-for="(item, index) in createPlaylist" v-show="createPlaylist.length" :key="item.id">
        <scale>
          <nav-bar :title="index === 0 ? '我喜欢的音乐' : item.name" :path="'/playlist?id='+item.id" :index="item.id"
                   :current-index="currentIndex">
            <template v-slot:img>
              <img v-show="index === 0" src="../../../assets/imgs/icon/aside/likemusic.svg" alt="">
              <img v-show="index !== 0" src="../../../assets/imgs/icon/aside/discover.svg" alt="">
            </template>
          </nav-bar>
        </scale>
      </li>

      <li v-show="subPlaylist.length">
        <div class="title">收藏的歌单</div>
      </li>
      <li v-for="item in subPlaylist" :key="item.id">
        <scale>
          <nav-bar :title="item.name" :path="'/playlist?id='+item.id" :index="item.id"
                   :current-index="currentIndex">
            <template v-slot:img>
              <img src="../../../assets/imgs/icon/aside/discover.svg" alt="">
            </template>
          </nav-bar>
        </scale>
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
  import Scale from "../../common/Scale";
  import {request} from "../../../api/request";

  export default {
    name: "AsideBar",
    components: {
      Login,
      NavBar,
      Scale
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
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].subscribed) {
            index = i;
            break
          }
        }
        this.createPlaylist = arr.splice(0, index);
        this.subPlaylist = arr;
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
    height: 83%;
    overflow: scroll;
  }

  .list::-webkit-scrollbar {
    width: 0.5rem;
  }
  /* 滚动条滑块 */
  .list::-webkit-scrollbar-thumb {
    border-radius: 1.5rem;
    background:rgba(0,0,0,0.2);
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
    bottom: 6.5rem;
    left: 0;

    background-color: var(--color-bgc);
  }

  .hr {
    background-color: var(--color-hover);
  }
</style>