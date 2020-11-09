<template>
  <div class="loading-img">
    <img src="../../../assets/imgs/icon/loading/loading.svg" alt="">
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
        if (this.$el) this.$el.style.transform = `rotateZ(${this.rotate}deg)`
      },
      startTimer() {
        let rotateTimer = window.setInterval(() => {
          if (!this.show || !this.$el) {
            window.clearInterval(rotateTimer);
          }
          this.rotate+= 1;
          this.rotateTo();
        }, 5);
      },
    },
    watch: {
      show() {
        this.startTimer()
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