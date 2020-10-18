<template>
  <div class="album-item" :style="{width: size.width}">
    <slot name="slot"></slot>
    <div class="play-count" v-if="show"><!--播放数量-->
      <slot name="icon" class="icon"></slot>
      <span style="font-size: 10px;" v-if="item.playCount">{{item.playCount > 100000? Math.floor(item.playCount/10000) : item.playCount}}万</span>
    </div>
    <a href="#" class="album">
      <img :src="picUrl()" alt=""
           :style="{width: size.width, height: size.height}" @load="isLoad"/>
      <span>{{ cutContext(item.name) }}</span>
      <span v-if="item.artistName" class="artist">{{ cutContext(item.artistName) }}</span>
      <span v-if="item.creator" class="artist">by {{ cutContext(item.creator.nickname,) }}</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: "Album",
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
            width: '16rem',
            height: '16rem'
          }
        }
      },
      length: {
        type: Number,
        default() {
          return Math.floor(parseInt(this.size.width) * 10 / 14)
        }
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      cutContext(str) {
        if (str.length > this.length) {
          return str.substring(0, this.length - 1) + '...'
        } else {
          return str
        }
      },
      isLoad() {
        this.$emit('imgLoad')
      },
      picUrl() {
        return this.item.sPicUrl ? this.item.sPicUrl : this.item.coverImgUrl ? this.item.coverImgUrl : this.item.picUrl
      }
    }
  }
</script>

<style scoped>

  .album-item {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .play-count {
    z-index: 100;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    color: #eee;
    font-weight: 600;
    height: 10%;
    background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.5));
  }

  .play-count span {
    margin-bottom: 1.95rem;
  }

  .icon {
    margin: 0 0.5rem;
  }

  .album-item:hover {
    transition: opacity 300ms;
    opacity: 0.8;
  }

  .album-item a {
    display: flex;
    flex-direction: column;
  }

  .album-item span {
    font-size: 14px;
    opacity: 0.6;
    position: relative;
    top: 1rem;
  }

  .album-item span.artist {
    padding: 1rem 0;
    color: var(--color-text);
    font-weight: 600;
    font-size: 12px;
  }
</style>