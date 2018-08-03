import { isUrl } from '../utils/index'

const menuData = [
  {
    label: 'dashboard',
    key: 'dashboard',
    icon: 'table',
    path: 'dashboard',
    children: [
      {
        label: '分析页',
        key: 'analysis',
        path: 'analysis'
      }
    ]
  },
  {
    label: '查询页',
    key: 'search',
    icon: 'table',
    path: 'search',
    children: [
      {
        label: '搜索列表（文章）',
        key: 'articles',
        path: 'articles'
      },
      {
        label: '搜索列表（项目）',
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
