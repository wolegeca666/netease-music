<template>
  <div :class="{'top': !barShow, 'to-top-animate': animate}"
       @click="start"
       class="to-top-bar">
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
        e.scrollTop > this.height ?
            this.barShow = true :
            this.barShow = false;
        this.bottom = e.scrollHeight - e.scrollTop - e.clientHeight;
        window.requestAnimationFrame(this.commit)
      },

      commit() {
        if (this.bottom < 50) {
          this.$store.commit('load', true);
        } else if (this.load) {
          this.$store.commit('load', false);
        }
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
      },

      scrollTo() {
        if (this.top) {
          document.onwheel = null;
          // 设置步长（缓动效果）
          let step = (window.scrollY) / 12;
          step > 0 ? Math.ceil(step) : Math.floor(step);
          document.onwheel = (e) => {
            document.onwheel = null;
            this.stop();
          };
          if (window.scrollY === 0) {
            // 停止动画
            this.stop();
          }
          window.scrollTo(0, window.scrollY - step);
          window.requestAnimationFrame(this.scrollTo)
        }
      },
    },
    computed: {
      height() {
        return this.$store.state.windowsHeight
      },
      load() {
        return this.$store.state.load
      }
    }
  }
</script>

<style scoped>

  .to-top-bar {
    z-index: 99;
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