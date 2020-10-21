<template>
  <div id="banner">
    <swiper v-if="load" :load="load">
      <template v-slot:swiper="item">
        <swiper-item v-for="item in banner">
          <a :href="item.url || 'javascript:;'">
            <img :src="item.imageUrl" alt="">
          </a>
        </swiper-item>
      </template>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from '../../../../../components/common/swiper'
  import {request} from "../../../../../api/request";

  export default {
    name: "Banner",
    components: {
      Swiper,SwiperItem
    },
    data() {
      return {
        banner: [],
        load: false
      }
    },
    created() {
      request('/banner').then(res => {
        // console.log(res);
        this.banner = res.banners;
        this.load = true
      })
    }
  }
</script>

<style scoped>

  #banner {
    width: 80%;
    margin: 0 auto 3rem;
  }
</style>