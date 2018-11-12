<template>
  <div class="app">
    <AppHeader :title="title" />
    <div class="app-body">
      <Sidebar />
      <main class="main">
        <breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <!-- <AppAside/> -->
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import AppHeader from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
// import AppAside from '../components/Aside.vue'
import AppFooter from '../components/Footer.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import Component from 'vue-class-component'
import Vue from 'vue'
import { loadPermission } from '@/service/login'
@Component({
  components: {
    AppHeader,
    Sidebar,
    // AppAside,
    AppFooter,
    Breadcrumb
  }
})
export default class Main extends Vue {
  get title() {
    return '集采用户中心'
  }
  // get list() {
  //   return this.$route.matched
  // }
  // breadcrumbList = [
  //   { name: '首页', path: '/' },
  //   { name: '组件', path: '/components' },
  //   { name: 'Dashboard' }
  // ]
  get list() {
    return this.$route.matched
  }
  created() {
    let that: any = this
    //load user permission and menus
    loadPermission()
      .then((_: any) => {
        if (_.data.status !== 200) {
          that.$message({ message: _.data.message, type: 'warning' })
          return
        }
        that.$store.state.permission.routers = _.data.data
      })
      .catch((_: any) => {
        that.$message({ message: _.message, type: 'error' })
      })
  }
}
</script>
