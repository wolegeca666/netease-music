<template>
  <div class="result" v-show="show">
    <div class="search-nav">
      <nav-bar :msg="titles" :active-title="title" :left-icon="false"
               @typeClick="titleClick"></nav-bar>
    </div>
    <div class="most" v-show="most && type===1">
      <div class="artist" v-if="most.artist">
        <div class="most-item" v-for="msg in most.artist">
          <img :src="msg.img1v1Url" alt="">
          <p>歌手： {{ msg.name }}</p>
        </div>
      </div>
      <div class="album" v-if="most.album">
        <div class="most-item" v-for="msg in most.album">
          <img :src="msg.picUrl" alt="">
          <p>专辑： {{ msg.name }} - {{ msg.artist.name }}</p>
        </div>
      </div>
      <div class="mv" v-if="most.mv">
        <div class="most-item" v-for="msg in most.mv">
          <img :src="msg.cover" alt="">
          <p>MV： {{ msg.name }}</p>
        </div>
      </div>
    </div>
    <div v-show="most && type === 1" class="hr"></div>
    <div class="list">

      <div v-show="type === 1">
        <song-list :list="playlist || []" :all-show="false" :load-show="true"></song-list>
      </div>

      <div v-show="type === 100">
        <artist-list :list="result.artists || []"></artist-list>
      </div>

      <div v-show="type === 10">
        <albums-list :list="result.albums || []"></albums-list>
      </div>

      <div v-show="type === 1000">
        <play-lists :list="result.playlists || []"></play-lists>
      </div>
    </div>
  </div>

</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import SongList from "../../components/content/songlist/SongList";
  import ArtistList from "../../components/content/artists/ArtistList";
  import AlbumsList from "../../components/content/ablums/AlbumsList";
  import PlayLists from "../../components/content/playlists/PlayLists";

  import {request} from "../../api/request";

  export default {
    name: "SearchResult",
    components: {NavBar, SongList, ArtistList, AlbumsList, PlayLists},
    data() {
      return {
        active: false,
        show: false,
        action: false,
        titles: [
          {name: '单曲', type: 1},
          {name: '歌手', type: 100},
          {name: '专辑', type: 10},
          {name: '视频', type: 1014},
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
      this.init();
      this.keywords = this.$route.query.keywords || this.keywords;
      this.getSearch();
    },
    deactivated() {
      this.init();
    },
    methods: {
      init() {
        this.active = false;
        this.title = '单曲';
        this.type = 1;
        this.show = false;
        this.playlist = [];
        this.result = {};
        this.most = '';
      },

      // 搜索结果
      getSearch() {
        request('/cloudsearch?keywords=' + this.keywords)
            .then(res => {
              // console.log(res);
              this.playlist = [...res.result.songs] || [];
              this.show = true;
              // console.log(this.keywords)
            })
            .catch(e => console.log(e));
        request('/search/multimatch?keywords=' + this.keywords)
            .then(res => {
              // console.log(res);
              if (res.result.orders) {
                this.most = res.result.orders.length ? res.result : '';
              }
            })
            .catch(e => console.log(e));
      },

      getDetails() {
        if (this.keywords) {
          this.offset = 0;
          request('/cloudsearch?keywords=' + this.keywords + '&type=' + this.type).then(res => {
            // console.log(res);
            this.result = res.result;
          }).catch(e => {
            console.log(e)
          })
        }
      },

      updateData() {
        if (!this.action && this.offset < 600) {
          this.action = true;
          this.offset += 30;
          // console.log(this.type);
          request('/cloudsearch?keywords=' + this.keywords + '&offset=' + this.offset + '&type=' + this.type).then(res => {
            // console.log(res.needlogin);
            if (res.needlogin) {
              this.updateData();
            }else {
              let result = res.result;
              if (result.songs) {
                this.playlist.push(...result.songs);
              }else {
                for(let list in this.result) {
                  if (this.result[list].length > 20) {
                    for (let update in result) {
                      if (result.hasOwnProperty(update) && result[update].length) {
                        this.result[list].push(...result[update]);
                      }
                    }
                  }
                }
              }
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
        }else {
          this.init();
        }
      },
      keywords() {
        if (this.keywords) {
          this.show = false;
          this.getSearch();
        }
      },
      type() {
        if (this.keywords && this.type !== 1) {
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
    margin-bottom: 2rem;
  }

  .artist {
    background-color: var(--color-hover);
    opacity: 1;
  }

  .most-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    font-size: 14px;
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
    opacity: 0.5;
  }

  .list {
    margin-top: 2rem;
  }
</style>