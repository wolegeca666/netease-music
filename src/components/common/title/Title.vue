<template>
  <div class="title" @click="clickHandle">
    <p>{{title.name}}</p>
  </div>
</template>

<script>
  export default {
    name: "Title",
    props: {
      title: {
        type: Object,
        default() {
          return {
            name: '标题'
          }
        }
      },
    },
    methods: {
      clickHandle() {
        // console.log(this.title);
        this.$emit('titleClick', this.title.name);
        if (this.title.path && this.title.path !== this.$route.path) {
          this.$router.push(this.title.path)
        }
        this.$emit('titleObj', this.title);
      }
    },
    mounted() {
      if (this.title.path && this.$route.path === this.title.path) {
        this.$emit('titleClick', this.title.name);
      }
    },
    watch:{
      $route() {
        if (this.title.path && this.$route.path === this.title.path) {
          // console.log(this.$route.path);
          this.$emit('titleClick', this.title.name);
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