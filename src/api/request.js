import axios from 'axios'

export function request(config) {
  // 两种方法基本相同
  const instance = axios.create({
    baseURL: '/api/',
    method: "get",
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    withCredentials: true,
    timeout: 10000
  });

  // instance.defaults.headers.content['Authorization'] = ""; // 添加token
  // instance.defaults.headers.post['content-Type'] = 'application/x-www-form-urlencoded';

  // axios的拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config // 拦截后放行请求的信息
  }, error => {
    console.log(error);
  });
  // 响应拦截
  instance.interceptors.response.use(config => {
    // console.log(config);
    return config.data // 拦截后放行请求的信息
  }, error => {
    console.log(error);
  });

  // 发送网络请求
  // function api(params) {
  //   return instance({params: params})
  // }

  return instance(config)

}