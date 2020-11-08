<template>
  <div v-show="!show" class="loading-img">
    <img src="../../../assets/imgs/icon/loading/loading.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "Loading",
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
      this.stopTimer();
    },
    methods: {
      rotateTo() {
        const el = document.querySelector('.loading-img');
        el.style.transform = `rotateZ(${this.rotate}deg)`
      },
      startTimer() {
        this.rotateTimer = window.setInterval(() => {
          this.rotate+= 1;
          this.rotateTo();
        }, 5)
      },
      stopTimer() {
        window.clearInterval(this.rotateTimer);
      },
    },
    watch: {
      show() {
        this.show ? this.startTimer() : this.stopTimer();
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