<template>
  <div :class="{'show': show, 'un-show': !show}">
    <scale>
      <div @click="loginTo" class="login" v-show="!login">
        <img :src="picUrl" alt="">
        <div class="msg" v-show="show">未登录</div>
      </div>
      <div @click="logout()" class="login" v-show="login">
        <img :src="picUrl" alt="" v-if="picUrl">
        <div class="msg" v-show="show">{{profile.nickname}}</div>
      </div>
    </scale>

    <scale>
      <div @click="loginView()" class="icon">
        <img alt="" src="../../assets/imgs/icon/aside/msg.svg">
      </div>
    </scale>
    <LoginView :show="view" @close="view = false" @login="loginTo"></LoginView>
  </div>
</template>

<script>
  import Scale from "../common/Scale";
  import {request} from "../../api/request";
  import LoginView from "./LoginView";

  export default {
    name: "login",
    components: {
      LoginView,
      Scale
    },
    props: {
      show: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        view: false,
        value: 'true',
        profile: {},
        phone: '15827027152',
        password: '12357771237wg'
      }
    },
    mounted() {
      if (localStorage.getItem('login') === this.value) {
        this.loginState();
      } else {
        this.$store.commit('logout');
      }
    },
    methods: {
      loginState() {
        request('/login/status').then(res => {
          if (res) {
            this.profile = res.profile;
            this.$store.commit('login', this.profile.userId);
            this.getLikeList();
            this.refresh();
          } else {
            this.$store.commit('logout');
            this.refresh();
          }
        }).catch(e => {
          console.log(e);
        });
      },

      logout() {
        request('/logout').then(res => {
          this.profile = {};
          this.$store.commit('logout');
          this.$store.commit('liked', []);
          this.refresh();
          this.$router.push('/')
        }).catch(e => {
          console.log(e);
        });
      },

      loginTo() {
        request('/login/cellphone?phone=' + this.phone + '&password=' + this.password).then(res => {
          // console.log(res);
          if (res.code === 502) {
            alert(res.msg)
          } else {
            this.profile = res.profile;
            this.$store.commit('login', this.profile.userId);
            this.getLikeList();
            this.refresh();
          }
        }).catch(e => {
          console.log(e);
        });
      },

      getLikeList() {
        request('/likelist?uid=' + this.profile.userId).then(res => {
          // console.log(res.ids);
          if (res.code === 200) {
            this.$store.commit('liked', res.ids);
          }
        }).catch(e => {
          console.log(e);
        });
      },

      refresh() {
        request('/login/refresh').then(res => {
        }).catch(e => {
          console.log(e);
        });
      },

      loginView() {
        this.view = !this.login
      }
    },
    computed: {
      picUrl() {
        return this.profile.avatarUrl || 'https://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg'
      },
      login() {
        return this.$store.state.login
      }
    }
  }
</script>

<style scoped>
  .un-show,
  .show {
    display: flex;
    align-items: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  .un-show {
    overflow: hidden;
    flex-direction: column;
    justify-content: space-evenly;
    width: 4rem;
    height: 9rem;
  }

  .show {
    justify-content: space-around;
    width: 18rem;
    height: 6rem;
  }

  .login {
    display: flex;
    align-items: center;
  }

  .msg {
    margin-left: 1rem;
    width: 5rem;
    font-size: 1.2rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .login img {
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
  }

  .icon img {
    width: 2rem;
    height: 2rem;
  }
</style>