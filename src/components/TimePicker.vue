<template>
  <div v-show="visible" class="el-time-panel el-popper" :x-placement="placement" :style="{'z-index':'2','position':'fixed','top':top+'px','left':left+'px'}">
    <div class="el-time-panel__content" :class="{ 'has-seconds': showSeconds }">
      <TimeSpinner ref="spinner" @change="handleChange" :arrow-control="useArrow" :show-seconds="showSeconds" :am-pm-mode="amPmMode" @select-range="setSelectionRange" :date="date">
      </TimeSpinner>
    </div>
    <div class="el-time-panel__footer">
      <Button type="button" class="ivu-btn ivu-btn-default ivu-btn-small cancel" @click="handleCancel">{{ t('el.datepicker.cancel') }}</Button>
      <Button type="button" class="ivu-btn ivu-btn-primary ivu-btn-small" :class="{confirm: !disabled}" @click="handleConfirm()">{{ t('el.datepicker.confirm') }}</Button>
    </div>
    <div class="popper__arrow" style="left:35px;"></div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Button from './Button.vue'
import TimeSpinner from './TimeSpinner.vue'
import { dateUtils } from '@/utils/DateUtils'
import { t } from '@/local/index.ts'
import clickoutside from '@/directives/CustomDirectives'

@Component({
  components: { TimeSpinner, Button },
  directives: {
    clickoutside
  },
  props: {
    msg: String,
    type: String,
    top: { type: Number, default: 100 },
    left: { type: Number, default: 100 },
    placement: { type: String, default: 'bottom-start' },
    timeArrowControl: Boolean,
    value: String
  }
})
export default class TimePicker extends Vue {
  visible = false
  format = 'HH:mm:ss'
  defaultValue = ''
  date: any = new Date()
  currentDate: any = new Date()
  oldValue: any = new Date()
  selectableRange = []
  selectionRange = [0, 2]
  disabled = false
  arrowControl = false
  needInitAdjust = true
  get showSeconds() {
    return (this.format || '').indexOf('ss') !== -1
  }
  get useArrow() {
    return this.arrowControl || this.$props.timeArrowControl || false
  }
  get amPmMode() {
    if ((this.format || '').indexOf('A') !== -1) return 'A'
    if ((this.format || '').indexOf('a') !== -1) return 'a'
    return ''
  }
  @Watch('visible')
  visible2(val: any) {
    if (val) {
      this.oldValue = this.defaultValue
      // this.$nextTick(() => this.$refs.spinner.emitSelectRange('hours'));
    } else {
      this.needInitAdjust = true
    }
  }
  @Watch('value')
  value2(newVal: any) {
    if (newVal) {
      this.date = new Date(newVal) //this.limitTimeRange(newVal, this.selectableRange, this.format);
    } else {
      this.date = this.defaultValue ? new Date(this.defaultValue) : new Date()
    }
    if (this.$props.visible && this.needInitAdjust) {
      // this.$nextTick(_ => this.adjustSpinners());
      this.needInitAdjust = false
    }
    console.log('value>>>' + this.date)
  }
  @Watch('selectableRange')
  selectableRange2(val: any) {
    // this.$refs.spinner.selectableRange = val;
  }
  @Watch('defaultValue')
  defaultValue2(val: any) {
    if (dateUtils.isDate(this.$props.value)) {
      this.date = new Date(this.$props.value)
    } else if (dateUtils.isTime(this.$props.value)) {
      var str = dateUtils.formatToStr(this.date, 'yyyy-MM-dd')
      this.date = new Date(str + ' ' + this.$props.value)
    }
  }
  t(s: any) {
    return t(s)
  }
  handleCancel() {
    this.$emit('pick', this.oldValue, false)
  }
  handleChange(date: any) {
    if (this.visible && this.date != date) {
      this.currentDate = date
      // // if date is out of range, do not emit
      if (this.isValidValue(date)) {
        this.$emit('pick', date, true)
      }
    }
  }
  setSelectionRange(start: number, end: number) {
    this.$emit('select-range', start, end)
    this.selectionRange = [start, end]
  }
  handleConfirm(visible = false, first: number) {
    // this.visible = visible
    // if (first) return
    // const date = clearMilliseconds(limitTimeRange(this.date, this.selectableRange, this.format));
    console.log('handleConfirm>>>' + this.date)
    this.$emit('pick', this.currentDate, visible, first)
  }
  handleKeydown(event: any) {
    const keyCode = event.keyCode
    const mapping = { 38: -1, 40: 1, 37: -1, 39: 1 }
    // Left or Right
    if (keyCode === 37 || keyCode === 39) {
      // const step = mapping[keyCode];
      // this.changeSelectionRange(step);
      event.preventDefault()
      return
    }
    // Up or Down
    if (keyCode === 38 || keyCode === 40) {
      // const step = mapping[keyCode];
      // this.$refs.spinner.scrollDown(step);
      event.preventDefault()
      return
    }
  }
  isValidValue(date: any) {
    return dateUtils.timeWithinRange(date, this.selectableRange, this.format)
  }
  adjustSpinners() {
    // return this.$refs.spinner.adjustSpinners();
  }
  changeSelectionRange(step: number) {
    const list = [0, 3].concat(this.showSeconds ? [6] : [])
    const mapping = ['hours', 'minutes'].concat(
      this.showSeconds ? ['seconds'] : []
    )
    const index = list.indexOf(this.selectionRange[0])
    const next = (index + step + list.length) % list.length
    // this.$refs.spinner.emitSelectRange(mapping[next]);
  }
  mounted() {
    // this.$nextTick(() => this.handleConfirm(true, true));
    this.$emit('mounted')
  }
}
</script>
