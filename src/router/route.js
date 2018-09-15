import pathToRegexp from 'path-to-regexp'
import { getTotalMenu } from '../menu/menu'

// 提供给用户的平级配置形式
const initRoute = {
  "/": {
    component: () => import('../layout/BasicLayout.vue')
  },
  "/home": {
    component: () => import('../views/home/home.vue')
  },
  "/demo/list": {
    component: () => import('../views/demo/list.vue')
  },
  "/demo/detail": {
    component: () => import('../views/demo/detail.vue'),
    name: '详情页',
    meta: {
      key: 'demo'
    }
  },
  "/dashboard/analysis": {
    component: () => import('../views/dashboard/analysis.vue')
  },
  "/search": {
    component: () => import('../views/list/search.vue')
  },
  "/search/articles": {
    component: () => import('../views/list/articles.vue')
  },
  "/search/projects": {
    component: () => import('../views/list/projects.vue')
  },
  "/exception/403": {
    component: () => import('../views/Exception/403.vue'),
    name: '403'
  },
  "/exception/404": {
    component: () => import('../views/Exception/404.vue'),
    name: '404'
  },
  "/exception/500": {
    component: () => import('../views/Exception/500.vue'),
    name: '500'
  }
}

function getFinishRoute() {
  const routerData = {}
  Object.keys(initRoute).forEach((path) => {
    const pathRegexp = pathToRegexp(path)
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`))
    let menuItem = {}
    if (menuKey) {
      menuItem = menuData[menuKey]
    }
    let router = initRoute[path]
    router.meta = router.meta || {}
    router.meta.key = router.meta.key || menuItem.key
    router.name = router.name || menuItem.name
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

function getMatchRoutesPath(path, routerPaths) {
  let routes = routerPaths.filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  )
  return routes
}

function routerHandle(paths) {
  let cRouter = []
  let emRouter = []

  for (let path of paths) {
    if (path === '/' || emRouter.indexOf(path) > -1) continue

    const currentRoute = routerConfig[path]
    currentRoute.path = path
    const matchPaths = getMatchRoutesPath(path, paths)

    if (matchPaths && matchPaths.length > 0) {
      emRouter = emRouter.concat(matchPaths)
      currentRoute.children = routerHandle(matchPaths)
    }
    cRouter.push(currentRoute)
  }
  return cRouter
}

const initMenuData = getTotalMenu()
const menuData = getFlatMenuData(initMenuData) // 菜单树形结构转换成平级
const routerConfig = getFinishRoute()
console.log(routerConfig)

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = []
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        path: `${item.path}`,
        redirect: `${item.children[0].path}`
      })
      item.children.forEach(children => {
        getRedirect(children)
      })
    }
  }
}
initMenuData.forEach(getRedirect)

export default [{
  ...routerConfig['/'],
  path: '/',
  redirect: '/home',
  children: redirectData.concat(routerHandle(Object.keys(routerConfig)))
}, {
  path: '*',
  redirect: '/exception/404',
}]
