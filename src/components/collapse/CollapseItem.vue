<template>
    <div class="el-collapse-item" :class="{'is-active': isActive}">
        <div role="tab" :aria-expanded="isActive" :aria-controls="`el-collapse-content-${id}`" :aria-describedby="`el-collapse-content-${id}`">
            <div class="el-collapse-item__header" @click="handleHeaderClick" role="button" :id="`el-collapse-head-${id}`" tabindex="0" @keyup.space.enter.stop="handleEnterClick" :class="{
          'focusing': focusing,
          'is-active': isActive
        }" @focus="handleFocus" @blur="focusing = false">
                <i class="el-collapse-item__arrow el-icon-arrow-right" :class="{'is-active': isActive}">
                </i>
                <slot name="title">{{title}}</slot>
            </div>
        </div>
        <div class="el-collapse-item__wrap" v-show="isActive" role="tabpanel" :aria-hidden="!isActive" :aria-labelledby="`el-collapse-head-${id}`" :id="`el-collapse-content-${id}`">
            <div class="el-collapse-item__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { dateUtils } from '@/utils/DateUtils'
import { Inject, Watch } from 'vue-property-decorator'
import bus from '../../assets/eventBus'

//   import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
@Component({
  props: {
    title: String,
    name: {
      type: [String, Number],
      default: new Date().getTime()
    }
  }
})
export default class CollapseItem extends Vue {
  @Inject('activeNames')
  activeNames: any
  actives: any = this.activeNames
  contentWrapStyle = {
    height: 'auto',
    display: 'block'
  }
  contentHeight = 0
  focusing = false
  isClick = false
  get isActive() {
    return this.actives.indexOf(this.$props.name) > -1
  }
  get id() {
    return dateUtils.uuid(8, 16)
  }
  handleFocus() {
    setTimeout(() => {
      if (!this.isClick) {
        this.focusing = true
      } else {
        this.isClick = false
      }
    }, 50)
  }
  handleHeaderClick() {
    bus.$emit('item-click', this)
    // this.collapse.handleItemClick(this)
    debugger
    this.focusing = false
    this.isClick = true
  }
  handleEnterClick() {
    bus.$emit('item-click', this)
  }
  handleActiveNames(val: any) {
    this.actives = val
  }
  created() {
    // this.focusing = this.collapse.activeNames.indexOf(this.$props.name) > -1
    bus.$on('collapse-value-change', this.handleActiveNames)
  }
}
</script>