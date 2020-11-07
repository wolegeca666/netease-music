 <template>
  <div id="banner">
    <swiper v-if="load" :load="init">
      <template v-slot:swiper="item">
        <swiper-item v-for="(item,index) in banner" :key="index">
          <a :href="item.url || '#'">
            <img :src="item.imageUrl" alt="" @load="isload()">
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
        load: false,
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
          // console.log(this.loadIndex)
          this.init = true;
        }
      }
    }
  }
</script>

<style scoped>

  #banner {
    width: 80%;
    margin: -1rem auto 3rem;
  }
</style>