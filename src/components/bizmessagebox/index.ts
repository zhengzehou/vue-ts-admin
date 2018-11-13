import Vue from 'vue'
import Main from './BizMessageBox.vue'
const merge = require('webpack-merge')

let MessageBoxConstructor = Vue.extend(Main)

let currentMsg: any, instance: any
let msgQueue: any = []

const defaultCallback = (action: any) => {
  if (currentMsg) {
    let callback = currentMsg.callback
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action)
      } else {
        callback(action)
      }
    }
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        if (instance.showInput) {
          currentMsg.resolve({ value: instance.inputValue, action })
        } else {
          currentMsg.resolve(action)
        }
      } else if (
        currentMsg.reject &&
        (action === 'cancel' || action === 'close')
      ) {
        // currentMsg.reject(action)
      }
    }
  }
}
const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  })
}
const showNextMsg = () => {
  if (!instance) {
    initInstance()
  }
  instance.action = ''

  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift()

      let options = currentMsg.options
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop]
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback
      }

      let oldCb = instance.callback
      instance.callback = (action: any, instance: any) => {
        oldCb(action, instance)
        // showNextMsg()
      }
      delete instance.$slots.default
      ;[
        'modal',
        'showClose',
        'closeOnClickModal',
        'closeOnPressEscape',
        'closeOnHashChange'
      ].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true
        }
      })
      document.body.appendChild(instance.$el)

      Vue.nextTick(() => {
        instance.visible = true
      })
    }
  }
}

const BizMessageBox: any = function(options: any, callback: any) {
  if (
    typeof options == 'function' ||
    options == 'undefined' ||
    typeof options == 'undefined'
  )
    return
  options = options || {}
  if (typeof options === 'string') {
    options = { message: options }
    if (typeof arguments[1] === 'string') {
      options.title = arguments[1]
    }
  } else if (options.callback && !callback) {
    callback = options.callback
  }
  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      // eslint-disable-line
      msgQueue.push({
        options: merge({}, BizMessageBox.defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      })

      showNextMsg()
    })
  } else {
    msgQueue.push({
      options: merge({}, BizMessageBox.defaults, options),
      callback: callback
    })

    showNextMsg()
  }
}
BizMessageBox.bizDialog = (message: string, title: string, options: any) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  } else if (title === undefined) {
    title = ''
  }
  return BizMessageBox(
    merge(
      {
        title: title,
        message: message,
        type: 'confirm',
        showCancelButton: true,
        showInput: false
      },
      options
    )
  )
}

Vue.prototype.$bizDialog = BizMessageBox.bizDialog

export default BizMessageBox
export { BizMessageBox }
