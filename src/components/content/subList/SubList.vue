<template>
  <div class="list" v-show="show">
    <div class="container">
      <div class="title">{{title}}</div>
      <div class="close" @click="sub">
        <img src="../../../assets/imgs/icon/close/close.svg" alt="">
      </div>
      <ul>
        <li class="create">
        </li>
        <li class="item" v-for="item in userPlaylist" @click="subSong(item.id)">
          <sub-item :playlist="item"></sub-item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import SubItem from "./SubItem";
  import {request} from "../../../api/request";
  import {mapState} from "vuex";

  export default {
    name: "SubList",
    data() {
      return {
        title: '添加到歌单',
        top1: 0,
        show: false
      }
    },
    components: {
      SubItem
    },
    methods: {
      sub() {
        this.$store.commit('subListShow', 0);
      },

      subSong(id) {
        request('/playlist/tracks?op=add&pid='+id+'&tracks='+this.subId).then(res => {
          console.log(res);
        });
        this.sub();
      }
    },
    computed: {
      ...mapState({
        subId: state => state.subId,
        userPlaylist: state => state.userPlaylist
      })
    },
    watch: {
      subId() {
        console.log(this.userPlaylist);
        let bodyEl = document.body;
        if (this.subId === 0) {
          bodyEl.style.position = '';
          bodyEl.style.top = '';
          window.scrollTo(0, this.top1);// 回到原先的top
          this.show = false;
        } else {
          this.top1 = window.scrollY;
          bodyEl.style.position = 'fixed';
          bodyEl.style.top = -this.top1 + 'px';
          this.show = true;
        }
      }
    }
  }
</script>

<style scoped>
  .list {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255,255,255,0.5);
  }

  .container {
    position: relative;
    width: 40rem;
    min-width: 40rem;
    background-color: #fff;
    box-shadow: 0 0 6px #999;
  }

  .title {
    font-size: 16px;
    height: 5rem;
    line-height: 5rem;
    padding-left: 2rem;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1.5rem;
    background-color: #fff;
  }

  .close img {
    width: 2rem;
    height: 2rem;
  }

  ul {
    position: relative;
    overflow: scroll;
    width: 100%;
    height: 35rem;
  }

  li {
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }

  li:hover {
    background-color:var(--color-active);
  }
</style>