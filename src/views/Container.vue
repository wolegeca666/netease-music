<template>
  <div class="container">
    <div id="view">
      <keep-alive>
        <router-view/>
      </keep-alive>
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

</style>
