<template>
  <div class="method">
    <div v-show="orderList[0] === playOrder" @click="change(orderList[1])">
      <img src="./icon/inOrder.svg" alt="">
    </div>
    <div v-show="orderList[1] === playOrder" @click="change(orderList[2])">
      <img src="./icon/loop.svg" alt="">
    </div>
    <div v-show="orderList[2] === playOrder" @click="change(orderList[3])">
      <img src="./icon/single.svg" alt="">
    </div>
    <div v-show="orderList[3] === playOrder" @click="change(orderList[0])">
      <img src="./icon/random.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "playMethod",
    data() {
      return {
        playOrder: this.$store.state.playOrder,
        orderList: [
          'inOrder',
          'loop',
          'single',
          'random'
        ]
      }
    },
    methods: {
      change(order) {
        this.$store.commit('changeOrder', order);
        this.playOrder = this.$store.state.playOrder;
      }
    },
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