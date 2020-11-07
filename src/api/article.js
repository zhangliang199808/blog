import request from '@/utils/axios'

// 发布文章
export function apiCreatArticle(data) {
  return request({
    url: '/add/article/',
    method: 'post',
    data
  })
}