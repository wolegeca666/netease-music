<template>
  <div class="title" @click="clickHandle">
    <p>{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: "Title",
    props: {
      title: {
        type: String,
        default: '标题'
      }
    },
    methods: {
      clickHandle() {
        // console.log(this.title);
        this.$emit('titleClick', this.title)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: inline;
    height: 100%;
    color: rgba(0,0,0,0.5);
  }
</style>