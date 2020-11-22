<template>
  <div class="comment-list">
    <div class="title">
      <p>评论</p>
      <p class="simple" v-show="result.totalCount">{{'（'+ result.totalCount +
        '）'}}</p>
    </div>
    <div class="hr"></div>
    <div class="load" v-show="!show">
      <loading :show="!show"></loading>
    </div>
    <div class="comment-content" v-show="show && result.totalCount > 0">
      <div class="comment-hot" v-show="result.totalCount >= 20">
        <div class="title">
          <p class="deep">精彩评论</p>
        </div>
        <content-list :list="result.comments"></content-list>
      </div>
      <div class="comment-new">
        <div class="title">
          <p class="deep">最新评论</p>
          <p class="simple" v-show="newComment.totalCount">{{'（'+
            newComment.totalCount + '）'}}</p>
        </div>
        <content-list :list="newComment.comments"></content-list>
      </div>
    </div>
    <div class="no-comment" v-show="newComment.totalCount === 0">还没有评论，赶紧抢沙发~
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

      updateComment() {
        request('/comment/new?type=0&id=' + this.id + '&sortType=3&pageSize=10').then(res => {
          // console.log(res);
          this.newComment = res.data ?? {};
        }).catch(e => {
          this.getCommentHot();
          console.log(e);
        })
      }
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
        this.playId = this.id;
        this.result = {};
        this.newComment = {};
        this.getComment();
      }
    }
  }
</script>

<style scoped>

  .comment-list {
    font-size: 16px;
    margin-top: -1rem;
  }

  .title {
    display: flex;
    align-items: center;
    padding: 2rem 0 1rem;
  }

  .deep {
    font-weight: 600;
    opacity: 0.6;
  }

  .simple {
    font-size: 13px;
    color: var(--color-text);
  }

  .no-comment {
    height: 10rem;
    line-height: 10rem;
    text-align: center;
  }

  .load {
    height: 10rem;
  }

</style>