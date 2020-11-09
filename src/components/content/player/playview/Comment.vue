<template>
  <div>
    <div class="title">
      <p class="deep">评论</p>
      <p class="simple" v-show="result.totalCount">{{'（'+ result.totalCount + '）'}}</p>
    </div>
    <div class="hr"></div>
    <div class="load" v-show="!show">
      <loading :show="!show"></loading>
    </div>
    <div class="comment-content" v-show="show">
      <div class="comment-hot">
        <div class="title">
          <p class="deep">精彩评论</p>
        </div>
        <content-list :list="result.comments"></content-list>
      </div>
      <div class="hr"></div>
      <div class="comment-new">
        <div class="title">
          <p class="deep">最新评论</p>
          <p class="simple" v-show="newComment.totalCount">{{'（'+ newComment.totalCount + '）'}}</p>
        </div>
        <content-list :list="newComment.comments"></content-list>
      </div>
    </div>
  </div>

</template>

<script>
  import {request} from "../../../../api/request";
  import {mapState} from "vuex";
  import Loading from "../../../common/loading/Loading";
  import ContentList from "./content/ContentList";

  export default {
    name: "Comment",
    components: {ContentList, Loading},
    data() {
      return {
        result: {},
        newComment: {},
        current: 0
      }
    },
    mounted() {
      this.getComment();
    },
    methods: {
      getComment() {
        this.getCommentHot();
        this.getCommentNew();
      },
      getCommentHot() {
        request('/comment/new?type=0&id=' + this.id + '&sortType=2&pageSize=10').then(res => {
          // console.log(res);
          this.result = res.data ?? {};
        }).catch(e => {
          this.getCommentHot();
          console.log(e);
        })
      },
      getCommentNew() {
        request('/comment/new?type=0&id=' + this.id + '&sortType=3&pageSize=10').then(res => {
          // console.log(res);
          this.newComment = res.data ?? {};
        }).catch(e => {
          this.getCommentHot();
          console.log(e);
        })
      },

    },
    computed: {
      ...mapState({
        id: state => state.song.id,
        playSong: state => state.song,
        playtime: state => state.songState.playtime
      }),
      show() {
        return this.result.comments && this.newComment.comments
      }
    },
    watch: {
      id() {
        this.result = {};
        this.newComment = {};
        this.getComment();
      }
    }
  }
</script>

<style scoped>

  .title {
    display: flex;
    align-items: center;
    padding: 1rem 0;
  }

  .deep {
    font-size: 16px;
  }

  .simple {
    font-size: 13px;
    color: var(--color-text);
  }

  .load {
    height: 10rem;
  }

</style>