<template>
  <div class="album-item" :style="{width: size.width}" >
    <slot name="slot"></slot>
    <div class="album">
      <div style="position: relative; transition: all 200ms;">
        <img :src="picUrl()" v-show="show"
             :style="{width: size.width, height: size.height}" @load="isLoad"/>
        <div class="play-count"><!--播放数量-->
          <slot name="icon" class="icon"></slot>
          <span style="font-size: 10px;" v-if="item.playCount">{{item.playCount > 100000 ? Math.floor(item.playCount/10000)+'万' : item.playCount}}</span>
        </div>
      </div>
      <span class="name">{{ item.name }}</span>
      <span class="artist" v-if="item.creator">{{ item.creator.nickname }}</span>
    </div>
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
      }
    },
    data() {
      return {
        active: false,
        show: false
      }
    },
    methods: {
      isLoad() {
        this.show = true;
      },
      picUrl() {
        return this.item.coverImgUrl
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
    top: 5px;
    right: 5px;
    color: #fff;
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

  .album-item .album {
    display: flex;
    flex-direction: column;
  }

  .album-item  span.name {
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


</style>