<template>
  <div class="content">
    <p class="content"><span>{{data.user.nickname}}：</span>{{data.content}}</p>
  </div>
</template>

<script>
  export default {
    name: "Content",
    props: {
      data: {
        type: Object
      }
    }
  }
</script>

<style scoped>

</style>