<template>
  <div class="album-item" :class="{'on': on, 'off' : !on}">
    <slot name="slot"></slot>
    <div class="album">
      <div class="album-cover"
           style="position: relative; transition: all 200ms;">
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
        <div class="tag" v-if="item.tags">
          <p>标签：</p>
          <div v-for="tag in item.tags">
            <p @click="routerTo(tag)"><a href="javascript:;">{{tag}}</a></p>
          </div>
        </div>
        <div class="des">
          <p v-if="item.description"><span style="color: #555;">介绍：</span>{{ des
            }}</p>
        </div>
      </div>
    </div>
    <div class="unfold" @click="on = !on">
      <div v-show="!on">
        <svg t="1603280462713" class="icon" viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8135"
             width="128" height="128">
          <path d="M509.002 664.125a22.334 22.334 0 0 1-15.86-6.562L239.688 404.11a22.421 22.421 0 0 1 31.72-31.676l253.454 253.41a22.421 22.421 0 0 1-15.86 38.282"
                p-id="8136" fill="#8a8a8a"></path>
          <path d="M509.002 664.125a22.334 22.334 0 0 1-15.86-38.238l259.45-259.407a22.421 22.421 0 0 1 31.677 31.676L524.905 657.563a22.508 22.508 0 0 1-15.903 6.562"
                p-id="8137" fill="#8a8a8a"></path>
        </svg>
      </div>
      <div v-show="on">
        <svg t="1603280492406" class="icon" viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8469"
             width="128" height="128">
          <path d="M514.998 359.875a22.334 22.334 0 0 1 15.86 6.562L784.312 619.89a22.421 22.421 0 0 1-31.72 31.676l-253.454-253.41a22.421 22.421 0 0 1 15.86-38.28199999"
                p-id="8470" fill="#8a8a8a"></path>
          <path d="M514.998 359.875a22.334 22.334 0 0 1 15.86 38.238l-259.45 259.407a22.421 22.421 0 0 1-31.677-31.676L499.095 366.437a22.508 22.508 0 0 1 15.903-6.562"
                p-id="8471" fill="#8a8a8a"></path>
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
        this.show = true;
        this.$emit('imgLoad')
      },
      picUrl() {
        return this.item.coverImgUrl
      },
      routerTo(cat) {
        this.$router.push({name: 'DPlayList', query: {cat: cat}})
      },
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
    position: relative;
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
    position: absolute;
    right: 0;
    bottom: -1.4rem;
    opacity: 0.5;
  }

.unfold .icon {
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
    color: rgba(0, 0, 0, 0.4);
    font-weight: 600;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 2.5rem;
  }

</style>