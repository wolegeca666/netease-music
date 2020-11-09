<template>
  <div class="simi-songs">
    <div class="load" v-show="!list.length">
      <loading :show="!list.length"></loading>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <scale>
          <template v-slot:item>
            <div class="song" @dblclick="musicPlay(item)">
              <div class="msg">
                <p class="name">{{item.name}}</p>
                <p class="alia" v-if="(item.alias.length || 0)!==0">{{ ' (' + item.alias[0] + ')' }}</p>
                <div class="play-bar">
                </div>
              </div>
              <div class="author">{{ authorHandle(item) }}</div>
            </div>
          </template>
        </scale>
      </li>
    </ul>
  </div>
</template>

<script>
  import Scale from "../../../../common/Scale";
  import {mapState} from "vuex";
  import Loading from "../../../../common/loading/Loading";

  export default {
    name: "SimiSong",
    components: {
      Loading,
      Scale
    },
    props: {
      list: {
        type: Array
      }
    },
    methods: {
      musicPlay(item) {
        console.log(item);
        this.$store.commit('changePlaySong', {
          id: item.id,
          name: item.name
        });
      },

      authorHandle(obj) {
        let arr = [];
        let authors = obj.artists;
        authors.forEach(function (item) {
          arr.push(item.name)
        });
        return arr.join(' / ');
      },
    },
    computed: {
      ...mapState({
        playLists: state => state.playList,
        index: state => state.playSongIndex
      }),
    },
  }
</script>

<style scoped>

  .simi-songs {
    padding-top: 1rem;
  }

  .song {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .msg {
    width: 70%;
    display: flex;
  }

  .name {
    min-width: 100%;
  }

  .name,
  .alia {
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .alia {
    color: var(--color-text);
  }

  .author {
    width: 25%;
    text-align: end;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 13px;
    color: var(--color-text);
  }

  .load {
    height: 20rem;
  }
</style>