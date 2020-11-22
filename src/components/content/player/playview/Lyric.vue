<template>
  <div class="song-content">
    <div class="name">{{playSong.name}}</div>
    <div class="author">
      <p v-if="playSong.al">专辑： <span>{{playSong.al.name}}</span></p>
      <p v-if="playSong.ar">歌手： <span> {{authorHandle(playSong)}} </span></p>
    </div>

    <div class="lrc" v-show="!nolyric">
      <p :class="{'playtime': (show && isNow(index))}"
         :key="index" v-for="(item, index) in lyric">{{item.text}}</p>
      <div class="load" v-show="!lyric">
        <loading :show="!lyric"></loading>
      </div>
    </div>
    <div class="nolrc">{{nolyric}}</div>
  </div>

</template>

<script>
  import {request} from "../../../../api/request";
  import {mapState} from "vuex";
  import Loading from "../../../common/loading/Loading";

  export default {
    name: "Lyric",
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    components: {Loading},
    data() {
      return {
        lyric: [],
        nolyric: '',
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
          this.$store.commit('timeChange', 0);
          if (res.lrc) {
            this.lyric = res.lrc.lyric;
            this.nolyric = '';
            this.reg();
          } else if (res.nolyric) {
            this.nolyric = '纯音乐，无歌词';
            this.lyric = '纯音乐';
          } else {
            this.nolyric = '暂无歌词';
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

      authorHandle(obj) {
        let arr = [];
        let authors = obj.ar || obj.artists;
        authors.forEach(function (item) {
          arr.push(item.name)
        });
        return arr.join(' / ');
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
      },

      scroll() {
        this.handleDom.scrollTop = this.current > 3 ?
            this.handleDom.scrollHeight * (this.current / this.lyric.length) - 145
            : 0;
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
      }
    },
    watch: {
      id() {
        this.current = 0;
        this.lyric = '';
        this.getLrc();
      },
      current() {
        // console.log(this.current);
        window.requestAnimationFrame(this.scroll)
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
    width: 100%;
    height: 8rem;
    font-size: 18px;
    padding: 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .author {
    display: flex;
    font-size: 13px;
    padding: 0.5rem 1rem;
    margin-bottom: 2rem;
  }

  .author p {
    max-width: 50%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-right: 3rem;
  }

  .author span {
    font-weight: 600;
    color: rgba(0, 100, 155, 0.8);
  }

  .load {
    height: 30rem;
  }

  .lrc {
    padding-left: 1rem;
    font-size: 16px;
    line-height: 36px;
    overflow-y: scroll;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .lrc::-webkit-scrollbar {
    width: 0.8rem;
  }

  /* 滚动槽 */
  .lrc::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }

  /* 滚动条滑块 */
  .lrc::-webkit-scrollbar-thumb {
    border-radius: 1.5rem;
    background: rgba(0, 0, 0, 0.08);
  }

  .playtime {
    position: relative;
    color: #fff
  }

  .nolrc {
    font-size: 14px;
    line-height: 30rem;
    text-align: center;
  }
</style>