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
// import BMap from 'BMap'
declare var BMap: any
let win: any = window
let plus: any = win.plus
@Component
export default class PositionVue extends Vue {
  title = 'hello vue-html5plus!'
  city = ''
  networkType = ''
  mounted() {
    let script = document.createElement('script')
    script.src =
      'http://api.map.baidu.com/api?ak=Zz8ZlyShhuYwxEWSN2SHcmtKsR8So8yc&v=2.0&services=false'
    document.body.appendChild(script)
    this.$nextTick(() => {
      navigator.geolocation.getCurrentPosition(
        // 该函数有如下三个参数
        function(pos) {
          // 如果成果则执行该回调函数
          var lat = pos.coords.latitude
          var lon = pos.coords.longitude
          // var map = new BMap.Map("allmap");          // 创建地图实例
          var point = new BMap.Point(lon, lat) // 创建坐标点
          // 根据坐标得到地址描述
          var myGeo = new BMap.Geocoder()
          myGeo.getLocation(point, function(result: any) {
            var city = result.addressComponents.city
            // address 具体地址
            // addressComponents 省市县
            alert(JSON.stringify(result))
          })
        },
        function(err) {
          // 如果失败则执行该回调函数
          alert(err.message)
        },
        {
          // 附带参数
          enableHighAccuracy: false, // 提高精度(耗费资源)
          timeout: 3000, // 超过timeout则调用失败的回调函数
          maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
        }
      )
    })
  }
  // plusReady() {
  //   let self: any = this
  //   // 获取定位信息
  //   self.$geolocation.getCurrentPosition().then(function(position: any) {
  //     self.city = position.address.city
  //   })
  //   // 获取网络信息
  //   self.networkType = self.$network.getCurrentNetworkType()
  // }
  created() {
    // if (win.plus) {
    //   console.log('scan created by call plusReady')
    //   this.plusReady()
    // } else {
    //   console.log('scan created by  addEventListener')
    //   document.addEventListener('plusready', this.plusReady, false)
    // }
  }
}
</script>
</body>
</html>