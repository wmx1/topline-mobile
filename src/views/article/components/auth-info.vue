<template>
  <div class="author">
    <van-image
      round
      width="1.5rem"
      height="1.5rem"
      fit="fill"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
    <div class="text">
      <p class="name">{{ article.aut_name }}</p>
      <p class="time">{{ article.pubdate | relativeTime}}</p>
    </div>
    <van-button round size="small" type="info">+ 关注</van-button>
  </div>
</template>

<script>
export default {
    props: {
        article: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style lang="less" scoped>
.author {
  padding: 10px 0;
  display: flex;
  .text {
    flex: 1;
    padding-left: 20px;
    line-height: 2;
    font-size: 24px;
    .name {
      // font-size: 16px;
      margin: 0;
    }
    .time {
      margin: 0;
      // font-size: 14px;
      color: #999;
    }
  }
}

.van-image /deep/ img {
  border-radius: 50%;
}
</style>