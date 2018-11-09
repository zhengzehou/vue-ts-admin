import Vue from 'vue'
import Main from './Main.vue'
const merge = require('webpack-merge')

let LoadingConstructor = Vue.extend(Main)

const defaults = {
  text: 'Loading...',
  fullscreen: true,
  body: false,
  customClass: ''
}

// let fullscreenLoading: any
// LoadingConstructor.prototype.close = function() {
//   debugger
//   if (this.fullscreen) {
//     fullscreenLoading = undefined
//   }
//   this.handleAfterLeave(
//     this,
//     () => {
//       // const target = this.fullscreen || this.body
//       //   ? document.body
//       //   : this.target;
//       // removeClass(target, 'el-loading-parent--relative');
//       // removeClass(target, 'el-loading-parent--hidden');
//       if (this.$el && this.$el.parentNode) {
//         this.$el.parentNode.removeChild(this.$el)
//       }
//       this.$destroy()
//     },
//     300
//   )
//   this.visible = false
// }

const Loading: any = function(options: any) {
  if (
    typeof options == 'function' ||
    options == 'undefined' ||
    typeof options == 'undefined'
  )
    return
  options = merge({}, defaults, options)
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target)
  }
  options.target = options.target || document.body
  if (options.target !== document.body) {
    options.fullscreen = false
  } else {
    options.body = true
  }
  // if (options.fullscreen && fullscreenLoading) {
  //   return fullscreenLoading
  // }
  let parent = options.body ? document.body : options.target
  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  })
  parent.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.visible = true
  })
  // if (options.fullscreen) {
  //   fullscreenLoading = instance
  // }
  return instance
}

Vue.prototype.$loading = Loading

export default Loading
