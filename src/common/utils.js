export default {
  getTime(time) {
    let h = 0;
    let m = Math.floor(time / 60);
    let s = parseInt(time % 60);
    if(m > 60) {
      let h = Math.floor(m / 60);
      m = parseInt(m % 60);
    }
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    if (h) {
      return h + ':' + m  + ':' + s
    }else {
      return m + ':' + s
    }
  }
}