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
          <p class="simple" v-show="newComment.total">{{'（'+
            newComment.total + '）'}}</p>
        </div>
        <content-list :list="newComment.comments" :type="type"></content-list>
      </div>
    </div>
    <div class="no-comment" v-show="newComment.total === 0">还没有评论，赶紧抢沙发~
    </div>
  </div>

</template>

<script>
  import {request} from "../../../api/request";
  import {mapState} from "vuex";
  import Loading from "../../common/loading/Loading";
  import ContentList from "./content/ContentList";

  export default {
    name: "Comment",
    components: {ContentList, Loading},
    props: {
      id: [Number, String],
      type: {
        type: Number,
        default: 0
      },
      active: Boolean
    },
    data() {
      return {
        typeList: [
            'music',
            'mv',
            'playlist',
            'album',
            'dj',
            'video'
        ],
        playId: 0,
        result: {},
        newComment: {},
        current: 0
      }
    },
    methods: {
      getComment() {
        this.playId = this.id;
        this.result = {};
        this.newComment = {};
        this.getCommentHot();
        this.getCommentNew();
      },
      getCommentHot() {
        request('/comment/new?type=' + this.type + '&id=' + this.id + '&sortType=2&pageSize=10').then(res => {
          // console.log(res);
          this.result = res.data ?? {};
        }).catch(e => {
          window.requestAnimationFrame(this.getCommentHot);
          console.log(e);
        })
      },
      getCommentNew() {
        request('/comment/'+this.typeList[this.type]+'?limit=10&id=' + this.id).then(res => {
          console.log(res);
          this.newComment = res ?? {};
        }).catch(e => {
          window.requestAnimationFrame(this.getCommentNew);
          console.log(e);
        })
      },

      updateComment() {
        request('/comment/'+this.typeList[this.type]+'?limit=10&id=' + this.id).then(res => {
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
        playSong: state => state.song,
        playtime: state => state.songState.playtime
      }),
      show() {
        return this.result.totalCount || this.newComment.total
      }
    },
    watch: {
      id: {
        handler() {
          if (this.active) {
            this.getComment();
          }
        },
        immediate: true
      },
      active() {
        if (this.playId !== this.id) {
          this.getComment();
        }
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