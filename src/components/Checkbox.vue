<template>
  <label class="checkbox" :class="[
      border && checkboxSize ? 'checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]" :id="id">
    <span class="checkbox__input" :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }">
      <span class="checkbox__inner"></span>
      <input v-if="trueLabel || falseLabel" class="checkbox__original" type="checkbox" aria-hidden="true" :name="name" :disabled="isDisabled" :true-value="trueLabel" :false-value="falseLabel" v-model="model" @change="handleChange" @focus="focus = true" @blur="focus = false">
      <input v-else class="checkbox__original" type="checkbox" :disabled="isDisabled" :value="label" :name="name" v-model="model" @change="handleChange" @focus="focus = true" @blur="focus = false" :aria-label="label">
    </span>
    <span class="checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    // 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系
    id: String,
    // /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    controls: String,
    border: Boolean,
    size: String
  },
  inject: {
    form: {
      default: ''
    },
    formItem: {
      default: ''
    }
  }
})
export default class Checkbox extends Vue {
  selfModel = false
  focus = false
  isLimitExceeded = false
  modelVal = false
  get model() {
    if (this.modelVal) return this.modelVal
    this.modelVal = this.isGroup
      ? this.store
      : this.$props.value !== undefined
        ? this.$props.value
        : this.selfModel
    return this.modelVal
  }
  set model(value: boolean) {
    this.modelVal = value
  }
  get isChecked() {
    if ({}.toString.call(this.model) === '[object Boolean]') {
      return this.model
    } else if (Array.isArray(this.modelVal)) {
      return this.modelVal.indexOf(this.$props.label) > -1
    } else if (this.model !== null && this.model !== undefined) {
      return this.model === this.$props.trueLabel
    }
  }
  get isGroup() {
    let parent = this.$parent
    while (parent) {
      let op: any = parent.$options
      if (op.componentName !== 'CheckboxGroup') {
        parent = parent.$parent
      } else {
        return true
      }
    }
    return false
  }
  get store() {
    return this.$props.value
    // return this._checkboxGroup ? this._checkboxGroup.value : this.$props.value
  }
  get isDisabled() {
    return this.isGroup
      ? this.$props.disabled || (this.$props.form || {}).disabled
      : this.$props.disabled || (this.$props.form || {}).disabled
  }
  get formItemSize() {
    return (this.$props.formItem || {}).elFormItemSize
  }
  get checkboxSize() {
    const temCheckboxSize = this.$props.size
    return this.isGroup ? temCheckboxSize : temCheckboxSize
  }
  handleChange(event: any) {
    if (this.isLimitExceeded) return
    let value
    if (event.target.checked) {
      value = this.$props.trueLabel === undefined ? true : this.$props.trueLabel
    } else {
      value =
        this.$props.falseLabel === undefined ? false : this.$props.falseLabel
    }
    this.$emit('input', value)
  }
}
</script>
