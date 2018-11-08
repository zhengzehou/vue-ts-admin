<template>
  <transition name="msgbox-fade">
    <div class="el-message-box__wrapper" tabindex="-1" style="z-index:2014;" v-show="visible" @click.self="handleWrapperClick" role="dialog" aria-modal="true" :aria-label="title || 'dialog'">
      <div class="el-message-box" :class="[customClass, center && 'el-message-box--center']">
        <div class="el-message-box__header" v-if="title !== null">
          <div class="el-message-box__title">
            <div :class="['el-message-box__status', icon]" v-if="icon && center">
            </div>
            <span>{{ title }}</span>
          </div>
          <button type="button" class="el-message-box__headerbtn" aria-label="Close" v-if="showClose" @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')" @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')">
            <i class="el-message-box__close el-icon-close ivu-icon"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <div :class="['el-message-box__status', icon]" class="ivu-icon" v-if="icon && !center && message !== ''">
          </div>
          <div class="el-message-box__message" v-if="message !== ''">
            <slot>
              <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
              <p v-else v-html="message"></p>
            </slot>
          </div>
          <div class="el-message-box__input" v-show="showInput">
            <Input v-model="inputValue" :type="inputType" @keydown.enter.native="handleInputEnter" :placeholder="inputPlaceholder" ref="input"></Input>
            <div class="el-message-box__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="el-message-box__btns">
          <Button :loading="cancelButtonLoading" :class="[ cancelButtonClasses ]" v-if="showCancelButton" :round="roundButton" size="small" @click.native="handleAction('cancel')" @keydown.enter="handleAction('cancel')">
            {{ cancelButtonText || t('el.messagebox.cancel') }}
          </Button>
          <Button :loading="confirmButtonLoading" ref="confirm" :class="[ confirmButtonClasses ]" v-show="showConfirmButton" :round="roundButton" size="small" @click.native="handleAction('confirm')" @keydown.enter="handleAction('confirm')">
            {{ confirmButtonText || t('el.messagebox.confirm') }}
          </Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Input from '../Input.vue'
import Button from '../Button.vue'
import { t } from '@/local/index.ts'
import { Watch } from 'vue-property-decorator'
const typeMap: any = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

@Component({
  components: { Input, Button },
  props: {
    modal: {
      default: true
    },
    lockScroll: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    closeOnHashChange: {
      default: true
    },
    center: {
      default: false,
      type: Boolean
    },
    roundButton: {
      default: false,
      type: Boolean
    }
  }
})
export default class MessageBox extends Vue {
  uid = 1
  title = ''
  message = ''
  type = ''
  iconClass = ''
  customClass = ''
  showInput = false
  inputValue = null
  inputPlaceholder = ''
  inputType = 'text'
  inputPattern = null
  inputValidator: any = null
  inputErrorMessage = ''
  showConfirmButton = true
  showCancelButton = false
  action = ''
  confirmButtonText = ''
  cancelButtonText = ''
  confirmButtonLoading = false
  cancelButtonLoading = false
  confirmButtonClass = ''
  confirmButtonDisabled = false
  cancelButtonClass = ''
  editorErrorMessage: any = null
  callback: any = null
  dangerouslyUseHTMLString = false
  focusAfterClosed = null
  isOnComposition = false
  distinguishCancelAndClose = false

  visible = false
  _closing = false
  onClose: any = null
  beforeClose: any = null
  modalDiv: any = null
  get icon() {
    const { type, iconClass } = this
    return (
      iconClass || (type && typeMap[type] ? `el-icon-${typeMap[type]}` : '')
    )
  }
  get confirmButtonClasses() {
    return `el-button--primary ${this.confirmButtonClass}`
  }
  get cancelButtonClasses() {
    return `${this.cancelButtonClass}`
  }
  @Watch('visible')
  visible2(b: boolean) {
    if (b) {
      this.createDiv()
    }
  }
  destroyElement() {
    this.$el.removeEventListener('transitionend', this.destroyElement)
    // this.$destroy(true)
    let el: any = this.$el
    el.parentNode.removeChild(this.$el)
    var mDiv: any = document.getElementById(this.modalDiv)
    mDiv.remove()
  }

  getSafeClose() {
    const currentId = this.uid
    return () => {
      this.$nextTick(() => {
        if (currentId === this.uid) this.doClose()
      })
    }
  }
  doClose() {
    if (!this.visible) return
    this.visible = false
    this._closing = true
    this.onClose && this.onClose()
    // messageBox.closeDialog() // 解绑
    this.destroyElement()
    // if (this.lockScroll) {
    //   setTimeout(this.restoreBodyStyle, 200)
    // }
    setTimeout(() => {
      if (typeof this.callback === 'function')
        if (this.action) this.callback(this.action, this)
    })
  }
  handleWrapperClick() {
    if (this.$props.closeOnClickModal) {
      this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel')
    }
  }
  handleInputEnter() {
    if (this.inputType !== 'textarea') {
      return this.handleAction('confirm')
    }
  }
  handleAction(action: string) {
    if (this.type === 'prompt' && action === 'confirm' && !this.validate()) {
      return
    }
    this.action = action
    if (typeof this.beforeClose === 'function') {
      let close = this.getSafeClose()
      this.beforeClose(action, this, close)
    } else {
      this.doClose()
    }
  }
  validate() {
    if (this.type === 'prompt') {
      const inputPattern: any = this.inputPattern
      if (inputPattern && !inputPattern.test(this.inputValue || '')) {
        this.editorErrorMessage =
          this.inputErrorMessage || t('el.messagebox.error')
        // addClass(this.getInputElement(), 'invalid')
        return false
      }
      const inputValidator = this.inputValidator
      if (typeof inputValidator === 'function') {
        const validateResult = inputValidator(this.inputValue)
        if (validateResult === false) {
          this.editorErrorMessage =
            this.inputErrorMessage || t('el.messagebox.error')
          // addClass(this.getInputElement(), 'invalid')
          return false
        }
        if (typeof validateResult === 'string') {
          this.editorErrorMessage = validateResult
          // addClass(this.getInputElement(), 'invalid')
          return false
        }
      }
    }
    this.editorErrorMessage = ''
    // removeClass(this.getInputElement(), 'invalid')
    return true
  }
  getFirstFocus() {
    const btn = this.$el.querySelector('.el-message-box__btns .el-button')
    const title = this.$el.querySelector(
      '.el-message-box__btns .el-message-box__title'
    )
    return btn || title
  }
  getInputElement() {
    const inputRefs = this.$refs
    return inputRefs.input || inputRefs.textarea
  }
  t(msg: string) {
    return t(msg)
  }
  createDiv() {
    var div = document.createElement('div')
    div.setAttribute('class', 'v-modal')
    div.setAttribute('tabindex', '0')
    div.setAttribute('style', 'z-index:2013')
    div.setAttribute('id', 'modal_uid_' + this.uid)
    document.body.appendChild(div)
    this.modalDiv = 'modal_uid_' + this.uid
  }
  mounted() {}
  beforeDestroy() {}
}
</script>
