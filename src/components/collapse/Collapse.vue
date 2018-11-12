<template>
    <div class="el-collapse" role="tablist" aria-multiselectable="true">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch, Provide } from 'vue-property-decorator'
import bus from '../../assets/eventBus'
@Component({
  props: {
    accordion: Boolean,
    value: {
      type: [Array, String, Number],
      default: ''
    }
  }
})
export default class Collapse extends Vue {
  @Provide('activeNames')
  activeNames: any = this.getActiveNames()
  getActiveNames() {
    return [].concat(this.$props.value)
  }
  setActiveNames(activeNames: any) {
    activeNames = [].concat(activeNames)
    let value = this.$props.accordion ? activeNames[0] : activeNames
    this.activeNames = activeNames
    this.$emit('input', value)
    this.$emit('change', value)
    bus.$emit('collapse-value-change', this.activeNames)
  }
  handleItemClick(item: any) {
    if (this.$props.accordion) {
      this.setActiveNames(
        (this.activeNames[0] || this.activeNames[0] === 0) &&
        this.activeNames[0] === item.name
          ? ''
          : item.name
      )
    } else {
      let activeNames = this.activeNames.slice(0)
      let index = activeNames.indexOf(item.name)
      if (index > -1) {
        activeNames.splice(index, 1)
      } else {
        activeNames.push(item.name)
      }
      this.setActiveNames(activeNames)
    }
  }
  created() {
    bus.$on('item-click', this.handleItemClick)
  }
}
</script>