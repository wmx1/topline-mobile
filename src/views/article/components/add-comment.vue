<template>
    <div class="add-comment">
        <div class="input-wrap">
            <input type="text" >
        </div>
        <div class="more-wrap">
            <van-icon
                v-if="!articleId"
                :name="article.is_collected ? 'star' : 'start-o'"
                >

            </van-icon>
        </div>
    </div>
</template>

<script>
import { addComment } from '@/api/comment'
// import { collectArticle, unCollectArticle } from '@/api/article'
export default {
    props: {
        target: {
            type: [Number, String],
        },
        articleId: {
            type: [Number, String],
            default: null
        },
        article: {
            type: Object,
            default: () => {}
        }
    },

    created () {
        console.log('article', this.article)
    }
}
</script>

<style lang="less" scoped>
.add-comment {
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
