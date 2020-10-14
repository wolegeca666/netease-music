<template>
  <div class="album-item" :style="{width: size.width}">
    <slot name="slot"></slot>
    <div class="play-count"><!--播放数量-->
      <slot name="icon" class="icon"></slot>
      <span style="font-size: 10px;" v-if="item.playCount">{{item.playCount > 100000? Math.floor(item.playCount/10000) : item.playCount}}万</span>
    </div>
    <a href="#" class="album">
      <img :src="item.sPicUrl ? item.sPicUrl : item.picUrl" alt="0"
           :style="{width: size.width, height: size.height}"/>
      <span>{{ cutContext(item.name) }}</span>
      <span v-if="item.artistName" class="artist">{{ cutContext(item.artistName) }}</span>
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
            name: '',
            picUrl: 'http://p3.music.126.net/VKsQu4n0zJF9sG508S9gQQ==/3429376768246424.jpg'
          }
        }
      },
      size: {
        type: Object,
        default() {
          return {
            width: '15rem',
            height: '15rem'
          }
        }
      },
      length: {
        type: Number,
        default() {
          return Math.floor(parseInt(this.size.width) * 10 / 14)
        }
      }
    },
    methods: {
      cutContext(str) {
        // console.log(width);
        if (str.length > this.length) {
          return str.substring(0, this.length - 1) + '...'
        } else {
          return str
        }
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