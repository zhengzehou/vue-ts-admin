import { DirectiveOptions } from 'vue'

const clickoutside: DirectiveOptions = {
  // 初始化指令
  bind(el: any, binding: any, vnode: any) {
    function documentHandler(e: any) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      //验证是否为子节点或者关联节点，如果是则返回
      if(binding.arg && e.target.className && e.target.className.indexOf(binding.arg) >= 0){
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el: any, binding: any) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
export default clickoutside
