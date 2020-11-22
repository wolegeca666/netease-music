<template>
  <div class="result">
    <div class="search-nav">
      <nav-bar :active-title="title" :left-icon="false" :msg="titles"
               @typeClick="titleClick"></nav-bar>
    </div>
    <div class="most" ref="img" v-show="most && type===1 && !loading">
      <div class="artist most-list" v-if="most.artist">
        <div @click="routeTo(msg.id)" class="most-item"
             v-for="msg in most.artist">
          <img :src="msg.img1v1Url" @load="mostImgLoad" alt="">
          <p>歌手： {{ msg.name }}</p>
        </div>
      </div>
      <div class="album most-list" v-if="most.album">
        <div @click="routeTo(msg.id, 'Album')" class="most-item"
             v-for="msg in most.album">
          <img :src="msg.picUrl" @load="mostImgLoad" alt="">
          <p>专辑： {{ msg.name }} - {{ msg.artist.name }}</p>
        </div>
      </div>
      <div class="mv most-list" v-if="most.mv">
        <div @click="routeTo(msg.id)" class="most-item" v-for="msg in most.mv">
          <img :src="msg.cover" @load="mostImgLoad" alt="">
          <p>MV： {{ msg.name }}</p>
        </div>
      </div>
      <div v-if="most.video" v-show="false">
        <div class="most-item" v-for="msg in most.video">
          <img :src="msg.coverUrl" @load="mostImgLoad" alt="">
        </div>
      </div>
      <div v-if="most.circle" v-show="false">
        <div class="most-item" v-for="msg in most.circle">
          <img :src="msg.circle.image" @load="mostImgLoad" alt="">
        </div>
      </div>
    </div>
    <div class="hr" v-show="most.orders && type === 1 && !loading"></div>
    <div class="loading" v-show="loading">
      <loading :show="loading"></loading>
    </div>
    <div class="list" v-show="!loading">
      <div v-show="type === 1">
        <song-list :all-show="false" :list="playlist || []"
                   :load-show="true"></song-list>
      </div>
      <div v-show="type === 100">
        <artist-list :list="result.artists || []"
                     @isload="otherLoading"></artist-list>
      </div>

      <div v-show="type === 10">
        <albums-list :list="result.albums || []"
                     @isload="otherLoading"></albums-list>
      </div>

      <div v-show="type === 1004">
        <video-list :list="result.mvs || []"
                    @isload="loadingEnd"></video-list>
      </div>

      <div v-show="type === 1000">
        <play-lists :list="result.playlists || []"
                    @isload="loadingEnd"></play-lists>
      </div>
    </div>
  </div>

