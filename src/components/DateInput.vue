<template>
  <Input v-clickoutside="hidenPicker"  :value="displayValue" :placeholder="placeholder" prefix-icon="icon-calendar" @clear="handleClear" @focus="handleFocus(value,$event)" :clearable="clearable" />
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Input from './Input.vue'
import DatePicker from './DatePicker.vue'
import { dateUtils } from '@/utils/DateUtils'
import clickoutside from '@/directives/CustomDirectives'

@Component({
  components: { Input, DatePicker },
  directives: {
    clickoutside
  },
  props: {
    type: String,
    placeholder: String,
    value: [String, Date],
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: false
    }
  }
})
export default class DateInput extends Vue {
  inputHeight = 32
  datePicker = new DatePicker()
  currentVal = ''
  get displayValue() {
    if (this.currentVal) return this.currentVal
    this.currentVal =
      this.currentVal == '' ? this.$props.value : this.currentVal
    // this.currentVal =
    //   this.$props.value === undefined || this.$props.value === null
    //     ? ''
    //     : this.$props.value
    if (this.currentVal) {
      this.currentVal = dateUtils.formatDate(this.currentVal, 'yyyy-MM-dd')
    }
    return this.currentVal
  }
  setDisplayValue(value: string) {
    this.currentVal = value
  }
  handleClick(e: Event) {
    this.$emit('click', e)
  }
  handleFocus(value: any, e: any) {
    if(this.datePicker.visible === true){
      return false
    }
    this.inputHeight = e.currentTarget.getBoundingClientRect().height
    var newnode = document.createElement('div')
    this.datePicker.visible = true
    this.datePicker.$props.top =
      e.currentTarget.getBoundingClientRect().top +
      e.currentTarget.getBoundingClientRect().height
    this.datePicker.$props.left = e.currentTarget.getBoundingClientRect().left
    this.datePicker.$mount(newnode)
    this.datePicker.defaultValue = this.displayValue
    
    this.$root.$el.appendChild(this.datePicker.$el)
  }
  hidenPicker(){
    this.datePicker.visible = false
  }
  handleClear() {
    this.currentVal = ''
    this.$emit('input', '')
  }
  handleScroll() {
    var scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    let picker: any = document.getElementsByClassName('el-date-picker')[0]
    if (picker) {
      let top = this.$el.getBoundingClientRect().top
      let divHeight = picker.getBoundingClientRect().height
      let winHeight = window.innerHeight - this.inputHeight
      //   this.datePicker.
      if (winHeight - top > divHeight) {
        this.datePicker.$props.placement = 'bottom-start'
        picker.style.top = top + this.inputHeight + 'px'
      } else if (top - 50 > divHeight) {
        this.datePicker.$props.placement = 'top-start'
        picker.style.top = top - divHeight + 'px'
      } else {
        this.datePicker.$props.placement = 'top-start'
        picker.style.top = 50 + 'px'
      }
    }
  }
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    var that = this
    this.datePicker.$on('pick', function(data: any) {
      that.currentVal = dateUtils.formatDate(data, '')
      that.$emit('input', that.currentVal)
      that.datePicker.visible = false
    })
  }
  updated() {
    // console.log(this.value)
  }
}
</script>
