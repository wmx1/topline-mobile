<template>
  <div class="home">
    <van-nav-bar title="首页" fixed @click.native="$router.push({ name: 'search' })"/>
    <van-tabs class="channel-tabs" v-model="activeChannelIndex">
       <div slot="nav-right" class="wap-nav" @click="isChannelShow = true">
          <van-icon name="wap-nav" />
      </div>
      <van-tab v-for="(channelItem,index) in channels" :title="channelItem.name" :key="index">
        <van-pull-refresh 
            v-model="channelItem.downPullLoading" 
            @refresh="onRefresh"
            :success-text="channelItem.downPullSuccessText">
          <van-list
            v-model="channelItem.upPullLoading"
            :finished="channelItem.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="articleItem in channelItem.articles"
              :key="articleItem.art_id"
              :title="articleItem.title"
              @click="$router.push({path: '/article'})"
            >
              <div slot="label">
                <template v-if="articleItem.cover">
                  <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="(img,index) in articleItem.cover.images" :key="index">
                      <van-image :src="img" v-lazy="img"/>
                    </van-grid-item>
                  </van-grid>
                </template>
                <p>
                  <span>{{ articleItem.aut_name }}</span>
                  &nbsp;
                  <span>{{ articleItem.comm_count }}评论</span>
                  &nbsp;
                  <span>{{ articleItem.pubdate | relativeTime}}</span>
                  <van-icon class="close" name="close" @click.stop="handleShowMoreAction(articleItem, $event)"/>
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
    <!-- 更多操作的弹窗 -->
    <more-action 
      v-model="isMoreActionShow"
      :current-article="currentArticle"
      @dislike-success="handleDislikeSuccess"
      @add-blacklist-success="handleDislikeSuccess"
    />
    <!-- 我的频道弹出层 -->
    <HomeChannel 
      v-model="isChannelShow"
      :user-channels="channels"
      :active-index.sync="activeChannelIndex"
      />
  </div>
</template>

<script>
import { getUserChannels, getAllChannels } from "@/api/channel";
import { getArticles } from "@/api/article";
import MoreAction from "./components/more-action"
import HomeChannel from "./components/channel"
export default {
  components: {
    MoreAction,
    HomeChannel
  }, 

  data() {
    return {
      activeChannelIndex: 0,
      channels: [],
      active: 0,
      isMoreActionShow: false,
      isChannelShow: false,
      currentArticle: null
    };
  },

  created() {
    this.loadChannels();
  },

  methods: {
    async loadChannels() {
      const { user } = this.$store.state;

      let channels = [];
      // 已登录
      if (user) {
        const data = await getUserChannels();
        channels = data.channels;
      } else {
        // 未登录
        const data = await getAllChannels();
        console.log("未登录的channels", data);
        channels = data.channels;
      }
      //   修改channels
      channels.forEach(item => {
        item.articles = [];
        item.timestamp = Date.now(); //存储下一页数据的时间戳
        item.downPullLoading = false;
        item.upPullLoading = false;
        item.upPullFinished = false;
      });
      this.channels = channels;
    },

    async loadArticles() {
      // const channelId = this.activeChannel.id
      // const timestamp = this.activeChannel.timestamp
      const { id: channelId, timestamp } = this.activeChannel;
      const data = await getArticles({
        channelId, // 当前激活频道id
        timestamp, // 当前频道下一页数据的时间戳
        withTop: 1 // 是否包含置顶数据
      });
      return data;
    },
    // 上拉加载
    async onLoad() {
      await this.$sleep(800);
      let data = [];
      data = await this.loadArticles();
      console.log("第一次加载数据", data);

      if (!data.pre_timestamp && !data.results.length) {
        this.activeChannel.upPullFinished = true;
        this.activeChannel.upPullLoading = false;
        return;
      }
      // pre_timestamp 下一页的页码
      // results 文章列表
      // 解决初始化没数据的问题
      if (data.pre_timestamp && !data.results.length) {
        this.activeChannel.timestamp = data.pre_timestamp;
        data = await this.loadArticles();
        console.log("初始化的数据", data);
      }

      this.activeChannel.timestamp = data.pre_timestamp;
      // data.results需要展开再放到数组里
      this.activeChannel.articles.push(...data.results);
      console.log("channels111", this.channels);
      // 数据加载完毕，取消上拉loading
      this.activeChannel.upPullLoading = false;
    },

    // 下拉刷新
    async onRefresh() {
      const { activeChannel } = this
      // 备份加载下一页数据的时间戳
      const timestamp = activeChannel.timestamp
      // 使用最新时间戳去请求新的推荐数据
      activeChannel.timestamp = Date.now()
      const data = await this.loadArticles()

      if(data.results.length) {
        activeChannel.articles = data.results

        // 由于重置了文章列表，那么当前数据中的pre_timestamp 就是上拉加载更多的下一页数据的时间戳
        activeChannel.timestamp = data.pre_timestamp
        activeChannel.downPullSuccessText = '更新成功'
        // 当下拉刷新有数据并重置以后数据无法满足一屏，所以我们使用 onLoad 再多加载一页数据
        this.onLoad()
      } else {
        activeChannel.downPullSuccessText = '已是最新数据'
      }
      activeChannel.downPullLoading = false
    },

    handleShowMoreAction(article, e) {
      console.log('article', article)
      console.log('event', e)
      this.currentArticle = article
      // e.stopPropagation()
      this.isMoreActionShow = true
    },

    handleDislikeSuccess () {
      console.log('不感')
      const articles = this.activeChannel.articles
      const delIndex = articles.findIndex(item => item === this.currentArticle)
      articles.splice(delIndex, 1)
      this.isMoreActionShow = false
      this.$toast('操作成功')
    }
  },

  computed: {
    //  当前激活的频道
    activeChannel() {
      return this.channels[this.activeChannelIndex];
    }
  }
};
</script>


<style lang="less" scoped>
.channel-tabs {
  margin-bottom: 100px;
}

// 深度作用选择器：https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}

.channel-tabs /deep/ .van-tabs__content {
  margin-top: 100px;
}

.van-tabs__nav .wap-nav {
  position: fixed;
  right: 0;
}

.van-cell__title {
  text-align: left;
}

.channel-tabs .close {
  float: right;
  font-size: 30px;
}

// .channel-tabs {
//   .van-tabs--line .van-tabs__wrap {
//     position: fixed;
//     top: 92px;
//   }
// }
</style>


