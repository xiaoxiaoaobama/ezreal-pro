import Mock from 'mockjs'

Mock.mock('/user/current', 'get', () => {
  return {
    name: 'Jack Ma',
    authMenuKeys: ['home', 'demo', 'dashboard', 'search']
  }
})