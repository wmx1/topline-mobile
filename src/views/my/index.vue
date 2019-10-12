<template>
  <div>
       <!-- 未登录 -->
    <div class="not-login">
      <div class="circle" @click="$router.push({ name: 'login' })">
        <span>登录</span>
      </div>
    </div>
    <!-- /未登录 -->
    <!-- 用户信息 -->
    <van-cell-group class="user-info">
      <van-cell class="base-info" is-link :border="false">
        <div slot="title">
          <img class="avatar" src="http://toutiao.meiduo.site/FgSTA3msGyxp5-Oufnm5c0kjVgW7" alt />
          <span class="title">只是为了好玩</span>
        </div>
      </van-cell>
      <van-grid class="data-info">
        <van-grid-item>
          <span class="count">1</span>
          <span class="text">头条</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">8</span>
          <span class="text">关注</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">10</span>
          <span class="text">粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">8</span>
          <span class="text">获赞</span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 其他 -->
    <van-cell-group >
      <van-grid>
        <van-grid-item icon="star" text="我的收藏"></van-grid-item>
        <van-grid-item icon="chat" text="我的评论"></van-grid-item>
        <van-grid-item icon="like" text="我的点赞"></van-grid-item>
        <van-grid-item icon="browsing-history" text="浏览历史"></van-grid-item>
      </van-grid>
    </van-cell-group>
     <van-cell-group>
         <van-cell title="消息通知" is-link></van-cell>
         <van-cell title="用户反馈" is-link></van-cell>
         <van-cell title="小智同学" is-link></van-cell>
         <van-cell title="系统设置" is-link></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {    

  };
</script>

<style lang="less" scoped>
// .user-info {
//   .avatar {
//       vertical-align: middle;
//   }
// }
.not-login {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 50px;
    height: 50px;
    padding: 20px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
}
.user-info {
  .base-info {
      display: flex;
      align-items: center;
      div {
        display: flex;
        align-items: center;
        .avatar {
            margin-right: 15px;
            width: 50px;
        }
      }
  }
  .data-info {
      .text {
          font-size: 28px;
      }
      .count {
          font-size: 24px;
      }
  }  
}
</style>