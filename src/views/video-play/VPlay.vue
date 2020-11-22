<template>
  <div class="video">
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
          <video :src="url" controls="controls"></video>
        </div>
      </div>
      <div class="info"></div>
      <div class="content">
        <div class="comment">
          <span class="title">评论</span>
          <div class="hr"></div>
        </div>
        <div class="des">
          <span class="title">MV介绍</span>
          <div class="hr"></div>
          <div class="p-time">发行时间：{{msg.publishTime}}</div>
          <div class="desc">{{msg.desc}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from "../../api/request";

  export default {
    name: "VPlay",
    data() {
      return {
        id: '',
        url: '',
        msg: {},
        active: false
      }
    },
    activated() {
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
        window.scrollTo(0, 0);
      },

      getMsg() {
        this.getDetails();
        this.getVideo()
      },

      getDetails() {
        request('/mv/detail?mvid=' + this.Id).then(res => {
          // console.log(res);
          if (res.data.id === parseInt(this.Id)) {
            this.msg = res.data;
            console.log(this.msg);
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
    background-color: #f5f5f5;
    position: absolute;
    left: 0;
    min-width: 100rem;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }


  .container {
    width: 65%;
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
    height: 29vw;
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
    height: 99%;
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
    padding: 2rem 0 1rem;
  }

  .comment,
  .des {
    min-height: 30rem;
  }

  .comment {
    width: 60%;
  }

  .des {
    width: 35%;
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
</style>