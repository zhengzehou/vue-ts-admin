<template>
  <div v-clickoutside="hideDropdown">
    <div v-if="multiple" ref="tags">
      <div class="form-item-content" @mouseenter="hovering = true" @mouseleave="hovering = false" :class="[
      { 'input--prefix': $slots.prefix,
        'input--suffix': $slots.suffix || clearable}]">
        <div class="el-select__tags" ref="tagDiv" @click="handleFocus">
          <Tag v-for="item in selected" @click="deleteOptions(item)" closable>{{item.label}}</Tag>
        </div>
        <div class="input-wrapper" ref="tagInput">
          <input :tabindex="tabindex" style="cursor: pointer;" :placeholder="curPlaceholder" class="input-inner" v-bind="$attrs" :type="type" :disabled="inputDisabled" :autocomplete="autoComplete || autocomplete" :value="currentValue" ref="input" @compositionstart="handleComposition" @compositionupdate="handleComposition" @compositionend="handleComposition" @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange" :aria-label="label">
          <!-- 前置内容 -->
          <span class="input-prefix" v-if="$slots.prefix">
            <slot name="prefix"></slot>
          </span>
          <!-- 后置内容 -->
          <span class="input-suffix">
            <span class="input-suffix-inner" v-if="$slots.suffix || showClear || validateState && needStatusIcon">
              <template v-if="!showClear">
                <slot name="suffix"></slot>
              </template>
              <i v-else class="ivu-icon icon-circle-close input-clear" @click.stop="clear"></i>
            </span>
            <i class="ivu-icon" v-if="validateState" :class="['el-input__validateIcon', validateIcon]"></i>
            <i v-if="!showClear" :class="['el-select__caret', 'ivu-icon', 'el-icon-' + iconClass,visible?'is-reverse':'']" @click="toggleMenu"></i>
          </span>
        </div>
      </div>
    </div>
    <div v-else class="form-item-content" @mouseenter="hovering = true" @mouseleave="hovering = false" :class="[
      { 'input--prefix': $slots.prefix,
        'input--suffix': $slots.suffix || clearable}]">
      <div class="input-wrapper">
        <input :tabindex="tabindex" style="cursor: pointer;" :placeholder="placeholder" class="input-inner" v-bind="$attrs" :type="type" :disabled="inputDisabled" :autocomplete="autoComplete || autocomplete" :value="currentValue" ref="input" @compositionstart="handleComposition" @compositionupdate="handleComposition" @compositionend="handleComposition" @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange" :aria-label="label">
        <!-- 前置内容 -->
        <span class="input-prefix" v-if="$slots.prefix">
          <slot name="prefix"></slot>
        </span>
        <!-- 后置内容 -->
        <span class="input-suffix">
          <span class="input-suffix-inner" v-if="$slots.suffix || showClear || validateState && needStatusIcon">
            <template v-if="!showClear">
              <slot name="suffix"></slot>
            </template>
            <i v-else class="ivu-icon icon-circle-close input-clear" @click.stop="clear"></i>
          </span>
          <i class="ivu-icon" v-if="validateState" :class="['el-input__validateIcon', validateIcon]"></i>
          <i v-if="!showClear" :class="['el-select__caret', 'ivu-icon', 'el-icon-' + iconClass,visible?'is-reverse':'']" @click="toggleMenu"></i>
        </span>
      </div>
    </div>
    <div v-if="visible" class="el-select-dropdown el-popper" :class="multiple?'is-multiple':''" style="min-width: 240px; transform-origin: center bottom 0px; z-index: 2196; position: absolute;" x-placement="bottom-start">
      <div class="el-scrollbar">
        <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
          <ul class="el-scrollbar__view el-select-dropdown__list">
            <Option v-for="item in options" :selected="isSelected(item.value)" :key="item.value" :label="item.label" :value="item.value" @click="handleOptionSelect(item,$event)"></Option>
          </ul>
        </div>
        <div class="el-scrollbar__bar is-horizontal">
          <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
        </div>
        <div class="el-scrollbar__bar is-vertical">
          <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
        </div>
      </div>
      <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Option from './Option.vue'
