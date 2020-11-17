import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/discover/Discover.vue';
// 首页推荐
import Recommend from "../views/discover/childComp/recommend/Recommend";
  // 推荐歌单
  const DPlayList = () => import('../views/discover/childComp/playlist/PlayList');
  // 排行榜
  const TopList = () => import('../views/discover/childComp/toplist/TopList');
  // 最新音乐
  const NewSong = () => import('../views/discover/childComp/newsong/NewSong');


// 视频
const Mv = () => import('../views/mv/Mv');

// 歌单
const PlayList = () => import('../views/playlist/PlayList');

// 专辑
const Album = () => import('../views/album/AlbumList');

// 搜索
const Search = () => import('../views/search/Search');
const SearchResult = () => import('../views/search/SearchResult');

// 登录
const Login = () => import('../views/login/Login');

// 404
const NotFound = () => import('../views/notfound/NotFound');



const routes = [{
  path: '/discover',
  alias: '/',
  name: 'Home',
  component: Home,
  children: [{
      path: '/discover',
      name: 'Recommend',
      meta: {index: 0},
      component: Recommend
    },
    {
      path: '/discover/playlist',
      name: 'DPlayList',
      meta: {index: 1},
      component: DPlayList
    },
    {
      path: '/discover/toplist',
      name: 'TopList',
      meta: {index: 3},
      component: TopList
    },
    {
      path: '/discover/newsong',
      name: 'NewSong',
      meta: {index: 5},
      component: NewSong
    },
  ]
},
  {
    path: '/search',
    name: 'Search',
    component: Search,
    children: [{
      path: '/search/multimatch',
      name: 'SearchResult',
      component: SearchResult
    }]
  },
  {
    path: '/mv',
    name: 'Mv',
    component: Mv
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: PlayList,
  },
  {
    path: '/album',
    name: 'Album',
    component: Album,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];


Vue.use(VueRouter);
//push
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
};

//replace
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
