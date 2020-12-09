<template>
  <div class="loading-img" ref="ev">
    <img alt="" src="../../../assets/imgs/icon/loading/loading.svg">
  </div>
</template>

<script>
  export default {
    name: "LoadingItem",
    props: {
      show: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        rotate: 0
      }
    },
    mounted() {
      this.startTimer()
    },
    destroyed() {
      this.startTimer()
    },
    methods: {
      rotateTo() {
        // console.log(1);
        if (this.show) {
          this.$refs.ev ? this.$refs.ev.style.transform = `rotateZ(${this.rotate}deg)` : null;
          this.startTimer();
        }
      },
      startTimer() {
        this.rotate += 3;
        window.requestAnimationFrame(this.rotateTo);
      }
    },
    watch: {
      show() {
        this.startTimer();
      }
    }
  }
</script>

<style scoped>

  .loading-img {
    width: 3rem;
    height: 3rem;
  }

  img {
    width: 3rem;
    height: 3rem;
  }
</style>