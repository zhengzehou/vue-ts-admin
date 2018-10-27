<template>
  <Input v-clickoutside:time-spinner="hidenPicker" :value="displayValue" :placeholder="placeholder" prefix-icon="icon-time" @clear="handleClear" @focus="handleFocus(value,$event)" :clearable="clearable" />
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Input from './Input.vue'
import TimePicker from './TimePicker.vue'
import { dateUtils } from '@/utils/DateUtils'
import clickoutside from '@/directives/CustomDirectives'

@Component({
  components: { Input, TimePicker },
  directives: {
    clickoutside
  },
  props: {
    type: String,
    placeholder: String,
    disabled: Boolean,
    value: String,
    clearable: {
      type: Boolean,
      default: false
    }
  }
})
export default class TimeInput extends Vue {
  inputHeight = 32
  timePicker = new TimePicker()
  currentVal = ''
  get displayValue() {
    if (this.currentVal === this.$props.value) return this.currentVal
    this.currentVal =
      this.currentVal == '' ? this.$props.value : this.currentVal
    if (this.currentVal && dateUtils.isTime(this.currentVal)) {
      this.currentVal = dateUtils.formatTime(this.currentVal, 'hh:mm:ss')
    }
    return this.currentVal
  }
  hidenPicker() {
    this.timePicker.visible = false
  }
  handleClear() {
    this.currentVal = ''
    this.$emit('input', '')
  }
  handleClick(e: Event) {
    this.$emit('click', e)
  }
  handleFocus(value: any, e: any) {
    if (this.timePicker.visible) {
      return
    }
    this.inputHeight = e.currentTarget.getBoundingClientRect().height
    var newnode = document.createElement('div')
    this.timePicker.visible = true
    this.timePicker.$props.top =
      e.currentTarget.getBoundingClientRect().top +
      e.currentTarget.getBoundingClientRect().height
    this.timePicker.$props.left = e.currentTarget.getBoundingClientRect().left
    if (dateUtils.isTime(value)) {
      this.timePicker.defaultValue = value
      var str = dateUtils.formatToStr(new Date(), 'yyyy-MM-dd')
      var dd = dateUtils.toDate(str + ' ' + this.displayValue)
      this.timePicker.date = dd
    }
    this.timePicker.$mount(newnode)
    this.$root.$el.appendChild(this.timePicker.$el)
  }

  handleScroll() {
    var scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    let picker: any = document.getElementsByClassName('el-time-panel')[0]
    if (picker) {
      let top = this.$el.getBoundingClientRect().top
      let divHeight = picker.getBoundingClientRect().height
      let winHeight = window.innerHeight - this.inputHeight
      //   this.datePicker.
      if (winHeight - top > divHeight) {
        this.timePicker.$props.placement = 'bottom-start'
        picker.style.top = top + this.inputHeight + 'px'
      } else if (top - 50 > divHeight) {
        this.timePicker.$props.placement = 'top-start'
        picker.style.top = top - divHeight + 'px'
      } else {
        this.timePicker.$props.placement = 'top-start'
        picker.style.top = 50 + 'px'
      }
    }
  }
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    var that = this
    this.timePicker.$on('pick', function(data: any, visible: boolean) {
      that.currentVal = dateUtils.formatTime(data, 'hh:mm:ss')
      if (!visible) that.$emit('input', that.currentVal)
      that.timePicker.visible = visible
    })
  }
  updated() {
    // console.log(this.value)
  }
}
</script>
