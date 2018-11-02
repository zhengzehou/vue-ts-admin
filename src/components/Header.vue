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
// import clickoutside from '@/directives/CustomDirectives'
let win: any = window
@Component({
  components: { Dropdown }
})
export default class Header extends Vue {
  //   @Prop() private msg!: string
  startX = 0
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
  Logout() {
    this.$store
      .dispatch('LogOut')
      .then(() => {
        this.$router.push({ path: '/login' })
      })
      .catch(err => {
        console.log('Logout', err)
        // this.$message.error(err)
      })
  }
  dropdownItem(item: any) {
    console.log(item)
  }
  sysDropdownItem(item: any) {
    console.log(item)
    if (item.name === 'Logout') this.Logout()
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
  mobileSidebarHide(e: Event) {
    document.body.classList.remove('sidebar-mobile-show')
  }
  mobileSidebarShow(e: Event) {
    document.body.classList.add('sidebar-mobile-show')
  }
  asideToggle(e: Event) {
    e.preventDefault()
    document.body.classList.toggle('aside-menu-hidden')
  }
  plusReady() {
    let that = this
    let plus: any = win.plus
    console.log('header plus>>>', plus)
    // // 隐藏滚动条
    // plus.webview.currentWebview().setStyle({ scrollIndicator: 'none' })
    // Android处理返回键
    plus.key.addEventListener(
      'backbutton',
      function() {
        window.history.go(-1)
        var clickTimes = localStorage.getItem('clickTimes')
          ? Number(localStorage.getItem('clickTimes'))
          : 0
        var firstBackTime = localStorage.getItem('firstBackTime')
          ? Number(localStorage.getItem('firstBackTime'))
          : 0
        if (firstBackTime === 0) {
          localStorage.setItem('firstBackTime', new Date().getTime() + '')
          return
        }
        if (new Date().getTime() - firstBackTime < 2000) {
          clickTimes = 0
          localStorage.setItem('clickTimes', '0')
          if (clickTimes < 1) {
            plus.nativeUI.alert('再按一次系统退出！')
            localStorage.setItem('clickTimes', '1')
          }
          return
        }
        localStorage.setItem('firstBackTime', '')
        localStorage.setItem('clickTimes', '0')
        'iOS' == plus.os.name
          ? plus.nativeUI.confirm(
              '确认退出？',
              function(e: any) {
                if (e.index > 0) {
                  plus.runtime.quit()
                }
              },
              'HelloH5',
              ['取消', '确定']
            )
          : confirm('确认退出？') && plus.runtime.quit()
      },
      false
    )
  }
  created() {
    if (win.plus) {
      this.plusReady()
    } else {
      document.addEventListener('plusready', this.plusReady, false)
    }
    document.addEventListener('touchstart', e => {
      this.startX = e.touches[0].pageX
    })
    document.addEventListener('touchmove', e => {
      var moveEndX = e.changedTouches[0].pageX
      var X = moveEndX - this.startX
      if (X < -50) {
        //左滑
        this.mobileSidebarHide(e)
      } else if (X > 50) {
        //右滑
        this.mobileSidebarShow(e)
      }
    })
    document.addEventListener('touchend', e => {
      var moveEndX = e.changedTouches[0].pageX
      var X = moveEndX - this.startX
      if (X < -200) {
        //左滑
        window.history.go(1)
      } else if (X > 200) {
        //右滑
        window.history.go(-1)
      }
    })
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
