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
                  <Button class="ivu-btn-error" style="width:100%;" size="large">登 录</Button>
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

import { qrLogin } from '@/service/login'
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
  qrcodeVal = '1111111111111111111'
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
.input--large {
  font-size: 18px;
}
.ivu-btn-large {
  padding: 7px 15px 9px;
  font-size: 16px;
  border-radius: 4px;
  font-weight: 900;
}
.input--large .input-inner {
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  padding-left: 40px;
}
.input--large .input-prefix {
  font-size: 30px;
  margin-left: 10px;
  top: 5px;
}
.page-login {
  background-image: url(../../static/img/oa_bg.png);
  background-repeat: no-repeat;
}
.el-form {
  padding: 10px;
}
.el-form-item {
  margin-bottom: 32px;
}
.login_card {
  width: 420px;
  float: right;
  margin-right: 15%;
  margin-top: 50px;
}
.login_user_way {
  float: right;
  position: relative;
  left: 12px;
  top: -12px;
  width: 64px;
  height: 64px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-image: url(../../static/img/login_b.png);
  background-position: -96px -406px;
}
.login_qrcode {
  float: right;
  position: relative;
  left: 12px;
  top: -12px;
  width: 64px;
  height: 64px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-image: url(../../static/img/login_b.png);
  background-position: -96px -339px;
}
.login_qrcode_img {
  background-image: url(../../static/img/login_b.png);
  background-position: -115px -473px;
  float: left;
  position: relative;
  left: 40px;
  top: 20px;
  width: 45px;
  height: 45px;
  cursor: default;
  background-repeat: no-repeat;
}
.qrcode {
  margin-left: 88px;
  width: 200px;
  height: 170px;
}
.qrcode_login_msg_err {
  width: 200px;
  height: 180px;
  background: rgba(255, 255, 255, 0.95);
  position: relative;
  margin-top: -180px;
  margin-left: 88px;
  z-index: 9999;
}
.qrcode_login_msg_err h6 {
  color: #3c3c3c;
  padding-top: 62px;
  margin-bottom: 8px;
  cursor: default;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
}
.qrcode_login_msg_err .refresh {
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin: 0 auto;
  background: #f40;
  display: block;
  color: #fff;
  border-radius: 3px;
}
.comm_cursor_default {
  cursor: default !important;
}
.login_qrcode_img_font {
  float: left;
  position: relative;
  font-size: 16px;
  left: 50px;
  top: 32px;
}
.login_login_title {
  display: inline-block;
}
.passwordLogin_true {
  font-size: 20px;
  padding-bottom: 5px;
  font-weight: 700;
  padding-left: 10px;
  /* border-bottom: 2px solid red;
  color: red; */
}
.icon-user:before {
  color: #59ce81;
  content: '\f3a0';
}
.icon-locked:before {
  color: #59ce81;
  content: '\f458';
}
@media screen and (max-width: 800px) and (min-width: 650px) {
  /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
  .login_card {
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 50px;
  }
  .qrcode_login_msg_err {
    margin-left: auto;
    margin: 0 auto;
    margin-top: -180px;
  }
  body {
    min-width: 580px;
    overflow-x: scroll;
  }
}

@media screen and (max-width: 649px) {
  .login_card {
    width: 100%;
    float: right;
    margin-right: 0px;
    margin-top: 50px;
  }
  .qrcode {
    margin-left: auto;
    margin: 0 auto;
  }
  .qrcode_login_msg_err {
    margin-left: auto;
    margin: 0 auto;
    margin-top: -180px;
  }
  body {
    width: 100%;
  }
}
</style>

