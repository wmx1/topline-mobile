import request from '@/utils/request'

/* 获取评论 */
export const getComments = ({
    source,
    offset = null,
    limit = 10,
    isArticle = true
  }) => {
    return request({
      method: 'GET',
      url: '/app/v1_0/comments',
      params: { // axios 不会添加类型为 null 的数据
        type: isArticle ? 'a' : 'c', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source, // 源id，文章id或评论id
        offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      }
    })
  }

  /* 添加评论|回复 */
  export const addComment = ({
    target,
    content,
    articleId = null // 如果数据为 null，则 axios 不会发送该数据
  }) => {
    return request({
      method: 'POST',
      url: '/app/v1_0/comments',
      data: { // axios 不会添加类型为 null 的数据
        target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        content, // 评论内容
        art_id: articleId // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
      }
    })
  }