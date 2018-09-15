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
// import { getMenuData } from '@/data/menu'
// import { getUserInfo } from '@/services/common.service'
// import { UPDATE_USER_INFO, SAVE_SEARCH_PARAMS } from '../mutation.types'

// const state = {
//   name: '用户',
//   metaDateRole: '',
//   indexRole: '',
//   productline: [],
//   menuList: [],
//   pageSearchParams: {}
// }

// const getters = {
//   menuData: ({menuList}) => {
//     return getMenuData(menuList)
//   }
// }

// const mutations = {
//   [UPDATE_USER_INFO](state, data) {
//     state.name = data.name
//     state.metaDateRole = data.metaDateRole
//     state.indexRole = data.indexRole
//     state.productline = data.productline
//     state.menuList = data.menuList
//   },
//   [SAVE_SEARCH_PARAMS](state, {path, params}) {
//     state.pageSearchParams[path] = params
//     // console.log(state.pageSearchParams[path])
//   }
// }

// const actions = {
//   async initUserInfo({ commit }) {
//     let { data } = await getUserInfo()
//     commit(UPDATE_USER_INFO, data)
//     return true
//   },
//   saveSearchParams({ commit }, {path, params}) {
//     commit('SAVE_SEARCH_PARAMS', { path, params })
//   }
// }

// export default {
//   state,
//   getters,
//   mutations,
//   actions
// }
