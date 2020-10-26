<template>
  <div class="right">
    <like></like>
    <method-bar></method-bar>
    <voice-bar></voice-bar>
    <play-list @list="click"></play-list>
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
    },
    methods: {
      click() {
        this.$emit('list')
      }
    }
  }
</script>

<style scoped>
  .right {
    z-index: 999;
    position: relative;
    background-color: #fff;
    width: 25rem;
    padding-right: 2rem;
    display: flex;
    align-items: center;
  }
</style>