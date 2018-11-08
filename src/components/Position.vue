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
<script >
import BMap from 'BMap'
// declare var BMap: any
// let win: any = window
// let plus: any = win.plus
export default ({
  data () {
    return {
      title: 'hello vue-html5plus!',
      city: '',
      networkType: '',
    }
  },
  mounted () {
    let that = this
    var geolocation = new BMap.Geolocation();
    //调用百度地图api 中的获取当前位置接口
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        //获取当前位置经纬度
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (result) {
          if (result) {
            var lat = r.point.lat;
            var lon = r.point.lng;
            var point = new BMap.Point(lon, lat) // 创建坐标点
            myGeo.getLocation(point, function (result) {
              var city = result.addressComponents.city
              // address 具体地址
              // addressComponents 省市县
              that.city = city
              that.networkType = JSON.stringify(result)
            })
          }
        });
      }
    })
  },
  // plusReady() {
  //   let self: any = this
  //   // 获取定位信息
  //   self.$geolocation.getCurrentPosition().then(function(position: any) {
  //     self.city = position.address.city
  //   })
  //   // 获取网络信息
  //   self.networkType = self.$network.getCurrentNetworkType()
  // }
  created () {
    // if (win.plus) {
    //   console.log('scan created by call plusReady')
    //   this.plusReady()
    // } else {
    //   console.log('scan created by  addEventListener')
    //   document.addEventListener('plusready', this.plusReady, false)
    // }
  }
})
</script>
</body>
</html>