import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/layouts/Index"
import login from "@/views/Login";

const routes = [
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
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/Index'),
        meta: { title: '首页', icon: 'home', affix: true },
        // children: [
        //   {
        //     path: '/index',
        //     name: 'Index',
        //     meta: { title: '首页' },
        //     component: () => import('@/views/Index')
        //   }
        // ]
      },
      {
        path: '/student',
        name: 'Student',
        meta: { title: '学生管理', icon: 'box-open' },
        component: () => import('../views/student/Index'),
        children: [
          {
            path: '/student1',
            name: 'Student1',
            meta: { title: '学生1' },
            component: () => import('../views/student/student1/Student1'),
          },
          {
            path: '/student2',
            name: 'Student2',
            meta: { title: '学生2' },
            component: () => import('../views/student/student1/Student2')
          }
        ]
      },
      {
        path: '/teacher',
        name: 'Teacher',
        meta: { title: '教师管理', icon: 'box-open' },
        component: () => import('../views/teacher/Index'),
        children: [
          {
            path: '/teacher1',
            name: 'Teacher1',
            meta: { title: '教师' },
            component: () => import('../views/teacher/teacher1')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
