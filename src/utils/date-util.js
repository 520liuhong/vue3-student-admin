/**
 * @description: 时间处理组件
 * @author: newhome
 * @date: 2023-03-22 10:03:56
 */
import _ from 'lodash'

/**
 * 计算 传入时间距离当前多少年
 * @param startDate
 */
export function getTimeFromSomeDateToNow(startDate) {
  const date = new Date(startDate) // 转换时间格式
  const year = date.getFullYear() // 取当年的年
  const month = date.getMonth() + 1 // 取当年的月(月份加一)
  const dd = date.getDate() // 取当年的日期

  const nowDate = new Date() // 取现在的时间
  const nowYear = nowDate.getFullYear() // 取现在的年
  const nowMonth = nowDate.getMonth() + 1 // 取现在的月(月份加一)
  const nowDd = nowDate.getDate() // 取现在的日期

  const restDd = nowDd - dd < 0 ? lastDay(nowMonth - 1, year) - dd + nowDd : nowDd - dd

  const restMonth =
    nowMonth - month < 0 ? 12 + nowMonth - month : nowMonth - month
  /**
   * 年份计算(结束 - 开始)
   * 直接限制结束比开始大，只有0/正数
   */
  const restYear = nowYear - year
  /**
   * 计算借位的问题
   */
  let resultMonth = restMonth
  let resultYear = restYear
  // 日期小说明借了月
  if (nowDd < dd) {
    resultMonth = restMonth - 1 < 0 ? restMonth - 1 + 12 : restMonth - 1
  }
  // 月份小借了年 或者 日期小，月份刚好一致，因为日期借了月份，导致月份减1，所以减年
  if (nowMonth < month || (nowDd < dd && nowMonth === month)) {
    resultYear = restYear - 1
  }

  return {
    year: resultYear,
    month: resultMonth,
    day: restDd
  }
}

/**
 * 判断每年的每个月的最后一天是几号
 * @param mo-月份
 * @param year-年份
 * @returns {number}
 */
export function lastDay(mo, year) {
  if (mo === 4 || mo === 6 || mo === 9 || mo === 11) {
    return 30
  }
  //2月
  else if (mo === 2) {
    if (isLeapYear(year)) {
      return 29
    } else {
      return 28
    }
  }
  //大月
  else {
    return 31
  }
}

/**
 * 判断是否是闰年
 * @param Year-年份
 * @returns {boolean}
 */
export function isLeapYear(Year) {
  return (Year % 4 === 0 && Year % 100 !== 0) || Year % 400 === 0
}

/**
 * 计算两个日期间相差多少天
 * @param date
 * @param otherDate
 * @returns {number}
 */
export function diffDays(date, otherDate) {
  if (date && otherDate) {
    const date1 = _.cloneDeep(new Date(date))
    const otherDate1 = _.cloneDeep(new Date(otherDate))
    return Math.ceil(Math.abs(date1 - otherDate1) / (1000 * 60 * 60 * 24))
  }
}
