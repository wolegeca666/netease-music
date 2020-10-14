<template>
  <div class="audio">
    <div id="music-progress">
      <progress-bar :left="left" :percent="percent" :num="0"
                    @progress="fastSeek" @moveEnd="changeTime"></progress-bar>
    </div>
    <div class="msg">
      <div class="song" v-show="pic.length">
        <span class="name">{{ song.name }}</span>
        <span style="color:rgba(0,0,0,0.4);"> - {{ author.name}}</span>
      </div>
      <div class="time">
        <span style="font-weight: 500;;">{{ currentTime }}</span> / <span
              style="color: #818181">{{ maxTime }}</span>
      </div>
    </div>
    <audio id="musicUrl" @canplay="canPLay" :src="url"
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
        url: '',
        song: {},
        author: {},
        pic: '',
        left: 0,
        maxTime: '00:00',
        currentTime: '00:00',
        percent: 1,
        flag: true
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
            }).catch(e => console.log(e));
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
            }).catch(e => console.log(e));
      },

      // 时长
      canPLay() {
        const music = this.music;
        this.maxTime = utils.getTime(music.duration);
        if (music.currentTime === 0) {
          this.percent = 0
        }
        if (this.id !== 27580521 && !this.play) {
          this.ended()
        }
      },
      ended() {
        this.$emit('play');
      },
      //播放和暂停
      musicPlay() {
        if (this.play) {
          this.music.play()
        } else {
          this.music.pause()
        }
      },
      /**
       * 播放进度条
       * */
      timeChange() {
        if (this.flag) {
          this.progress()
        }
      },

      progress() {
        const music = this.music;
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
        this.flag = false;
        this.percent = percent <= 0 ? 0 : percent > 1 ? 1 : percent;
        const music = this.music;
        this.currentTime = utils.getTime(this.percent * music.duration);
      },

      changeTime() {
        const music = this.music;
        music.currentTime = this.percent * music.duration;
        this.flag = true;
        this.timeChange();
      }
    },
    watch: {
      play: function () {
        this.musicPlay()
      },
      voice: function () {
        this.changeVoice()
      },
      id: function() {
        // console.log(this.id);
        this.$emit('songs', 'http://p3.music.126.net/VKsQu4n0zJF9sG508S9gQQ==/3429376768246424.jpg');
        if (this.play) {
          this.ended();
        }
        this.getMusicDetail();
        this.getMusicPlay();
      }
    },
    computed: {
      music: function () {
        return document.getElementById('musicUrl')
      },
      id: function () {
        return this.$store.state.id
      }
    },
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