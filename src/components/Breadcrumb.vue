<template>
  <ol class="breadcrumb" style="margin-top:0;">
    <li class="breadcrumb-item" v-for="(item, index) in list" :key="index">
      <span class="active" v-if="isLast(index)">{{ showName(item) }}</span>
      <router-link :to="item.path" v-else-if="item.path!==''">{{ showName(item) }}</router-link>

      <a href="#/" v-else-if="item.path===''">{{ showName(item) }}</a>
    </li>
  </ol>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    list: Array
  }
})
export default class Breadcrumb extends Vue {
  // @Prop({ default: [] })
  // list!: Array<any>
  separator: string = ''
  isLast(index: number) {
    return index === this.$props.list.length - 1
  }
  showName(item: any) {
    if (item.meta && item.meta.label) {
      item = item.meta && item.meta.label
    }
    if (item.name) {
      item = item.name
    }
    return item
  }
}
</script>
