import { isUrl } from '../utils/index'

const menuData = [
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
    path: 'demo/list',
    hideInMenu: true
  },
  {
    name: 'dashboard',
    key: 'dashboard',
    icon: 'table',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        key: 'analysis',
        path: 'analysis'
      }
    ]
  },
  {
    name: '查询页',
    key: 'search',
    icon: 'table',
    path: 'search',
    children: [
      {
        name: '搜索列表（文章）',
        key: 'articles',
        path: 'articles'
      },
      {
        name: '搜索列表（项目）',
        key: 'projects',
        path: 'projects'
      }
    ]
  }
]

function formatter(data, parentPath = '/') {
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`)
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)
