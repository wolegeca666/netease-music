<template>
  <div class="result" v-show="show">
    <div class="search-nav">
      <nav-bar :msg="titles" :active-title="title" :left-icon="false"
               @typeClick="titleClick"></nav-bar>
    </div>
    <div v-show="most">
      <div v-if="most.songs">
        单曲
        <div v-for="msg in most.songs">{{ msg.name }}</div>
      </div>
      <div v-if="most.album">
        专辑
        <div v-for="msg in most.album">{{ msg.name }}</div>
      </div>
      <div v-if="most.artist">
        歌手
        <div v-for="msg in most.artist">{{ msg.name }}</div>
      </div>
      <div v-if="most.mv">
        MV
        <div v-for="msg in most.mv">{{ msg.name }}</div>
      </div>
    </div>
    <div class="list" v-show="listLoad">
      <div class="song" v-show="type === 1">
        <song-list :list="playlist || []" :all-show="false" :load-show="true"></song-list>
      </div>
    </div>
  </div>

</template>

<script>
  import {request} from "../../api/request";
  import SongList from "../../components/content/songlist/SongList";
  import NavBar from "../../components/common/navbar/NavBar";

  export default {
    name: "SearchResult",
    components: {NavBar, SongList},
    data() {
      return {
        active: false,
        show: false,
        listLoad: false,
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
        offset: 0
      }
    },
    activated() {
      this.active = true;
      this.keywords = this.$route.query.keywords || this.keywords;
      this.type = this.$route.query.type || this.type;
    },
    deactivated() {
      this.active = false;
      this.title = '单曲';
      this.type = 1;
    },
    methods: {
      // 搜索结果
      getSearch() {
        request('/cloudsearch?keywords=' + this.keywords)
            .then(res => {
              // console.log(res);
              this.playlist = [...res.result.songs] || [];
              this.show = true;
              this.listLoad = true;
            })
            .catch(e => console.log(e));
        request('/search/multimatch?keywords=' + this.keywords)
            .then(res => {
              // console.log(res);
              this.most = res.result || '';
            })
            .catch(e => console.log(e));
      },

      getDetails() {
        this.offset = 0;
        request('/cloudsearch?keywords=' + this.keywords + '&type=' + this.type).then(res => {
          console.log(res);
        }).catch(e => {
          console.log(e)
        })
      },

      updateData() {
        if (!this.action && this.offset < 600) {
          this.action = true;
          this.offset += 30;
          request('/cloudsearch?keywords=' + this.keywords + '&offset=' + this.offset + '&type=' + this.type).then(res => {
            // console.log(res);
            if (res.result.songs) {
              this.playlist.push(...res.result.songs);
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
        if (this.load) {
          this.updateData()
        }
      },
      $route() {
        if (this.active) {
          this.keywords = this.$route.query.keywords || '';
          this.type = this.$route.query.type || '';
          // console.log(this.order);
          this.offset = 0
        }
      },
      keywords() {
        if (this.keywords) {
          this.show = false;
          this.listLoad = false;
          this.getSearch();
        }
      },
      type() {
        this.getDetails();
      }
    }
  }
</script>

<style scoped>

</style>