<template>
  <iframe id="dialogFrame" :src="src" :height="fullHeight" frameborder="0" scrolling="auto" style="background-color:transparent; z-index: -1; width: 100%; top: 0;left:0;" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" allowfullscreen="true"></iframe>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  props: { src: String }
})
export default class Iframe extends Vue {
  // @Prop() src!: string
  fullHeight = document.documentElement.clientHeight - 205
  handleClick(e: Event) {
    e.preventDefault()
    // e.target.parentElement.classList.toggle('open')
  }
  // get deviceWidth() {
  //   return document.documentElement.clientWidth
  // }
  // get deviceHeight() {
  //   return document.documentElement.clientHeight - 205
  // }
  created() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.fullHeight = document.documentElement.clientHeight - 205
      })()
    }
  }
}
</script>

<style type="text/css">
.nav-link {
  cursor: pointer;
}
</style>
