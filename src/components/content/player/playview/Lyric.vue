<template>
  <div class="song-content">
    <div class="name">{{playSong.name}}</div>
    <div class="author">歌手： <span>{{playSong.author}}</span></div>
    <div class="lrc">
      <p :class="{'playtime':  isNow(index)}"
         v-for="(item, index) in lyric" :key="index">{{item.text}}</p>
      <div class="load" v-show="!lyric">
        <loading :show="!lyric"></loading>
      </div>
    </div>
  </div>

</template>

<script>
  import {request} from "../../../../api/request";
  import {mapState} from "vuex";
  import Loading from "../../../common/loading/Loading";

  export default {
    name: "Lyric",
    components: {Loading},
    data() {
      return {
        lyric: '',
        current: 0
      }
    },
    mounted() {
      this.getLrc();
    },
    methods: {
      getLrc() {
        request('/lyric?id=' + this.id).then(res => {
          // console.log(res);
          if (res.lrc) {
            this.lyric = res.lrc.lyric;
            this.reg();
          } else if (res.nolyric) {
            this.lyric = '纯音乐';
          } else {
            this.lyric = '暂无歌词';
          }
        }).catch(e => console.log(e))
      },
      reg() {
        const content = /(.+)\n/g,
            rule = /\[(.+)\]/g,
            time = /:(.+)/g,
            str = this.lyric;
        let arr = [];
        str.replace(content, (...arg) => {
          // console.log(arg);
          let obj = {text: '', time: ''};
          obj.text = arg[1].replace(rule, () => '');
          arg[1].replace(rule, (...t) => {
            obj.time = t[1];
          });
          if (obj.text) {
            obj.text = obj.text.trim();
            arr.push(obj)
          }
        });
        // console.log(arr);
        this.lyric = arr;
      },

      isNow(index) {
        let flag;
        if (this.playtime) {
          flag = this.lyric[index].time <= this.nowTime
              && this.nowTime < (this.lyric[index + 1]
                  ? this.lyric[index + 1].time : this.nowTime + 0.5);
        }
        if (flag) {
          this.current = index;
        }
        return flag
      }
    },
    computed: {
      ...mapState({
        id: state => state.song.id,
        playSong: state => state.song,
        playtime: state => state.songState.playtime
      }),

      nowTime() {
        const time = this.playtime;
        let h = 0;
        let m = Math.floor(time / 60);
        let s = (time % 60).toFixed(3);
        if (m > 60) {
          h = Math.floor(time / 60);
          m = Math.floor(time % 60);
        }
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        if (h) {
          return h + ':' + m + ':' + s
        } else {
          return m + ':' + s
        }
      },

      handleDom() {
        return document.querySelector('.lrc');
      },
    },
    watch: {
      id() {
        this.current = 0;
        this.lyric = '';
        this.getLrc();
      },
      playtime() {

      },
      current() {
        // console.log(this.current);
        this.handleDom.scrollTop = this.current > 3 ?
            this.handleDom.scrollHeight * (this.current / this.lyric.length) - 140
            : 0;
      }
    }
  }
</script>

<style scoped>
  .song-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
  }

  .name {
    font-size: 18px;
    padding: 1rem;
  }

  .author {
    font-size: 12px;
    padding: 0.5rem 1rem;
    margin-bottom: 2rem;
  }

  .author span {
    color: rgb(0, 100, 175);
  }

  .load {
    height: 30rem;
  }

  .lrc {
    padding-left: 1rem;
    font-size: 16px;
    line-height: 40px;
    overflow: scroll;
    overflow-x: hidden;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .playtime {
    position: relative;
    top: 0;
    color: #fff
  }
</style>