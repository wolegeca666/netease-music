<template>
  <div @mouseenter="control=true" @mouseleave="control=false" id="hy-swiper">
    <div :style="swiperStyle" @touchend="touchEnd" @touchmove="touchMove"
         @touchstart="touchStart"
         class="swiper" ref="swiper">
      <slot name="swiper"></slot>
    </div>
    <div @click="previous" class="previous" v-show="control">
      <span>
        <svg class="icon" height="128" p-id="9852"
             t="1603289939382" version="1.1" viewBox="0 0 1024 1024"
             width="128" xmlns="http://www.w3.org/2000/svg">
          <path d="M287.936 507.58399999a32.896 32.896 0 0 1 9.664-23.35999999L670.912 110.912a33.024 33.024 0 0 1 46.656 46.72l-373.248 373.312a33.024 33.024 0 0 1-56.384-23.36000001"
                fill="#ffffff" p-id="9853"></path>
          <path d="M287.936 507.58399999a32.896 32.896 0 0 1 56.32-23.35999999l382.08 382.144a33.024 33.024 0 0 1-46.656 46.656l-382.08-382.016a33.152 33.152 0 0 1-9.664-23.42400001"
                fill="#ffffff" p-id="9854"></path>
        </svg>
      </span>
    </div>
    <div @click="next" class="next" v-show="control">
      <span>
        <svg class="icon" height="128" p-id="9518"
             t="1603287569301" version="1.1" viewBox="0 0 1024 1024"
             width="128" xmlns="http://www.w3.org/2000/svg">
          <path d="M736.064 516.41600001a32.896 32.896 0 0 1-9.664 23.35999999L353.088 913.088a33.024 33.024 0 0 1-46.656-46.72l373.248-373.312a33.024 33.024 0 0 1 56.384 23.36000001"
                fill="#ffffff" p-id="9519"></path>
          <path d="M736.064 516.41600001a32.896 32.896 0 0 1-56.32 23.35999999l-382.08-382.144a33.024 33.024 0 0 1 46.656-46.656l382.08 382.016a33.152 33.152 0 0 1 9.664 23.42400001"
                fill="#ffffff" p-id="9520"></path>
        </svg>
      </span>
    </div>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator">
        <div :class="{active: index === currentIndex - 1}" :key="index"
           @mouseenter="changeItemNow(index + 1)"
           class="indi-item" v-for="(item, index) in slideCount"></div>
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
        default: false,
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
    activated() {
      this.startTimer();
    },
    deactivated() {
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
        }, this.interval);
      },
      stopTimer() {
        window.clearInterval(this.playTimer);
      },

      /**
       *  滚动到正确的位置
       */
      scrollContent(currentPosition) {
        // 设置开始滚动
        this.$emit('scrollTo', this.currentIndex - 1);
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
          this.$emit('transitionEnd', this.currentIndex)
        }, this.animationDuration);
      },

      /**
       *  设置滚动的位置
       */
      setTransform(position) {
        this.el = document.querySelector('.swiper');
        if (this.el) {
          this.el.style.transform = `translate3d(${position}px, 0, 0)`;
        }
      },

      /**
       *  操作Dom，在Dom前后添加slide
       */
      handleDom() {
        // 要操作的Dom元素
        if (this.$refs.swiper.offsetWidth) {
          let slidesEls = document.getElementsByClassName('slide');

          this.slideCount = slidesEls.length - 2;
          this.totalWidth = this.$refs.swiper.offsetWidth;
          this.setTransform(-this.totalWidth);

          this.startTimer();
          this.$emit('start');
        }else {
          window.requestAnimationFrame(this.handleDom)
        }

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
        this.$nextTick(this.handleDom);
        let img = document.getElementsByTagName('img');
        img.forEach(function (item) {
          item.onmousedown = function (e) {
            e.preventDefault()
          };
        });
      }
    }
  }
</script>

<style scoped>
  #hy-swiper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .swiper {
    display: flex;
    width: 100%;
    height: 100%;
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
    width: 1.7rem;
    height: 3px;
    line-height: 3px;
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
    top: 15%;
    width: 5%;
    height: 100%;
    cursor: pointer;
  }

  .previous {
    left: -41%;
  }

  .next {
    right: -39%;
  }

  .icon {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
    width: 4rem;
    height: 85%;
  }
</style>