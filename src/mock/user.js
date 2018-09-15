import Mock from 'mockjs'

Mock.mock('/user/current', 'get', () => {
  return {
    name: 'Jack Ma'
  }
})