<template>
  <div :style="{width: size.width}" @click="playlist" class="album-item">
    <slot name="slot"></slot>

    <a @click="active = false" @mouseleave="active = false"
       class="album">
      <div :class="{'activeD': active}"
           :style="{width: size.width, height: size.height}"
           class="img-container">
        <img :class="{'active': active}" :src="picUrl()" :style="{width: size.width, height: size.height}"
             @load="isLoad" @mouseenter="active = true"
             alt="" v-show="load"/>
        <div class="play-count"><!--播放数量-->
          <slot class="icon" name="icon"></slot>
          <span style="font-size: 10px;">
            {{item.playCount > 100000? Math.floor(item.playCount/10000)+'万' : item.playCount}}
          </span>
        </div>
        <span class="time">{{ time }}</span>
      </div>
      <span class="name">{{ item.name}}</span>
      <span class="artist">{{ author }}</span>
    </a>
  </div>
</template>

<script>
  import utils from "../../../common/utils";

  export default {
    name: "VideoItem",
    props: {
      item: {
        type: Object,
        default() {
          return {
            name: '1',
            picUrl: 'http://p3.music.126.net/VKsQu4n0zJF9sG508S9gQQ==/3429376768246424.jpg'
          }
        }
      },
      size: {
        type: Object,
        default() {
          return {
            width: '20rem',
            height: '11rem'
          }
        }
      },
      playlistTo: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: false,
        load: false
      }
    },
    mounted() {
      this.load = false;
      // console.log(this.item);
    },
    methods: {
      isLoad() {
        this.$emit('imgLoad');
        this.load = true
      },
      picUrl() {
        return this.item.cover
      },

      playlist() {
        if (this.playlistTo) {
          this.$router.push({name: 'PlayList', query: {id: this.item.id}})
        }
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
      author() {
        return this.authorHandle(this.item)
      },
      time() {
        // console.log(this.song.dt);
        return utils.getTime(this.item.duration / 1000)
      }
    }
  }
</script>

<style scoped>

  .album-item {
    width: 100%;
    position: relative;
  }

  .play-count {
    z-index: 100;
    display: flex;
    align-items: center;
    position: absolute;
    top: 5px;
    right: 5px;
    color: rgba(255, 255, 255, 0.8);
    height: 2rem;
    border-radius: 1rem;
    background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.5));
  }

  .play-count span {
    opacity: 1;
    padding-right: 10px;
  }

  .icon {
    margin: 0 0.5rem;
  }

  .time {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 0.5rem;
    line-height: 2rem;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    background-image: linear-gradient(to left, transparent, rgba(0, 0, 0, 0.2));
  }

  img {
    border-radius: 0.3rem;
  }

  .album-item:hover {
    transition: all 300ms;
    opacity: 0.9;
  }

  .album-item a {
    display: flex;
    flex-direction: column;
  }

  .album-item span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .album-item span.name {
    font-size: 14px;
    opacity: 0.6;
    padding-top: 1rem;
  }

  .album-item span.artist {
    opacity: 0.6;
    padding: 1rem 0;
    color: var(--color-text);
    font-weight: 600;
    font-size: 12px;
  }

  .activeD {
    transform: translate3d(0, -0.5rem, 0);
    border-radius: 0.3rem;
    box-shadow: 5px 5px 5px gray;
  }

  .img-container {
    position: relative;
    transition: all 200ms;
  }
</style>