<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in comments" :key="item.com_id">
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt />
        </div>
        <div slot="title">
          <span>{{ item.aut_name }}</span>
        </div>
        <div slot="default">
          <van-button :icon="item.is_liking ? 'like' : 'like-o'" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
            <p>{{ item.content }}</p>
            <p>
                <span>{{ item.pubdate | relativeTime }}</span>
               ·
                <span @click="handleShowReply(item)">回复 {{ item.reply_count }}</span>
            </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComments } from "@/api/comment";
import globalBus from '@/utils/global-bus'

export default {
  data() {
    return {
      comments: [],
      loading: false,
      finished: false,
      offset: null
    };
  },

  props: {
    source: {
      type: [Number, String],
      required: true
    },

    isArticle: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    articleId() {
      return this.$route.params.articleId;
    }
  },

  methods: {
    async onLoad() {
      // 异步更新数据
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1);
      //     }
      //     // 加载状态结束
      //     this.loading = false;

      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 500);
      // 有评论数据的文章：138765。
      const data = await getComments({
        source: "138765",
        offset: this.offset,
        limit: 10,
        isArticle: this.isArticle
      })

      console.log("data", data)
    //   如果没有数据，则意味着评论加载完毕了
    if(!data.results.length) {
        this.finished = true
        this.loading = false
        return 
    }
    //   如果没有数据,表示数据加载完了
      this.comments.push(...data.results)

    //   将本次的loading设置为false
        this.loading = false
        // 提供下一页的请求参数
        this.offset = data.last_id
    },

    handleShowReply (item) {
        globalBus.$emit('reply-show', item)
    }
  }
}
</script>

<style lang="less" scoped>
</style>