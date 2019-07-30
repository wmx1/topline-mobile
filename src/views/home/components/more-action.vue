<template>
  <van-dialog
    :value="value"
    @input="$emit('input', $event)"
    :showConfirmButton="false"
    :closeOnClickOverlay="true"
  >
    <van-cell-group v-if="!isReportShow">
      <van-cell title="不感兴趣" icon="location-o" @click="handleDislike"/>
      <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="isReportShow = true" />
      <van-cell title="拉黑作者" icon="location-o" @click="handleAddBlackList"/>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReportShow = false" />
      <van-cell
        v-for="item in reportTypes"
        :key="item.value"
        :title="item.label"
        icon="location-o"
        @click="handleReportArticle(item.value)"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { reportArticle, dislikeArticle } from '@/api/article'
export default {
  name: "MoreAction",
  data () {
    return {
      isReportShow: false,
      reportTypes:  [
        { label: '标题夸张', value: 1 },
        { label: '低俗色情', value: 2 },
        { label: '错别字多', value: 3 },
        { label: '旧闻重复', value: 4 },
        { label: '广告软文', value: 5 },
        { label: '内容不实', value: 6 },
        { label: '涉嫌违法犯罪', value: 7 },
        { label: '侵权', value: 8 },
        { label: '其他问题', value: 0 }
      ]
    }
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentArticle: {
      type: Object,
      default: null
    }
  },

  methods: {
    handleDislike () {
      // 移除主页的文章
        this.$emit('dislike-success')
      // try {
      //   // await dislikeArticle(this.currentArticle.art_id)
          
      // } catch(err) {
      //   // this.$toast('操作失败')
      //   // this.$emit('input', false)
      
      // }
    },

    async handleReportArticle (type) {
      console.log('currentArticle', this.currentArticle)
      const { currentArticle } = this 
      try {
         await reportArticle({
          articleId: currentArticle.art_id, 
          type
        })
      } catch(err) {
        if(err.response && err.response.status === 401) {
          this.$toast('没有操作权限')
        }
        // 关闭对话框
        this.$emit('input', false)
        console.log('err', err.response)
      }

      // 操作完之后，
      this.isReportShow = false
    },

    async handleAddBlackList () {
      try {
        // await addBlacklist(this.currentArticle.art_id)
        this.$emit('add-blacklist-success')
      } catch (err) {
        this.$toast('没有操作权限')
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>

