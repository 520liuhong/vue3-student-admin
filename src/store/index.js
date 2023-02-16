import { createStore } from 'vuex'

export default createStore({
  state: {
    isCollapse: false
  },
  getters: {
  },
  mutations: {
    setCollapse (state, flag) {
      state.isCollapse = flag
    }
  },
  actions: {
  },
  modules: {
  }
})
