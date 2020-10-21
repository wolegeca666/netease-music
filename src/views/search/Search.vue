<template>
  <div class="search">
    <input v-model="input" type="text" @keydown.enter="search()" @input="getsug">{{suggest}}
  </div>
</template>

<script>
  import {request} from "../../api/request";

  export default {
    name: "Search",
    data() {
      return {
        input: '',
        suggest: ''
      }
    },
    methods: {
      getsug() {
        request('')
      },

      search() {

        request('/cloudsearch?keywords=' + this.input).then(res => {
          console.log(res);
        }).catch(e => console.log(e));
        request('/search/multimatch?keywords=' + this.input).then(res => {
          console.log(res);
        }).catch(e => console.log(e))
      }


    }
  }
</script>

<style scoped>

</style>