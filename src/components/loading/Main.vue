<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="el-loading-mask" :style="{ backgroundColor: background || '' }" :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="el-loading-spinner">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" />
        </svg>
        <i v-else class="ivu-icon" style="font-size: 62px;" :class="spinner"></i>
        <p v-if="text" class="el-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Loading extends Vue {
  text = ''
  spinner = 'ivu-icon-load-c ivu-load-loop'
  background = null
  fullscreen = true
  visible = false
  customClass = ''
  handleAfterLeave() {
    debugger
    this.$emit('after-leave')
  }
  setText(text: string) {
    this.text = text
  }
  close() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.visible = false
    this.$destroy()
  }
}
</script>
