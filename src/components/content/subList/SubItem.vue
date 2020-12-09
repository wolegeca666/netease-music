<template>
  <scale>
    <div class="playlist">
      <div class="cover">
        <img :src="playlist.coverImgUrl" alt="">
      </div>
      <div class="msg">
        <span class="name">{{playlist.name || '我的歌单'}}</span>
        <span class="count">{{playlist.trackCount || 0}} 首音乐</span>
      </div>
    </div>
  </scale>
</template>

<script>
  import Scale from "../../common/Scale";

  export default {
    name: "SubItem",
    components: {Scale},
    props: {
      playlist: {
        type: Object,
        default() {
          return {
            id: 0,
            name: '我的歌单'
          }
        }
      }
    }
  }
</script>

<style scoped>
  .playlist {
    display: flex;
    width: 100%;
    height: 7rem;
  }

  .cover {
    width: 7rem;
    height: 7rem;
    padding: 1rem;
  }

  .cover img {
    width: 5rem;
    height: 5rem;
  }

  .msg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 2rem;
  }

  .msg .name {
    font-size: 14px;
  }

  .msg .count {
    font-size: 13px;
    opacity: 0.4;
  }
</style>