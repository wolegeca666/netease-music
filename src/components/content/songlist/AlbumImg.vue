<template>
  <div class="album-img">
    <slot name="img"></slot>
    <div class="play">
      <play></play>
    </div>
  </div>
</template>

<script>
  import Play from "../../common/Play";
  export default {
    name: "AlbumImg",
    components: {Play}
  }
</script>

<style scoped>
  .album-img {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .play {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.5rem;
    height: 2.5rem;
    transform: translate(-50%, -50%);
    border-radius: 2.5rem;
    background-color: #333;
    opacity: 0.6;
  }
</style>