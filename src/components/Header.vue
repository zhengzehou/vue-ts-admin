<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <a class="navbar-brand"></a>
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item">
        <a class="nav-link navbar-toggler sidebar-toggler" @click="sidebarMinimize">&#9776;</a>
      </li>
    </ul>
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item header-item">
        <router-link tag="div" to='/' style="height:55px;" class="nav-link">
          <p>
            <i class="ivu-icon ivu-icon-compose" style="font-size: 30px; color: rgb(45, 140, 240);"></i>
          </p>
          <p style="color:white"> 留言管理 </p>
        </router-link>
      </li>
      <li class="nav-item header-item">

        <router-link tag="div" to='/home1' style="height:55px;" class="nav-link">
          <p>
            <i class="ivu-icon ivu-icon-stats-bars" style="font-size: 30px; color: rgb(45, 140, 240);"></i>
          </p>
          <p style="color:white"> 浏览排行 </p>
        </router-link>

      </li>

      <li class="nav-item header-item">
        <router-link tag="div" to='/' style="height:55px;" class="nav-link">
          <dropdown @dropdown-item="dropdownItem" layout="vertical" icon="ivu-icon-cloud" icon-color="rgb(45, 140, 240)" :dropdown-items="cloudDropdown"></dropdown>
        </router-link>
      </li>

      <li class="nav-item header-item">
        <router-link tag="div" to='/home1' style="height:55px;" class="nav-link">
          <p>
            <i class="ivu-icon ivu-icon-trophy" style="font-size: 30px; color: rgb(45, 140, 240);"></i>
          </p>
          <p style="color:white"> 销量排行 </p>
        </router-link>
      </li>
    </ul>

    <ul class="nav navbar-nav ml-auto">
      <!-- <li class="nav-item d-md-down-none">
                <a class="nav-link">
                    <i class="ivu-icon ivu-icon-android-notifications" style="font-size: 20px;"></i>
                    <span class="badge badge-pill badge-danger">5</span>
                </a>
            </li> -->
      <dropdown @dropdown-item="sysDropdownItem" :dropdown-items="sysDropdwon" imgUrl="http://herozhou.coding.me/vue-framework-wz/static/img/avatars/6.jpg"></dropdown>
      <li class="nav-item d-md-down-none">
        <!-- <a class="nav-link navbar-toggler aside-menu-toggler" @click="asideToggle">&#9776;</a> -->
      </li>
    </ul>
  </header>
</template>
<script lang="ts">
import { Component, /* Prop, */ Vue } from 'vue-property-decorator'
import Dropdown from './Dropdown.vue'
@Component({
  components: { Dropdown }
})
export default class Header extends Vue {
  //   @Prop() private msg!: string
  cloudDropdown = [
    {
      name: 'Linux'
    },
    {
      name: 'Mac OS X'
    },
    {
      name: 'Windows'
    },
    {
      name: 'Core OS'
    }
  ]
  sysDropdwon = [
    {
      name: 'Updates',
      hasBadge: true,
      badge: '42',
      badgeClass: 'badge-info',
      icon: 'ivu-icon-alert'
    },
    {
      name: 'Messages',
      hasBadge: true,
      badge: '42',
      badgeClass: 'badge-success',
      icon: 'ivu-icon-chatbox-working'
    },
    {
      name: 'Profile',
      hasBadge: false,
      icon: 'ivu-icon-contact',
      divided: true
    },
    {
      name: 'Settings',
      hasBadge: false,
      icon: 'ivu-icon-settings'
    },
    {
      name: 'Logout',
      icon: 'ivu-icon-power'
    }
  ]
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
@font-face {
  font-family: Ionicons;
  src: url(/static/fonts/icomoon.ttf) format('truetype'),
    url(/static/fonts/icomoon.svg) format('svg');
  font-weight: 400;
  font-style: normal;
}
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
