<template>
  <div>
    <div v-show="visible" ref="dataPicker" class="el-picker-panel el-date-picker el-popper" :x-placement="placement" :style="{'z-index':'2','position':'fixed','top':top+'px','left':left+'px'}" :class="[{
        'has-sidebar': $slots.sidebar || shortcuts,
        'has-time': showTime
      }, popperClass]">
      <div class="el-picker-panel__body-wrapper">
        <slot name="sidebar" class="el-picker-panel__sidebar"></slot>
        <div class="el-picker-panel__sidebar" v-if="shortcuts">
          <button type="button" class="el-picker-panel__shortcut" v-for="(shortcut, key) in shortcuts" :key="key" @click="handleShortcutClick(shortcut)">{{ shortcut.text }}</button>
        </div>
        <div class="el-picker-panel__body">
          <div class="el-date-picker__time-header" v-if="showTime">
            <span class="el-date-picker__editor-wrap">
              <el-input :placeholder="t('el.datepicker.selectDate')" :value="visibleDate" size="small" @input="val => userInputDate = val" @change="handleVisibleDateChange" />
            </span>
            <span class="el-date-picker__editor-wrap" v-clickoutside="handleTimePickClose">
              <el-input ref="input" @focus="timePickerVisible = true" :placeholder="t('el.datepicker.selectTime')" :value="visibleTime" size="small" @input="val => userInputTime = val" @change="handleVisibleTimeChange" />
              <time-picker ref="timepicker" :time-arrow-control="arrowControl" @pick="handleTimePick" :visible="timePickerVisible" @mounted="proxyTimePickerDataProperties">
              </time-picker>
            </span>
          </div>
          <div class="el-date-picker__header" :class="{ 'el-date-picker__header--bordered': currentView === 'year' || currentView === 'month' }" v-show="currentView !== 'time'">
            <button type="button" @click="prevYear" :aria-label="t(`el.datepicker.prevYear`)" class="el-picker-panel__icon-btn ivu-icon el-date-picker__prev-btn el-icon-d-arrow-left">
            </button>
            <button type="button" @click="prevMonth" v-show="currentView === 'date'" :aria-label="t(`el.datepicker.prevMonth`)" class="el-picker-panel__icon-btn ivu-icon el-date-picker__prev-btn el-icon-arrow-left">
            </button>
            <span @click="showYearPicker" role="button" class="el-date-picker__header-label">{{ yearLabel }}</span>
            <span @click="showMonthPicker" v-show="currentView === 'date'" role="button" class="el-date-picker__header-label" :class="{ active: currentView === 'month' }">{{t(`el.datepicker.month${ month + 1 }`)}}</span>
            <button type="button" @click="nextYear" :aria-label="t(`el.datepicker.nextYear`)" class="el-picker-panel__icon-btn ivu-icon el-date-picker__next-btn el-icon-d-arrow-right">
            </button>
            <button type="button" @click="nextMonth" v-show="currentView === 'date'" :aria-label="t(`el.datepicker.nextMonth`)" class="el-picker-panel__icon-btn ivu-icon el-date-picker__next-btn el-icon-arrow-right">
            </button>
          </div>

          <div class="el-picker-panel__content">
            <DateTable v-show="currentView === 'date'" @pick="handleDatePick" :selection-mode="selectionMode" :first-day-of-week="firstDayOfWeek" :value="value" :default-value="defaultValue ? new Date(defaultValue) : null" :date="date" :disabled-date="disabledDate">
            </DateTable>
            <YearTable v-show="currentView === 'year'" @pick="handleYearPick" :value="value" :default-value="defaultValue ? new Date(defaultValue) : null" :date="date" :disabled-date="disabledDate">
            </YearTable>
            <MonthTable v-show="currentView === 'month'" @pick="handleMonthPick" :value="value" :default-value="defaultValue ? new Date(defaultValue) : null" :date="date" :disabled-date="disabledDate">
            </MonthTable>
          </div>
        </div>
      </div>

      <div class="el-picker-panel__footer" v-show="footerVisible && currentView === 'date'">
        <Button size="mini" type="text" class="el-picker-panel__link-btn" @click="changeToNow" v-show="selectionMode !== 'dates'">
          {{ t('el.datepicker.now') }}
        </Button>
        <Button plain size="mini" class="el-picker-panel__link-btn" @click="confirm">
          {{ t('el.datepicker.confirm') }}
        </Button>
      </div>
      <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Button from './Button.vue'
