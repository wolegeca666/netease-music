<template>
  <div class="right">
    <like></like>
    <method-bar></method-bar>
    <voice-bar></voice-bar>
    <play-list></play-list>
  </div>
</template>

<script>
  import Like from "../bar/LikeBar";
  import MethodBar from "../bar/playOrder/MethodBar";
  import VoiceBar from "../bar/VoiceBar";
  import PlayList from "../bar/PlayList";

  export default {
    name: "MusicHandle",
    components: {
      Like,MethodBar,VoiceBar,PlayList
    }
  }
</script>

<style scoped>
  .right {
    background-color: #fff;
    padding-left: 2rem;
    width: 25rem;
    display: flex;
    align-items: center;
  }
</style>