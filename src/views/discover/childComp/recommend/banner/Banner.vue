 <template>
  <div id="banner" :class="{'show': !start}">
    <div class="item">
      <swiper v-if="load" :load="init" @scrollTo="current" @start="start = true">
        <template v-slot:swiper>
          <div class="img-items">
            <swiper-item :class="{
                        'center': currentIndex === banner.length - 1,
                        'other' : currentIndex !== banner.length - 1,
                        }">
              <a :href="banner[banner.length-1].url || ''">
                <img :src="banner[banner.length-1].imageUrl" alt="" @load="isload()">
              </a>
            </swiper-item>
            <swiper-item v-for="(item,index) in banner" :key="index"
                         :class="{
                        'center': index === currentIndex,
                        'other' : index !== currentIndex,
                        }">
              <a :href="item.url || ''">
                <img :src="item.imageUrl" alt="" @load="isload()">
              </a>
            </swiper-item>
            <swiper-item :class="{
                        'center': currentIndex === 0,
                        'other' : currentIndex !== 0,
                        }">
              <a :href="banner[0].url || ''">
                <img :src="banner[0].imageUrl" alt="" @load="isload()">
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
      Swiper,SwiperItem
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
          setTimeout(()=>{this.init = true},100)
        }
      },
      current(index) {
        this.currentIndex = index >= this.banner.length ? 0 : index <0 ? this.banner.length - 1 : index;
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

  .show{
    opacity: 0;
  }

  .item{
    width: 55%;
    height: 100%;
    margin: 0 auto ;
  }

  .img-items {
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
  }

  .other {
    z-index: 1;
    transition: all 200ms;
    width: 100%;
    height: 85%;
    transform: translate3d(0,0,0);
  }

  .center {
    z-index: 99;
    transition: all 500ms;
    width: 100%;
    height: 100%;
    transform: translate3d(0,0,0);
  }

</style>