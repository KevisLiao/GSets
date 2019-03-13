import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'js-cookie'
import store from '@/store'
import index from '../views/index.vue'
import welcome from '../views/welcome/index.vue'
import homepage from '../views/main/index.vue'
import setsDetail from '../views/main/user/setsDetail.vue'
import collectionDetail from '../views/main/user/collectionDetail.vue'
import deviceSetsDetail from '../views/main/deviceSets/deviceSetsDetail.vue'

Vue.use(Router)

const routes= [
  {
    path: '/',
    name: 'index',
    component: index,
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    name: 'gsets',
    component: welcome
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: homepage,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/homepage/userDeviceSets',
        meta: {
          title: '',
        },
        component: (resolve) => {
          require(['../views/main/user/index.vue'], resolve)
        }
      },
      {
        path: '/homepage/deviceSets',
        meta: {
          title: '',
        },
        component: (resolve) => {
          require(['../views/main/deviceSets/index.vue'], resolve)
        }
      },
    ]
  },
  {
    path: '/setsDetail',
    name: 'setsDetail',
    component: setsDetail
  },
  {
    path: '/DeviceSetsDetail',
    name: 'DeviceSetsDetail',
    component: deviceSetsDetail
  },
  {
    path: '/collectionDetail',
    name: 'collectionDetail',
    component: collectionDetail
  },
]

if(cookie.get('userCode')) {
  store.commit('updateUserCode', { userCode: cookie.get('userCode') })  // 保证页面刷新userCode仍有效
}

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    if (cookie.get('userCode')) {   //判断是否已经登录
      store.commit('updateUserCode', { userCode: cookie.get('userCode') })
      next();
      } else {
        next({
          path: '/welcome',
        });
      }
  } else {
    next();
  }
    
});

export default router