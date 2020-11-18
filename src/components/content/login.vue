<template>
  <div :class="{'show': show, 'un-show': !show}">
    <scale>
      <template v-slot:item>
        <div class="login" v-show="!login" @click="loginTo()">
          <img :src="picUrl" alt="">
          <div class="msg" v-show="show">未登录</div>
        </div>
        <div class="login" v-show="login">
          <img v-if="picUrl" :src="picUrl" alt="">
          <div class="msg" v-show="show">{{profile.nickname}}</div>
        </div>
      </template>
    </scale>

    <scale>
      <template v-slot:item>
        <div class="icon">
          <img src="../../assets/imgs/icon/aside/msg.svg" alt="">
        </div>
      </template>
    </scale>
  </div>
</template>

<script>
  import Scale from "../common/Scale";
  import {request} from "../../api/request";

  export default {
    name: "login",
    components: {
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
        login: false,
        profile: {},
        phone: '15827027152',
        password: '12357771237wg'
      }
    },
    mounted() {
      // this.loginTo();
    },
    methods: {
      loginTo() {
        request('/login/cellphone?phone='+ this.phone +'&password=' + this.password).then(res => {
          console.log(res);
          if (res.code === 502) {
            alert(res.msg)
          } else {
            this.login = true;
            this.profile = res.profile;
          }
        }).catch(e => {
          console.log(e);
        });
      }
    },
    computed: {
      picUrl() {
        return this.profile.avatarUrl || 'https://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg'
      }
    }
  }
</script>

<style scoped>
  .un-show {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 3.8rem;
    height: 9rem;
  }

  .show {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 17.8rem;
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