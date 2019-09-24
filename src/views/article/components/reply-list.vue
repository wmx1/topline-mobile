<template>
    <div>
        <van-popup 
            v-model="isShow"
            position="bottom"
            :style="{ height: '75%' }"
        >
        11111111
            <!-- <van-nav-bar
                :title=""
            >

            </van-nav-bar> -->
        </van-popup>
    </div>
</template>

<script>
import globalBus from '@/utils/global-bus'
export default {
    data () {
        return {
            isShow: false
        }
    },

    created () {
        // 使用箭头函数this指向VueComponent，不使用箭头函数时 this指向Vue实例
        globalBus.$on('reply-show', (item) => {
            console.log('this', this)
            this.isShow = true
             console.log('this.isShow', this.isShow)
        })
    }
}
</script>