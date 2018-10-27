<template>
  <label class="radio" :class="[
      border && radioSize ? 'radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === value && model === label }
    ]" role="radio" :aria-checked="model === label" :aria-disabled="isDisabled" :tabindex="tabIndex" @keydown.space.stop.prevent="model = isDisabled ? model : label">
    <span class="radio__input" :class="{
        'is-disabled': isDisabled,
        'is-checked': model === value && model === label
      }">
      <span class="radio__inner"></span>
      <input class="radio__original" :value="label" :name="name" type="radio" aria-hidden="true" v-model="model" @focus="focus = true" @blur="focus = false" @change="handleChange(label,name)" :disabled="isDisabled">
    </span>
    <span class="radio__label">
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
    disabled: Boolean,
    name: String,
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
export default class Radio extends Vue {
  focus = false
  modelVal: String = ''
  get model() {
    if (this.modelVal) return this.modelVal
    this.modelVal = this.$props.value
    return this.modelVal
  }
  set model(value: String) {
    if (this.isGroup) {
      // this.dispatch('ElRadioGroup', 'input', [value])
    } else {
      this.modelVal = value
    }
  }
  get isGroup() {
    let parent = this.$parent
    while (parent) {
      let op: any = parent.$options
      if (op.componentName !== 'RadioGroup') {
        parent = parent.$parent
      } else {
        // this._radioGroup = parent
        return true
      }
    }
    return false
  }
  get isDisabled() {
    return this.isGroup
      ? this.$props.disabled || (this.$props.form || {}).disabled
      : this.$props.disabled || (this.$props.form || {}).disabled
  }
  get tabIndex() {
    return !this.isDisabled
      ? this.isGroup ? (this.model === this.$props.label ? 0 : -1) : 0
      : -1
  }
  handleChange(label: string, name: string) {
    // this.$nextTick(() => {
    //   this.$emit('change', this.model)
    //   // this.isGroup && this.dispatch('RadioGroup', 'handleChange', this.modelVal);
    // })
    console.log('label=' + label)
    console.log('name=' + name)
    console.log('model=' + this.model)
    this.$emit('input', this.model)
    this.$emit('change', this.model)
  }
  created(){
    console.log('labeldd=' + this.$props.value)
  }
}
</script>
