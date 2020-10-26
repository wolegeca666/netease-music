<template>
    <div class="container">
      <nav-aside @asideShow="navShow"></nav-aside>
      <div class="nav-page" v-show="aside" ></div>
      <div class="nav-list" v-show="!aside"></div>
      <div id="view" @scroll="scroll($event)">
        <keep-alive>
          <router-view/>
        </keep-alive>
        <div class="to-top-bar" :class="{'bottom': barShow, 'top': !barShow, 'to-top-animate': animate}"  @click="toTop">
          <to-top></to-top>
        </div>
      </div>
    </div>
</template>

<script>
  import navAside from "../components/content/aside/Aside";
  import ToTop from "../components/common/ToTop";

  export default {
    name: "Container",
    data() {
      return {
        aside: true,
        barShow: false,
        animate: false
      }
    },
    components: {
      navAside, ToTop
    },
    methods: {
      navShow(flag) {
        this.aside = flag
      },
      // 回到顶部
      scroll(e) {
        e.target.scrollTop > this.height/1.5 ?
            this.barShow = true :
            this.barShow = false;
        const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
        this.$store.commit('load', bottom < 50);
      },

      toTop() {
        this.animate = true;
        const view = document.getElementById('view');

        let step;
        let that = this;
        view.timer = setInterval(function () {
          // 设置步长（缓动效果）
          step = (view.scrollTop) / 15;
          step > 0 ? Math.ceil(step) : Math.floor(step);
          if (view.scrollTop === 0) {
            // 停止动画
            clearInterval(view.timer);
            that.animate = false
          }
          view.scrollTop = view.scrollTop - step;

        }, 15);
      }

    },
    computed: {
      height() {
        return this.$store.state.windowsHeight
      }
    }
  }
</script>

<style lang="less">

  .container {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .nav-page {
    width: 18rem;
    border-right: 1px solid transparent;
  }

  .nav-list {
    position: relative;
    width: 4rem;
    border-right: 1px solid transparent;
  }

  #view {
    flex: 1;
    height: 100%;
    overflow: scroll;
    overflow-x: hidden;
  }

  #view .to-top-bar {
    transition: all 300ms;
    position: fixed;
    right: 3rem;
  }

  .bottom {
    bottom: 10rem;
  }

  .top {
    visibility: hidden;
    opacity: 0;
  }

  .to-top-animate {
    visibility: hidden;
    opacity: 0;
    bottom: 40rem;
  }

</style>
