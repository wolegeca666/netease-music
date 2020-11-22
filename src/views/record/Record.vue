<template>
  <div>
    播放记录
  </div>
</template>

<script>
  import {request} from "../../api/request";

  export default {
    name: "Record",
    activated() {
      this.getRecord();
    },
    methods: {
      getRecord() {
        if (this.uid) {
          request('/user/record?uid=' + this.uid + '&type=1').then(res => {
            if (res) {
              console.log(res);
            }
          }).catch(e => {
            console.log(e);
          });
        }
      }
    },
    computed: {
      uid() {
        return this.$store.state.uid
      }
    },
    watch: {
      uid() {
        this.getRecord();
      }
    }
  }
</script>

<style scoped>

</style>