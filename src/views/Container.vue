<template>
  <div class="container">
    <div id="view">
      <transition name="center">
        <keep-alive><router-view/></keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Container",
  }
</script>

<style lang="less">

  .container {
    width: 100%;
  }

  #view {
    width: 100%;
  }

  .center-enter{
    opacity: 0;
  }
  .center-enter-to{
    opacity: 1;
  }
  .center-enter-active{
    transition: 0.3s;
  }

</style>
