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
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    handleSearch(searchText) {
      console.log("searchText", searchText);
      // 跳转到搜索结果页面
      // this.$router.push({
      //     name: 'search-result',
      //     params: {
      //         q: searchText
      //     }
      // })
      // 或者
      this.$router.push("/search-result/" + searchText);
      // 或者
      // this.$router.push(`/search-result/${searchText}`)
    }
  }
};
</script>
<style lang="less" scoped>
</style>

