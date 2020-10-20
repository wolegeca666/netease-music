<template>
  <div class="album-item">
    <slot name="slot"></slot>
    <div class="album">
      <div class="album-cover" style="position: relative; transition: all 200ms;">
        <img :src="picUrl()" v-show="show" @load="isLoad"/>
        <div class="play-count" v-if="item.playCount"><!--播放数量-->
          <slot name="icon" class="icon"></slot>
          <span style="font-size: 10px;">{{item.playCount > 100000 ? Math.floor(item.playCount/10000)+'万' : item.playCount}}</span>
        </div>
      </div>
      <div class="album-msg">
        <span class="name">{{ item.name }}</span>
        <div class="artist">
          <img v-if="item.creator" :src="item.creator.avatarUrl" alt="">
          <span v-if="item.creator">{{ item.creator.nickname }}</span>
        </div>
        <div class="tag"  v-if="item.tags">
          <p>标签：</p>
          <div v-for="tag in item.tags">
            <p><a href="#">{{tag}}</a></p>
          </div>
        </div>
        <div class="des">
          <p v-if="item.description"><span style="color: #555;">介绍：</span>{{ des }}</p>
        </div>
      </div>
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
        this.$emit('imgLoad')
      },
      picUrl() {
        return this.item.coverImgUrl
      }
    },
    computed: {
      des() {
        return this.item.description.split(' ').join('')
      }
    }
  }
</script>

<style scoped>

  .album-item {
    width: 100%;
  }

  .album-cover img {
    width: 20rem;
    height: 20rem;
  }

  .album-cover .play-count {
    z-index: 100;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    width: 100%;
    height: 2rem;
    border-radius: 1rem 1rem 0 0;
    background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.3));
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
    flex-direction: row;
  }

  .album-msg {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
  }

  .album-msg span.name {
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    opacity: 0.6;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .album-msg .artist {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem 0;
  }

  .album-msg .artist img {
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
  }

  .album-msg .artist span {
    padding: 0 1rem;
  }

  .album-msg .tag {
    display: flex;
    flex-direction: row;
    color: #555;
    font-size: 13px;
    font-weight: 600;
  }

  .album-msg .tag a {
    color: rgba(0, 0, 255, 0.6);
    font-size: 13px;
    font-weight: 600;
    padding: 0 3px;
  }

  .album-msg .tag a:hover {
    color: rgba(0, 0, 0, 0.6);
  }

  .album-msg .des {
    padding: 1rem 0;
    font-size: 13px;
    color: rgba(0,0,0,0.4);
    font-weight: 600;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 2.5rem;
  }


</style>