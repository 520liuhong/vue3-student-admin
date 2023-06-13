import {createRouter, createWebHistory} from 'vue-router'
import Layout from '@/layouts/Index'
import login from '@/views/Login'
import {menu} from '@/router/mockData'
import {filterAsyncRouter} from '@/router/permission'

let routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/Layout',
    name: 'Layout',
    component: Layout,
    redirect: '/index',
    meta: {title: '首页', icon: 'iconfont icon-home', home: true},
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/Index'),
        meta: {title: '首页', icon: 'iconfont icon-home', home: true}
      }
    ]
  }
]
const rewriteRoutes = filterAsyncRouter(menu)
routes = routes.concat(rewriteRoutes)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
