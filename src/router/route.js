import pathToRegexp from 'path-to-regexp'
import { getMenuData } from '../menu/menu'

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

// 提供给用户的配置形式
const initRoute = {
  "/": {
    component: () => import('../layout/BasicLayout.vue'),
    meta: {}
  },
  "/home": {
    component: () => import('../views/home/home'),
    meta: {}
  },
  "/demo/list": {
    component: () => import('../views/demo/list.vue'),
    meta: {}
  },
  "/demo/detail": {
    component: () => import('../views/demo/detail.vue'),
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

const metaData = getMenuData()
const menuData = getFlatMenuData(metaData) // 树形结构转换成平级
const routerConfig = getFinishRoute() // eslint-disable-line

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
metaData.forEach(getRedirect)
console.log(redirectData)

export default [{
  ...routerConfig['/'],
  path: '/',
  redirect: '/home',
  children: redirectData.concat(routerHandle(Object.keys(routerConfig)))
}]


// 最终产出的路由结构
// const routes = [{
//   path: '/',
//   component: () => import('../layout/BasicLayout.vue'),
//   redirect: '/home',
//   meta: {},
//   children: [
//     {
//       path: '/dashboard',
//       redirect: '/dashboard/analysis'
//     },
//     {
//       path: '/search',
//       redirect: '/search/articles'
//     },

//     {
//       path: '/home',
//       component: () => import('../views/home/home.vue'),
//       meta: {}
//     },

//     {
//       path: '/dashboard/analysis',
//       component: () => import('../views/dashboard/analysis.vue'),
//       meta: {}
//     },

//     {
//       path: '/search',
//       component: () => import('../views/list/search.vue'),
//       meta: {},
//       children: [{
//         path: '/search/articles',
//         component: () => import('../views/list/articles.vue'),
//         meta: {}
//       }, {
//         path: '/search/projects',
//         component: () => import('../views/list/projects.vue'),
//         meta: {}
//       }]
//     }
//   ]
// }]