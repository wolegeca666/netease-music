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
  import Banner from "./banner/Banner";
  import FmBar from "./routerto/FmBar";
  import Personalized from "./personalized/Personalized";
  import Private from "./private/Private";
  import NewSong from "./newsong/NewSong";
  import ReMv from "./mv/ReMv";
  import ReDj from "./radio/ReDj";

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