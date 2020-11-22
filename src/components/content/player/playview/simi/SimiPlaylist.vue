<template>
  <div class="simi-playlist">
    <div class="load" v-show="!show">
      <loading :show="!show"></loading>
    </div>
    <ul>
      <li :key="item.id" v-for="(item, index) in list"
          v-show="!(errIndex.includes(index))">
        <scale @itemClick="routerTo(item.id)">
          <div class="playlist">
            <div class="albums">
              <img :src="item.coverImgUrl" @error="errorload(index)" @load="imgLoad"
                   alt="">
            </div>
            <div class="msg">
              <p class="name">{{item.name}}</p>
              <p class="count">
                播放：{{item.playCount > 100000?
                Math.floor(item.playCount/10000)+'万' : item.playCount}}
              </p>
            </div>
          </div>
        </scale>
      </li>
    </ul>
  </div>
</template>

<script>
  import Scale from "../../../../common/Scale";
  import Loading from "../../../../common/loading/Loading";

  export default {
    name: "SimiPlaylist",
    components: {
      Loading,
      Scale
    },
    props: {
      list: {
        type: Array
      }
    },
    data() {
      return {
        current: 0,
        errIndex: []
      }
    },
    methods: {
      routerTo(id) {
        this.$emit('close');
        this.$router.push({name: 'PlayList', query: {id: id}})
      },
      imgLoad() {
        this.current++;
      },
      errorload(index) {
        this.errIndex.push(index);
      }
    },
    computed: {
      show() {
        if (this.list.length) {
          return this.current >= (this.list.length - this.errIndex.length)
        }
      }
    }
  }
</script>

<style scoped>
  .simi-playlist {
    width: 100%;
    padding-top: 0.5rem;
    margin-bottom: 5rem;
  }

  .load {
    width: 100%;
    height: 10rem;
    margin-bottom: 10rem;
  }

  .playlist {
    display: flex;
    align-items: center;
  }

  .playlist:hover {
    background-color: var(--color-active);
  }

  .albums {
    padding: 0.5rem;
  }

  .albums img {
    width: 5rem;
    height: 5rem;
    border-radius: 5px;
  }


  .msg {
    margin-left: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .name {
    line-height: 2.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .count {
    line-height: 2.5rem;
    font-size: 13px;
    color: var(--color-text);
  }
</style>