<template>
  <div class="album-item" :style="{width: size.width}" @click="playlist">
    <slot name="slot"></slot>

    <a class="album" @mouseleave="active = false"
       @click="active = false">
      <div class="img-container" :style="{width: size.width, height: size.height}"
           :class="{'active': active}">
        <img :src="picUrl()" alt="" :class="{'active': active}"
             @mouseenter="active = true" v-show="load"
             :style="{width: size.width, height: size.height}" @load="isLoad"/>
        <div class="play-count" v-if="show"><!--播放数量-->
          <slot name="icon" class="icon"></slot>
          <span style="font-size: 10px;" v-if="item.playCount">
            {{item.playCount > 100000? Math.floor(item.playCount/10000)+'万' : item.playCount}}
          </span>
        </div>
      </div>
      <span class="name">{{ item.name }}</span>
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
      },
      playlistTo:{
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
      cutContext(str) {
        if (str.length > this.length) {
          return str.substring(0, this.length) + '...'
        } else {
          return str
        }
      },
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

  .album-item:hover {
    transition: all 300ms;
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

  .active {
    margin: -5px 0 5px;
  }

  .img-container {
    position: relative;
    transition: all 200ms;
  }

  img.active {
    transition: all 200ms;
    box-shadow: 5px 5px 5px gray;
  }
</style>