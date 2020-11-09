<template>
  <div class="content-list">
    <ul>
      <li v-for="(item, index) in list || []" :key="index">
        <div class="hr"></div>
        <div class="content-msg">
          <div class="head-img">
            <img :src="item.user.avatarUrl" alt="">
            <div class="details" v-if="item.user.avatarDetail">
              <img :src="item.user.avatarDetail.identityIconUrl" alt="">
            </div>
          </div>
          <p class="content">
            <span class="name">{{item.user.nickname}}：</span>
            <span>{{item.content}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ContentList",
    props: {
      list: {
        type: Array
      }
    }
  }
</script>

<style scoped>

  .hr {
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .content-msg {
    display: flex;
    margin-bottom: 1rem;
  }

  .head-img {
    position: relative;
    width: 4rem;
    height: 4rem;
    margin: 0 1rem;
  }

  .head-img img{
    border-radius: 4rem;
    width: 4rem;
    height: 4rem;
  }

  .details {
    position: absolute;
    bottom: 0rem;
    right: 0;
  }

  .details img {
    border-radius: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
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
</style>