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

// 测试接口
export function apiTest(data) {
  return request({
    url: '/index/',
    method: 'get',
    data
  })
}
//文章分类
export function getArticClass(data){
  return request ({
    url:"/all/category/",
    method:"get",
    data
  })
}
//文章列表

export function getArticList(data){
  return request ({
    url:'/category/article/',
    method:"get",
    params:data
  })
}
//用户已发布文章
export function getuserArticList(data){
  return request ({
    url:'/obtain/article/',
    method:"get",
    params:data
  })
}
export function apiUploadHardImg(data){
  return request ({
    url:'/change/head/photo/',
    method:"post",
    data
  })
}