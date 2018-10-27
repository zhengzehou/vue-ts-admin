<template>
  <span class="el-tag el-tag--info el-tag--small">
    <span v-if="$slots.default" class="el-select__tags-text">
      <slot></slot>
    </span>
    <span class="tag-icon" v-if="closable">
      <i class="ivu-icon icon-circle-close" @click.stop="handleClick"></i>
    </span>
  </span>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    type: String,
    disabled: Boolean,
    closable: Boolean
  }
})
export default class Tag extends Vue {
  handleClick(e: Event) {
    this.$emit('click', e)
  }
}
</script>
