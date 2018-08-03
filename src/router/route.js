import pathToRegexp from 'path-to-regexp'
import { getMenuData } from '../menu/menu'

function getFinishRoute() {
  const routerData = {}
  Object.keys(routerConfig).forEach((path) => {
    const pathRegexp = pathToRegexp(path)
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`))
    let menuItem = {}
    if (menuKey) {
      menuItem = menuData[menuKey]
    }
    let router = routerConfig[path]
    router = {
      ...router,
      key: router.key || menuItem.key,
    }
    routerData[path] = router
  })
  return routerData
}

function getFlatMenuData(menus) {
  let keys = {}
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item }
      keys = { ...keys, ...getFlatMenuData(item.children) }
    } else {
      keys[item.path] = { ...item }
    }
  })
  return keys
}

// 提供给用户的配置形式
const routerConfig = { // eslint-disable-line
  "/": {
    component: () => import('../layout/BasicLayout.vue'),
    meta: {},
    redirect: '/home',
  },
  "/home": {
    component: () => import('../views/home/home.vue'),
    meta: {}
  },
  "/dashboard/analysis": {
    component: () => import('../views/dashboard/analysis.vue'),
    meta: {}
  },
  "/search": {
    component: () => import('../views/list/search.vue'),
    meta: {}
  },
  "/search/articles": {
    component: () => import('../views/list/articles.vue'),
    meta: {}
  },
  "/search/projects": {
    component: () => import('../views/list/projects.vue'),
    meta: {}
  }
}

const menuData = getFlatMenuData(getMenuData())
const aa = getFinishRoute()
console.log(aa)

// 最终产出的路由结构
const routes = [{
  path: '/',
  component: () => import('../layout/BasicLayout.vue'),
  redirect: '/home',
  meta: {},
  children: [
    {
      path: 'dashboard',
      redirect: 'dashboard/analysis'
    },
    {
      path: 'search',
      redirect: 'search/articles'
    },

    {
      path: 'home',
      component: () => import('../views/home/home.vue'),
      meta: {}
    },

    {
      path: 'dashboard/analysis',
      component: () => import('../views/dashboard/analysis.vue'),
      meta: {}
    },

    {
      path: 'search',
      component: () => import('../views/list/search.vue'),
      meta: {},
      children: [{
        path: 'articles',
        component: () => import('../views/list/articles.vue'),
        meta: {}
      }, {
        path: 'projects',
        component: () => import('../views/list/projects.vue'),
        meta: {}
      }]
    }
  ]
}]

export default routes