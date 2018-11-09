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
      { path: '/dashboard', component: Dashboard, name: 'Dashboard' },
      {
        path: '/components',
        name: '组件',
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
            component: getComponent('views/components/Buttons.vue')
          },
          {
            path: 'alert',
            name: '警告',
            component: getComponent('views/components/Alerts.vue')
          },
          {
            path: 'card',
            name: 'Iframe',
            component: getComponent('components/Iframe.vue')
          },
          {
            path: 'form',
            name: 'form',
            component: getComponent('views/components/Forms.vue')
          },
          {
            path: 'modal',
            name: 'dialog',
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
  }
] // redirect: '/components/buttons',
// {
//   path: '/pages',
//   redirect: '/pages/p404',
//   name: 'Pages',
//   component: {
//     // render(c: (view: string) => void) {
//     //   return c('router-view')
//     // }
//     // Full,
//   }
//   // children: [
//   //   {
//   //     path: '404',
//   //     name: 'Page404',
//   //     component: _import('errorPages/Page404')
//   //   },
//   //   { path: '500', name: 'Page500', component: _import('errorPages/Page404') }
//   // ]
// }

export default new Router({
  mode: 'hash',
  // linkActiveClass: 'open active',
  scrollBehavior: () => {
    y: 0
  },
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/',
    redirect: '/dashboard',
    name: '首页',
    hidden: false,
    component: Main,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'speedometer',
        component: getComponent('views/Dashboard.vue')
      },
      {
        path: '/dateTables',
        name: 'DateTables',
        icon: 'speedometer',
        component: getComponent('components/DateTables.vue')
      },
      { path: '/introduction', name: '介绍', icon: 'thumbsup' },
      {
        path: '/components',
        name: 'component组件',
        redirect: '/components/buttons',
        icon: 'bookmark',
        component: { render: (h: any) => h('router-view') },
        children: [
          {
            path: 'buttons',
            name: 'Buttons按钮',
            icon: 'social-youtube',
            component: getComponent('views/components/Buttons.vue'),
            hidden: false
          },
          {
            path: 'alert',
            name: 'Alert警告提示',
            icon: 'alert',
            component: getComponent('views/components/Alerts.vue')
          },
          {
            path: 'card',
            name: 'Card卡片',
            icon: 'ios-browsers-outline',
            component: getComponent('views/components/Cards.vue')
          },
          { path: 'iframe', name: 'Iframe连接嵌套', icon: 'wand' },
          { path: 'hoverbuttons', name: '悬停特效按钮', icon: 'wand' },
          {
            path: 'datepicker',
            name: 'DatePicker',
            icon: 'ios-calendar-outline'
          },
          {
            path: 'form',
            name: 'Form表单',
            icon: 'ios-list-outline',
            component: getComponent('views/components/Forms.vue')
          },
          {
            path: 'modal',
            name: 'Modal对话框',
            icon: 'ios-chatbubble-outline'
          },
          { path: 'select', name: 'Select选择器', icon: 'ios-arrow-down' },
          { path: 'spin', name: 'Spin加载中', icon: 'load-d ' },
          { path: 'steps', name: 'Steps步骤条', icon: 'ios-checkmark-outline' },
          {
            path: 'timeline',
            name: 'Timeline时间轴',
            icon: 'android-more-vertical'
          },
          {
            path: 'transfer',
            name: 'Transfer穿梭框',
            icon: 'ios-pause-outline'
          },
          { path: 'timepicker', name: 'Timepicker', icon: 'ios-clock-outline' },
          {
            path: 'upload',
            name: 'Upload上传',
            icon: 'ios-cloud-upload-outline'
          }
        ]
      },
      {
        path: '/charts',
        name: 'echart图表',
        redirect: '/charts/shopchart',
        icon: 'pie-graph',
        component: {},
        children: [
          {
            path: 'shopchart',
            name: '商场统计图表',
            icon: 'stats-bars',
            hidden: false
          },
          { path: 'radarchart', name: '雷达图', icon: 'arrow-graph-up-right' },
          { path: 'cakechart', name: '蛋糕销量图表', icon: 'ios-analytics' }
        ]
      },
      {
        path: '/table',
        name: '表格综合实例',
        icon: 'ios-paper',
        meta: { role: ['admin'] }
      },
      { path: '/jsontree', name: 'JSON视图', icon: 'merge' },
      {
        path: '/scan',
        name: '二维码扫描',
        icon: 'merge'
      },
      {
        path: '/pos',
        name: '地理位置',
        icon: 'merge'
      },
      {
        path: '/camera',
        name: '相机',
        icon: 'merge'
      },
      { path: '/tabledetail/:id', name: 'TableDetail', hidden: true },
      { path: '/tinymce', name: 'Tinymce编辑器', icon: 'android-document' },
      { path: '/markdown', name: 'Markdown', icon: 'android-list' }
    ]
  },
  { path: '*', redirect: '/pages/404', hidden: true }
] //   render: h => h('router-view')
