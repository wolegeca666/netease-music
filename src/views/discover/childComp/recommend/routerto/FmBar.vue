<template>
  <div class="bar">
    <scale>
      <div @click="routerTo('/fm')" class="item">
        <div class="icon">
          <img alt="" src="../../../../../assets/imgs/icon/discover/fm.svg">
        </div>
        <div class="text">
          <p>私人FM</p>
          <p class="des">享受你的音乐专属推荐</p>
        </div>
      </div>
    </scale>
    <div class="center"></div>
    <scale>
      <div @click="routerTo('/recommend/songs')" class="item">
        <div class="icon">
          <p class="date">{{date}}</p>
        </div>
        <div class="text">
          <p>每日歌曲推荐</p>
          <p class="des">根据你的口味生成</p>
        </div>
      </div>
    </scale>
    <div class="center"></div>
    <scale>
      <div @click="routerTo('/discover/toplist')" class="item">
        <div class="toplist">
          <img alt=""
               src="../../../../../assets/imgs/icon/discover/toplist.svg">
        </div>
        <div class="text">
          <p>排行榜</p>
          <p class="des">最热音乐榜</p>
        </div>
      </div>
    </scale>
  </div>
</template>

<script>
  import Scale from "../../../../../components/common/Scale";

  export default {
    name: "FmBar",
    components: {
      Scale
    },
    data() {
      return {
        date: '17'
      }
    },
    mounted() {
      this.getDay()
    },
    methods: {
      getDay() {
        this.date = new Date().getDate();
      },

      routerTo(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped>
  .bar {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 6rem;
    margin-bottom: 3rem;
  }

  .item {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 30rem;
    height: 100%;
  }

  .center {
    border-left: 1px solid rgba(0, 0, 0, 0.06);
  }

  .icon,
  .toplist {
    position: relative;
    overflow: hidden;
    width: 6.1rem;
    height: 6.1rem;
    margin-right: -4.5rem;
    border-radius: 6.1rem;
    border: 0.1rem solid rgba(216, 30, 6, 0.4);
  }

  .icon img {
    width: 6rem;
    height: 6rem;
  }

  .toplist img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 4rem;
    height: 4rem;
  }

  .date {
    line-height: 6rem;
    text-align: center;
    font-size: 2.4rem;
    color: rgb(216, 30, 6);;
  }

  .text {
    font-size: 16px;
    line-height: 2.5rem;
  }

  .des {
    font-weight: 600;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
  }
</style>