import DateTable from './DateTable.vue'
import YearTable from './YearTable.vue'
import MonthTable from './MonthTable.vue'
import { dateUtils } from '@/utils/DateUtils'
import { t } from '@/local/index.ts'

@Component({
  components: { DateTable, Button, YearTable, MonthTable },
  props: {
    msg: String,
    type: String,
    top: { type: Number, default: 100 },
    left: { type: Number, default: 100 },
    placement: { type: String, default: 'bottom-start' }
    // visible: Boolean
  }
})
export default class DatePicker extends Vue {
  popperClass = ''
  date = new Date()
  currentValue = ''
  defaultValue: any = '' // use getDefaultValue() for time computation
  defaultTime = null
  showTime = false
  selectionMode = 'day'
  shortcuts = ''
  currentView = 'date'
  disabledDate = ''
  firstDayOfWeek = 7
  showWeekNumber = false
  timePickerVisible = false
  visible = false
  format = ''
  arrowControl = false
  userInputDate = null
  userInputTime = null
  get value() {
    if (this.currentValue === '' || this.currentValue !== this.defaultValue) {
      this.currentValue = this.defaultValue
      return this.currentValue
    }
    return this.defaultValue
  }
  get year() {
    return this.date.getFullYear()
  }
  get month() {
    return this.date.getMonth()
  }
  get week() {
    return dateUtils.getWeekNumber(this.date)
  }
  get monthDate() {
    return this.date.getDate()
  }
  get footerVisible() {
    return this.showTime || this.selectionMode === 'dates'
  }
  get visibleTime() {
    if (this.userInputTime !== null) {
      return this.userInputTime
    } else {
      return dateUtils.formatDate(
        this.value || this.defaultValue,
        this.timeFormat
      )
    }
  }
  get visibleDate() {
    if (this.userInputDate !== null) {
      return this.userInputDate
    } else {
      return dateUtils.formatDate(
        this.value || this.defaultValue,
        this.dateFormat
      )
    }
  }
  get yearLabel() {
    const yearTranslation = t('el.datepicker.year')
    if (this.currentView === 'year') {
      const startYear = Math.floor(this.year / 10) * 10
      if (yearTranslation) {
        return (
          startYear +
          ' ' +
          yearTranslation +
          ' - ' +
          (startYear + 9) +
          ' ' +
          yearTranslation
        )
      }
      return startYear + ' - ' + (startYear + 9)
    }
    return this.year + ' ' + yearTranslation
  }
  get timeFormat() {
    if (this.format) {
      return dateUtils.extractTimeFormat(this.format)
    } else {
      return 'HH:mm:ss'
    }
  }
  get dateFormat() {
    if (this.format) {
      return dateUtils.extractDateFormat(this.format)
    } else {
      return 'yyyy-MM-dd'
    }
  }

