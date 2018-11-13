import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import message from '@/components/message'
import messagebox from '@/components/messagebox'
import loading from '@/components/loading'
import BizMessageBox from '@/components/bizmessagebox'
Vue.use(message)
Vue.use(messagebox)
Vue.use(loading)
Vue.use(BizMessageBox)
import { getCookieToken } from '@/service/login'
// import VueHtml5Plus from 'vue-html5plus.js'
// Vue.use(VueHtml5Plus)
Vue.config.productionTip = false
let whiteList: Array<String> = []
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // next({ path: '/' })
    next()
    return
  }
  // 判断是否有token
  // store.state.user.token
  if (store.getters.token || getCookieToken()) {
    next()
    // if (store.getters.roles.length === 0) {
    // 判断当前用户是否已拉取完user_info信息
    // store
    //   .dispatch('GetInfo')
    //   .then(res => {
    //     // 拉取user_info
    //     const roles = res.data.role
    //     store.dispatch('GenerateRoutes', { roles }).then(() => {
    //       // 生成可访问的路由表
    //       router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
    //       next({ ...to }) // hack方法 确保addRoutes已完成
    //     })
    //   })
    //   .catch(() => {
    //     store.dispatch('FedLogOut').then(() => {
    //       next({ path: '/login' })
    //     })
    //   })
    // } else {
    // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
    // if (hasPermission(store.getters.roles, to.meta.role)) {
    //   next()//
    // } else {
    //   next({ path: '/', query: { noGoBack: true } })
    // }
    // 可删 ↑
    // }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      // NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
