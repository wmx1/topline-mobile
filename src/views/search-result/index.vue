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
        v-for="item in list"
        :key="item.art_id"
        :title="item.title"
    >
    </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  data() {
    return {
      list: [],
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
       
        this.list.push(...data.results)

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


