<template>
  <div class="progress-bar">
    <div @mousedown="move($event)">
      <div class="container">
        <div class="progress">
          <div class="currentTime"></div>
          <div class="bar"></div>
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
      this.changeProgress(this.percent);
    },
    methods: {
      move(el) {
        this.progress(el.clientX - this.left);
        document.onmousemove = e => {
          if (e.clientX - this.left > -100) {
            // console.log(e.clientX - this.left);
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
        let percent = x / document.getElementsByClassName('progress-bar')[this.num].offsetWidth;
        // console.log(percent);
        this.$emit('progress', percent);
      },

      changeProgress(percent) {
        const progress = document.getElementsByClassName('currentTime')[this.num];
        progress.style.width = (percent * 100) + '%';
        this.changeBar(progress.offsetWidth);
      },

      changeBar(x) {
        const bar = document.getElementsByClassName('bar')[this.num];
        bar.style.left = x - 7 + 'px';
      }
    },
    watch: {
      percent: function () {
        // console.log(this.percent);
        this.changeProgress(this.percent)
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
    height: 0.25rem;
    background: rgba(0, 0, 0, 0.1);
  }

  .progress-bar .container {
    display: inline-block;
    height: 3rem;
  }

  .container .bar {
    z-index: 99;
    position: relative;
    bottom: 0.8rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #fff;
    border-radius: 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .progress-bar .bar::after {
    display: block;
    position: relative;
    top: 0.45rem;
    left: 0.45rem;
    content: ' ';
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 1rem;
    border: 0.1rem solid var(--color-background);
    background-color: var(--color-background);
  }

  .progress-bar .currentTime {
    height: 100%;
    width: 0;
    background-color: var(--color-background);
  }

</style>