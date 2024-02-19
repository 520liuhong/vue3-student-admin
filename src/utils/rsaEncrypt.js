// npm install jsencrypt --dev

import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtaobg9WYP6I4enaKygQD\n' +
  'fKMqPJSii4K/A/8KgjIDXm39W446lzT4GklqrlMLeEXmzQz8ynMJgE16r6YRMusR\n' +
  'LgjZy6/D1lTc5830+1FNOEBSz23Il3EGocLHx5AdZ0wG/t1whZ3dSOSj235NnZH3\n' +
  'e1seIhN7ECuIQvRjmXhVp5IO7kaNPw+JqTtFSQKLBWfHMqz5iPqivcNHdekkI/EO\n' +
  'mrGUCsnbwKuZjMWg15iMRTxbjDBq7BSX+8peSeMgCJsA4BUkedPk/CM4pyL/yLiT\n' +
  'V6Ej6I1tUgrUqdk9Wwg9Mc4lQNkC/ug1+OuwUSeZC2qBbsvihuQBPFuV1/tDx0SW\n' +
  'HQIDAQAB'
const privateKey = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1qhuD1Zg/ojh6\n' +
  'dorKBAN8oyo8lKKLgr8D/wqCMgNebf1bjjqXNPgaSWquUwt4RebNDPzKcwmATXqv\n' +
  'phEy6xEuCNnLr8PWVNznzfT7UU04QFLPbciXcQahwsfHkB1nTAb+3XCFnd1I5KPb\n' +
  'fk2dkfd7Wx4iE3sQK4hC9GOZeFWnkg7uRo0/D4mpO0VJAosFZ8cyrPmI+qK9w0d1\n' +
  '6SQj8Q6asZQKydvAq5mMxaDXmIxFPFuMMGrsFJf7yl5J4yAImwDgFSR50+T8Izin\n' +
  'Iv/IuJNXoSPojW1SCtSp2T1bCD0xziVA2QL+6DX467BRJ5kLaoFuy+KG5AE8W5XX\n' +
  '+0PHRJYdAgMBAAECggEAFdWlSvowO22/BhEba16CIMfnurJOux/y34MW+0ERoJbt\n' +
  'vcRhjG0EaPxsAxneJg2YyQqHk7mx6abmWRhHtuwD+5l6u/2bNzap+n6JtG84Lcul\n' +
  'aGMUmgcuueCUbIsIzbKYoKdy78xinXFFtIsAvzCdI0l3XLcksnPZA9sl4XtSKDq0\n' +
  '9+UyC3kpxi78NBjMPZO1v8qwXlhMjqWfLx0N4BR4ck+t0IvzItu+2hQDwUsx91ru\n' +
  'rYz+DokfY0sELN0SQ1Eavq4VMibSHaKZUxecpIHp1D5DS8Q7K+jrgLOJMA5b9hyy\n' +
  'KgiUFGtp2nzA6xuO3QVVFSr2vosMi2v4e06rQdXLDQKBgQDmDg+Re4PLJMgyPWqD\n' +
  'Oy+4s4RsDvTEVaiK1W5ER5u3FQm8WhuK8UrmSLzrYVmPtjzBalXN+8QPrhlx3qsz\n' +
  'onCsSi3W6kVV5Q20w1Tn4+nBUckHFsBuF9Wv172qnaS7T396a3HIecjuWhfnBu8s\n' +
  'ffj6RBaIRzRMBxCssKhpXyqDSwKBgQDKJvYVYmXGyyTma6mzBMCkZsT36XmixYCx\n' +
  'njrRZNpxh2gS9lXcoUO4TxaXdGUqTN1pTVEWTtFdGQ+cxBjZgRAqibjEeDBmD42q\n' +
  '9uq78sPCc0zVe1WgrmQXq7Ebm/YUkn/MQIfSdMJBvb9MXZtzlgytmQLFBricIrfz\n' +
  'SNNvoPmDNwKBgQDL/avQVLWIbBUYd1z7AIBQRt4k8x4W+d15PceIw/ZPYVhAq6XA\n' +
  'jjTb/aOHE8tWo0E8QA3VmGlBfh8R2V/1aRR/sUb0SscwYurEXm/rLy0XPm4C2ynG\n' +
  'dVwFkEeeAisP7G4dHyjFmzeQIlMPiBaMXSdowvc33+t/fsRKXFr5FGmeAQKBgAbr\n' +
  'LHLw6jDSlRG5z5YL7Jfz2HvvprUWc2Ag3Tx7aiqGit5TRf8GGe497rUCS9AVz2Ii\n' +
  'Pks4KVw5Vlp0L7GKBEagbg1zW5yynZOjXcdO+Lo3/gI0dWrJbS2ON8KNJO/xT6Rq\n' +
  '9PsT+e4ME3cGoSJkmUx7tyeNIlZdrdQKwwnIBaIjAoGBAIgBhj+UPLXb+QAs5GfI\n' +
  'GilYHdrXrhKF6HJnhifmXPyYkUK7LLBRmbQdheINsoUp+xTS/l6ClCBJe1PC+6Xn\n' +
  'zPBzj2F4GXjb3Jy8JUXXUkHi6zIdDEcMQ8rGSQLuglEOM1NBkD+fuHQ5731xpma+\n' +
  '9KFTlG9K12ovmzogpH/8C6dF'

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 加密
export function encrypt1(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置公钥
  return encryptor.decrypt(txt) // 对需要加密的数据进行加密
}

