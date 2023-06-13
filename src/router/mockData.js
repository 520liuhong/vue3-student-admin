export const menu = [
    {
        path: '/student',
        name: 'Student',
        meta: { title: '学生管理', icon: 'iconfont icon-student' },
        component: 'Layout',
        children: [
            {
                path: '/studentManage',
                name: 'StudentInfo',
                meta: { title: '学生信息管理' },
                component: '/student/StudentInfo'
            },
            {
                path: '/student2',
                name: 'Student2',
                meta: { title: '学生2' },
                component: '/student/Student2'
            }
        ]
    },
    {
        path: '/teacher',
        name: 'Teacher',
        meta: { title: '教师管理', icon: 'iconfont icon-teacher' },
        component: 'Layout',
        children: [
            {
                path: '/teacher1',
                name: 'Teacher1',
                meta: { title: '教师' },
                component: '/teacher/teacher1'
            }
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        meta: { title: '管理员', icon: 'iconfont icon-admin' },
        component: 'Layout',
        children: [
            {
                path: '/userManagement',
                name: 'UserManagement',
                meta: { title: '用户管理' },
                component: '/admin/Admin'
            },
            {
                path: '/roleManagement',
                name: 'RoleManagement',
                meta: { title: '角色管理' },
                component: '/admin/Role'
            },
            {
                path: '/authorityManagement',
                name: 'AuthorityManagement',
                meta: { title: '权限管理' },
                component: '/admin/Authority'
            }
        ]
    },
    {
        path: '/agency',
        name: 'Agency',
        meta: { title: '机构', icon: 'iconfont icon-admin' },
        component: 'Layout',
        children: [
            {
                path: '/classManagement',
                name: 'ClassManagement',
                meta: { title: '班级管理' },
                component: '/agency/classManage/ClassInfo'
            }
        ]
    },
    {
        path: '/moreMenu',
        name: 'MoreMenu',
        meta: { title: '多菜单', icon: 'iconfont icon-admin' },
        component: 'Layout',
        children: [
            {
                path: '/menu1',
                name: 'menu1',
                meta: { title: '二级菜单1' },
                component: '',
                children: [
                    {
                        path: '/menu11',
                        name: 'Menu11',
                        meta: { title: '三级菜单1' },
                        component: '/moreMenu/menu1/menu11'
                    },
                    {
                        path: '/menu12',
                        name: 'Menu12',
                        meta: { title: '三级菜单2' },
                        component: '/moreMenu/menu1/menu12'
                    }
                ]
            },
            {
                path: '/menu2',
                name: 'menu2',
                meta: { title: '二级菜单2' },
                component: '/moreMenu/menu2/menu21'
            }
        ]
    }
]
