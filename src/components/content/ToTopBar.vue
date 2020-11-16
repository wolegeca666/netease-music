<template>
  <div class="to-top-bar"
       :class="{'top': !barShow, 'to-top-animate': animate}"
       @click="toTop">
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
        animate: false
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
      // 回到顶部
      scroll(e) {
        e.scrollTop > 1000 ?
            this.barShow = true :
            this.barShow = false;
        const bottom = e.scrollHeight - e.scrollTop - e.clientHeight;
        this.$store.commit('load', bottom < 50);
      },

      toTop() {
        this.animate = true;
        const view = document.documentElement;
        let step;
        let that = this;
        let timer = setInterval(function () {
          // 设置步长（缓动效果）
          step = (view.scrollTop) / 12;
          step > 0 ? Math.ceil(step) : Math.floor(step);
          document.onwheel = (e) => {
            clearInterval(timer);
            document.onwheel = null;
            that.animate = false
          };
          if (view.scrollTop === 0) {
            // 停止动画
            clearInterval(timer);
            document.onwheel = null;
            that.animate = false
          }
          view.scrollTop = view.scrollTop - step;

        }, 17);
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