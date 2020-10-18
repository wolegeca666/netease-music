<template>
  <div class="hover" style="perspective: 1000px;"><!--设置缩放定位-->
    <div class="song-item"
         :class="{'active': num === currentIndex, 'animate': animate,}"
         @mousedown="animation" @click="clickHandle">
      <slot name="left"></slot>
      <div class="song-msg">
        <div class="song-name">
          <p>
            <span>{{ cutContext(song.name,28)}}</span>
          </p>
        </div>
        <div class="author">
          <p>{{ cutContext(radioName,25) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {afterMounted} from "../../../../../common/afterMounted";

  export default {
    name: "SongListItem",
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
      radioName: {
        type: String
      },
    },
    data() {
      return {
        animate: false
      }
    },
    methods: {
      numHandle(num) {
        return ++num < 10 ? '0' + num : num
      },

      cutContext(str, num) {
        if (str.length > 28) {
          return str.substring(0, num) + '...'
        } else {
          return str
        }
      },

      clickHandle() {
        if (this.num === this.currentIndex) {
          this.$emit('itemClick', -1);
        } else {
          this.$emit('itemClick', this.num);
        }
      },

      animation() {
        this.animate = true;
        document.onmouseup = e => {
          this.animate = false
        }
      },
    },
    mounted() {
      afterMounted();
      // console.log(img[img.length - 1]);
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
    opacity: 0.8;
    transition: opacity 300ms;
  }

  .animate {
    transform: translateZ(-25px);
  }
  .song-item {
    display: flex;
    align-items: center;
  }

  .song-item .song-name {
    padding-top: 0.5rem;
  }


  .song-item .author {
    padding: 1.5rem 0 1rem;
    font-size: 12px;
    color: var(--color-text);
  }

  .index {
    font-size: 12px;
    padding: 0 1rem;
    font-weight: 600;
    opacity: 0.5
  }

</style>