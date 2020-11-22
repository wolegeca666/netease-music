<template>
  <div class="content-list">
    <ul>
      <li :key="index" v-for="(item, index) in list || []">
        <div class="hr"></div>
        <div class="msg">
          <div class="creator-img">
            <img :src="item.user.avatarUrl" @error="err(index)" alt="">
            <div class="details" v-if="item.user.avatarDetail">
              <img :src="item.user.avatarDetail.identityIconUrl" alt="">
            </div>
          </div>
          <div class="content-item">
            <content-item :item="item"></content-item>
          </div>
        </div>
      </li>
    </ul>
    <div class="hr"></div>
  </div>
</template>

<script>

  import ContentItem from "./ContentItem";

  export default {
    name: "ContentList",
    components: {ContentItem},
    props: {
      list: {
        type: Array
      }
    },
    methods: {
      err(index) {
        this.list[index].user.avatarUrl = 'https://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg'
      }
    }
  }
</script>

<style scoped>

  .hr {
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .msg {
    display: flex;
    margin-bottom: 1rem;
  }

  .creator-img {
    position: relative;
    width: 3.5rem;
    height: 3.5rem;
    margin: 0 1rem;
  }

  .creator-img img {
    border-radius: 3.5rem;
    width: 3.5rem;
    height: 3.5rem;
  }

  .details {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    bottom: 0;
    right: 0;
  }

  .details img {
    border-radius: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
  }

  .content-item {
    flex: 1;
  }

</style>