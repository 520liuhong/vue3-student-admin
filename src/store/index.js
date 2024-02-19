import {createStore} from 'vuex'

export default createStore({
  state: {
    isCollapse: false, // 左侧菜单栏的展开收起按钮
    navTabs: [{path: "/index", meta: {title: '首页'}}], // 顶部导航栏的navTabs
    sideBarWidth: 200
  },
  getters: {
    getNavTabs(state) {
      return state.navTabs
    }
  },
  mutations: {
    setCollapse(state, flag) {
      state.isCollapse = flag
    },
    setNavTabs(state, tabs) {
      state.navTabs = tabs
    }
  },
  actions: {},
  modules: {}
})
