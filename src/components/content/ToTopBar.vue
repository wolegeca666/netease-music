<template>
  <div class="to-top-bar"
       :class="{'top': !barShow, 'to-top-animate': animate}"
       @click="start">
    <to-top></to-top>
  </div>
</template>

<script>
  import ToTop from "../common/ToTop";

  export default {
    name: "ToTopBar",
    data() {
      return {
        barShow: false,
        animate: false,
        bottom: 0,
        top: false
      }
    },
    components: {ToTop},
    mounted() {
      document.querySelector('body').onscroll = e => {
        this.scroll(e.target.scrollingElement);
        // console.log(e);
      };
    },
    methods: {

      scroll(e) {
        e.scrollTop > 1000 ?
            this.barShow = true :
            this.barShow = false;
        this.bottom = e.scrollHeight - e.scrollTop - e.clientHeight;
        window.requestAnimationFrame(this.commit)
      },

      commit() {
        this.$store.commit('load', this.bottom < 50);
      },
      // 回到顶部
      start() {
        this.animate = true;
        this.top = true;
        this.scrollTo();
      },

      stop() {
        this.top = false;
        this.animate = false;
        this.barShow = true;
      },

      scrollTo() {
        if (this.top) {
          document.onwheel = null;
          const view = document.documentElement;
          let that = this;
          // 设置步长（缓动效果）
          let step = (view.scrollTop) / 12;
          step > 0 ? Math.ceil(step) : Math.floor(step);
          document.onwheel = (e) => {
            document.onwheel = null;
            this.stop();
          };
          if (view.scrollTop === 0) {
            // 停止动画
            this.stop();
          }
          view.scrollTop = view.scrollTop - step;
          window.requestAnimationFrame(this.scrollTo)
        }
      },
    },
    computed: {
      height() {
        return this.$store.state.windowsHeight
      }
    }
  }
</script>

<style scoped>

  .to-top-bar {
    position: fixed;
    right: 2rem;
    bottom: 10rem;
  }

  .top {
    visibility: hidden;
    opacity: 0;
  }

  .to-top-animate {
    transition: all 300ms;
    visibility: hidden;
    opacity: 0;
    transform: translate3d(0, -400%, 0);
  }
</style>