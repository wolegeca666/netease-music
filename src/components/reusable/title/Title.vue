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
      },
      path: {
        type: String
      }
    },
    methods: {
      clickHandle() {
        // console.log(this.title);
        this.$emit('titleClick', this.title);
        if (this.path && this.path !== this.$route.path) {
          this.$router.push(this.path)
        }
      }
    },
    mounted() {
      if (this.path && this.$route.path === this.path) {
        this.$emit('titleClick', this.title);
      }
    },
    watch:{
      $route() {
        if (this.path && this.$route.path === this.path) {
          // console.log(this.$route.path);
          this.$emit('titleClick', this.title);
        }
      }
    },
  }
</script>

<style scoped>
  .title {
    display: inline;
    height: 100%;
    color: rgba(0,0,0,0.5);
  }
</style>