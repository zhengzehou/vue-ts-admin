<template>
  <div class="animated fadeIn">
    <div class="ivu-row">
      <div class="scan" v-clickoutside="closeScan">
        <div id="bcid">
          <div style="height:40%"></div>
          <p class="tip">...载入中...</p>
        </div>
        <footer>
          <button @click="restart">重新扫描</button>
          <!-- <button @click="startScan">2.开始扫描</button>
          <button @click="cancelScan">3.结束扫描</button>

          <button @click="closeScan">4.关闭控件</button> -->
        </footer>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import clickoutside from '@/directives/CustomDirectives'
let scan: any = null
let win: any = window
let plus: any = win.plus
@Component
export default class Scan extends Vue {
  codeUrl = ''
  mounted() {
    this.$nextTick(() => {
      this.startRecognize()
      this.startScan()
    })
  }
  restart() {
    this.closeScan()
    this.startRecognize()
    this.startScan()
  }
  //创建扫描控件
  startRecognize() {
    let that = this
    if (!win.plus) return
    scan = new plus.barcode.Barcode('bcid')
    scan.onmarked = onmarked

    function onmarked(type: string, result: string, file: any) {
      switch (type) {
        case plus.barcode.QR:
          type = 'QR'
          break
        case plus.barcode.EAN13:
          type = 'EAN13'
          break
        case plus.barcode.EAN8:
          type = 'EAN8'
          break
        default:
          type = '其它' + type
          break
      }
      result = result.replace(/\n/g, '')
      that.codeUrl = result
      alert(result)
      that.closeScan()
    }
  }
  //开始扫描
  startScan() {
    if (!win.plus) return
    scan.start()
  }
  //关闭扫描
  cancelScan() {
    if (!win.plus) return
    scan.cancel()
  }
  //关闭条码识别控件
  closeScan() {
    if (!win.plus) return
    scan.close()
  }
  plusReady() {
    let that = this
    // 注册返回按键事件
    plus.key.addEventListener(
      'backbutton',
      function(e: Event) {
        // 事件处理
        scan.close() //关闭条码识别控件
        // window.history.back();
        that.$router.back()
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
  }
}
</script>
<style>
.scan {
  height: 100%;
}
.scan #bcid {
  width: 100%;
  height: 500px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 3rem;
  text-align: center;
  color: #fff;
  background: #ccc;
}
.scan footer {
  left: 0;
  bottom: 1rem;
  height: 2rem;
  line-height: 2rem;
  z-index: 2;
}
</style>
