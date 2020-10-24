<template>
  <div style="perspective: 1000px;" class="hover"
       :class="{'odd': !isOdd()}" @dblclick="musicPlay"
       @mousedown="animation" @click="clickHandle"><!--设置缩放定位-->
    <div class="song-item"
         :class="{'animate': animate, 'active': isActive}">
      <div class="play-icon" v-show="song.id === playId">
        <svg t="1602691641326" class="icon" viewBox="0 0 1126 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18323"
             width="128" height="128">
          <path d="M137.062331 756.377734C61.337569 756.377734 0 691.609766 0 611.686606V412.313906c0-79.87196 61.337569-144.691128 137.062331-144.691128H197.119901c11.059194 0 21.555189-4.915198 28.979186-13.516793L410.009395 40.602092C453.631773-10.085883 527.974136-13.823481 575.948512 32.256496c24.473588 23.551988 38.451181 56.831972 38.451181 91.750354v775.986812C614.399693 968.499228 561.817319 1024 496.946952 1024a114.790343 114.790343 0 0 1-86.937557-40.60158l-183.910308-213.503893a38.246381 38.246381 0 0 0-28.979186-13.516793H137.062331zM736.921232 336.896344a43.775978 43.775978 0 0 1-12.799994-60.97917 44.799978 44.799978 0 0 1 61.644769-12.697594A296.294252 296.294252 0 0 1 921.599539 512.000256a296.294252 296.294252 0 0 1-135.833532 248.780676 44.799978 44.799978 0 0 1-61.644769-12.697594 43.775978 43.775978 0 0 1 12.799994-60.92797A208.435096 208.435096 0 0 0 832.511584 512.000256c0-71.423964-36.351982-136.652732-95.641552-175.103912z m103.065548-194.918303a50.585575 50.585575 0 0 1-11.878394-69.580765 48.332776 48.332776 0 0 1 68.198366-12.083194C1039.41068 162.970031 1126.399437 330.086747 1126.399437 512.000256c0 181.913509-86.988757 349.030225-230.092685 451.686174a48.332776 48.332776 0 0 1-68.198366-12.083194 50.585575 50.585575 0 0 1 11.878394-69.631965A454.092573 454.092573 0 0 0 1028.505086 512.000256a454.092573 454.092573 0 0 0-188.518306-370.022215z"
                p-id="18324" fill="#d81e06"></path>
        </svg>
      </div>
      <span class="index"
            v-show="song.id !== playId">{{ numHandle(num) }}</span>
      <slot name="left"></slot>
      <div class="song-msg">
        <div class="song-name">
          <p>
            <span>{{song.name}}</span>
            <span v-if="song.alia.length!==0" style="color:rgba(0,0,0,0.4);">
              {{ ' (' + song.alia[0] + ')' }}
            </span>
          </p>
        </div>
        <div class="others">
          <div class="play-bar">
            <play-bar v-show="isActive" @itemClick="barClick"
                      @play="musicPlay"></play-bar>
          </div>
          <p class="author">{{ author }}</p>
          <p class="album-name">{{ cutContext(song.al.name) }}</p>
          <!--<p class="song-time">{{time}}</p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PlayBar from "../../../views/playlist/PlayBar";

  export default {
    name: "SongListItem",
    components: {
      PlayBar
    },
    props: {
      num: {
        type: Number
      },
      currentIndex: {
        type: Number,
        default: -1
      },
      song: {
        type: Object,
        require: true
      },
      // songMsg: {
      //   type: Object,
      //   require: true
      // }
    },
    data() {
      return {
        animate: false,
        active: false,
        flag: true
      }
    },
    methods: {

      numHandle(num) {
        return ++num < 10 ? '0' + num : num
      },

      authorHandle(obj) {
        let arr = [];
        let authors = obj.ar;
        authors.forEach(function (item) {
          arr.push(item.name)
        });
        return this.cutContext(arr.join(' / '));
      },

      cutContext(str) {
        if (str.length > 25) {
          return str.substring(0, 20) + '...'
        } else {
          return str
        }
      },

      clickHandle() {
        if (this.flag) {
          this.num !== this.currentIndex ?
              this.active = true :
              this.active = !this.active;
          this.$emit('itemClick', this.num);
        } else {
          this.flag = true
        }
      },

      barClick() {
        this.flag = false;
      },

      animation() {
        if (this.num !== this.currentIndex) {
          this.animate = true;
        }
        document.onmouseup = e => {
          this.animate = false;
          document.onmouseup = null
        }
      },

      isOdd() {
        return this.num % 2
      },

      // 播放歌曲
      musicPlay() {
        // console.log(this.song);
        this.$emit('play', this.num)
      }
    },
    computed: {
      playId: function () {
        return this.$store.state.song.id
      },
      author() {
        return this.authorHandle(this.song)
      },
      isActive() {
        return this.active && this.num === this.currentIndex
      }
      /*      time() {
              console.log(this.song.dt);
              return utils.getTime(this.song.dt)
            }*/
    }
  }
</script>

<style scoped>

  /*缩放动画*/

  @keyframes click {
    0% {
      transform: translateZ(-24px);
    }
    25% {
      transform: translateZ(-18px);
    }
    50% {
      transform: translateZ(-12px);
    }
    75% {
      transform: translateZ(-6px);
    }
    100% {
      transform: translateZ(0);
    }
  }

  .hover:hover {
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.06);
  }

  .odd {
    background-color: var(--color-bgc);
  }

  .odd:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }

  .animate {
    transform: translateZ(-24px);
  }

  .active {
    animation: click 200ms;
    background-color: var(--color-active);
  }


  .song-item {
    display: flex;
    align-items: center;
    height: 5rem;
  }

  .song-msg {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .song-msg p,
  .song-msg span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .song-msg .song-name {
    width: 40%;
    font-size: 13.5px;
  }

  .others {
    margin-left: 10rem;
    position: relative;
    width: 50%;
    display: flex;
    flex-direction: row;
  }

  .play-bar {
    position: absolute;
    top: -3px;
    left: -9rem;
    width: 8%;
    background-color: transparent;
  }

  .song-msg .author {
    width: 40%;
  }

  .song-msg .author,
  .album-name {
    font-size: 12px;
    color: var(--color-text);
  }

  .play-icon {
    opacity: 0.8;
    margin: 0 2rem 0 1.9rem;
  }

  .icon {
    width: 1.4rem;
    height: 1.4em;
  }

  .index {
    font-size: 12px;
    padding: 0 2rem;
    font-weight: 600;
    opacity: 0.5
  }

</style>