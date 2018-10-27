<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <template v-for="(item,index) in routes">
          <li :key="index" class="nav-item nav-dropdown" :class="(currentItem == index && currentSubPath.indexOf(item.path) >= 0)?'open active':''" @click="handleClick(index,item.path)" v-if="!item.hidden&&item.children&&item.children.length>0">
            <div class="nav-link nav-dropdown-toggle" :key="index">
              <i :class="'ivu-icon ivu-icon-'+item.icon" style="color: white;"></i>
              {{ item.name}}
            </div>
            <ul class="nav-dropdown-items">
              <li class="nav-item" v-for="(child,index2) in item.children" v-if='!child.hidden' @click.stop="addActive(item.path+'/'+child.path,index)" :key="index+'-'+index2">
                <router-link :to="item.path+'/'+child.path+'/'+child.children[0].path" class="nav-link" :class="(currentSubPath == (item.path+'/'+child.path)) ? 'active' : ''" :key="index2" v-if="!child.hidden&&child.children">
                  <i :class="'ivu-icon ivu-icon-'+child.icon" style="color: white;"></i>{{ child.name}}
                </router-link>
                <router-link :to="item.path+'/'+child.path" class="nav-link" :class="(currentSubPath == (item.path+'/'+child.path)) ? 'active' : ''" :key="index2" v-else-if="!child.children">
                  <i :class="'ivu-icon ivu-icon-'+child.icon" style="color: white;"></i> {{ child.name}}
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item" v-if="!item.hidden&&!item.children" :key="index" @click="addActive(item.path,index)">
            <router-link :to="item.path" class="nav-link" :class="(currentSubPath == (item.path)) ? 'active' : ''" exact>
              <i :class="'ivu-icon ivu-icon-'+item.icon" style="color: white;"></i>{{ item.name}}
            </router-link>
          </li>

        </template>
      </ul>
    </nav>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { debuglog } from 'util'
@Component({
  props: {
    routes: Array
  }
})
export default class SidebarItem extends Vue {
  // @Prop() routes!: Array<any>
  currentItem2: number = -1
  currentSubPath: string = ''
  get currentItem() {
    return this.currentItem2
  }
  handleClick(index: number, path: string) {
    if (this.currentItem2 === index) {
      this.currentItem2 = -1
    } else {
      let curPath = this.$router.currentRoute.path
      if (curPath.indexOf(path) >= 0) path = curPath
      this.currentSubPath = path
      this.currentItem2 = index
    }
  }
  addActive(path: string, index: number) {
    this.currentItem2 = index
    this.currentSubPath = path
  }
  created() {
    this.currentSubPath = this.$router.currentRoute.path
    console.log(this.$props.routes)
    if (this.$props.routes)
      for (var i = 0; i < this.$props.routes.length; i++) {
        let it = this.$props.routes[i]
        if (this.currentSubPath.indexOf(it.path) >= 0) {
          this.currentItem2 = i
          break
        }
      }
  }
}
</script>

<style type="text/css" scoped>
.wscn-icon {
  margin-right: 10px;
}
.hideSidebar .menu-indent {
  display: block;
  text-indent: 10px;
}
.ivu-icon-speedometer:before {
  content: '\F2B3';
}
.ivu-icon-bookmark:before {
  content: '\F26B';
}
.ivu-icon-thumbsup:before {
  content: '\F251';
}
.ivu-icon-pie-graph:before {
  content: '\F2A5';
}
.ivu-icon-ios-paper:before {
  content: '\F472';
}
.ivu-icon-merge:before {
  content: '\F33F';
}
.ivu-icon-android-list:before {
  content: '\F391';
}
.ivu-icon-social-youtube:before {
  content: '\F24D';
}
.ivu-icon-wand:before {
  content: '\F358';
}
.ivu-icon-alert:before {
  content: '\F101';
}
.ivu-icon-ios-browsers-outline:before {
  content: '\F3EF';
}
.ivu-icon-ios-list-outline:before {
  content: '\F453';
}
.ivu-icon-ios-chatbubble-outline:before {
  content: '\F3FB';
}
.ivu-icon-ios-arrow-down:before {
  content: '\F3D0';
}
.ivu-icon-load-d:before {
  content: '\F29D';
}
.ivu-icon-ios-checkmark-outline:before {
  content: '\F3FE';
}
.ivu-icon-android-more-vertical:before {
  content: '\F397';
}
.ivu-icon-ios-pause-outline:before {
  content: '\F477';
}
.ivu-icon-ios-clock-outline:before {
  content: '\F402';
}
.ivu-icon-ios-cloud-upload-outline:before {
  content: '\F40A';
}
.ivu-icon-stats-bars:before {
  content: '\F2B5';
}
.ivu-icon-arrow-graph-up-right:before {
  content: '\F262';
}
.ivu-icon-ios-analytics:before {
  content: '\F3CE';
}
.ivu-icon-ios-calendar-outline:before {
  content: '\F3F3';
}
</style>
