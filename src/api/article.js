import request from '@/utils/axios'

// 发布文章
export function apiCreatArticle(data) {
  return request({
    url: '/add/article/',
    method: 'post',
    data
  })
}

// 获取文章分类
export function apiArticleType(data) {
    return request({
      url: '/all/category/',
      method: 'get',
      data
    })
}

// 上传文章图片或文件
export function apiUploadImgOrFile(data) {
    return request({
      url: '/upload/file/',
      method: 'post',
      data
    })
}

// 获取文章详情
export function apiArticleDetail(data) {
  return request({
    url: '/article/data/?article_id='+ data.article_id,
    method: 'get',
    data
  })
}

// 文文章评论查询
export function apiComment(data) {
  return request({
    url: '/get/comment/',
    method: 'get',
    params: data
  })
}

// 文文章评论发送
export function abc(data) {
  return request({
    url: '/add/comment/',
    method: 'post',
     data
  })
}