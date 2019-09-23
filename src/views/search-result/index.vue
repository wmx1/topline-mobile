<template>
  <div class="scroll-container">
    <van-nav-bar fixed left-arrow :title="q + ' 的搜索结果'" @click-left="$router.back()" />
   <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
    <van-cell
        v-for="articleItem in articles"
        :key="articleItem.art_id"
        :title="articleItem.title"
    >
      <div slot="label">
        <template v-if="articleItem.cover.type">
            <van-grid :border="false" :column-num="3">
              <van-grid-item
                  v-for="(img, index) in articleItem.cover.images" 
                  :key="index"
              >
                <van-image :src="img" lazy-load></van-image>
              </van-grid-item>
            </van-grid>
        </template> 
        <p>
          <span>{{ articleItem.aut_name }}</span>
          &nbsp;
          <span>{{ articleItem.comm_count }}</span>
          &nbsp;
          <span>{{ articleItem.pubdate }}</span>
          &nbsp;
        </p>
        <van-grid :column-num="3">
            <van-grid-item @click="$isLogin()" text="评论"/>
            <van-grid-item text="点赞"/>
            <van-grid-item text="分享"/>
        </van-grid>
      </div>
    </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      q: this.$route.params.q,
      page: 1,
    };
  },

  methods: {
    async onLoad() {
        const data = await getSearch({
            q: this.q,
            page: this.page,
            perPage: 10
        })
        
        if(!data.results.length) {
          //取消loading
          this.loading = false

          //设置数据加载结束
          this.finished = true
          return
        }
       
        this.articles.push(...data.results)

        this.page += 1
        // 加载状态结束
        this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-icon-arrow-left:before {
  color: #fff;
}

.van-list {
    margin-top: 75px;
    // height: 500px;
}

// .scroll-container {
//     position: absolute;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
// }
</style>


