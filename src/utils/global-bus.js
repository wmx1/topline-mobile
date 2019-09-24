import Vue from 'vue'
// 创建并返回一个新的Vue实例
// 这个Vue实例和main.js中的Vue实例没有关系

export default new Vue()
// Vue 实例有两个方法：
// $on   监听一个自定义事件
// $emit 发布一个自定义事件
// 我们可以利用这个 Vue 实例在任何需要通信的组件中去 $on、$emit
// 为什么单独创建一个 Vue实例？组件不都是 Vue 的实例成员？
// 这主要是为了保持它的单独性，如果你在组件中去 this.$emit ，它是向上发布事件的