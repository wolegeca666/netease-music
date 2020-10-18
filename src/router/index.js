import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/discover/Discover.vue';
import Recommend from "../views/discover/childComp/recommend/Recommend";

const Search = () => import('../views/search/Search');
const Mv = () => import('../views/mv/Mv');
const PlayList = () => import('../views/playlist/PlayList');

const DPlayList = () => import('../views/discover/childComp/playlist/PlayList');


Vue.use(VueRouter);

const routes = [
  {
    path: '/discover',
    alias: '/',
    name: 'Home',
    component: Home,
    children: [
      {
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
    component: Search
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
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
