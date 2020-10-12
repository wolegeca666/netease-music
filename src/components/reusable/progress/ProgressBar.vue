<template>
  <div class="progress-bar">
    <div class="bar"></div>
    <div class="container" @click="progress($event)">
      <div class="progress">
        <div class="currentTime"></div>
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
        require: true
      },
      num: {
        type: Number,
        require: true
      }
    },
    data() {
      return {
        width: 0,
        x: 0
      }
    },
    mounted() {
      this.changeProgress(this.percent);
    },
    methods: {
      progress(e) {
        const audio = document.getElementsByClassName('progress-bar')[this.num];
        this.width = audio.offsetWidth;
        // console.log(this.left);
        // console.log(this.width);
        this.x = e.pageX;
        let percent = (e.pageX - this.left) / this.width;
        //console.log(percent);
        this.changePercent(percent)
      },

      changePercent(percent) {
        console.log(percent);
        this.changeProgress(percent);
        this.$emit('progress', percent);
      },

      changeProgress(percent) {
        const progress = document.getElementsByClassName('currentTime')[this.num];
        // console.log(width);
        progress.style.width = (percent * 100) + '%';
        this.changeBar(progress.offsetWidth);
      },

      changeBar(width) {
        const bar = document.getElementsByClassName('bar')[this.num];
        bar.style.left = width - 6 + 'px';
      }
    },
    watch: {
      percent: function () {
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
  }

  .progress-bar .progress,
  .container {
    position: absolute;
    right: 0;
    width: 100%;
  }

  .progress-bar .progress {
    top: 1rem;
    height: 0.25rem;
    background: rgba(0, 0, 0, 0.1);
  }

  .progress-bar .container {
    height: 3rem;
  }

  .progress-bar .bar {
    z-index: 99;
    position: absolute;
    top: 0.5rem;
    left: 0;
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