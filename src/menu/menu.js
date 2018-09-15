import { isUrl } from '../utils/index'

const initMenuData = [
  {
    name: '主页',
    key: 'home',
    icon: 'table',
    path: 'home'
  },
  {
    name: '一级列表详情切换',
    key: 'demo',
    icon: 'table',
    path: 'demo/list'
  },
  {
    name: 'dashboard',
    icon: 'table',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        key: 'dashboard',
        path: 'analysis'
      }
    ]
  },
  {
    name: '查询页',
    icon: 'table',
    path: 'search',
    key: 'search',
    children: [
      {
        name: '搜索列表（文章）',
        path: 'articles'
      },
      {
        name: '搜索列表（项目）',
        path: 'projects'
      }
    ]
  }
]

function formatter(data, parentPath = '/', parentKey) {
  return data.map(item => {
    let { path, key } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const currentKey = key || parentKey
    let result = {
      ...item,
      path,
      key: currentKey
    }

    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, currentKey)
    }

    return result
  })
}

/**
 * 根据菜单权限码生成最终的树形菜单结构
 * @param {Array} menu 用户定义的全量菜单树状结构
 * @param {Array} authMenuKeys 用户信息中拿到的菜单权限码
 * @return {Array} 鉴权后的树形菜单
 */
function getAuthMenuData(menu, authMenuKeys) { // eslint-disable-line
  return menu.filter((item) => {
    if (item.children && item.children.length > 0) {
      item.children = getAuthMenuData(item.children, authMenuKeys)
      return item.children.length > 0
    }
    return authMenuKeys.indexOf(item.key) > -1
  })
}

/**
 * 获取鉴权后的菜单结构
 * @param {Array} authMenuKeys 用户信息中拿到的菜单权限码
 * @return {Array} 鉴权后的树形菜单
 */
export const getMenuData = (authMenuKeys = []) => {
  return getAuthMenuData(formatter(initMenuData), authMenuKeys)
}

/**
 * 获取全量菜单结构
 * @return {Array} 全量菜单
 */
export const getTotalMenu = () => {
  console.log(formatter(initMenuData))
  return formatter(initMenuData)
}
