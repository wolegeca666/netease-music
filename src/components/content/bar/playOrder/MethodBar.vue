<template>
  <div class="method">
    <div style="margin-left: 2rem;">
      <div v-show="orderList[0] === playOrder" @click="change(orderList[1])">
        <img src="../../../../assets/imgs/icon/playorder/inOrder.svg" alt="">
      </div>
      <div v-show="orderList[1] === playOrder" @click="change(orderList[2])">
        <img src="../../../../assets/imgs/icon/playorder/loop.svg" alt="">
      </div>
      <div v-show="orderList[2] === playOrder" @click="change(orderList[3])">
        <img src="../../../../assets/imgs/icon/playorder/single.svg" alt="">
      </div>
      <div v-show="orderList[3] === playOrder" @click="change(orderList[0])">
        <img src="../../../../assets/imgs/icon/playorder/random.svg" alt="">
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
      playOrder() { return this.$store.state.songState.playOrder }
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