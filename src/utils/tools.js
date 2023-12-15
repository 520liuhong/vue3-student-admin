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

/** 创建一个随机字符串 */
export function randomString () {
    // 例：gi1qtdego0b
    return Math.random().toString(36).slice(2)
}

/** 单词首字母大写 */
export function uppercaseWords (str) {
    // 例：传入str = 'hello world'，返回'Hello World'
    return str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
}

/** 将字符串转换为小驼峰 */
export function toCamelCase (str) {
    return str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
}

/** 删除一维数组中的重复值 */
export function removeDuplicates (arr) {
    // 调用：removeDuplicates([1, 2, 2, 3, 3, 4, 4, 5, 5, 6])
    // 返回：[1, 2, 3, 4, 5, 6]
    return [...new Set(arr)]
}
