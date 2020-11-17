<template>
  <div class="recommend" v-show="load">
    <banner></banner>
    <fm-bar></fm-bar>
    <personalized  @listLoad="show"></personalized>
    <private></private>
    <new-song></new-song>
    <re-mv></re-mv>
    <re-dj></re-dj>
  </div>
</template>

<script>
  import {Banner,Personalized, Private, NewSong, ReMv, ReDj, FmBar} from "./index"
  export default {
    name: "Recommend",
    data() {
      return {load: false}
    },
    components: {
      FmBar,
      Banner,Personalized, Private, NewSong, ReMv,ReDj
    },
    activated() {
      document.documentElement.scrollTop = 0;
    },
    methods: {
      show() {
        this.load = true;
      }
    }
  }
</script>

<style scoped>

</style>