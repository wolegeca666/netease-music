<template>
  <div :class="{'odd': !isOdd()}" @click="clickHandle"
       @mousedown="animation"
       class="hover" style="perspective: 1000px;"><!--设置缩放定位-->
    <div :class="{'animate': animate, 'active': isActive}"
         class="song-item">
      <slot name="left"></slot>
      <div class="song-msg">
        <div class="song-name">
          <p>
            <span>{{song.name}}</span>
            <span style="color:rgba(0,0,0,0.4);" v-if="song.alia">
              {{ ' (' + song.alia + ')' }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PlayBar from "../songlist/PlayBar";

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
    },
    data() {
      return {
        animate: false,
        active: false,
        flag: true
      }
    },
    methods: {
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

      //
      musicPlay() {
        // console.log(this.song);
        this.$emit('play', this.num)
      }
    },
    computed: {
      isActive() {
        return this.active && this.num === this.currentIndex
      }
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
    background-color: var(--color-hover);
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
    padding: 1rem;
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
    font-size: 14px;
  }
</style>