module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  ignorePatterns: [
    'iconfont.js'
  ],
  rules: {
    eqeqeq: 0, // 关闭必须使用全等
    'no-extend-native': 0,
    'vue/no-parsing-error': 0, // 关闭此项避免在{{}}中使用>、<号导致报错的问题
    'no-useless-escape': 0,
    'no-eval': 0,
    'no-trailing-spaces': 0,
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off'
  },
  globals: {
    "ElMessage": "readonly",
    "ElMessageBox": "readonly",
    "ElLoading": "readonly"
  }
}
