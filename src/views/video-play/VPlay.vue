<template>
  <div class="video">
    <div class="load" v-show="!url">
      <loading :show="!url"></loading>
    </div>
    <div class="container" v-show="url">
      <div class="msg">
        <div @click="back" class="back">
          <img src="../../assets/imgs/icon/aside/back.svg" alt="">
        </div>
        <span class="name" v-if="msg.name">{{ msg.name}}</span>
        <span class="artist" v-if="msg.artists">{{ author }}</span>
        <span class="play-count" v-if="msg.playCount">
          播放：{{ msg.playCount > 100000? Math.floor(msg.playCount/10000)+'万' : msg.playCount}}
        </span>
      </div>
      <div class="play" v-if="url">
        <div class="play-v">
          <video :src="url" controls="controls" autoplay="autoplay"></video>
        </div>
      </div>
      <div class="info"></div>
      <div class="content" v-if="id">
        <div class="comment">
          <comment :id="id" :type="1" :active="active"></comment>
        </div>
        <div class="des">
          <span class="title">MV介绍</span>
          <div class="hr"></div>
          <div class="p-time">发行时间：{{msg.publishTime}}</div>
          <div class="desc">{{msg.desc}}</div>
          <div class="simi">
            <div class="load-s" v-show="!simiLoad">
              <loading :show="!simiLoad"></loading>
            </div>
            <simi-mv :list="mvs" @isload="simiLoad = true"></simi-mv>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from "../../api/request";
  import Comment from "../../components/content/comment/Comment";
  import SimiMv from "./SimiMv";
  import Loading from "../../components/common/loading/Loading";

  export default {
    name: "VPlay",
    components: {Loading, SimiMv, Comment},
    data() {
      return {
        id: '',
        url: '',
        msg: {},
        mvs: [],
        simiLoad: false,
        active: false
      }
    },
    activated() {
      this.$store.commit('changePlay', false);
      this.active = true;
      document.querySelector('#container').style.zIndex = '999'
    },
    deactivated() {
      this.active = false;
      document.querySelector('#container').style.zIndex = ''
    },
    methods: {
      init() {
        this.url = '';
        this.msg = {};
        this.simiLoad = false;
        window.scrollTo(0, 0);
      },

      getMsg() {
        this.getDetails();
        this.getVideo();
        this.getSimi();
      },

      getDetails() {
        request('/mv/detail?mvid=' + this.Id).then(res => {
          // console.log(res);
          if (res.data.id === parseInt(this.Id)) {
            this.msg = res.data;
            // console.log(this.msg);
          }
        }).catch(e => {
          console.log(e);
        });
      },

      getVideo() {
        request('/mv/url?id=' + this.Id).then(res => {
          // console.log(res);
          if (res.data.id === parseInt(this.Id)) {
            this.url = res.data.url
          }
        }).catch(e => {
          console.log(e);
        });
      },

      getSimi() {
        request('/simi/mv?mvid=' + this.Id).then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.mvs = res.mvs;
          }
        }).catch(e => {
          console.log(e);
        });
      },

      back() {
        this.$router.back()
      },

      authorHandle(obj) {
        let arr = [];
        let authors = obj.artists;
        authors.forEach(function (item) {
          arr.push(item.name)
        });
        return arr.join('/');
      },
    },
    computed: {
      Id() {
        if (this.active) {
          return this.$route.query.id;
        }
      },
      author() {
        return this.authorHandle(this.msg)
      },
    },
    watch: {
      Id: {
        handler() {
          if (this.active && this.id !== this.Id) {
            this.id = this.Id;
            this.init();
            this.getMsg();
          }
        }
      }
    }
  }
</script>

<style scoped>
  .video {
    background-color: #fff;
    position: absolute;
    left: 0;
    min-width: 120rem;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }


  .container {
    width: 65%;
    min-width: 100rem;
    margin: 0 10rem;
  }

  .msg {
    position: relative;
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
  }

  .back {
    padding: 0.1rem 1rem 0 0;
  }

  .back img{
    width: 2rem;
  }

  .name,
  .artist {
    max-width: 40%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .name {
    font-size: 1.5rem;
    margin-right: 2rem;
  }

  .artist {
    font-size: 1.3rem;
    color: rgba(0, 100, 155, 0.8);
  }

  .play-count {
    position: absolute;
    right: 0;
    opacity: 0.3;
    font-weight: 600;
  }

  .play {
    width: 100%;
    height: 59vh;
    min-height: 29rem;
  }

  .play-v {
    width: 100%;
    height: 100%;
    background-color: #000;
    display: flex;
    justify-content: center;
  }

  video {
    max-width: 100%;
    height: 99%;
    outline: none;
  }

  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .title {
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    padding: 1rem 0 1rem;
  }

  .comment,
  .des {
    min-height: 30rem;
  }

  .comment {
    width: 71%;
  }

  .des {
    width: 25%;
  }

  .p-time {
    margin: 1rem 0;
  }

  .p-time,
  .desc {
    font-size: 1.5rem;
    opacity: 0.5;
    line-height: 2.5rem;
  }

  .desc {
    margin-bottom: 2rem;
  }

  .simi {
    width: 100%;
    min-height: 30rem;
  }

  .load {
    height: 50rem;
  }

  .load-s {
    height: 20rem;
  }
</style>