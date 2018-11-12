<template>
  <div class="form-item-content" @mouseenter="hovering = true" @mouseleave="hovering = false" :class="[
    size ? 'input--'+size : '',
    { 'input--prefix': $slots.prefix || prefixIcon,
      'input--suffix': $slots.suffix || suffixIcon || clearable}]">
    <div class="input-wrapper" v-if="type !== 'textarea'">
      <input :tabindex="tabindex" :placeholder="placeholder" v-if="type !== 'textarea'" class="input-inner" v-bind="$attrs" :type="type" :disabled="inputDisabled" :readonly="readonly" :autocomplete="autoComplete || autocomplete" :value="currentValue" ref="input" @compositionstart="handleComposition" @compositionupdate="handleComposition" @compositionend="handleComposition" @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange" :aria-label="label">
      <!-- 前置内容 -->
      <span class="input-prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="ivu-icon" v-if="prefixIcon" :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span class="input-suffix" v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon">
        <span class="input-suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i class="ivu-icon" v-if="suffixIcon" :class="suffixIcon"></i>
          </template>
          <i v-else class="ivu-icon icon-circle-close input-clear" @click="clear"></i>
        </span>
        <i class="ivu-icon" v-if="validateState" :class="['el-input__validateIcon', validateIcon]">
        </i>
      </span>
    </div>
    <div v-else-if="type === 'textarea'" class="el-textarea ">
      <textarea :tabindex="tabindex" :placeholder="placeholder" class="el-textarea__inner" :rows="rows" :value="currentValue" @compositionstart="handleComposition" @compositionupdate="handleComposition" @compositionend="handleComposition" @input="handleInput" ref="textarea" v-bind="$attrs" :disabled="inputDisabled" :readonly="readonly" @focus="handleFocus" @blur="handleBlur" @change="handleChange" :aria-label="label">
      </textarea>
    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
// import { Watch } from 'vue-property-decorator'

@Component({
  props: {
    placeholder: String,
    label: String,
    name: String,
    // value: String,
    clazz: String,
    icon: String,
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    rows: String,
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
          console.warn(
            "[Element Warn][Input]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead."
          )
        return true
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    clearable: {
      type: Boolean,
      default: false
    },
    tabindex: String
  }
})
export default class Input extends Vue {
  currentVal: any = ''
  textareaCalcStyle = {}
  hovering = false
  focused = false
  isOnComposition = false
  valueBeforeComposition = null
  get currentValue() {
    if (this.currentVal === this.$props.value) return this.currentVal
    this.currentVal =
      this.$props.value === undefined || this.$props.value === null
        ? ''
        : this.$props.value
    return this.currentVal
  }
  get inputDisabled() {
    return this.$props.disabled || (this.$props.elForm || {}).disabled
  }
  get validateState() {
    return this.$props.elFormItem ? this.$props.elFormItem.validateState : ''
  }
  get showClear() {
    return (
      this.$props.clearable &&
      !this.$props.disabled &&
      !this.$props.readonly &&
      this.$props.currentValue !== '' &&
      (this.focused || this.hovering)
    )
  }
  // @Watch('currentVal')
  // onValueChanged(val: any, oldValue: any) {
  //   // debugger
  //   // this.setCurrentValue(val)
  //   // this.currentVal = val
  // }
  focus() {
    let el: any = this.$refs.input || this.$refs.textarea
    el.focus()
  }
  blur() {
    let el: any = this.$refs.input || this.$refs.textarea
    el.blur()
  }
  handleBlur(event: any) {
    this.focused = false
    this.$emit('blur', event)
    // if (this.$props.validateEvent) {
    //   this.$store.dispatch('ElFormItem', 'el.form.blur', this.currentValue)
    // }
  }
  handleFocus(event: any) {
    this.focused = true
    this.$emit('focus', event)
  }
  handleComposition(event: any) {
    if (event.type === 'compositionend') {
      this.isOnComposition = false
      this.currentVal = this.valueBeforeComposition
      this.valueBeforeComposition = null
      this.handleInput(event)
    } else {
      const text = event.target.value
      // const lastCharacter = text[text.length - 1] || ''
      // this.isOnComposition = !isKorean(lastCharacter)
      if (this.isOnComposition && event.type === 'compositionstart') {
        this.valueBeforeComposition = text
      }
    }
  }
  handleInput(event: any) {
    const value = event.target.value
    this.$emit('input', value)
    this.setCurrentValue(value)
  }
  handleChange(event: any) {
    this.$emit('change', event.target.value)
  }
  setCurrentValue(value: String) {
    if (this.isOnComposition && value === this.valueBeforeComposition) return
    this.currentVal = value
    if (this.isOnComposition) return
    // this.$nextTick(this.resizeTextarea)
    if (this.$props.validateEvent && this.currentVal === this.$props.value) {
      // this.dispatch('ElFormItem', 'el.form.change', [value])
    }
  }
  clear() {
    this.focus()
    this.$emit('input', '')
    this.$emit('change', '')
    this.$emit('clear')
    this.setCurrentValue('')
  }
}
</script>
