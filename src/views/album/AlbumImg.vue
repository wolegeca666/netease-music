<template>
  <div :class="{'on': on, 'off' : !on}" class="album-item">
    <slot name="slot"></slot>
    <div class="album">
      <div class="album-cover"
           style="position: relative; transition: all 200ms;">
        <img :src="item.picUrl" @load="isLoad"/>
      </div>
      <div class="album-msg">
        <span class="name">{{ item.name }}</span>
        <div class="artist">
          <span v-if="item.artists.length">歌手：<span
                  class="author">{{ artist }}</span></span>
          <span v-if="item.createTime">发行时间：{{item.createTime}}</span>
        </div>
        <div class="count">
          <div class="subCount">收藏
            <span v-if="item.info.subscribedCount">({{numHandle(item.info.subscribedCount)}})</span>
          </div>
          <div class="subCount">评论
            <span v-if="item.info.commentCount">({{numHandle(item.info.commentCount)}})</span>
          </div>
          <div class="subCount">分享
            <span v-if="item.info.shareCount">({{numHandle(item.info.shareCount)}})</span>
          </div>
        </div>
        <div class="des">
          <p v-if="item.description">
            <span style="color: #555;">介绍：</span>{{ des }}
          </p>
        </div>
      </div>
    </div>
    <div @click="on = !on" class="unfold">
      <div v-show="!on">
        <svg class="icon" height="128" p-id="8135"
             t="1603280462713" version="1.1" viewBox="0 0 1024 1024"
             width="128" xmlns="http://www.w3.org/2000/svg">
          <path d="M509.002 664.125a22.334 22.334 0 0 1-15.86-6.562L239.688 404.11a22.421 22.421 0 0 1 31.72-31.676l253.454 253.41a22.421 22.421 0 0 1-15.86 38.282"
                fill="#8a8a8a" p-id="8136"></path>
          <path d="M509.002 664.125a22.334 22.334 0 0 1-15.86-38.238l259.45-259.407a22.421 22.421 0 0 1 31.677 31.676L524.905 657.563a22.508 22.508 0 0 1-15.903 6.562"
                fill="#8a8a8a" p-id="8137"></path>
        </svg>
      </div>
      <div v-show="on">
        <svg class="icon" height="128" p-id="8469"
             t="1603280492406" version="1.1" viewBox="0 0 1024 1024"
             width="128" xmlns="http://www.w3.org/2000/svg">
          <path d="M514.998 359.875a22.334 22.334 0 0 1 15.86 6.562L784.312 619.89a22.421 22.421 0 0 1-31.72 31.676l-253.454-253.41a22.421 22.421 0 0 1 15.86-38.28199999"
                fill="#8a8a8a" p-id="8470"></path>
          <path d="M514.998 359.875a22.334 22.334 0 0 1 15.86 38.238l-259.45 259.407a22.421 22.421 0 0 1-31.677-31.676L499.095 366.437a22.508 22.508 0 0 1 15.903-6.562"
                fill="#8a8a8a" p-id="8471"></path>
        </svg>
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
        show: false,
        on: false
      }
    },
    methods: {
      isLoad() {
        this.$emit('imgLoad')
      },
      numHandle(num) {
        num = num || 0;
        return num > 100000 ? Math.floor(num / 10000) + '万' : num
      },

      routerTo(cat) {
        this.$router.push({name: 'DPlayList', query: {cat: cat}})
      },
    },
    computed: {
      des() {
        return this.item.description.split(' ').join('')
      },
      artist() {
        let arr = [];
        this.item.artists.forEach(function (item) {
          arr.push(item.name)
        });
        return arr.join(' / ');
      },
    }
  }
</script>

<style scoped>

  .album-item {
    width: 100%;
    position: relative;
  }

  .count {
    display: flex;
    padding: 0.5rem 0 1.5rem;
    color: rgba(0, 0, 0, 0.5);
  }

  .on {
    padding-bottom: 1rem;
  }

  .off {
    height: 21rem;
    overflow: hidden;
    padding-bottom: 0;
  }

  .unfold {
    background-color: #fff;
    position: absolute;
    right: 0;
    top: 18.5rem;
  }

  .unfold .icon {
    opacity: 0.5;
    width: 3rem;
    height: 3rem;
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
    font-size: 13px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.3);
  }

  .album-msg .artist .author {
    color: rgba(0, 118, 195, 0.8);
  }

  .album-msg .artist span {
    padding-right: 1rem;
  }

  .subCount {
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    font-size: 13px;
    border: 1px solid var(--color-active);
  }

  .album-msg .des {
    width: 95%;
    padding: 1rem 0;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.4);
    font-weight: 600;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 2.5rem;
  }

</style>