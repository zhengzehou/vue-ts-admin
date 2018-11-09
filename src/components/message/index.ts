import Vue from 'vue'
import Main from './Main.vue'
let MessageConstructor = Vue.extend(Main)

// export default Loading
let instance: any
let instances: any = []
let seed = 1

const Message: any = function(options: any) {
  if (
    typeof options == 'function' ||
    options == 'undefined' ||
    typeof options == 'undefined'
  )
    return

  options = options || {}
  if (typeof options === 'string') {
    options = { message: options }
  }
  let userOnClose = options.onClose
  let id = 'message_' + seed++
  options.onClose = function() {
    Message.close(id, userOnClose)
  }
  instance = new MessageConstructor({
    data: options
  })
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.vm.showClose = true
  instance.dom = instance.vm.$el
  instances.push(instance)
  return instance.vm
}
// ;['success', 'warning', 'info', 'error'].forEach(type => {
//   debugger
//   Message[type] = (options: any) => {
//     if (typeof options === 'string') {
//       options = {
//         message: options
//       }
//     }
//     options.type = type
//     return Message(options)
//   }
// })

Message.close = function(id: any, userOnClose: any) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
}

Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

Vue.prototype.$message = Message
export default Message
