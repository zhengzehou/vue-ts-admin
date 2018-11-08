<template>
    <!-- <Iframe src="http://opc.beta.ule.com/fxRuralOpcMarketing/fxPreSell/toFxPreSellList"></Iframe> -->
    <div class="animated fadeIn">
        <div class="ivu-row">
            <div class="col col-span-24">
                <Button @click="dialogVisible = true">打开对话框</Button>
                <Button @click="toast">打开提示框toast</Button>
                <Button @click="alert">打开提示框alert</Button>
                <Button @click="confirm">打开提示框confirm</Button>
                <Button @click="promt">打开提示框promt</Button>
                <Button @click="defaultDialog">打开提示框default</Button>
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
@Component({
  components: { Button, Input, Dialog }
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
  toast() {
    let that: any = this
    that.$toast({ message: '这是一个message', duration: 5000, type: 'error' })
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
        that.$toast({
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
        that.$toast({
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
        that.$toast({
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
.el-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
}
.el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  width: 50%;
}
.el-dialog__header {
  padding: 20px;
  padding-bottom: 10px;
}
.el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}
.el-dialog__headerbtn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #909399;
}
.el-icon-close:before {
  content: '\f2d7';
}
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
}
.el-dialog__footer {
  padding: 20px;
  padding-top: 10px;
  text-align: right;
  box-sizing: border-box;
}

.el-message {
  min-width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity 0.3s, transform 0.4s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
}
.el-message.is-closable .el-message__content {
  padding-right: 16px;
}
.el-message--info .el-message__content {
  color: #909399;
}
.el-message p {
  margin: 0;
}
.el-message__content {
  padding: 0;
  font-size: 14px;
  line-height: 1;
}
.el-message__closeBtn {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #c0c4cc;
  font-size: 16px;
}
.el-message .el-icon-info {
  color: #909399;
}
.el-message--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.el-message .el-icon-success {
  color: #67c23a;
}
.el-message--success .el-message__content {
  color: #67c23a;
}
.el-icon-success:before {
  content: '\f3ff';
}
.el-message--warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.el-message .el-icon-warning {
  color: #e6a23c;
}
.el-icon-warning:before {
  content: '\f35b';
}
.el-message--warning .el-message__content {
  color: #e6a23c;
}
.el-message--error {
  background-color: #fef0f0;
  border-color: #fde2e2;
}
.el-message .el-icon-error {
  color: #f56c6c;
}
.el-message--error .el-message__content {
  color: #f56c6c;
}
.el-icon-error:before {
  content: '\f128';
}
.el-message__icon {
  margin-right: 10px;
}
.el-icon-close:before {
  content: '\f2d7';
}
.el-icon-info:before {
  content: '\f44d';
}

.el-message-box__wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2014;
}
.el-message-box {
  display: inline-block;
  width: 420px;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
}
.el-message-box__header {
  position: relative;
  padding: 15px;
  padding-bottom: 10px;
}
.el-message-box__title {
  padding-left: 0;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 1;
  color: #303133;
}
.el-message-box__headerbtn {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
}
.el-message-box__headerbtn .el-message-box__close {
  color: #909399;
}
.el-message-box__content {
  position: relative;
  padding: 10px 15px;
  color: #606266;
  font-size: 14px;
}
.el-message-box__message {
  margin: 0;
}
.el-message-box__input {
  padding-top: 15px;
}
.el-message-box__message p {
  margin: 0;
  line-height: 24px;
}
.el-message-box__errormsg {
  color: #f56c6c;
  font-size: 12px;
  min-height: 18px;
  margin-top: 2px;
}
.el-message-box__btns {
  padding: 5px 15px 0;
  text-align: right;
}
.el-message-box__wrapper:after {
  content: '';
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}
.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2013;
}

.demo-box.demo-dialog .el-dialog__wrapper {
  margin: 0;
}
.demo-box.demo-dialog .dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

