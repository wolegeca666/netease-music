<template>
  <div  id="banner">
    <div class="item">
      <swiper :load="init" @scrollTo="current" @start="start = true"
              v-if="load">
        <template v-slot:swiper>
          <div class="img-items">
            <swiper-item :class="{
                        'center': currentIndex === banner.length - 1,
                        'other' : currentIndex !== banner.length - 1,
                        }">
              <a :href="banner[banner.length-1].url || ''">
                <img :src="banner[banner.length-1].imageUrl" @load="isload()"
                     alt="">
              </a>
            </swiper-item>
            <swiper-item :class="{
                        'center': index === currentIndex,
                        'other' : index !== currentIndex,
                        }" :key="index"
                         v-for="(item,index) in banner">
              <a :href="item.url || ''">
                <img :src="item.imageUrl" @load="isload()" alt="">
              </a>
            </swiper-item>
            <swiper-item :class="{
                        'center': currentIndex === 0,
                        'other' : currentIndex !== 0,
                        }">
              <a :href="banner[0].url || ''">
                <img :src="banner[0].imageUrl" @load="isload()" alt="">
              </a>
            </swiper-item>
          </div>

        </template>
      </swiper>
    </div>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from '../../../../../components/common/swiper'
  import {request} from "../../../../../api/request";

  export default {
    name: "Banner",
    components: {
      Swiper, SwiperItem
    },
    data() {
      return {
        banner: [],
        currentIndex: 0,
        load: false,
        start: false,
        init: false,
        loadIndex: 0
      }
    },
    mounted() {
      request('/banner').then(res => {
        // console.log(res);
        this.banner = res.banners;
        this.load = true;
      })
    },
    methods: {
      isload() {
        this.loadIndex++;
        if (this.loadIndex === this.banner.length) {
          setTimeout(() => {
            this.init = true
          }, 100)
        }
      },
      current(index) {
        this.currentIndex = index >= this.banner.length ? 0 : index < 0 ? this.banner.length - 1 : index;
      }
    },
  }
</script>

<style scoped>

  #banner {
    width: 100%;
    height: 20rem;
    margin-bottom: 3rem;
    overflow: hidden;
  }

  .show {
    opacity: 0;
  }

  .item {
    width: 55%;
    height: 100%;
    margin: 0 auto;
  }

  .img-items {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .other,
  .center {
    background-color: #ccc;
    width: 100%;
    transform-origin: 100% 100%;
  }

  .other:hover,
  .center:hover {
    opacity: 0.8;
  }

  .other {
    transition: transform 200ms;
    transform: scale3d(1, 0.85, 1);
  }

  .center {
    transition: transform 500ms;
    transform: scale3d(1, 1, 1);
  }

</style>