import request from '@/utils/axios'

// 首页公告
export function apiNoticeList(data) {
  return request({
    url: '/index/notice/',
    method: 'get',
    data
  })
}