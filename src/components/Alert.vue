<template>
  <div class="alert alert-with-icon" :class="defClz">
    <span class="alert-icon" v-if="this.$attrs['show-icon'] == ''">
      <i v-if="!this.$slots.icon" class="ivu-icon " :class="defIconClz"></i>
      <i v-else slot="icon" class="ivu-icon " :class="defIconClz"></i>
    </span>
    <span class="alert-message">{{msg || (this.$options._renderChildren ? (this.$options._renderChildren[0].children ? this.$options._renderChildren[0].children[0].text: this.$options._renderChildren[0].text) : '')}}</span>
    <span class="alert-desc" v-if="this.$slots.desc">
      <slot name="desc"></slot>
    </span>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    msg: String,
    type: String
  }
})
export default class Alert extends Vue {
  get defClz() {
    // debugger
    var clz = ''
    if (
      this.$props.type === 'success' ||
      this.$props.type === 'warning' ||
      this.$props.type === 'error'
    )
      clz = ' alert-' + this.$props.type
    else clz = 'alert-info'
    if (this.$slots.desc) {
      clz += ' alert-with-desc'
    }
    return clz
  }
  get defIconClz() {
    var clz = ''
    if (this.$props.type === 'success') clz = ' icon-checkmark-circled'
    else if (this.$props.type === 'warning') clz = ' icon-android-alert'
    else if (this.$props.type === 'error') clz = ' icon-close-circled'
    else clz = ' icon-information-circled'
    if (this.$slots.icon) clz = this.$props.type
    return clz
  }
}
</script>
