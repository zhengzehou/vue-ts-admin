<template>
  <div class="el-switch" :class="{ 'is-disabled': switchDisabled, 'is-checked': checked }" role="switch" :aria-checked="checked" :aria-disabled="switchDisabled" @click="switchValue">
    <input class="el-switch__input" type="checkbox" @change="handleChange" ref="input" :id="id" :name="name" :true-value="activeValue" :false-value="inactiveValue" :disabled="switchDisabled" @keydown.enter="switchValue">
    <span :class="['el-switch__label', 'el-switch__label--left', !checked ? 'is-active' : '']" v-if="inactiveIconClass || inactiveText">
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>
    <span class="el-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }">
    </span>
    <span :class="['el-switch__label', 'el-switch__label--right', checked ? 'is-active' : '']" v-if="activeIconClass || activeText">
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Component({
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    },
    activeIconClass: {
      type: String,
      default: ''
    },
    inactiveIconClass: {
      type: String,
      default: ''
    },
    activeText: String,
    inactiveText: String,
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    id: String
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
export default class Switchs extends Vue {
  coreWidth = 0
  get checked() {
    return this.$props.value === this.$props.activeValue
  }
  get switchDisabled() {
    return this.$props.disabled
  }
  @Watch('checked')
  checked2() {
    let input: any = this.$refs.input
    input.checked = this.checked
    if (this.$props.activeColor || this.$props.inactiveColor) {
      this.setBackgroundColor()
    }
  }
  handleChange(event: any) {
    this.$emit(
      'input',
      !this.checked ? this.$props.activeValue : this.$props.inactiveValue
    )
    this.$emit(
      'change',
      !this.checked ? this.$props.activeValue : this.$props.inactiveValue
    )
    this.$nextTick(() => {
      let input: any = this.$refs.input
      input.checked = this.checked
    })
  }
  setBackgroundColor() {
    let coreObj: any = this.$refs.core
    let newColor = this.checked
      ? this.$props.activeColor
      : this.$props.inactiveColor
    coreObj.style.borderColor = newColor
    coreObj.style.backgroundColor = newColor
  }
  switchValue() {
    !this.switchDisabled && this.handleChange(null)
  }
  getMigratingConfig() {
    return {
      props: {
        'on-color': 'on-color is renamed to active-color.',
        'off-color': 'off-color is renamed to inactive-color.',
        'on-text': 'on-text is renamed to active-text.',
        'off-text': 'off-text is renamed to inactive-text.',
        'on-value': 'on-value is renamed to active-value.',
        'off-value': 'off-value is renamed to inactive-value.',
        'on-icon-class': 'on-icon-class is renamed to active-icon-class.',
        'off-icon-class': 'off-icon-class is renamed to inactive-icon-class.'
      }
    }
  }
  created() {
    this.coreWidth = this.$props.width
    if (
      !~[this.$props.activeValue, this.$props.inactiveValue].indexOf(
        this.$props.value
      )
    ) {
      this.$emit('input', this.$props.inactiveValue)
    }
  }
  mounted() {
    /* istanbul ignore if */
    this.$props.coreWidth = this.$props.width || 40
    if (this.$props.activeColor || this.$props.inactiveColor) {
      this.setBackgroundColor()
    }
    let input: any = this.$refs.input
    input.checked = this.checked
  }
}
</script>
