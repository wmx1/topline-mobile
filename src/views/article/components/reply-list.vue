<template>
  <div>
    <van-popup v-model="isShow" position="bottom" :style="{ height: '75%' }">
      <van-nav-bar :title="`${comment.reply_count}条回复`" @click-left="isShow = false">
        <van-icon slot="left" name="cross"></van-icon>
      </van-nav-bar>
      <van-cell>
        <div slot="icon">
          <img class="avatar" :src="comment.aut_photo" alt />
        </div>
        <div slot="title" style="display: flex; align-items: center;">
          <span>{{ comment.aut_name }}</span>
          <van-tag>楼主</van-tag>
        </div>
        <div slot="label">
          <p>{{ comment.content }}</p>
          <p>
            <span>{{ comment.pubdate | relativeTime }}</span>
          </p>
        </div>
      </van-cell>

      <!-- 回复的评论列表 -->
      <div class="reply">
         <comment v-if="isShow" :source="comment.com_id" :is-article="false" />
      </div>
      <!-- /回复的评论列表 -->

      <!-- 对回复添加评论 -->
      <add-comment 
        class="add-comment"
        v-if="isShow"
        :target="comment.com_id"
        :article-id="articleId"
        />
    </van-popup>
  </div>
</template>

<script>
import globalBus from "@/utils/global-bus"
import comment from "@/views/article/components/comment"
import AddComment from './add-comment'
export default {
  components: {
    comment,
    AddComment
  },

  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      isShow: false,
      comment: {}
    };
  },

  created() {
    // 使用箭头函数this指向VueComponent，不使用箭头函数时 this指向Vue实例
    globalBus.$on("reply-show", item => {
      console.log("this", this);
      this.isShow = true;
      console.log("this.isShow", this.isShow);
      this.comment = item;
    });
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar .van-icon {
  color: #fff;
}

.van-list {
  margin-top: 15px;
}

.reply {
    margin-left: 25px;
}

.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
}
</style>