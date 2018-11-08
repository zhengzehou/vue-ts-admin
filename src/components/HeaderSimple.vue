<template>
  <header class="app-header navbar">
    <a class="navbar-brand"></a>
  </header>
</template>
<script lang="ts">
import { Component, /* Prop, */ Vue } from 'vue-property-decorator'
import Dropdown from './Dropdown.vue'
@Component({
  components: { Dropdown }
})
export default class HeaderSimple extends Vue {
  Logout(e: Event) {
    e.preventDefault()
    // this.$store
    //   .dispatch('LogOut')
    //   .then(() => {
    //     this.$router.push({ path: '/login' })
    //   })
    //   .catch(err => {
    //     this.$message.error(err)
    //   })
  }
  click() {
    // do nothing
  }
  dropdownItem(item: any) {
    console.log(item)
  }
  sysDropdownItem(item: any) {
    console.log(item)
  }
  sidebarToggle(e: Event) {
    e.preventDefault()
    document.body.classList.toggle('sidebar-hidden')
  }
  sidebarMinimize(e: Event) {
    e.preventDefault()
    document.body.classList.toggle('sidebar-minimized')
  }
  mobileSidebarToggle(e: Event) {
    e.preventDefault()

    document.body.classList.toggle('sidebar-mobile-show')
  }
  asideToggle(e: Event) {
    e.preventDefault()
    document.body.classList.toggle('aside-menu-hidden')
  }
}
</script>

<style type="text/css" scoped>
a {
  color: #2d8cf0;
  background: 0 0;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}
.dropdown-itemp {
  text-align: left;
  font-size: 15px;
  padding: 10px;
}
.header-item .ivu-dropdown-item {
  padding: 15px;
}
.header-item {
  width: 130px;
  height: 55px;
}
.header-item a {
  color: white !important;
}
.nav-link {
  cursor: pointer;
}
.navbar-nav {
  margin: 0;
}
.navbar-nav p {
  margin: 0;
}

.ivu-icon-compose:before {
  content: '\F12C';
  font-family: 'Ionicons';
}
.ivu-icon-stats-bars:before {
  content: '\F2B5';
}
.ivu-icon-cloud:before {
  content: '\F37A';
}
.ivu-icon-trophy:before {
  content: '\F356';
}
*,
:after,
:before {
  box-sizing: border-box;
}
</style>
