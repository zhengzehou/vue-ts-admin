<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <sidebar-item :routes="siderbar_routers[0].children"></sidebar-item>
    </nav>
  </div>
</template>
<script lang="ts">
import SidebarItem from './SidebarItem.vue'
import { mapGetters } from 'vuex'
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  components: { SidebarItem },
  computed: mapGetters(['siderbar_routers'])
})
export default class Sidebar extends Vue {
  handleClick(e: Event) {
    e.preventDefault()
    // e.target.parentElement.classList.toggle('open')
  }
  created() {
    console.log(this.$store.getters.siderbar_routers[0])
  }
}
</script>

<style type="text/css">
.nav-link {
  cursor: pointer;
}
</style>
