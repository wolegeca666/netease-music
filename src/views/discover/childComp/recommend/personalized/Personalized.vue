<template>

  <div class="personalized">
    <a href="/discover/playlist">
      <nav-bar :msg="[{name: '推荐歌单'}]">
        <template v-slot:img>
          <img class="personalized-img" src="../../icon/tuijian.svg" alt="">
        </template>
      </nav-bar>
    </a>


    <main>
      <ul class="music-list">
        <li class="album" v-for="(item, index) in musicList" :key="index">

          <album :item="item" :length="30" :size="imgSize" @imgLoad="show(index)">
            <template v-slot:slot>
              <div class="cover"></div>
            </template>
            <template v-slot:icon>
              <svg t="1602600869883" class="icon" viewBox="0 0 1365 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="8018" width="1.3rem"
                   height="1.3rem">
                <path d="M279.722667 469.333333h9.443555c52.337778 0 94.833778 42.439111 94.833778 94.833778v322.332445c0 52.337778-42.439111 94.833778-94.833778 94.833777h-9.443555c-52.337778 0-94.833778-42.439111-94.833778-94.833777V564.167111c0-52.337778 42.439111-94.833778 94.833778-94.833778z m0 85.333334a9.500444 9.500444 0 0 0-9.500445 9.500444v322.332445c0 5.233778 4.266667 9.500444 9.500445 9.500444h9.443555a9.500444 9.500444 0 0 0 9.500445-9.500444V564.167111a9.500444 9.500444 0 0 0-9.500445-9.500444h-9.443555zM1019.278222 469.333333h9.443556c52.337778 0 94.833778 42.439111 94.833778 94.833778v322.332445c0 52.337778-42.439111 94.833778-94.833778 94.833777h-9.443556c-52.337778 0-94.833778-42.439111-94.833778-94.833777V564.167111c0-52.337778 42.439111-94.833778 94.833778-94.833778z m0 85.333334a9.500444 9.500444 0 0 0-9.500444 9.500444v322.332445c0 5.233778 4.266667 9.500444 9.500444 9.500444h9.443556a9.500444 9.500444 0 0 0 9.500444-9.500444V564.167111a9.500444 9.500444 0 0 0-9.500444-9.500444h-9.443556z"
                      fill="#ffffff" p-id="8019"></path>
                <path d="M256 455.111111C113.720889 455.111111 0 576.910222 0 725.333333s113.720889 270.222222 256 270.222223v-113.777778c-77.653333 0-142.222222-69.176889-142.222222-156.444445S178.346667 568.888889 256 568.888889V455.111111zM1080.888889 455.111111c142.279111 0 256 121.799111 256 270.222222S1223.168 995.555556 1080.888889 995.555556v-113.777778c77.653333 0 142.222222-69.176889 142.222222-156.444445S1158.542222 568.888889 1080.888889 568.888889V455.111111z"
                      fill="#ffffff" p-id="8020"></path>
                <path d="M284.444444 967.111111V485.262222C284.444444 279.950222 450.048 113.777778 654.222222 113.777778S1024 280.007111 1024 485.262222V967.111111a56.888889 56.888889 0 0 0 113.777778 0V485.262222C1137.777778 217.315556 921.315556 0 654.222222 0S170.666667 217.315556 170.666667 485.262222V967.111111a56.888889 56.888889 0 0 0 113.777777 0z"
                      fill="#ffffff" p-id="8021"></path>
              </svg>
            </template>
          </album>

        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  import NavBar from "../../../../../components/reusable/navbar/NavBar";
  import Album from "../../../../../components/common/album/Album";

  import {request} from "../../../../../api/request";

  export default {
    name: "personalized",
    data() {
      return {
        musicList: [],
        imgSize: {
          width: '17rem',
          height: '17rem'
        },
      }
    },
    components: {
      NavBar,Album
    },
    mounted() {
      request('/personalized').then(res => {
        // console.log(res.result);
        res.result ? res.result.splice(5, 5) : res.result = [];
        this.musicList = res.result
      }).catch(e => console.log(e))
    },
    methods: {
      show(num) {
        if ((num + 1) >= this.musicList.length) {
          this.$emit('listLoad')
        }
      }
    }
  }
</script>

<style scoped>
  .personalized {
    position: relative;
  }
  
  .personalized-img {
    opacity: 0.6;
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 0;
  }

  .music-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 1rem auto 5rem;
  }

/*  .cover {
    position: absolute;
    left: 0;
    z-index: 99;
    border-left: 4rem solid rgba(255, 255, 255, 0.5);
    border-top: 4rem solid rgba(255, 255, 255, 0.5);
    border-right: 3.5rem solid transparent;
    border-bottom: 3.5rem solid transparent;
  }*/

</style>