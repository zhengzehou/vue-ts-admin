<template>
  <div class="el-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div class="el-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="el-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    header: {},
    bodyStyle: {},
    shadow: {
      type: String
    }
  }
})
export default class Card extends Vue {}
</script>
