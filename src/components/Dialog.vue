<template>
  <transition name="dialog-fade" @after-leave="afterLeave">
    <div class="el-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
      <div class="el-dialog" :class="[{ 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]" ref="dialog" :style="style">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button type="button" class="el-dialog__headerbtn" aria-label="Close" v-if="showClose" @click="handleClose">
            <i class="el-dialog__close el-icon-close ivu-icon"></i>
          </button>
        </div>
        <div class="el-dialog__body">
          <slot></slot>
        </div>
        <div class="el-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
const merge = require('webpack-merge')

@Component({
  props: {
    title: {
      type: String,
      default: ''
    },
    modal: {
      type: Boolean,
      default: true
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    width: String,
    fullscreen: Boolean,
    visible: Boolean,
    customClass: {
      type: String,
      default: ''
    },
    top: {
      type: String,
      default: '30vh'
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false
    }
  }
})
export default class Dialog extends Vue {
  closed = false
  get style() {
    let style: any = {}
    if (!this.$props.fullscreen) {
      style.marginTop = this.$props.top
      if (this.$props.width) {
        style.width = this.$props.width
      }
    }
    return style
  }
  handleWrapperClick() {
    if (!this.$props.closeOnClickModal) return
    this.handleClose()
  }
  handleClose() {
    if (typeof this.$props.beforeClose === 'function') {
      this.$props.beforeClose(this.hide)
    } else {
      this.hide(true)
    }
  }
  hide(cancel: boolean) {
    if (cancel !== false) {
      this.$emit('update:visible', false)
      this.$emit('close')
      this.closed = true
    }
  }
  afterLeave() {
    this.$emit('closed')
  }
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.$props.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
