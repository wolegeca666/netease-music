<template>
  <div class="song-content">
    <div class="name"><span>{{playSong.name}}</span></div>
    <div class="author">
      <p v-if="playSong.al">专辑： <span>{{playSong.al.name}}</span></p>
      <p v-if="playSong.ar">歌手： <span> {{authorHandle(playSong)}} </span></p>
    </div>

    <div class="lrc" v-show="!nolyric">
      <p class="all-lrc" :class="{'playtime': (show && isNow(index))}"
         :key="index" v-for="(item, index) in lyric">
        <span class="lyric">{{item.text}}</span>
        <span class="tlrc" v-show="item.tlrc">{{item.tlrc}}</span>
      </p>
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
      },
    },
    components: {Loading},
    data() {
      return {
        playId: 0,
        lyric: [],
        nolyric: '',
        lyc_info: {},
        current: 0
      }
    },
    methods: {
      init() {
        this.playId = this.id;
        this.current = 0;
        this.lyric = '';
        this.getLrc();
      },

      getLrc() {
        request('/lyric?id=' + this.id).then(res => {
              // console.log(res);
          this.$store.commit('timeChange', 0);
              this.lyc_info = res;
              if (res.nolyric) {
                this.nolyric = '纯音乐'
              } else if (res.lrc) {
                this.nolyric = res.lrc.lyric ? '' : '暂无歌词';
                this.tlyric = res.tlyric.lyric ? this.reg(res.tlyric.lyric) : '';
                this.lyric = res.tlyric.lyric ? this.tlrc(res.lrc.lyric) :
                    res.lrc.lyric ? this.reg(res.lrc.lyric) : '';
              } else {
                this.nolyric = '暂无歌词';
                this.tlyric = '';
                this.lyric = '';
              }
            }
        ).catch(e => console.log(e))
      },

      tlrc(str) {
        const content = /(.+)\n/g,
            rule = /\[(.+)\]/g;
        let arr = [];
        str.replace(content, (...arg) => {
          // console.log(arg);
          let obj = {text: '', time: ''};
          obj.text = arg[1].replace(rule, () => '');
          if (obj.text) {
            obj.text = obj.text.trim();
            arg[1].replace(rule, (...t) => {
              obj.time = t[1];
              this.tlyric.map(item => {
                if (item.time === obj.time) {
                  obj.tlrc = item.text;
                }
              })
            });
            arr.push(obj)
          }
        });
        return arr
      },

      reg(str) {
        const content = /(.+)\n/g,
            rule = /\[(.+)\]/g;
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
        return arr
      }
      ,

      authorHandle(obj) {
        let arr = [];
        let authors = obj.ar || obj.artists;
        authors.forEach(function (item) {
          arr.push(item.name)
        });
        return arr.join(' / ');
      }
      ,

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
      ,

      scroll() {
        this.handleDom.scrollTop = this.current > 3 ?
            this.handleDom.scrollHeight * (this.current / this.lyric.length) - 150
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
      }
      ,

      handleDom() {
        return document.querySelector('.lrc');
      }
    }
    ,
    watch: {
      id() {
        if (this.show) {
          this.init();
        }
      }
      ,
      show() {
        if (this.playId !== this.id) {
          this.init();
        }
      }
      ,
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

  .song-content .name {
    width: 100%;
    font-size: 18px;
    padding: 1rem;
    text-overflow: ellipsis;
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

  .all-lrc {
    width: 100%;
    padding-bottom: 1.8rem;
  }

  .lyric {
    display: block;
  }

  .tlrc {
    display: block;
    font-size: 13px;
  }

  .lrc {
    padding-left: 1rem;
    font-size: 16px;
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