<template>
  <div>
    <QRCodeVue :value="value" :size="size" level="H" style="text-align:center;"></QRCodeVue>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import QRCodeVue from 'qrcode.vue'

@Component({
  components: { QRCodeVue },
  props: {
    value: { type: String },
    size: { type: [Number, String], default: 200 }
  }
})
export default class LoginQRCode extends Vue {}
</script>
