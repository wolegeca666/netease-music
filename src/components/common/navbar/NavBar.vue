<template>
  <div class="nav">
    <slot name="img"></slot>
    <div class="container">
      <div class="row-nav">
        <v-title :class="{'active': activeTitle === item.name}" :key="index" :title="item"
                 @titleClick="clickHandle"
                 @titleObj="emitClick" class="nav-title"
                 v-for="(item, index) in msg">
        </v-title>
      </div>
    </div>
    <div class="hr"></div>
    <div @click="$router.push(msg[0].path)" class="left-icon" v-if="leftIcon">更多
      <svg class="icon" height="128" p-id="2854" t="1602584063987"
           version="1.1" viewBox="0 0 1024 1024" width="128"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M319.76625 953.76486l466.528258-462.433833a78.50273 78.50273 0 0 0 0-27.243676L319.76625 1.574779c-3.621992-1.574779-13.779316-1.574779-27.479893 0L237.48405 55.983391c-1.574779 14.17301-1.574779 24.409073 0 27.243676l384.167321 380.860284a24.251596 24.251596 0 0 1 0 27.243676L237.48405 872.191311c-1.574779 2.677124-1.653518 12.913187 0 27.164937l54.881046 54.408612c13.621838 1.574779 23.857901 1.574779 27.479892 0z"
              fill="#bfbfbf" p-id="2855"></path>
      </svg>
    </div>
  </div>
</template>

<script>
  import vTitle from "../title/Title";

  export default {
    name: "NavBar",
    props: {
      msg: {
        type: Array,
        default() {
          return [
            {name: '标题1'}, {name: '标题2'}, {name: '标题3'}
          ]
        }
      },
      activeTitle: {
        type: String
      },
      leftIcon: {
        type: Boolean,
        default: true
      }
    },
    components: {
      vTitle
    },
    methods: {
      clickHandle(title) {
        // console.log(title);
        this.$emit('titleClick', title)
      },
      emitClick(title) {
        // console.log(title);
        this.$emit('typeClick', title)
      }
    }
  }
</script>

<style scoped>
  .nav {
    width: 100%;
    position: relative;
    display: flex;
    background-color: #fff;
    margin-bottom: 2rem;
  }

  .row-nav {
    display: flex;
  }

  .nav-title {
    line-height: 2rem;
    font-size: 16px;
    color: #000;
    margin: 0 0.5rem;
    padding: 0 0.5rem 1rem;
  }

  .active {
    z-index: 99;
    color: var(--color-background);
    border-bottom: 3px solid var(--color-background);
  }

  .hr {
    position: absolute;
    top: 3rem;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  }

  .left-icon {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0.7rem;
    right: 0;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.3);
  }

  .left-icon .icon {
    margin-left: 5px;
    width: 1rem;
    height: 1rem;
  }
</style>