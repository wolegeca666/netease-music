export default {
  getTime(time) {
    let t = Math.abs(time);
    let h = 0;
    let m = Math.floor(t / 60);
    let s = parseInt(t % 60);
    if (m > 60) {
      h = Math.floor(m / 60);
      m = parseInt(m % 60);
    }
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    if (h) {
      return h + ':' + m + ':' + s
    } else {
      return m + ':' + s
    }
  }
}