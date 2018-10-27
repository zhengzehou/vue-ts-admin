<template>
  <table @click="handleMonthTableClick" class="el-month-table">
    <tbody>
      <tr>
        <td :class="getCellStyle(0)">
          <a class="cell">{{ t('el.datepicker.months.jan') }}</a>
        </td>
        <td :class="getCellStyle(1)">
          <a class="cell">{{ t('el.datepicker.months.feb') }}</a>
        </td>
        <td :class="getCellStyle(2)">
          <a class="cell">{{ t('el.datepicker.months.mar') }}</a>
        </td>
        <td :class="getCellStyle(3)">
          <a class="cell">{{ t('el.datepicker.months.apr') }}</a>
        </td>
      </tr>
      <tr>
        <td :class="getCellStyle(4)">
          <a class="cell">{{ t('el.datepicker.months.may') }}</a>
        </td>
        <td :class="getCellStyle(5)">
          <a class="cell">{{ t('el.datepicker.months.jun') }}</a>
        </td>
        <td :class="getCellStyle(6)">
          <a class="cell">{{ t('el.datepicker.months.jul') }}</a>
        </td>
        <td :class="getCellStyle(7)">
          <a class="cell">{{ t('el.datepicker.months.aug') }}</a>
        </td>
      </tr>
      <tr>
        <td :class="getCellStyle(8)">
          <a class="cell">{{ t('el.datepicker.months.sep') }}</a>
        </td>
        <td :class="getCellStyle(9)">
          <a class="cell">{{ t('el.datepicker.months.oct') }}</a>
        </td>
        <td :class="getCellStyle(10)">
          <a class="cell">{{ t('el.datepicker.months.nov') }}</a>
        </td>
        <td :class="getCellStyle(11)">
          <a class="cell">{{ t('el.datepicker.months.dec') }}</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { dateUtils } from '@/utils/DateUtils'
import { t } from '@/local/index'
const datesInMonth = (year: number, month: number) => {
  const numOfDays = dateUtils.getDayCountOfMonth(year, month)
  const firstDay = new Date(year, month, 1)
  return dateUtils
    .range(numOfDays)
    .map((n: number) => dateUtils.nextDate(firstDay, n))
}
@Component({
  props: {
    disabledDate: {},
    value: {},
    defaultValue: {
      validator(val) {
        // null or valid Date Object
        return val === null || (val instanceof Date && dateUtils.isDate(val))
      }
    },
    date: {}
  }
})
export default class DateTable extends Vue {
  // mixins: [Locale]
  getCellStyle(month: number) {
    const style: any = {}
    const year = this.$props.date.getFullYear()
    const today = new Date()
    style.disabled =
      typeof this.$props.disabledDate === 'function'
        ? datesInMonth(year, month).every(this.$props.disabledDate)
        : false
    style.current =
      dateUtils.arrayFindIndex(
        dateUtils.coerceTruthyValueToArray(this.$props.value),
        (date: Date) => date.getFullYear() === year && date.getMonth() === month
      ) >= 0
    style.today = today.getFullYear() === year && today.getMonth() === month
    style.default =
      this.$props.defaultValue &&
      this.$props.defaultValue.getFullYear() === year &&
      this.$props.defaultValue.getMonth() === month
    return style
  }
  handleMonthTableClick(event: any) {
    const target = event.target
    if (target.tagName !== 'A') return
    if (dateUtils.hasClass(target.parentNode, 'disabled')) return
    const column = target.parentNode.cellIndex
    const row = target.parentNode.parentNode.rowIndex
    const month = row * 4 + column
    this.$emit('pick', month)
  }
  t(s: string) {
    return t(s)
  }
}
</script>
