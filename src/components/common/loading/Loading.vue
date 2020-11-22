<template>
  <div class="loading-container" v-show="show">
    <loading-item :show="show"></loading-item>
  </div>

</template>

<script>
  import LoadingItem from "./LoadingItem";

  export default {
    name: "Loading",
    components: {LoadingItem},
    props: {
      show: {
        type: Boolean,
        default: true
      }
    },
  }
</script>

<style scoped>
  .loading-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>