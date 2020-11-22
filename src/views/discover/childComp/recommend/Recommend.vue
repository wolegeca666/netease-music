<template>
  <div class="recommend" v-show="load">
    <banner></banner>
    <fm-bar></fm-bar>
    <personalized @listLoad="show"></personalized>
    <private></private>
    <new-song></new-song>
    <re-mv></re-mv>
    <re-dj></re-dj>
  </div>
</template>

<script>
  const Banner = () => import('./banner/Banner');
  const FmBar = () => import('./routerto/FmBar');
  const Personalized = () => import('./personalized/Personalized');
  const Private = () => import('./private/Private');
  import NewSong from './newsong/NewSong';

  const ReMv = () => import('./mv/ReMv');
  const ReDj = () => import('./radio/ReDj');

  export default {
    name: "Recommend",
    data() {
      return {load: false}
    },
    components: {
      Banner, FmBar, Personalized, Private, NewSong, ReMv, ReDj
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