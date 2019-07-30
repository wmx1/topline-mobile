/* 
频道新闻推荐_V1.1
*/

import request from '@/utils/request'

export const getArticles = ({ channelId, timestamp, withTop }) => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params: {
            channel_id: channelId,
            timestamp,
            with_top: withTop
        }
    })
}

/**
 * 对文章不喜欢
 */
export const dislikeArticle = articleId => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/dislikes',
        data: {
            target: articleId
        }
    })
}

/**
 * 举报文章
 */

export const reportArticle = ({
    articleId,
    type,
    remark = ''
 }) => {
     return request({
         method: 'POST',
         url: '/app/v1_0/article/reports',
         data: {
             target: articleId,
             type,
             remark
         }
     })
 }