</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import SongList from "../../components/content/songlist/SongListUn";
  import ArtistList from "../../components/content/artists/ArtistList";
  import AlbumsList from "../../components/content/ablums/AlbumsList";
  import PlayLists from "../../components/content/playlists/PlayLists";
  import {request} from "../../api/request";
  import Loading from "../../components/common/loading/Loading";
  import VideoList from "../../components/content/video/VideoList";

  export default {
    name: "SearchResult",
    components: {
      VideoList,
      Loading, NavBar, SongList, ArtistList, AlbumsList, PlayLists},
    data() {
      return {
        active: false,
        action: false,
        loading: false,
        imgLoadIndex: 0,
        titles: [
          {name: '单曲', type: 1},
          {name: '专辑', type: 10},
          {name: '歌手', type: 100},
          {name: 'MV', type: 1004},
          {name: '歌单', type: 1000},
          {name: '歌词', type: 1006},
          {name: '主播电台', type: 1009},
          {name: '用户', type: 1002}
        ],
        title: '单曲',
        keywords: '',
        type: 1,
        most: '',
        playlist: [],
        result: {},
        offset: 0
      }
    },
    activated() {
      this.loading = true;
      this.init();
      this.keywords = this.$route.query.keywords || this.keywords;
      this.getSearch();
      this.getMsg();
    },
    deactivated() {
      this.loading = false;
      this.init();
    },
    methods: {
      init() {
        this.active = false;
        this.title = '单曲';
        this.type = 1;
        this.playlist = [];
        this.result = {};
        this.most = [];
        this.imgLoadIndex = 0;
      },

      getMsg() {
        if (this.keywords) {
          this.offset = 0;
          request('/cloudsearch?keywords=' + this.keywords + '&type=10').then(res => {
            // console.log(res);
            for (let type in res.result) {
              if (res.result.hasOwnProperty(type) && !this.result.hasOwnProperty(type)) {
                this.$set(this.result, type, res.result[type]);
              }
            }
          }).catch(e => {
            console.log(e);
          });
          request('/cloudsearch?keywords=' + this.keywords + '&type=100').then(res => {
            // console.log(res);
            for (let type in res.result) {
              if (res.result.hasOwnProperty(type) && !this.result.hasOwnProperty(type)) {
                this.$set(this.result, type, res.result[type]);
              }
            }
          }).catch(e => {
            console.log(e);
          });
        }
      },

      mostImgLoad() {
        this.imgLoadIndex++;
        this.$nextTick(this.mostLoading)
      },

      mostLoading() {
        if (this.imgLoadIndex >= (this.most.orders?.length || 0)) {
          this.loadingEnd();
        }
      },

      otherLoading() {
        if (this.type !== 1) {
          this.loadingEnd();
        }
      },

      loadingEnd() {
        this.loading = false;
      },

      routeTo(id, type) {
        this.$router.push({name: type, query: {id: id}})
      },

      // 搜索结果
      getSearch() {
        request('/cloudsearch?keywords=' + this.keywords)
            .then(res => {
              // console.log(res);
              this.playlist = [...res.result.songs] || [];
              // console.log(this.keywords)
            })
            .catch(e => console.log(e));
        request('/search/multimatch?keywords=' + this.keywords)
            .then(res => {
              // console.log(res);
              this.most = res.result.orders?.length ? res.result : [];
              this.mostLoading();
            })
            .catch(e => {
              console.log(e);
            });
      },

      getDetails() {
        if (this.keywords) {
          this.offset = 0;
          request('/cloudsearch?keywords=' + this.keywords + '&type=' + this.type).then(res => {
            // console.log(res);
            for (let type in res.result) {
              if (res.result.hasOwnProperty(type) && !this.result.hasOwnProperty(type)) {
                this.loading = true;
                this.$set(this.result, type, res.result[type]);
              }
            }
          }).catch(e => {
            console.log(e);
          });
        }
      },

      updateData() {
        if (!this.action && this.offset < 100) {
          this.action = true;
          this.offset += 30;
          // console.log(this.type);
          request('/cloudsearch?keywords=' + this.keywords + '&offset=' + this.offset + '&type=' + this.type).then(res => {
            // console.log(res.needlogin);
            if (res.needlogin) {
              this.updateData();
            } else {
              if (res.result.songs) {
                this.playlist.push(...res.result.songs);
              } else {
                for (let update in res.result) {
                  if (res.result.hasOwnProperty(update) && res.result[update].length) {
                    this.result[update].push(...res.result[update]);
                  }
                }
              }
            }
            this.action = false;
          }).catch(e => {
            this.action = false;
            console.log(e);
          })
        }
      },

      titleClick(title) {
        this.title = title.name;
        this.type = title.type;
      }

    },
    computed: {
      load() {
        // console.log(this.$store.state.load);
        return this.$store.state.load
      }
    },

    watch: {
      load() {
        if (this.load && this.$route.name === 'SearchResult' && !this.action) {
          this.updateData()
        }
      },
      $route() {
        if (this.$route.name === 'SearchResult') {
          this.keywords = this.$route.query.keywords || '';
          this.offset = 0;
        } else {
          this.init();
          this.loading = false;
        }
      },
      keywords() {
        if (this.keywords) {
          this.init();
          this.getSearch();
        }
      },
      type() {
        if (this.keywords && this.type !== 1) {
          this.loading = false;
          this.getDetails();
        }
      }
    }
  }
</script>

<style scoped>
  .most {
    display: flex;
    flex-direction: column;
  }

  .most-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    font-size: 14px;
  }

  .most-item:hover {
    background-color: var(--color-active);
  }

  .most-list:nth-child(odd) {
    background-color: var(--color-hover);
  }

  .most img {
    width: 5rem;
    height: 5rem;
    margin-right: 1rem;
    border-radius: 2px;
  }

  .mv img {
    width: 9rem;
  }

  .hr {
    margin-top: 2rem;
    opacity: 0.5;
  }

  .loading {
    width: 100%;
    height: 30rem;
  }

  .list {
    margin-top: 1rem;
  }
</style>