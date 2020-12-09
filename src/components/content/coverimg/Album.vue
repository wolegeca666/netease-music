<template>
  <div :style="{width: size.width}" @click="playlist" class="album-item" >
    <slot name="slot"></slot>

    <a @click="active = false" @mouseleave="active = false"
       class="album">
      <div :class="{'activeD': active}"
           :style="{width: size.width, height: size.height}"
           class="img-container">
        <img :src="picUrl()" :style="{width: size.width, height: size.height}"
             @load="isLoad" @mouseenter="active = true"
             alt="" v-show="load"/>
        <div class="play-count" v-if="show"><!--播放数量-->
          <slot class="icon" name="icon"></slot>
          <span style="font-size: 10px;" v-if="item.playCount">
            {{item.playCount > 100000? Math.floor(item.playCount/10000)+'万' : item.playCount}}
          </span>
        </div>
      </div>
      <span class="name" :title="item.name">{{ item.name }}</span>
      <span class="artist" v-if="item.artistName">{{ item.artistName }}</span>
      <span class="artist"
            v-if="item.creator">by {{ item.creator.nickname }}</span>
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
      this.load = false
    },
    methods: {
      isLoad() {
        this.$emit('imgLoad');
        this.load = true
      },
      picUrl() {
        return this.item.sPicUrl ? this.item.sPicUrl : this.item.coverImgUrl ? this.item.coverImgUrl : this.item.picUrl
      },

      playlist() {
        if (this.playlistTo) {
          this.$router.push({name: 'PlayList', query: {id: this.item.id}})
        }
      }
    }
  }
</script>

<style scoped>

  .album-item {
    transition: opacity 200ms;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .play-count {
    z-index: 100;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: #fff;
    height: 2rem;
    border-radius: 1rem;
    background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.5));
  }

  .play-count span {
    opacity: 1;
    margin-right: 10px;
  }

  .icon {
    margin: 0 0.5rem;
  }

  .album-item:hover {
    opacity: 0.9;
  }

  .album-item a {
    display: flex;
    flex-direction: column;
  }

  .album-item span.name {
    font-size: 14px;
    opacity: 0.6;
    padding-top: 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .album-item span.artist {
    opacity: 0.6;
    padding: 1rem 0;
    color: var(--color-text);
    font-weight: 600;
    font-size: 12px;
  }

  .activeD {
    transform: translate3d(0, -0.8rem, 0);
    box-shadow: 5px 5px 10px gray;
  }

  .img-container {
    position: relative;
    border-radius: 1rem;
    transition: all 200ms;
  }
</style>