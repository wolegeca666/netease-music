<template>
    <div class="nav-bar-item" :class="{'active': active, 'off': !active}" @click="toActive">
      <div class="icon">
        <slot name="img"></slot>
      </div>
      <span>{{title}}</span>
    </div>
</template>

<script>
  export default {
    name: "nav-bar",
    props: {
      index: {
        type: Number,
        default: 0
      },
      currentIndex: {
        type: Number,
        default: 0
      },
      title: {
        type: String,
        default: "标题"
      },
      path: {
        type: String,
        default: '/'
      }
    },
    methods: {
      toActive() {
        this.$emit('active', this.index);
        if (this.$route.path !== this.path) {
          this.$router.push(this.path)
        }
      }
    },
    computed: {
      active() {
        return this.index === this.currentIndex
      }
    },
  }
</script>

<style scoped>

  .nav-bar-item {
    display: flex;
    align-items: center;
    padding: 5px 0 5px 3px;
  }

  .icon {
    padding: 1rem 1rem 0.6rem;
  }

  .icon img {
    width: 1.6rem;
    height: 1.6rem;
  }

  .off:hover {
    background-color: var(--color-hover);
  }

  .active {
    padding: 5px 0;
    border-left: 3px solid var(--color-background);
    background-color: var(--color-active);
  }
</style>