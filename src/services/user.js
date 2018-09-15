import request from '../utils/request'

export function queryUserInfo() {
  return request('/user/current', {
    method: 'get'
  })
}
