import request from '@/utils/axios'

// 登录接口
export function apiLogin(data) {
  return request({
    url: '/login/',
    method: 'post',
    data
  })
}

// 注册接口
export function apiRegister(data) {
  return request({
    url: '/register/',
    method: 'post',
    data
  })
}
