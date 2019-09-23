<template>
  <div class="zan">
    <van-button 
        round 
        size="small" 
        hairline 
        type="primary" 
        plain 
        :icon="isLike ? 'like' : 'like-o'"
        @click="handleLike">
        点赞
    </van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
    <van-button round size="small" hairline type="danger" plain icon="delete">不喜欢</van-button>
  </div>
</template>

<script>
import {
    likeArticle,
    unLikeArticle,
    dislikeArticle,
    unDislikeArticle
} from '@/api/article'
export default {
    props: {
        article: {
            type: Object,
            default: {}
        }
    },
    
    data () {
        return {
            isLike: false,
        }
    },

    methods: {
        async handleLike () {
            console.log('this.$checkLogin', this.$checkLogin)
            if(!this.$checkLogin()) {
                return 
            } 
            try {
                if(this.isLike) {
                    // await unLikeArticle(this.article.art_id)
                    this.isLike = false
                } else {
                    //点赞
                    // await likeArticle('1175380189094346800')
                    this.isLike = true
                }
            } catch (err) {
                this.$toast.fail('操作失败')
            }
        }
    }
}
</script>

<style lang="less" scoped>
</style>