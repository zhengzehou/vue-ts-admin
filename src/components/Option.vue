<template>
  <li @mouseenter="hoverItem" @click.stop="selectOptionClick" class="el-select-dropdown__item" v-show="visible" :class="{
      'selected': selected,
      'is-disabled': disabled || groupDisabled || limitReached,
      'hover': hover
    }">
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Inject } from 'vue-property-decorator'
@Component({
  props: {
    value: {
      required: true
    },
    label: [String, Number],
    created: Boolean,
    selected: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
export default class Option extends Vue {
  @Inject('select') select: any
  index = -1
  groupDisabled = false
  visible = true
  hitState = false
  hover = false
  // get itemSelected() {
  //   // debugger
  //   // if (!this.$props.select.multiple) {
  //   //   return this.isEqual(this.$props.value, this.$props.select.value)
  //   // } else {
  //   return this.$props.value // this.contains(this.$props.select.value, this.$props.value)
  //   // }
  // }
  get currentLabel() {
    return this.$props.label || (this.isObject ? '' : this.$props.value)
  }
  get limitReached() {
    // if (this.$props.select.multiple) {
    //   return (
    //     !this.itemSelected &&
    //     (this.$props.select.value || []).length >=
    //       this.$props.select.multipleLimit &&
    //     this.$props.select.multipleLimit > 0
    //   )
    // } else {
    return false
    // }
  }
  get isObject() {
    return (
      Object.prototype.toString.call(this.$props.value).toLowerCase() ===
      '[object object]'
    )
  }
  selectOptionClick() {
    if (this.$props.disabled !== true && this.groupDisabled !== true) {
      this.$emit('click', [this, true])
    }
  }
  hoverItem() {
    // if (!this.$props.disabled && !this.groupDisabled) {
    //   this.$props.select.hoverIndex = this.$props.select.options.indexOf(this)
    // }
  }
  isEqual(a: any, b: any) {
    if (!this.isObject) {
      return a === b
    } else {
      //   const valueKey = this.$props.select.valueKey
      return a // getValueByPath(a, valueKey) === getValueByPath(b, valueKey)
    }
  }
  contains(arr: Array<any> = [], target: any) {
    if (!this.isObject) {
      return arr.indexOf(target) > -1
    } else {
      //   const valueKey = this.$props.select.valueKey
      return arr.some(item => {
        return item //getValueByPath(item, valueKey) === getValueByPath(target, valueKey)
      })
    }
  }
  created() {}
}
</script>
