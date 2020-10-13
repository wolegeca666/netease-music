export default {
  getTime(time) {
    let t = Math.abs(time);
    let h = 0;
    let m = Math.floor(t / 60);
    let s = parseInt(t % 60);
    if (m > 60) {
      let h = Math.floor(m / 60);
      m = parseInt(m % 60);
    }
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    if (h) {
      return h + ':' + m + ':' + s
    } else {
      return m + ':' + s
    }
  },
  /**节流
   * @param fn 要被节流的函数
   * @param delay 规定的时间
   */

  throttled(fn, delay) {
    let lastTime = 0;

    return function () {
      let nowTime = Date.now();

      if (nowTime - lastTime > delay) {
        fn.call(this);
        lastTime = Date.now()
      }
    }
  },
  /*
    防抖函数
   */

  debounce(fn, delay) {
    let timer = null;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this)
      }, delay)
    };
  }
}