<template>
  <div class="content-msg">
    <p class="content">
      <span class="name">{{item.user.nickname}}：</span>
      <span>{{item.content}}</span>
    </p>
    <div class="count">
      <p>{{countDown(item.time)}}</p>
      <div class="handle">
        <scale>
          <div class="liked-count">
            <img src="../../../../../assets/imgs/icon/like/liked.svg" alt="">
            <p v-if="item.likedCount">{{'（' + item.likedCount + '）'}}</p>
          </div>
        </scale>
        <div class="split">|</div>
        <scale>
          <div class="reply">
            回复
          </div>
        </scale>
      </div>
    </div>
  </div>
</template>

<script>
  import Scale from "../../../../common/Scale";

  export default {
    name: "Content",
    components: {
      Scale
    },
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      countDown(time) {
        const Time = new Date(time);
        let y = Time.getFullYear();
        let m = Time.getMonth() + 1;
        let d = Time.getDate();
        m = m > 9 ? m : '0' + m;
        d = d > 9 ? d : '0' + d;

        return y + '-' + m + '-' + d
      },
    }
  }
</script>

<style scoped>

  .content-msg {
    width: 100%;
    padding-right: 2rem;
  }

  .name {
    color: rgb(0, 100, 175);
  }

  .content {
    line-height: 2.5rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 14px;
  }

  .count {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: var(--color-text);
    padding-top: 1rem;
  }

  .liked-count {
    display: flex;
    align-items: center;
  }

  .liked-count img {
    border-radius: 0;
    width: 1.3rem;
  }

  .handle {
    display: flex;
  }

  .split {
    padding: 0 1rem;
  }
</style>