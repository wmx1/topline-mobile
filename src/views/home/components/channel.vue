<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '95%' }"
  >
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
            @click="isEdit = !isEdit"
          >{{ isEdit == true ? '完成' : '编辑' }}</van-button>
        </div>
      </div>
      <van-grid :column-num="4">
        <van-grid-item
          class="red"
          v-for="(channel, index) in userChannels"
          :key="index"
          @click="handleUserClickChannel(channel, index)"
        >
          <span :class="['text', {active: activeIndex === index}]">{{ channel.name }}</span>
          <van-icon
            name="close"
            class="close-icon"
            v-show="isEdit && !aliveChannels.includes(channel.name)"
          />
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 推荐频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">推荐频道</span>
          <span class="desc">点击添加</span>
        </div>
      </div>
      <van-grid :gutter="10" class="channel-content">
        <van-grid-item
          v-for="(item,index) in allChannels"
          :key="item.id"
          @click="handleAddChannel(item, index)"
        >
          <div class="info">
            <span class="text">{{ item.name }}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import {
  deleteUserChannel,
  getAllChannels,
  resetUserChannels
} from "@/api/channel";
export default {
  name: "HomeChannel",
  data() {
    return {
      isEdit: false,
      aliveChannels: ["推荐"],
      allChannels: []
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userChannels: {
      type: Array,
      default: []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  created() {
    console.log("user", this.user);
    this.loadAllChannels();
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  },

  methods: {
    async loadAllChannels() {
      const data = await getAllChannels();
      console.log("111", data);
      data.channels.forEach(item => {
        item.articles = []; // 用来存储当前文章的列表
        item.timestamp = Date.now(); // 存储下一页数据的时间戳
        item.downPullLoading = false; // 控制当前频道的下拉刷新 loading 状态
        item.upPullLoading = false; // 控制当前频道的上拉加载更多的 loading 状态
        item.upPullFinished = false; // 控制当前频道数据是否加载完毕
      });
      this.allChannels = data.channels;
    },

    changeChannel(index) {
      this.$emit("update:active-index", index);
      this.$emit("input", false);
    },

    async deleteChannel(channel, index) {
      this.userChannels.splice(index, 1);
      if (this.user) {
        await deleteUserChannel(channel.id);
        return;
      }
      // 未登录，删除本地存储的数据
      window.localStorage.setItem(
        "channels",
        JSON.stringify(this.userChannels)
      );
    },

    handleUserClickChannel(channel, index) {
      if (!this.isEdit) {
        this.changeChannel(index);
      } else {
        !this.aliveChannels.includes(channel.name) &&
          this.deleteChannel(channel, index);
      }
    },

    async handleAddChannel(channel, index) {
      // 将点击添加的频道添加到用户频道中
      console.log(this.userChannels.includes(channel))
      const isIncludeUserChannel = this.userChannels.includes(channel)
        if(!isIncludeUserChannel) {
          this.userChannels.push(channel);
        } 
      
      // console.log("this.userChannels", this.userChannels);
      // 持久化
      // if(this.user) {
      //   const data = this.userChannels.splice(1).map((item, index) => {
      //     return {
      //       id: item.id,
      //       seq: index + 2
      //     }
      //   })
      //   console.log('333', data)

      //   await resetUserChannels(data)
      //    return
      // }

      // 如果未登录， 则将数据持久化到本地存储
      window.localStorage.setItem(
        "channels",
        JSON.stringify(this.userChannels)
      );
    }
  }
};
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px;
    padding: 10px;
    height: 90px;
    .desc {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .text {
    font-size: 24px;
  }
  .active {
    color: red;
  }
}

.van-grid-item__text {
  color: red;
}

.close-icon {
  font-size: 30px;
  position: absolute;
  right: 1px;
  top: -3px;
}
</style>

