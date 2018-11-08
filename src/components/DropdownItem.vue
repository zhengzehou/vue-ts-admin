<template>
    <div class="ivu-select-dropdown animated fadeIn" v-if="show">
        <ul class="ivu-dropdown-menu">
            <li class="ivu-dropdown-item" :key="index" @click="dropdownItem(item)" v-for="(item,index) of dropdownItems" :class="item.divided?'ivu-dropdown-item-divided':''">
                <p class="dropdown-itemp">
                    <i :class="'ivu-icon '+item.icon"></i>{{item.name}}
                    <span v-if="item.hasBadge" style="position: inherit;" :class="'badge '+item.badgeClass">{{item.badge}}</span>
                </p>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  props: {
    show: Boolean,
    dropdownItems: Array
  }
})
export default class Dropdown extends Vue {
  //   @Prop() show!: boolean
  //   @Prop() dropdownItems!: Array<any>
  dropdownItem(item: any) {
    this.$emit('dropdown-item', item)
  }
  created() {}
}
</script>
