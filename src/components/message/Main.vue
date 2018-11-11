<template>
  <transition name="fade">
    <div :class="[
        'el-message',
        type && !iconClass ? `el-message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass
      ]" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer" role="alert">
      <i style="font-size:24px;" :class="iconClass" class="ivu-icon" v-if="iconClass"></i>
      <i style="font-size:24px;" :class="typeClass" class="ivu-icon" v-else></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="el-message__content">{{ message }}</p>
        <p v-else v-html="message" class="el-message__content"></p>
      </slot>
      <i v-if="showClose" class="el-message__closeBtn el-icon-close ivu-icon" @click="close"></i>
    </div>
  </transition>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
const typeMap: any = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

@Component({
  props: {}
})
export default class Message extends Vue {
  visible = false
  message = ''
  duration = 3000
  type = 'info'
  iconClass = ''
  customClass = ''
  onClose: any = null
  showClose = false
  closed = false
  timer: any = null
  dangerouslyUseHTMLString = false
  center = false
  get typeClass() {
    return this.type && !this.iconClass
      ? `el-message__icon el-icon-${typeMap[this.type]}`
      : ''
  }
  destroyElement() {
    this.$el.removeEventListener('transitionend', this.destroyElement)
    // this.$destroy(true)
    let el: any = this.$el
    el.parentNode.removeChild(this.$el)
  }
  close() {
    this.closed = true
    this.visible = false
    if (typeof this.onClose === 'function') {
      this.onClose(this)
    }
    this.destroyElement()
  }
  clearTimer() {
    clearTimeout(this.timer)
  }
  startTimer() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.close()
        }
      }, this.duration)
    }
  }
  keydown(e: any) {
    if (e.keyCode === 27) {
      // esc关闭消息
      if (!this.closed) {
        this.close()
      }
    }
  }
  mounted() {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  }
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  /*  transition: opacity 0.5s; */
  /* transition-property: all; */
  /* transition-duration: 1s;
  transition-delay: opacity 0.5s; */
  /* transition-timing-function: ease-out; */
  opacity: 0;
  transform: translate(-50%, -100%);
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(-100%, -50%);
  opacity: 0;
}
</style>

