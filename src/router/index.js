import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/discover/Discover.vue';
import Recommend from "../views/discover/childComp/recommend/Recommend";

const DPlayList = () => import('../views/discover/childComp/playlist/PlayList');

const Mv = () => import('../views/mv/Mv');
const PlayList = () => import('../views/playlist/PlayList');
const NotFound = () => import('../views/notfound/NotFound');
const Login = () => import('../views/login/Login');

const Search = () => import('../views/search/Search');
const SearchResult = () => import('../views/search/SearchResult')

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

const routes = [{
  path: '/discover',
  alias: '/',
  name: 'Home',
  component: Home,
  children: [{
    path: '/discover',
    name: 'Recommend',
    component: Recommend
  },
    {
      path: '/discover/playlist',
      name: 'DPlayList',
      component: DPlayList
    }
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
    component: PlayList
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
