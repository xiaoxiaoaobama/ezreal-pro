import request from '../utils/request'

export function queryCurrent() {
  return request('/user/current', {
    method: 'get'
  })
}
