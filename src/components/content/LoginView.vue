<template>
  <div class="login-view" v-show="show">
    <div class="login">
      <div @click="$emit('close')" class="close">
        <img alt="" src="../../assets/imgs/icon/close/close.svg">
      </div>
      <div class="bgc">
        <img :src="picUrl" alt="">
      </div>
      <div class="profile">
        <div @click="login" class="phone">手机号登录</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginView",
    props: {
      show: Boolean
    },
    data() {
      return {
        top1: 0,
        picUrl: 'http://p3.music.126.net/VKsQu4n0zJF9sG508S9gQQ==/3429376768246424.jpg'
      }
    },
    methods: {
      login() {
        this.$emit('login');
        this.$emit('close');
      }
    },
    watch: {
      show() {
        let bodyEl = document.body;
        if (this.show) {
          this.top1 = window.scrollY;
          bodyEl.style.position = 'fixed';
          bodyEl.style.top = -this.top1 + 'px'
        } else {
          bodyEl.style.position = '';
          bodyEl.style.top = '';
          window.scrollTo(0, this.top1) // 回到原先的top
        }
      }

    }
  }
</script>

<style scoped>
  .login-view {
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .login {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    width: 30rem;
    height: 40rem;
    background-color: #f8f8f8;
    border-radius: 1rem;
    box-shadow: 0 0 6px #999;
  }

  .close {
    z-index: 99;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    opacity: 0.6;
  }

  .close img {
    width: 2rem;
    height: 2rem;
  }

  .close:hover {
    opacity: 1;
  }

  .bgc {
    z-index: 0;
    position: absolute;
    top: 0;
    left: -20%;
    width: 140%;
    opacity: 0.5;
  }

  .bgc img {
    width: 100%;
    filter: grayscale(0.5);
  }

  .profile {
    z-index: 99;
    position: absolute;
    top: 40%;
    width: 80%;
    color: rgba(216, 30, 6, 0.8);
    line-height: 4rem;
    font-size: 1.4rem;
    text-align: center;
  }

  .phone {
    font-weight: 600;
    border: 1px solid var(--color-background);
    border-radius: 5rem;
  }

  .phone:hover {
    background-color: rgba(216, 30, 6, 0.2);
  }
</style>