import Tag from './Tag.vue'
import { Provide } from 'vue-property-decorator'
const clickoutside = {
  // 初始化指令
  bind(el: any, binding: any, vnode: any) {
    function documentHandler(e: any) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el: any, binding: any) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
@Component({
  components: {
    Option,
    Tag
  },
  directives: { clickoutside },
  props: {
    placeholder: String,
    label: String,
    name: String,
    list: Array,
    // value: String,
    clazz: String,
    icon: String,
    value: [String, Number, Array],
    size: String,
    resize: String,
    disabled: Boolean,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
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
    clearable: {
      type: Boolean,
      default: false
    },
    filterable: Boolean,
    tabindex: String
  }
})
export default class Select extends Vue {
  @Provide('select')
  select = this
  currentVal: any = ''
  selected: any = []
  options: any = []
  curPlaceholder = ''
  hovering = false
  focused = false
  menuVisibleOnFocus = false
  visible = false
  isOnComposition = false
  valueBeforeComposition = null
  inputInitHeight = 0
  created() {
    this.options = this.$props.list
    this.curPlaceholder = this.$props.placeholder
  }
  get currentValue() {
    // let that: any = this
    // that.$message(this.$props.value)
    if (this.$props.multiple) {
      const isObject =
        Object.prototype.toString.call(this.$props.value).toLowerCase() ===
        '[object Array]'
      if (isObject) {
        // let valueLabels: any = []
        // this.selected.forEach((it: any) => {
        //   valueLabels.push(it.label)
        // })
        // this.setCurrentValue(valueLabels)
      }
    } else {
      if (this.currentVal) {
        for (var i = 0; i < this.$props.list.length; i++) {
          let it = this.$props.list[i]
          if (it.value === this.currentVal) return it.label
        }
        return this.currentVal
      }
      this.currentVal =
        this.$props.value === undefined || this.$props.value === null
          ? ''
          : this.$props.value
      for (i = 0; i < this.$props.list.length; i++) {
        let it = this.$props.list[i]
        if (it.value === this.currentVal) return it.label
      }
    }

    return this.currentVal
  }
  isSelected(value: any) {
    return (
      this.$props.value == value ||
      (value && value.length > 0 && this.$props.value.indexOf(value) >= 0)
    )
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
      this.currentValue !== '' &&
      (this.focused || this.hovering)
    )
  }
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
    // this.$emit('blur', event)
  }
  handleFocus(event: any) {
    this.focused = true
    this.visible = true
    this.menuVisibleOnFocus = true
    // this.$emit('focus', event)
  }
  handleComposition(event: any) {
    if (event.type === 'compositionend') {
      debugger
      this.isOnComposition = false
      let input: any = this.$refs.input
      this.currentVal = input.value
      this.valueBeforeComposition = null
      this.handleInput(event)
    } else {
      const text = event.target.value
      if (this.isOnComposition && event.type === 'compositionstart') {
        this.valueBeforeComposition = text
      }
    }
  }
  handleInput(item: any) {
    if (!item.target) {
      const value = item.value
      this.setCurrentValue(value)
      if (this.isOnComposition) return
      this.$emit('input', value)
      this.selected = item
    } else {
      if (this.$props.filterable) {
        if (item.target.value === '') {
          this.clear()
        } else {
          this.currentVal = item.target.value
          this.options = this.$props.list.filter(
            (it: any) => it.label.indexOf(item.target.value) >= 0
          )
        }
      } else this.$emit('input', this.selected.value)
    }
  }
  handleChange(event: any) {
    this.$emit('change', event.target.value)
  }
  setCurrentValue(value: any) {
    if (this.isOnComposition && value === this.valueBeforeComposition) return
    this.currentVal = value
  }
  clear() {
    this.$emit('input', '')
    this.$emit('change', '')
    this.$emit('clear')
    this.setCurrentValue('')
    this.options = this.$props.list
  }
  get iconClass() {
    let criteria =
      this.$props.clearable &&
      !this.$props.disabled &&
      this.hovering &&
      !this.$props.multiple &&
      this.$props.value !== undefined &&
      this.$props.value !== null &&
      this.$props.value !== ''
    return criteria
      ? 'circle-close is-show-close'
      : this.$props.remote && this.$props.filterable
        ? ''
        : 'arrow-up'
  }
  handleOptionSelect(item: any, event: Event) {
    if (this.$props.multiple) {
      const optionIndex = this.getValueIndex(this.selected, item.value)
      if (optionIndex > -1) {
        this.selected.splice(optionIndex, 1)
      } else if (
        this.$props.multipleLimit <= 0 ||
        this.selected.length < this.$props.multipleLimit
      ) {
        this.selected.push(item)
      }
      let values: any = []
      this.selected.forEach((it: any) => {
        values.push(it.value)
      })
      this.$emit('input', values)
      this.resetInputHeight()
    } else {
      this.handleInput(item)
      this.$emit('input', item.value)
      this.$emit('change', item.value)
      this.visible = false
    }
  }
  resetInputHeight() {
    this.$nextTick(() => {
      let divObj: any = this.$refs.tagInput
      let inputChildNodes = divObj.childNodes
      let input = [].filter.call(
        inputChildNodes,
        (obj: any) => obj.tagName === 'INPUT'
      )[0]
      var inputWidth = input.offsetWidth
      if (this.inputInitHeight === 0) this.inputInitHeight = input.offsetHeight
      let tagDiv: any = this.$refs.tagDiv
      let tagChildNodes = tagDiv.childNodes
      var offsetLeft: number = 0
      var rows = 0
      tagChildNodes.forEach((t: any) => {
        if (offsetLeft === 0) {
          offsetLeft = t.offsetLeft
          rows += 1
        } else if (offsetLeft === t.offsetLeft) {
          rows += 1
        }
      })
      if (rows === 0) {
        rows = 1
        this.curPlaceholder = this.$props.placeholder
      } else {
        this.curPlaceholder = ''
      }
      let height = this.inputInitHeight
      let inputHeight = rows * height
      input.style.height = inputHeight + 'px'
    })
  }
  getValueIndex(arr: Array<any>, value: any) {
    const isObject =
      Object.prototype.toString.call(value).toLowerCase() === '[object object]'
    if (!isObject) {
      let index = -1
      arr.some((item, i) => {
        if (item.value === value) {
          index = i
          return true
        }
        return false
      })
      return index
    } else {
      //   const valueKey = this.valueKey;
      let index = -1
      //   arr.some((item, i) => {
      //     if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey)) {
      //       index = i;
      //       return true;
      //     }
      //     return false;
      //   });
      return index
    }
  }
  deleteOptions(item: any) {
    this.selected.splice(item, 1)
    this.visible = false
    this.resetInputHeight()
  }
  hideDropdown() {
    this.visible = false
  }
  toggleMenu() {
    if (!this.$props.selectDisabled) {
      if (this.menuVisibleOnFocus) {
        this.menuVisibleOnFocus = false
      } else {
        this.visible = !this.visible
      }
      if (this.visible) {
        let input: any = this.$refs.input || this.$refs.select
        input.focus()
      }
    }
  }
}
</script>
