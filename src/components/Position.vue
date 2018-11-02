<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <h1 class="mui-title">{{title}}</h1>
    </header>
    <div class="mui-content mui-content-padded">
      <p>定位城市：{{city}}</p>
      <p>网络信息：{{networkType}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
// import VueHtml5Plus from 'vue-html5plus';
// Vue.use(VueHtml5Plus);
let win: any = window
let plus: any = win.plus
@Component
export default class PositionVue extends Vue {
  title = 'hello vue-html5plus!'
  city = ''
  networkType = ''
  mounted() {
    console.log('Vue.os>>>>' + JSON.stringify(win.os))
  }
  plusReady() {
    let self: any = this
    // 获取定位信息
    self.$geolocation.getCurrentPosition().then(function(position: any) {
      self.city = position.address.city
    })
    // 获取网络信息
    self.networkType = self.$network.getCurrentNetworkType()
  }
  created() {
    if (win.plus) {
      console.log('scan created by call plusReady')
      this.plusReady()
    } else {
      console.log('scan created by  addEventListener')
      document.addEventListener('plusready', this.plusReady, false)
    }
  }
}
</script>
</body>
</html>