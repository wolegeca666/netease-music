<template>
  <div @click="liked" class="like">
    <div style="margin-left: 2rem;">
      <div v-show="like">
        <svg class="icon" height="128" p-id="3017"
             t="1602234819414"
             version="1.1" viewBox="0 0 1092 1024" width="128"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M987.493303 617.708175a1513.836941 1513.836941 0 0 1-136.283715 166.995538c-47.987223 51.186372-97.893936 101.093084-148.440477 147.160818-30.711823 27.512675-54.38552 48.627053-69.101602 60.143987a136.923544 136.923544 0 0 1-174.033664 0c-14.076252-12.156763-38.389779-32.631312-69.101601-60.783817-50.546542-46.067734-101.093084-95.334617-149.080308-147.160818a1535.591149 1535.591149 0 0 1-136.283714-165.715878A493.308657 493.308657 0 0 1 0.23616 344.500917 330.791927 330.791927 0 0 1 98.769925 96.247014a336.550393 336.550393 0 0 1 447.880752-20.474548 335.910564 335.910564 0 0 1 447.880752 20.474548 330.791927 330.791927 0 0 1 97.893936 246.974243 492.028997 492.028997 0 0 1-104.932062 274.486918z"
                fill="#d81e06" p-id="3018"></path>
        </svg>
      </div>
      <div v-show="!like">
        <svg class="icon" height="128" p-id="4157"
             t="1602234954894"
             version="1.1" viewBox="0 0 1169 1024" width="128"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M1066.666667 102.4c-136.533333-128-341.333333-136.533333-477.866667-8.533333-145.066667-128-349.866667-119.466667-486.4 8.533333-136.533333 136.533333-136.533333 349.866667 0 486.4l401.066667 401.066667c42.666667 42.666667 110.933333 42.666667 153.6 0l401.066666-401.066667c145.066667-128 145.066667-349.866667 8.533334-486.4z m-51.2 435.2L614.4 938.666667c-17.066667 17.066667-34.133333 17.066667-51.2 0L153.6 537.6C42.666667 435.2 42.666667 256 153.6 153.6 256 51.2 426.666667 51.2 537.6 145.066667l51.2 42.666666 51.2-42.666666C750.933333 42.666667 913.066667 51.2 1024 153.6c93.866667 110.933333 93.866667 281.6-8.533333 384z"
                fill="#bfbfbf" p-id="4158"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from "../../../api/request";
  import {mapState} from "vuex"

  export default {
    name: "Like",
    data() {
      return {}
    },
    methods: {
      liked() {
        if (!this.like) {
          request('/like?id=' + this.id + '&like=' + true).then(res => {
            // console.log(res);
            if (res.code === 200) {
              this.$store.commit('liked', [this.id]);
            }
          }).catch(e => {
            console.log(e);
          });
        } else {
          this.unlike();
        }
      },

      unlike() {
        request('/like?id=' + this.id + '&like=' + false).then(res => {
          // console.log(res);
          this.$store.commit('unlike', this.id);
        }).catch(e => {
          console.log(e);
        });
      }
    },
    computed: {
      ...mapState({
        uid: state => state.uid,
        id: state => state.song.id,
        likeList: state => state.likeList
      }),
      like: {
        get() {
          return this.likeList.includes(this.id)
        }
      }
    }
  }
</script>

<style scoped>
  .like {
    flex: 1;
  }


  .like .icon {
    width: 1.8rem;
    height: 1.8rem;
  }
</style>