import Mock from 'mockjs'

// 用户信息接口
// 当前用户拥有home页，demo页，analysis页和search页的权限。
Mock.mock('/user/current', 'get', () => {
  return {
    name: 'Jack Ma',
    authMenuKeys: ['home', 'demo', 'analysis', 'search']
  }
})
