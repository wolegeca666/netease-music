<template>
  <div @click="clickHandle"
       @mousedown="animation" style="perspective: 1000px;"><!--设置缩放定位-->
    <div :class="{'animate': animate, 'active': active}"
         class="item">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SongListItem",
    data() {
      return {
        animate: false,
        active: false
      }
    },
    methods: {
      clickHandle() {
        this.active = !this.active;
        this.$emit('itemClick');
      },

      animation() {
        this.animate = true;
        document.onmouseup = e => {
          this.animate = false;
          document.onmouseup = null
        }
      },

    }
  }
</script>

<style scoped>

  /*缩放动画*/

  @keyframes click {
    0% {
      transform: translate3d(0, 0, -40px);
    }
    25% {
      transform: translate3d(0, 0, -30px);
    }
    50% {
      transform: translate3d(0, 0, -20px);
    }
    75% {
      transform: translate3d(0, 0, -10px);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  .animate {
    transform: translate3d(0, 0, -40px);
  }

  .active {
    animation: click 200ms;
  }

</style>