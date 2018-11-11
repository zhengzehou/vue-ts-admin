import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Main from '@/containers/Main.vue'
import Login from '@/containers/Login.vue'
import Scan from '@/containers/Scan.vue'
import FileUpload from '@/containers/FileUpload.vue'

Vue.use(Router)
/* login */
// const Login = _import('login/index')
function getComponent(file: string) {
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  return () => import('@/' + file)
}
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/file', component: FileUpload, hidden: true },
  {
    path: '/',
    redirect: '/dashboard',
    name: '首页',
    component: Main,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
        icon: 'speedometer',
        name: 'Dashboard'
      },
      {
        path: '/components',
        name: '组件',
        icon: 'bookmark',
        component: {
          render(c: any) {
            // { path: '/scan', component: Scan, hidden: true },
            return c('router-view')
          }
        },
        children: [
          {
            path: 'buttons',
            name: '按钮',
            icon: 'social-youtube',
            component: getComponent('views/components/Buttons.vue')
          },
          {
            path: 'alert',
            name: '警告',
            icon: 'alert',
            component: getComponent('views/components/Alerts.vue')
          },
          {
            path: 'card',
            name: 'Card卡片',
            icon: 'ios-browsers-outline',
            component: getComponent('views/components/Cards.vue')
          },
          {
            path: 'iframe',
            name: 'Iframe连接嵌套',
            icon: 'wand',
            component: getComponent('components/Iframe.vue')
          },
          {
            path: 'form',
            name: 'form',
            icon: 'ios-list-outline',
            component: getComponent('views/components/Forms.vue')
          },
          {
            path: 'modal',
            name: 'dialog',
            icon: 'ios-chatbubble-outline',
            component: getComponent('views/components/Dialogs.vue')
          }
        ]
      },
      {
        path: '/scan',
        name: '二维码扫描',
        icon: 'merge',
        component: getComponent('views/components/Scan.vue')
      },
      {
        path: '/pos',
        name: '地理位置',
        icon: 'merge',
        component: getComponent('components/Position.vue')
      },
      {
        path: '/camera',
        name: '相机',
        icon: 'merge',
        component: getComponent('components/Camera.vue')
      }
    ]
  },
  { path: '*', redirect: '/pages/404', hidden: true }
]

export default new Router({
  mode: 'hash',
  // linkActiveClass: 'open active',
  scrollBehavior: () => {
    y: 0
  },
  routes: constantRouterMap
})
export const asyncRouterMap = constantRouterMap.filter(
  (item: any) => item.path === '/'
)
