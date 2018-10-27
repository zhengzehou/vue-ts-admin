<template>
  <button class="ivu-btn" @click="handleClick($event)" :disabled="disabled || loading" :class="[
      type ? 'ivu-btn-' + type : '',
      size ? 'ivu-btn-' + size : '',
      clazz,
      {
        'is-loading': loading
      }
    ]">
    <i v-if="loading" class="ivu-icon ivu-icon-load-c ivu-load-loop"></i>
    <i :class="'ivu-icon '+icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
    <span v-else>
      {{name}}
    </span>
  </button>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    name: String,
    clazz: String,
    icon: String,
    type: String,
    size: String,
    disabled: Boolean,
    loading: Boolean
  }
})
export default class Button extends Vue {
  handleClick(e: Event) {
    this.$emit('click', e)
  }
}
</script>
