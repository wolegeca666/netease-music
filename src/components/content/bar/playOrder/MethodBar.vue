<template>
  <div class="method">
    <div style="margin-left: 2rem;">
      <div @click="change(orderList[1])" v-show="orderList[0] === playOrder">
        <img alt="" src="../../../../assets/imgs/icon/playorder/inOrder.svg">
      </div>
      <div @click="change(orderList[2])" v-show="orderList[1] === playOrder">
        <img alt="" src="../../../../assets/imgs/icon/playorder/loop.svg">
      </div>
      <div @click="change(orderList[3])" v-show="orderList[2] === playOrder">
        <img alt="" src="../../../../assets/imgs/icon/playorder/single.svg">
      </div>
      <div @click="change(orderList[0])" v-show="orderList[3] === playOrder">
        <img alt="" src="../../../../assets/imgs/icon/playorder/random.svg">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "playMethod",
    data() {
      return {
        orderList: [
          'inOrder',
          'loop',
          'single',
          'random'
        ]
      }
    },
    mounted() {
      if (localStorage.getItem('playOrder')) {
        this.change(localStorage.getItem('playOrder'))
      }
    },
    methods: {
      change(order) {
        this.$store.commit('changeOrder', order);
      }
    },
    computed: {
      playOrder() {
        return this.$store.state.songState.playOrder
      }
    }
  }
</script>

<style scoped>
  .method {
    flex: 1;
  }

  img {
    width: 1.9rem;
    height: 1.9rem;
  }
</style>