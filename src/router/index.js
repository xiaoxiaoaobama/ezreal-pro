import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routes from './route'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => { // eslint-disable-line
  // 登录
  const isLoginSuccess = await store.dispatch('initUserInfo')
  const authMenuKeys = store.state.app.authMenuKeys
  const toRouteKey = to.meta.key
  if (isLoginSuccess && toRouteKey && authMenuKeys.indexOf(toRouteKey) === -1) { // 定位到无权限页
    next({name: '403'})
  } else { // 放行
    next()
  }
})

// router.afterEach(to => {
// })

export default router