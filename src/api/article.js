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

//  获取文章详情
export const getArticleDetail = articleId => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`
    })
}

/* 对文章点赞 */
export const likeArticle = articleId => {
    return request({
        method: 'POST',
        url: `/app/v1_0/article/likings`,
        data: {
            target: articleId
        }
    })
}

/* 取消文章点赞 */
export const unLikeArticle = articleId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/likings/${articleId}`
    })
}

/**
 * 对文章不喜欢
 */
export const dislikeArticle = articleId => {
    return request({
        method: 'POST',
        url: `/app/v1_0/article/dislikes`,
        data: {
            target: articleId
        }
    })
}

/**
 * 取消对文章不喜欢
 */
export const unDislikeArticle = articleId => {
    return request({
      method: 'DELETE',
      url: `/app/v1_0/article/dislikes/${articleId}`
    })
  }