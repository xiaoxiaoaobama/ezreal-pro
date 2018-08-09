export default {
  state: {
    collapsed: false
  },
  mutations: {
    toggleCollapsed (state) {
      state.collapsed = !state.collapsed
    }
  }
}
