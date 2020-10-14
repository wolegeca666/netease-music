<template>
  <div class="nav-bar" :class="{'active': active, 'off': !active}" @click="active=!active">
    <div class="icon">
      <img src="./icon/discover.svg" alt="">
    </div>
    <span>发现音乐</span>
  </div>
</template>

<script>
  export default {
    name: "nav-bar",
    data() {
      return {
        active: true
      }
    }
  }
</script>

<style scoped>

  .nav-bar {
    display: flex;
    padding-left: 3px;
    align-items: center;
  }

  .icon {
    padding: 1rem;
  }

  .icon img {
    width: 2rem;
    height: 2rem;
  }


  .off:hover {
    background-color: var(--color-hover);
  }

  .active {
    padding: 0;
    border-left: 3px solid var(--color-background);
    background-color: var(--color-active);
  }
</style>