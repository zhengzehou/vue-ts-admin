<template>
  <div class="app">
    <HeaderSimple />
    <div class="app-body">
      <main class="main page-login">
        <div class="login_card">
          <Card ref="card">
            <!-- <div slot="header" class="clearfix">
                            <span>卡片名称</span>
                            <Button style="float: right; padding: 3px 0" class="ivu-btn-text">操作按钮</Button>
                        </div> -->
            <div v-if="!showQrcodeFlg" class="login_qrcode" @click="getQrcode()"></div>
            <div v-if="showQrcodeFlg" class="login_user_way" @click="hideQrcode()"></div>
            <div class="login_qrcode_after_div"></div>
            <div style="color: #f40;" v-if="showQrcodeFlg" class="passwordLogin_true">手机扫码，安全登录</div>
            <div v-if="!showQrcodeFlg" @click="changeLoginWayPassword()" ng-mouseover="changeLoginCssPassword()" ng-mouseleave="changeLoginMouseAction()" class="passwordLogin_true">密码登录</div>
            <div v-if="!showQrcodeFlg" style="height:300px;">
              <form class="el-form">
                <div class="el-form-item ">
                  <Input prefix-icon="icon-user" size="large" type="text" placeholder="请输入用户名" v-model="userName" />
                </div>
                <div class="el-form-item ">
                  <Input prefix-icon="icon-locked" size="large" type="password" placeholder="请输入密码" v-model="password" />
                </div>
                <div class="el-form-item ">
                  <Button class="ivu-btn-error" style="width:100%;" @click.prevent="login" size="large">登 录</Button>
                </div>
                <div class="el-form-item ">
                  <a style="float: right; padding: 3px 0" class="ivu-btn-text">忘记密码</a>
                </div>
              </form>
            </div>
            <div v-if="showQrcodeFlg" style="height:300px;">
              <div style="display:block;height:200px;padding-top:30px;">
                <QRCode class="qrcode" size="170" :value="qrcodeVal"></QRCode>
                <div v-if="qrcodeCanotUseFlg" class="qrcode_login_msg_err">
                  <h6>二维码已失效</h6>
                  <a href="javascript:;" @click="refreshQrcode()" class="refresh">
                    请点击刷新
                  </a>
                </div>
              </div>
              <div class="login_qrcode_img"></div>
              <div style="color: #f40;" class="comm_cursor_default login_qrcode_img_font">
                打开移动端应用扫一扫登录
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import HeaderSimple from '../components/HeaderSimple.vue'
import AppFooter from '../components/Footer.vue'
import Card from '../components/Card.vue'
import Button from '../components/Button.vue'
import Input from '../components/Input.vue'
import QRCode from '../components/LoginQRCode.vue'
import Component from 'vue-class-component'
import Vue from 'vue'

import {
  qrLogin,
  loginByUsername,
  setCookieToken,
  loadPermission
} from '@/service/login'
import { setTimeout, setInterval } from 'timers'

@Component({
  components: {
    HeaderSimple,
    AppFooter,
    Card,
    Button,
    Input,
    QRCode
  }
})
export default class Login extends Vue {
  showQrcodeFlg = false
  qrcodeCanotUseFlg = false
  counter = 30
  qrcodeVal = ''
  userName = ''
  password = ''
  getQrcode() {
    this.qrLogin()
  }
  hideQrcode() {
    this.showQrcodeFlg = false
  }
  refreshQrcode() {
    this.qrLogin()
  }
  login() {
    let that: any = this
    if (!this.userName || !this.password) {
      that.$message({ message: '用户名或密码不能为空', type: 'error' })
      return
    } else {
      //验证是否含有特殊字符，防止xss注入
      var userNameReg = /^[a-zA-Z0-9_]{3,20}$/
      var passwordReg = /['!<>%;]{1,}/
      if (!userNameReg.test(this.userName)) {
        that.$message({ message: '用户名输入不合法', type: 'error' })
        return
      }
      if (passwordReg.test(this.password)) {
        that.$message({ message: '密码中输入了不合法字符', type: 'error' })
        return
      }
    }
    const loading = that.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'ivu-icon-load-c ivu-load-loop',
      background: 'rgba(0, 0, 0, 0.1)'
    })
    loginByUsername(this.userName, this.password)
      .then((_: any) => {
        loading.close()
        if (_.data.status !== 200) {
          // that.$message({ message: _.data.message, type: 'error' })
          that.$alert(_.data.message)
          return
        }
        var token = _.data.data
        setCookieToken(this.userName, token)
        that.$store.state.user.name = that.userName
        that.$store.state.user.token = token
        // store.state.user.roles
        // store.state.user.name
        // store.state.user.email
        // store.state.permission.siderbar_routers
        let redirect = decodeURIComponent(this.$route.query.redirect || '/')
        that.$router.push({ path: redirect })
      })
      .catch(_ => {
        that.$message({ message: _.message, type: 'error' })
        console.log('catch>>>>>>>>', _)
        loading.close()
      })
  }
  qrLogin() {
    this.counter = 30
    let that = this
    qrLogin().then(_ => {
      console.log(_)
      that.qrcodeVal = _.data
      that.showQrcodeFlg = true
      that.qrcodeCanotUseFlg = false
      that.counterExec()
    })
  }
  counterExec() {
    setTimeout(this.countDown, 1000)
  }
  countDown() {
    let that = this
    if (that.counter > 0) {
      that.counter--
      this.counterExec()
    } else {
      that.qrcodeCanotUseFlg = true
    }
  }

  mounted() {
    this.$nextTick(() => {})
  }
  get list() {
    return this.$route.matched
  }
}
</script>
<style>
.el-form-item {
  margin-bottom: 32px;
}
</style>

