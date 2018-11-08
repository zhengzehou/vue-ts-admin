<template>
  <div class="app">
    <AppHeader />
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
  // get name() {
  //   return this.$route.name
  // }
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
}
</script>
