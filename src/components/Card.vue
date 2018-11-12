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
<style>
.el-card {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-card__header {
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
.el-card__body {
  padding: 20px;
}
.item {
  margin-bottom: 18px;
}
.text {
  font-size: 14px;
}
.el-button--text {
  border-color: transparent;
  color: #409eff;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
/* @media screen and (max-width: 800px) and (min-width: 650px) {
} */
</style>

