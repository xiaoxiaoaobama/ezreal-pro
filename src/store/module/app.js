import { getMenuData } from '@/menu/menu'
import { queryUserInfo } from '@/services/user'
import { SAVE_USER_INFO, TOGGLE_COLLAPSED } from '../mutation.types'

const state = {
  name: '尚未登录',
  authMenuKeys: [], // 当前用户可以访问的菜单权限码
  collapsed: false
}

const getters = {
  menuData: ({authMenuKeys}) => {
    return getMenuData(authMenuKeys)
  }
}

const mutations = {
  [SAVE_USER_INFO](state, data) {
    state.name = data.name
    state.authMenuKeys = data.authMenuKeys
  },
  [TOGGLE_COLLAPSED](state) {
    state.collapsed = !state.collapsed
  }
}

const actions = {
  async initUserInfo({ commit }) {
    let data = await queryUserInfo()
    commit(SAVE_USER_INFO, data)
    return true
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
