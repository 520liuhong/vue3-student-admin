/**
 * @name: 工具文件
 * @description: 用于变量匹配，名称匹配转换等
 * @author: newhome
 * @date: 2023-05-23 15:48:20
 */

/** 转换角色权限名称 */
export function getNameByRoleId (id) {
    switch (id) {
        case 1: {
            return '超级管理员'
        }
        case 2: {
            return '管理员'
        }
    }
}
/** 转换角色权限名称 */
export function getStatusOfRole (status) {
    switch (status) {
        case 0: {
            return false
        }
        case 1: {
            return true
        }
    }
}
