<template>
  <div class="audio">
    <div id="music-progress">
      <progress-bar :left="left" :percent="percent" :num="0" @progress="fastSeek"></progress-bar>
    </div>
    <div class="msg">
      <div class="song" v-show="pic.length">
        <span class="name">{{ song.name }}</span> -
        <span>{{ author.name}}</span>
      </div>
      <div class="time">
        <span style="font-weight: 500;;">{{ currentTime }}</span> / <span
              style="color: #818181">{{ maxTime }}</span>
      </div>
    </div>
    <audio id="musicUrl" @canplay="bufferEnd" :src="url"
           @timeupdate="timeChange" @ended="ended"></audio>
  </div>
</template>

<script>
  import ProgressBar from "../../reusable/progress/ProgressBar";

  import utils from "../../../common/utils";
  import {request} from "../../../api/request";

  export default {
    name: "musicAudio",
    props: {
      play: {
        type: Boolean
      }
    },
    data() {
      return {
        id: this.$store.state.id,
        url: '',
        song: {},
        author: {},
        pic: '',
        left: 0,
        maxTime: '00:00',
        currentTime: '00:00',
        percent: 1
      }
    },
    components: {
      ProgressBar
    },
    mounted() {
      const audio = document.getElementsByClassName('audio')[0];
      this.left = audio.offsetLeft;
      this.getMusicPlay();
      this.getMusicDetail();
    },
    methods: {
      /**
       * 获取单曲播放地址
       * */
      getMusicPlay() {
        request('/music/url?id=' + this.id + '&br=320000')
            .then((res) => {
              // console.log(res.data);
              this.url = res.data[0].url;
              this.musicPlay();
            }).catch(e => console.log(e) );
      },
      /**
       * 获取歌曲信息
       * */
      getMusicDetail() {
        request('/music/detail?id=' + this.id)
            .then((res) => {
              // console.log(res.songs[0]);
              this.song = res.songs[0];
              this.author = this.song.ar[0];
              this.pic = this.song.al.picUrl;
              this.$emit('songs', this.pic)
            }).catch(e => console.log(e) );
      },
      // 时长
      bufferEnd() {
        const music = document.getElementById('musicUrl');
        this.maxTime = utils.getTime(music.duration);
        if(music.currentTime === 0) {
          this.percent = 0
        }
      },
      ended() {
        this.$emit('play');
      },
      //播放和暂停
      musicPlay() {
        const music = document.getElementById('musicUrl');
        if (this.play) {
          music.play()
        } else {
          music.pause()
        }
      },
      /**
       * 播放进度条
       * */
      timeChange() {
        const music = document.getElementById('musicUrl');
        this.currentTime = utils.getTime(music.currentTime);
        music.volume = this.$store.state.voice;
        let percent = Math.floor(music.currentTime) / music.duration;
        if (percent) {
          this.percent = percent;
        }
      },
      /**
       * 指定播放时间
       * */
      fastSeek(percent) {
        const music = document.getElementById('musicUrl');
        music.currentTime = percent * music.duration;
        this.timeChange();
      },
    },
    watch: {
      play: function () {
        this.musicPlay()
      },
      id: function () {

      },
      voice: function () {
        this.changeVoice()
      }
    }
  }
</script>

<style scoped>
  .audio {
    z-index: 99;
    position: relative;
    flex: 1;
    min-width: 7.8rem;
    padding: 1rem 0 1.5rem 0;
    height: 100%;
  }

  #music-progress {
    position: relative;
    bottom: 1rem;
  }

  /*歌曲信息*/
  .song {
    position: absolute;
    top: 1rem;
    min-width: 12rem;
    display: inline-block;
  }

  .audio .time {
    background-color: #fff;
    position: absolute;
    top: 1rem;
    right: 0;
    padding-left: 2px;
    display: inline-block;
  }
</style>