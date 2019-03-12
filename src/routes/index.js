import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index.vue'
import welcome from '../views/welcome/index.vue'
import homepage from '../views/main/index.vue'
import setsDetail from '../views/main/user/setsDetail.vue'
import deviceSetsDetail from '../views/main/deviceSets/deviceSetsDetail.vue'

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        name: 'index',
        component: index
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
        name: 'setsDetail',
        component: deviceSetsDetail
      },
    ]
  })