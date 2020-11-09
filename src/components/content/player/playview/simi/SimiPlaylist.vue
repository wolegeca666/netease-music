<template>
  <div class="simi-playlist">
    <div class="load" v-show="!show">
      <loading :show="!show"></loading>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index"
          v-show="!(errIndex.includes(index))">
        <scale @itemClick="routerTo(item.id)">
          <template v-slot:item>
            <div class="playlist">
              <div class="albums">
                <img :src="item.coverImgUrl" alt="" @load="imgLoad"
                     @error="errorload(index)">
              </div>
              <div class="msg">
                <p class="name">{{item.name}}</p>
                <p class="count">
                  播放：{{item.playCount > 100000?
                  Math.floor(item.playCount/10000)+'万' : item.playCount}}
                </p>
              </div>
            </div>
          </template>
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

    margin-bottom: 5rem;
  }

  .load {
    width: 100%;
    height: 10rem;
    margin-bottom: 10rem;
  }

  .albums img {
    width: 5rem;
    height: 5rem;
    border-radius: 5px;
  }

  .playlist {
    display: flex;
    padding-top: 1rem;
  }

  .msg {
    width: 100%;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .count {
    font-size: 13px;
    color: var(--color-text);
  }
</style>