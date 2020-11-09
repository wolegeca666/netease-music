<template>
  <div style="perspective: 1000px;"
       @mousedown="animation" @click="clickHandle"><!--设置缩放定位-->
    <div class="item"
         :class="{'animate': animate, 'active': active}">
      <slot name="item"></slot>
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
      transform: translateZ(-40px);
    }
    25% {
      transform: translateZ(-30px);
    }
    50% {
      transform: translateZ(-20px);
    }
    75% {
      transform: translateZ(-10px);
    }
    100% {
      transform: translateZ(0);
    }
  }

  .animate {
    transform: translateZ(-40px);
  }

  .active {
    animation: click 200ms;
  }

</style>