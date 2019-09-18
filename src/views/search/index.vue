<template>
  <div>
    <!-- Tips: 在 van-search 外层增加 form 标签，并且 action 不为空，即可在 IOS 弹出的输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="searchText"
        show-action
        @search="handleSearch(searchText)"
        @cancel="$router.back()"
      />
    </form>
    <!-- 联想建议 -->
    <van-cell-group v-if="suggestions.length && searchText.length">
        <van-cell 
              v-for="(item, index) in suggestions" 
              :key="index"
              icon="search" 
              @click="handleSearch(item)">
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <div v-html="highlight(item, searchText)"></div>
          </template>
      </van-cell>
    </van-cell-group>

    <!-- 历史记录 -->
      <van-cell-group v-if="searchHistories.length && !searchText">
        <van-cell title="历史记录">
          <van-icon 
            v-show="!isDeleteShow"
            slot="right-icon"
            name="delete"
            style="line-height: inherit;"
            @click="isDeleteShow = true"
            />
            <div v-show="isDeleteShow">
              <span style="margin-right: 10px;" @click="searchHistories = []">全部删除</span>
              <span @click="isDeleteShow = false">完成</span>
            </div>
        </van-cell>
        <van-cell 
              v-for="(item, index) in searchHistories" 
              :key="index"
              :title="item"
              @click="handleSearch(item)">
               <van-icon
                  slot="right-icon"
                  name="close"
                  style="line-height: inherit;"
                  @click="handleDel(index, $event)"
                />

      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
      suggestions: [],
      isDeleteShow: false,
      searchHistories: JSON.parse(window.localStorage.getItem('serach-histories')) || []
    };
  },

  watch: {
    //监听输入数据的变化
    searchText: debounce(async function(text, oldText) {
      text = text.trim()

      //非空判断
      if(!text.length) {
        return
      }

      //请求搜索建议
      try {
        const data = await getSuggestion(text)
        this.suggestions = data.options
      } catch (err) {
        console.log(err)
      }
    }, 500),

    searchHistories () {
      console.log('变化了')
      const data = JSON.stringify(this.searchHistories)
      window.localStorage.setItem('serach-histories', data)
    }
  },

  deactivated () {
    this.$destroy()
  },

  methods: {
    handleSearch(searchText) {
      console.log("searchText", searchText)
      if(!searchText.length) {
        return
      }
      this.searchHistories.unshift(searchText)
      
      //数组去重
      const data = new Set(this.searchHistories)
      //记录搜索历史
      this.searchHistories = Array.from(data)
      

      //跳转路由会销毁组件，所以手动存储一下
      window.localStorage.setItem('serach-histories', JSON.stringify(this.searchHistories))
      // 跳转到搜索结果页面
      this.$router.push({
          name: 'search-result',
          params: {
              q: searchText
          }
      })
      // 或者
      //this.$router.push("/search-result/" + searchText);
      // 或者
      // this.$router.push(`/search-result/${searchText}`)
    },
    //关键词高亮
    highlight (text, keyword) {
        return text.toLowerCase().split(keyword).join(`<span style="color: red;">${keyword}</span>`)
    },

    handleDel(index, event) {
      event.stopPropagation()
      this.searchHistories.splice(index, 1)
    }
   }
};
</script>
<style lang="less" scoped>
</style>

