<template>
  <div id="hy-swiper" @mouseenter="control=true" @mouseleave="control=false">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove"
         @touchend="touchEnd" :style="swiperStyle">
      <slot name="swiper"></slot>
    </div>
    <div class="previous" @click="previous" v-show="control">
      <a href="javascript:;">
        <svg t="1603289939382" class="icon" viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9852"
             width="128" height="128">
          <path d="M287.936 507.58399999a32.896 32.896 0 0 1 9.664-23.35999999L670.912 110.912a33.024 33.024 0 0 1 46.656 46.72l-373.248 373.312a33.024 33.024 0 0 1-56.384-23.36000001"
                fill="#ffffff" p-id="9853"></path>
          <path d="M287.936 507.58399999a32.896 32.896 0 0 1 56.32-23.35999999l382.08 382.144a33.024 33.024 0 0 1-46.656 46.656l-382.08-382.016a33.152 33.152 0 0 1-9.664-23.42400001"
                fill="#ffffff" p-id="9854"></path>
        </svg>
      </a>
    </div>
    <div class="next" @click="next" v-show="control">
      <a href="javascript:;">
        <svg t="1603287569301" class="icon" viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9518"
             width="128" height="128">
          <path d="M736.064 516.41600001a32.896 32.896 0 0 1-9.664 23.35999999L353.088 913.088a33.024 33.024 0 0 1-46.656-46.72l373.248-373.312a33.024 33.024 0 0 1 56.384 23.36000001"
                fill="#ffffff" p-id="9519"></path>
          <path d="M736.064 516.41600001a32.896 32.896 0 0 1-56.32 23.35999999l-382.08-382.144a33.024 33.024 0 0 1 46.656-46.656l382.08 382.016a33.152 33.152 0 0 1 9.664 23.42400001"
                fill="#ffffff" p-id="9520"></path>
        </svg>
      </a>
    </div>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator">
        <div class="indi-item" v-for="(item, index) in slideCount"
             :class="{active: index === currentIndex - 1}"
             :key="index" @mousedown="changeItemNow(index + 1)"></div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    props: {
      interval: {
        type: Number,
        default: 4500
      },
      animationDuration: {
        type: Number,
        default: 500
      },
      moveRatio: {
        type: Number,
        default: 0.5
      },
      showIndicator: {
        type: Boolean,
        default: true
      },
      load: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        el: null,
        position: 0,
        control: false,
        slideCount: 0, // 元素个数
        totalWidth: 0, // swiper的宽度
        swiperStyle: {}, // swiper的样式
        currentIndex: 1, // 当前的index
        scrolling: false, // 是否正在滚动
        Time: 0
      }
    },
    mounted() {
      // 添加slide
      setTimeout(() => {
        this.handleDom();
        // 开启定时器
        this.startTimer();
      }, 100)
    },
    activated() {
      this.startTimer();
    },
    deactivated() {
      this.stopTimer();
    },

    destroyed() {
      this.stopTimer();
    },
    methods: {
      /**
       *  定时器操作
       */
      startTimer() {
        this.playTimer = window.setInterval(() => {
          this.currentIndex++;
          this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval)
      },
      stopTimer() {
        window.clearInterval(this.playTimer);
      },

      /**
       *  滚动到正确的位置
       */
      scrollContent(currentPosition) {
        // 设置开始滚动
        this.scrolling = true;
        // 滚动动画
        this.swiperStyle.transition = 'transform ' + this.animationDuration + 'ms';
        this.setTransform(currentPosition);
        // 判断滚动的位置
        this.checkPosition();
        // 滚动结束
        this.scrolling = false
      },

      /**
       *  检验滚动的位置是否正确
       */
      checkPosition() {
        // 校验位置
        window.setTimeout(() => {
          this.swiperStyle.transition = '0ms';
          if (this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1;
          } else if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
          }
          this.setTransform(-this.currentIndex * this.totalWidth);
          // 移动结束后回调
          this.$emit('transitionEnd', this.currentIndex - 1)
        }, this.animationDuration);
      },

      /**
       *  设置滚动的位置
       */
      setTransform(position) {
        this.el = document.querySelector('.swiper');
        this.el.style.transform = `translate(${position}px)`;
      },

      /**
       *  操作Dom，在Dom前后添加slide
       */
      handleDom() {
        // 要操作的Dom元素
        let swiperEl = document.querySelector('.swiper');
        let slidesEls = document.getElementsByClassName('slide');

        this.slideCount = slidesEls.length;

        // 前后添加一个slide
        if (this.slideCount > 1) {
          let cloneFirst = slidesEls[0].cloneNode(true);
          let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
          swiperEl.insertBefore(cloneLast, slidesEls[0]);
          swiperEl.appendChild(cloneFirst);
          this.totalWidth = swiperEl.offsetWidth
        }

        this.setTransform(-this.totalWidth)
      },

      /**
       *  拖动事件的处理
       */
      touchStart(e) {
        if (this.scrolling) return;
        this.stopTimer();
        this.startX = e.touches[0].pageX;
      },

      touchMove(e) {
        this.currentX = e.touches[0].pageX;
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth;
        let moveDistance = this.distance + currentPosition;
        this.setTransform(moveDistance)
      },

      touchEnd() {
        let currentMove = Math.abs(this.distance);
        if (currentMove < this.totalWidth * this.moveRatio) {
          this.scrollContent(-this.currentIndex * this.totalWidth);
        } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
          // 向右边滑动超过swiper宽度的 moveRatio = 0.3倍
          this.previous();
        } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
          // 向左边滑动超过swiper宽度的 moveRatio = 0.3倍
          this.next();
        }
      },

      /**
       *  控制切换
       */
      previous() {
        this.changeItem(this.currentIndex - 1);
      },

      next() {
        this.changeItem(this.currentIndex + 1);
      },

      changeItemNow(num) {
        this.stopTimer();

        this.currentIndex = num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        this.startTimer();
      },

      changeItem(num) {
        let nowTime = Date.now();
        if (nowTime - this.Time > 1000) {
          this.changeItemNow(num);
          this.Time = Date.now()
        }
      }
    },
    watch: {
      load() {
        if (!this.load) {
          this.stopTimer()
        }
      }
    }
  }
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 8px;
    width: 100%;
  }

  .indi-item {
    box-sizing: border-box;
    margin: 0 5px;
    width: 8px;
    height: 8px;
    line-height: 8px;
    border-radius: 4px;
    background-color: #fff;
    text-align: center;
    font-size: 12px;
  }

  .indi-item.active {
    background-color: var(--color-background);
  }

  .previous,
  .next {
    position: absolute;
    bottom: 11rem;
  }

  .next {
    right: 0;
  }

  .icon {
    opacity: 0.8;
    width: 5rem;
    height: 5rem;
  }
</style>