import Vue from 'vue'
import Router from 'vue-router'
import unlogin from '@/components/user/page/unlogin'

Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path: '/',
      name: 'unlogin',
      component: unlogin
    }*/

    //以下方式为懒加载，即开始时不会加载全部组件，用户访问时才加载相应的组件。
    //以下为用户页面的跳转
    {
      path: '/user/unlogin',
      name: '我的音乐',
      component: resolve => require(['../components/user/page/unlogin.vue'], resolve)
    },
    {
      path: '/user/album',
      name: '专辑',
      component: resolve => require(['../components/user/page/album.vue'], resolve)
    },
    {
      path: '/user/albumdetail',
      component: resolve => require(['../components/user/page/albumdetail.vue'], resolve)
    },
    {
      path: '/user/artist',
      name: '歌手',
      component: resolve => require(['../components/user/page/artist.vue'], resolve)
    },
    {
      path: '/user/artistdetail',
      component: resolve => require(['../components/user/page/artistdetail.vue'], resolve)
    },
    {
      path: '/user/findpwd',
      component: resolve => require(['../components/user/page/findpwd.vue'], resolve)
    },
    {
      path: '/user/home',
      name: '首页',
      component: resolve => require(['../components/user/page/home.vue'], resolve)
    },
    {
      path: '/',
      name: '首页',
      component: resolve => require(['../components/user/page/home.vue'], resolve)
    },
    {
      path: '/user/mymusic',
      name: '我的音乐',
      component: resolve => require(['../components/user/page/mymusic.vue'], resolve)
    },
    {
      path: '/user/player',
      component: resolve => require(['../components/user/page/player.vue'], resolve)
    },
    {
      path: '/user/playlistdetail',
      name: '我的音乐',
      component: resolve => require(['../components/user/page/playlistdetail.vue'], resolve)
    },
    {
      path: '/user/rank',
      name: '排行榜',
      component: resolve => require(['../components/user/page/rank.vue'], resolve)
    },
    {
      path: '/user/search',
      name: '搜索',
      component: resolve => require(['../components/user/page/search.vue'], resolve)
    },
    {
      path: '/user/song',
      component: resolve => require(['../components/user/page/song.vue'], resolve)
    },
    {
      path: '/user/songdetail',
      component: resolve => require(['../components/user/page/songdetail.vue'], resolve)
    },
    //以下为管理员页面的跳转
    {
      path: '/admin/artistdetail',
      name: '歌手详情页',
      component: resolve => require(['../components/admin/artistdetail.vue'], resolve)
    },
    {
      path: '/admin/artist',
      name: '首页',
      component: resolve => require(['../components/admin/artist.vue'], resolve)
    },
    {
      path: '/admin/albumdetail',
      name: '专辑详情页',
      component: resolve => require(['../components/admin/albumdetail.vue'], resolve)
    },
    {
      path: '/admin/songdetail',
      name: '歌曲详情页',
      component: resolve => require(['../components/admin/songdetail.vue'], resolve)
    },
    {
      path: '/user/black',
      component: resolve => require(['../components/user/page/black.vue'], resolve)
    },
    {
      path: '/user/black_login',
      component: resolve => require(['../components/user/page/black_login.vue'], resolve)
    },
    {
      path: '/admin/black',
      component: resolve => require(['../components/admin/black.vue'], resolve)
    },
    {
      path: '/admin/search',
      name: '搜索页',
      component: resolve => require(['../components/admin/search.vue'], resolve)
    },
  ],
})
