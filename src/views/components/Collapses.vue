<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="demo-block">
        <div class="source">
          <Collapse v-model="activeNames" @change="handleChange" accordion>
            <CollapseItem title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </CollapseItem>
            <CollapseItem title="反馈 Feedback" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </CollapseItem>
            <CollapseItem title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </CollapseItem>
            <CollapseItem title="可控 Controllability" name="4">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </CollapseItem>
          </Collapse>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Collapse from '@/components/collapse/Collapse.vue'
import CollapseItem from '@/components/collapse/CollapseItem.vue'

@Component({ components: { Collapse, CollapseItem } })
export default class Collapses extends Vue {
  activeNames = ['1']
  handleChange(v: any) {}
}
</script>

<style>
.el-collapse {
  border-top: 1px solid #ebeef5;
  /* border-bottom: 1px solid #ebeef5; */
}
.el-collapse-item__header {
  height: 48px;
  line-height: 48px;
  background-color: #fff;
  color: #656565;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 700;
  transition: border-bottom-color 0.3s;
  outline: none;
}
.el-collapse-item__header.is-active {
  border-bottom-color: transparent;
}
.el-collapse-item__arrow {
  margin-right: 8px;
  transition: transform 0.3s;
  float: right;
  line-height: 48px;
  font-weight: 300;
}
.el-collapse-item__arrow.is-active {
  transform: rotate(90deg);
}
.el-collapse-item__wrap {
  will-change: height;
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
}
.el-collapse-item__content {
  padding-bottom: 25px;
  font-size: 13px;
  color: #303133;
  line-height: 1.769230769230769;
}

.demo-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  background-color: #fff;
}
.demo-block .source {
  padding: 24px;
}
</style>

