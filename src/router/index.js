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
        meta: { title: '首页', icon: 'iconfont icon-home', affix: true }
      },
      {
        path: '/student',
        name: 'Student',
        meta: { title: '学生管理', icon: 'iconfont icon-student' },
        component: () => import('../views/student/Index'),
        children: [
          {
            path: '/studentManage',
            name: 'Student1',
            meta: { title: '学生信息管理' },
            component: () => import('../views/student/studentManage/StudentInfo'),
          },
          {
            path: '/student2',
            name: 'Student2',
            meta: { title: '学生2' },
            component: () => import('../views/student/studentManage/Student2')
          }
        ]
      },
      {
        path: '/teacher',
        name: 'Teacher',
        meta: { title: '教师管理', icon: 'iconfont icon-teacher' },
        component: () => import('../views/teacher/Index'),
        children: [
          {
            path: '/teacher1',
            name: 'Teacher1',
            meta: { title: '教师' },
            component: () => import('../views/teacher/teacher1')
          }
        ]
      },
      {
        path: '/admin',
        name: 'Admin',
        meta: { title: '管理员', icon: 'iconfont icon-admin' },
        component: () => import('../views/admin/Index'),
        children: [
          {
            path: '/userManagement',
            name: 'UserManagement',
            meta: { title: '用户管理' },
            component: () => import('../views/admin/User')
          },
          {
            path: '/roleManagement',
            name: 'RoleManagement',
            meta: { title: '角色管理' },
            component: () => import('../views/admin/Role')
          },
          {
            path: '/authorityManagement',
            name: 'AuthorityManagement',
            meta: { title: '权限管理' },
            component: () => import('../views/admin/Authority')
          }
        ]
      },
      {
        path: '/agency',
        name: 'Admin',
        meta: { title: '机构', icon: 'iconfont icon-admin' },
        component: () => import('../views/agency/Index'),
        children: [
          {
            path: '/classManagement',
            name: 'ClassManagement',
            meta: { title: '班级管理' },
            component: () => import('../views/agency/classManage/ClassInfo')
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
