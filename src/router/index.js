import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/discover/Discover.vue';
import Recommend from "../views/discover/childComp/recommend/Recommend";

const DPlaylist = () => import('../views/discover/childComp/playlist/PlayList');
const Search = () => import('../views/search/Search');
const Mv = () => import('../views/mv/Mv');

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
        path: '/discover/playlist/:cat',
        name: 'PlayList',
        component: DPlaylist
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
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
