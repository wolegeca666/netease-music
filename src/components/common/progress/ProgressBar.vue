<template>
  <div class="progress-bar">
    <div @mousedown="move($event)">
      <div class="container">
        <div class="progress">
          <div class="currentTime" ref="time"></div>
          <div class="bar" ref="bar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProgressBar",
    props: {
      percent: {
        type: Number,
        default: 1
      },
      left: {
        type: Number,
      },
      num: {
        type: Number,
        require: true
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.animate();
    },
    methods: {
      move(el) {
        this.progress(el.clientX - this.left);
        document.onmousemove = e => {
          if (e.clientX - this.left > -100) {
            this.progress(e.clientX - this.left)
          }
        };
        document.onmouseup = e => {
          document.onmousemove = null;
          document.onmouseup = null;
          this.$emit('moveEnd')
        }
      },

      progress(x) {
        let percent = x / this.$el.offsetWidth;
        this.$emit('progress', percent);
      },

      changeProgress() {
        this.$refs.time.style.width = (this.percent * 100) + '%';
        this.$refs.bar.style.left = this.$el.offsetWidth * this.percent - 7 + 'px';
      },

      animate() {
        window.requestAnimationFrame(this.changeProgress);
      }
    },
    watch: {
      percent() {
        this.animate()
      },
      width() {
        this.changeProgress(this.percent)
      }
    },
    computed: {
      width() {
        return this.$store.state.windowsWidth
      }
    }
  }
</script>

<style scoped>
  /*进度条*/
  .progress-bar {
    position: relative;
    top: 3rem;
    width: 100%;
    height: 3rem;
    background-color: #fff;
  }

  .progress-bar .progress,
  .container {
    position: relative;
    right: 0;
    width: 100%;
  }

  .progress-bar .progress {
    top: 1rem;
    height: 0.4rem;
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0.1);
  }

  .progress-bar .container {
    display: inline-block;
    height: 3rem;
  }

  .container .bar {
    z-index: 99;
    position: relative;
    bottom: 0.9rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #fff;
    border-radius: 2rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .progress-bar .bar::after {
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 1rem;
    border: 2px solid var(--color-background);
    background-color: var(--color-background);
  }

  .progress-bar .currentTime {
    border-radius: 1rem;
    height: 100%;
    width: 0;
    background-color: var(--color-background);
  }

</style>