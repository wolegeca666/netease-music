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
    }
  }
</script>

<style scoped>

  .nav-bar-item {
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