  proxyTimePickerDataProperties() {
    const format = (timeFormat: any) => {
      let timepicker: any = this.$refs.timepicker
      timepicker.format = timeFormat
    }
    const value = (value: any) => {
      let timepicker: any = this.$refs.timepicker
      timepicker.value = value
    }
    const date = (date: any) => {
      let timepicker: any = this.$refs.timepicker
      timepicker.date = date
    }
    this.$watch('value', value)
    this.$watch('date', date)
    format(this.timeFormat)
    value(this.value)
    date(this.date)
  }
  handleClear() {
    this.date = this.getDefaultValue()
    this.$emit('pick', null)
  }
  emit(value: any, ...args: any[]) {
    if (!value) {
      this.$emit('pick', value, ...args)
    } else if (Array.isArray(value)) {
      const dates = value.map(
        date =>
          this.showTime
            ? dateUtils.clearMilliseconds(date)
            : dateUtils.clearTime(date)
      )
      this.$emit('pick', dates, ...args)
    } else {
      this.$emit(
        'pick',
        this.showTime
          ? dateUtils.clearMilliseconds(value)
          : dateUtils.clearTime(value),
        ...args
      )
    }
    this.userInputDate = null
    this.userInputTime = null
  }
  // resetDate() {
  //   this.date = new Date(this.date);
  // },
  showMonthPicker() {
    this.currentView = 'month'
  }
  showYearPicker() {
    this.currentView = 'year'
  }
  // XXX: 没用到
  // handleLabelClick() {
  //   if (this.currentView === 'date') {
  //     this.showMonthPicker();
  //   } else if (this.currentView === 'month') {
  //     this.showYearPicker();
  //   }
  // },
  prevMonth() {
    this.date = dateUtils.prevMonth(this.date)
  }
  nextMonth() {
    this.date = dateUtils.nextMonth(this.date)
  }
  prevYear() {
    if (this.currentView === 'year') {
      this.date = dateUtils.prevYear(this.date, 10)
    } else {
      this.date = dateUtils.prevYear(this.date)
    }
  }
  nextYear() {
    if (this.currentView === 'year') {
      this.date = dateUtils.nextYear(this.date, 10)
    } else {
      this.date = dateUtils.nextYear(this.date)
    }
  }
  handleShortcutClick(shortcut: any) {
    if (shortcut.onClick) {
      shortcut.onClick(this)
    }
  }
  handleTimePick(value: any, visible: any, first: any) {
    if (dateUtils.isDate(value)) {
      const newDate = this.value
        ? dateUtils.modifyTime(
            value,
            value.getHours(),
            value.getMinutes(),
            value.getSeconds()
          )
        : dateUtils.modifyWithTimeString(
            this.getDefaultValue(),
            this.defaultTime
          )
      this.date = newDate
      this.emit(this.date, true)
    } else {
      this.emit(value, true)
    }
    if (!first) {
      this.timePickerVisible = visible
    }
  }
  handleTimePickClose() {
    this.timePickerVisible = false
  }
  handleMonthPick(month: number) {
    if (this.selectionMode === 'month') {
      this.date = dateUtils.modifyDate(this.date, this.year, month, 1)
      this.emit(this.date)
    } else {
      this.date = dateUtils.changeYearMonthAndClampDate(
        this.date,
        this.year,
        month
      )
      // TODO: should emit intermediate value ??
      // this.emit(this.date);
      this.currentView = 'date'
    }
  }
  handleDatePick(value: any) {
    if (this.selectionMode === 'day') {
      this.date = this.value
        ? dateUtils.modifyDate(
            value,
            value.getFullYear(),
            value.getMonth(),
            value.getDate()
          )
        : dateUtils.modifyWithTimeString(value, this.defaultTime)
      this.emit(this.date, this.showTime)
      this.handleTimePickClose()
    } else if (this.selectionMode === 'week') {
      this.emit(value.date)
    } else if (this.selectionMode === 'dates') {
      this.emit(value, true) // set false to keep panel open
    }
  }
  handleYearPick(year: number) {
    if (this.selectionMode === 'year') {
      this.date = dateUtils.modifyDate(this.date, year, 0, 1)
      this.emit(this.date)
    } else {
      this.date = dateUtils.changeYearMonthAndClampDate(
        this.date,
        year,
        this.month
      )
      // TODO: should emit intermediate value ??
      // this.emit(this.date, true);
      this.currentView = 'month'
    }
  }
  changeToNow() {
    // if (!this.disabledDate || !this.disabledDate(new Date())) {
    //   this.date = new Date()
    //   this.emit(this.date)
    // }
  }
  confirm() {
    if (this.selectionMode === 'dates') {
      this.emit(this.value)
    } else {
      // value were emitted in handle{Date,Time}Pick, nothing to update here
      // deal with the scenario where: user opens the picker, then confirm without doing anything
      const value = this.value
        ? this.value
        : dateUtils.modifyWithTimeString(
            this.getDefaultValue(),
            this.defaultTime
          )
      this.date = new Date(value) // refresh date
      this.emit(value)
    }
  }
  resetView() {
    if (this.selectionMode === 'month') {
      this.currentView = 'month'
    } else if (this.selectionMode === 'year') {
      this.currentView = 'year'
    } else {
      this.currentView = 'date'
    }
  }
  handleEnter() {
    document.body.addEventListener('keydown', this.handleKeydown)
  }
  handleLeave() {
    this.$emit('dodestroy')
    document.body.removeEventListener('keydown', this.handleKeydown)
  }
  handleKeydown(event: any) {
    const keyCode = event.keyCode
    const list = [38, 40, 37, 39]
    if (this.$props.visible && !this.timePickerVisible) {
      if (list.indexOf(keyCode) !== -1) {
        this.handleKeyControl(keyCode)
        event.stopPropagation()
        event.preventDefault()
      }
      if (
        keyCode === 13 &&
        this.userInputDate === null &&
        this.userInputTime === null
      ) {
        // Enter
        this.emit(this.date, false)
      }
    }
  }
  handleKeyControl(keyCode: number) {
    const mapping = {
      year: {
        38: -4,
        40: 4,
        37: -1,
        39: 1,
        offset: (date: Date, step: number) =>
          date.setFullYear(date.getFullYear() + step)
      },
      month: {
        38: -4,
        40: 4,
        37: -1,
        39: 1,
        offset: (date: Date, step: number) =>
          date.setMonth(date.getMonth() + step)
      },
      week: {
        38: -1,
        40: 1,
        37: -1,
        39: 1,
        offset: (date: Date, step: number) =>
          date.setDate(date.getDate() + step * 7)
      },
      day: {
        38: -7,
        40: 7,
        37: -1,
        39: 1,
        offset: (date: Date, step: number) =>
          date.setDate(date.getDate() + step)
      }
    }
    const mode = this.selectionMode
    const year = 3.1536e10
    const now = this.date.getTime()
    const newDate = new Date(this.date.getTime())
    while (Math.abs(now - newDate.getTime()) <= year) {
      // TODO
      // const map = mapping[mode]
      // map.offset(newDate, map[keyCode])
      // if (
      //   typeof this.disabledDate === 'function' &&
      //   this.disabledDate(newDate)
      // ) {
      //   continue
      // }
      this.date = newDate
      this.$emit('pick', newDate, true)
      break
    }
  }
  handleVisibleTimeChange(value: any) {
    const time = dateUtils.parseDate(value, this.timeFormat)
    if (time) {
      this.date = dateUtils.modifyDate(
        time,
        this.year,
        this.month,
        this.monthDate
      )
      this.userInputTime = null
      let timepicker: any = this.$refs.timepicker
      timepicker.value = this.date
      this.timePickerVisible = false
      this.emit(this.date, true)
    }
  }
  handleVisibleDateChange(value: any) {
    const date = dateUtils.parseDate(value, this.dateFormat)
    if (date) {
      if (
        typeof this.disabledDate ===
        'function' /*  && this.disabledDate(date) */
      ) {
        return
      }
      this.date = dateUtils.modifyTime(
        date,
        this.date.getHours(),
        this.date.getMinutes(),
        this.date.getSeconds()
      )
      this.userInputDate = null
      this.resetView()
      this.emit(this.date, true)
    }
  }
  isValidValue(value: any) {
    return (
      value &&
      !isNaN(
        value
      ) /* &&
      (typeof this.disabledDate === 'function'
        ? !this.disabledDate(value)
        : true) */
    )
  }
  getDefaultValue(): Date {
    // if default-value is set, return it
    // otherwise, return now (the moment this method gets called)
    return this.defaultValue ? new Date(this.defaultValue) : new Date()
  }
  @Watch('showTime')
  showTime2(val: any) {
    /* istanbul ignore if */
    if (!val) return
    // this.$nextTick(_ => {
    //   const inputElm = this.$refs.input.$el
    //   if (inputElm) {
    //     this.pickerWidth = inputElm.getBoundingClientRect().width + 10
    //   }
    // })
  }
  @Watch('value')
  value2(val: any) {
    if (this.selectionMode === 'dates' && this.value) return
    if (dateUtils.isDate(val)) {
      this.date = new Date(val)
    } else {
      this.date = this.getDefaultValue()
    }
  }
  @Watch('defaultValue')
  defaultValue2(val: any) {
    if (!dateUtils.isDate(this.value)) {
      this.date = val ? new Date(val) : new Date()
    }
  }
  @Watch('timePickerVisible')
  timePickerVisible2(val: any) {
    if (val)
      this.$nextTick(() => {
        let tp: any = this.$refs.timepicker
        tp.adjustSpinners()
      })
  }
  @Watch('selectionMode')
  selectionMode2(newVal: any) {
    if (newVal === 'month') {
      /* istanbul ignore next */
      if (this.currentView !== 'year' && this.currentView !== 'month') {
        this.currentView = 'month'
      }
    } else if (newVal === 'dates') {
      this.currentView = 'date'
    }
  }
  t(s: any) {
    return t(s)
  }
}
</script>
