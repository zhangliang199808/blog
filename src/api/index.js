import request from '@/utils/axios'

// 首页公告
export function apiNoticeList(data) {
  return request({
    url: '/index/notice/',
    method: 'get',
    data
  })
}

// 首页轮播图
export function apiIndexBanner(data) {
  return request({
    url: '/index/banner/',
    method: 'get',
    data
  })
}

// 首页推荐列表
export function apiRecommendArticleList(data) {
  return request({
    url: '/index/recommend/article/',
    method: 'get',
    data
  })
}

// 首页最热列表
export function apiHotArticleList(data) {
  return request({
    url: '/index/hot/article/',
    method: 'get',
    data
  })
}

// 首页最新列表
export function apiNewArticleList(data) {
  return request({
    url: '/index/new/article/',
    method: 'get',
    data
  })
}