<template>
  <div class="nav-item ivu-dropdown" @mouseover="showMenu" @mouseout="hideMenu">

    <p v-if="layout == 'vertical'" style="margin:0;">
      <i :class="'ivu-icon '+icon" :style="{fontSize: '30px',color:iconColor}"></i>
    </p>
    <p v-if="layout == 'vertical'" style="color:white;margin:0;"> 云服务器 </p>
    <div v-else class="ivu-dropdown-rel">
      <a href="javascript:void(0)">
        <span data-v-e603255a="">
          <i :class="'ivu-icon '+icon" :style="{fontSize: '30px',color:iconColor}"></i>
          <img :src="imgUrl" class="img-avatar">
          <span class="d-md-down-none">admin</span>
        </span>
      </a>
    </div>
    <dropdown-item @dropdown-item="dropdownItem" :show="show" :top="top" :dropdown-items="dropdownItems"></dropdown-item>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DropdownItem from './DropdownItem.vue'

@Component({
  components: { DropdownItem },
  props: {
    layout: String,
    icon: String,
    iconColor: String,
    imgUrl: String,
    dropdownItems: Array,
    top: [String, Number]
  }
})
export default class Dropdown extends Vue {
  show: boolean = false
  // @Prop() layout!: string
  // @Prop() icon!: string
  // @Prop() iconColor!: string
  // @Prop() imgUrl!: string
  // @Prop() dropdownItems!: Array<any>
  showMenu() {
    this.show = true
  }
  hideMenu() {
    this.show = false
  }
  dropdownItem(item: any) {
    this.$emit('dropdown-item', item)
  }
}
</script>
<style>
.dropdown-menu-show {
  display: inline;
  position: fixed;
  top: 46px;
  right: 5px;
  transition: 0.2s ease-in-out;
}
.dropdown-menu-hide {
  display: none;
}
</style>
