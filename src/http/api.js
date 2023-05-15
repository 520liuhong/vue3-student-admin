/**
 * @description: 接口地址组件
 * @author: newhome
 * @date: 2023-02-20 14:17:44
 */

export const api = {
    getStuInfo: '/api/getStuInfo',
    getSpecialtyByCollege: '/api/getSpecialtyByCollege',
    getClassBySpecialty: '/api/getClassBySpecialty',
    getAllCollege: '/api/getAllCollege',
    addStu: '/api/addStu',
    getStuByNameOrId: '/api/getStuByNameOrId',
    delStu: '/api/delStu',
    updateStu: '/api/updateStu',
    getGrade: '/api/getGrade',
    admin: {
        getAdminInfo: '/api/getAdminInfo'
    },
    agency: {
        getClass: '/api/getClass',
        getTeacher: '/api/getTeacher',
        updateClass: '/api/updateClass',
        addClass: '/api/addClass',
        delClass: 'api/delClass'
    },
    system: {
        login: '/api/login'
    }
}
