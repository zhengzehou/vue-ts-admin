<template>
  <div class="animated fadeIn">
    <Iframe src="http://opc.beta.ule.com/fxRuralOpcMarketing/fxPreSell/toFxPreSellList"></Iframe>
    <div class="ivu-row">
      <div class="col col-span-24">
        <Button @click="dialogVisible = true">打开对话框</Button>
        <Button @click="toast">打开提示框toast</Button>
        <Button @click="alert">打开提示框alert</Button>
        <Button @click="confirm">打开提示框confirm</Button>
        <Button @click="promt">打开提示框promt</Button>
        <Button @click="defaultDialog">打开提示框default</Button>
        <Button @click="loading">Loading</Button>
        <Dialog title="提示" :visible.sync="dialogVisible" width="300px" top="150px" :before-close="handleClose">
          <span>这是一段信息</span>
          <div>
            <Input placeholder="input your message" v-model="inputMsg" />
          </div>
          <span slot="footer" class="dialog-footer">
            <Button @click="dialogVisible = false">取 消</Button>
            <Button type="primary" @click="ok">确 定</Button>
          </span>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Iframe from '@/components/Iframe.vue'
@Component({
  components: { Button, Input, Dialog, Iframe }
})
export default class Dialogs extends Vue {
  dialogVisible = false
  inputMsg = ''
  handleClose() {
    alert('handleClose')
  }
  ok() {
    alert(this.inputMsg)
  }
  loading() {
    let that: any = this
    const loading = that.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'ivu-icon-load-c ivu-load-loop',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    setTimeout(() => {
      loading.close()
    }, 2000)
  }
  toast() {
    let that: any = this
    that.$message({ message: '这是一个message', duration: 5000, type: 'error' })
  }
  defaultDialog() {
    let that: any = this
    that.$alert('这是一段内容', '标题名称alert')
  }
  alert() {
    let that: any = this
    that.$alert('这是一段内容', '标题名称alert', {
      confirmButtonText: '确定',
      callback: (action: any) => {
        that.$message({
          type: 'info',
          message: `action: ${action}`
        })
      }
    })
  }
  confirm() {
    let that: any = this
    that.$confirm('这是一段内容', '标题名称confirm', {
      confirmButtonText: '确定',
      callback: (action: any) => {
        that.$message({
          type: 'info',
          message: `action: ${action}`
        })
      }
    })
  }
  promt() {
    let that: any = this
    that.$prompt('这是一段内容', '标题名称prompt', {
      confirmButtonText: '确定',
      callback: (action: any, data: any) => {
        that.$message({
          type: 'info',
          message: `action: ${action}>>>${data.inputValue}`
        })
      }
    })
  }
  updated() {
    console.log('alert init ')
  }
}
</script>
<style>
.demo-box.demo-dialog .el-dialog__wrapper {
  margin: 0;
}
.demo-box.demo-dialog .dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

