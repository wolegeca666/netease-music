<template>
  <div class="recommend" v-show="load">
    <banner></banner>
    <personalized  @listLoad="show"></personalized>
    <private></private>
    <new-song></new-song>
    <re-mv></re-mv>
    <re-dj></re-dj>
  </div>
</template>

<script>
  import {Banner,Personalized, Private, NewSong, ReMv,ReDj} from "./index"

  export default {
    name: "Recommend",
    data() {
      return {load: false}
    },
    components: {
      Banner,Personalized, Private, NewSong, ReMv,ReDj
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