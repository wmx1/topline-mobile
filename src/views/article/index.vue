<template>
  <div class="article-container">
    <!-- 头部导航 -->
    <van-nav-bar title="文章详情" left-arrow left-text="返回" @click-left="$router.back()"></van-nav-bar>
    <div class="article">
      <h2 class="article-title">{{ article.title }}</h2>
    </div>

    <!-- 作者信息 -->
    <!-- <div class="author">
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
    </div> -->
    <auth-info :article="article"></auth-info>

    <div class="content" v-html="article.content"></div>
    <!-- 更多操作 -->
    <more-action :article="article"></more-action>
    <!-- <div class="error">
        <p>
            网络超时，点击 <a href="#">刷新</a>试一试
        </p>
    </div> -->
  </div>
</template>

<script>
import { getArticleDetail } from "@/api/article"
import authInfo from "@/views/article/components/auth-info"
import moreAction from "@/views/article/components/more-action"
export default {
  components: {
      authInfo,
      moreAction
  },

  data() {
    return {
      article: {
        art_id: 12345,
        attitude: 0,
        aut_id: 1,
        aut_name: "森龙",
        aut_photo: "http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU",
        ch_id: 6,
        content: "<p>xxxxxxxxxxxxxxxxxxxxxx</p>",
        is_collected: false,
        is_followed: true,
        pubdate: "2019-07-16T18:16:38",
        recomments: [],
        title: "11111111xxxxxxxxxxx"
      }
    };
  },

  created() {
    // this.loadArticle()
  },

  methods: {
    async loadArticle() {
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "加载中..."
      });
      try {
        const data = await getArticleDetail(this.$route.query.articleId);
        this.article = data;
      } catch (err) {
        this.$toast("加载失败");
      }
      this.$toast.clear();
    }
  }
};
</script>

<style scoped lang="less">
.van-icon-arrow-left:before,
.van-nav-bar__text {
  color: #fff;
}

.article-title {
  font-size: 40px;
  font-weight: 400;
}

.zan {
    text-align: center;
}

.error {
    font-size: 20px;
}
</style>