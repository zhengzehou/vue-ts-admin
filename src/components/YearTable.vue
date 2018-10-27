<template>
  <table @click="handleYearTableClick" class="el-year-table">
    <tbody>
      <tr>
        <td class="available" :class="getCellStyle(startYear + 0)">
          <a class="cell">{{ startYear }}</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 1)">
          <a class="cell">{{ startYear + 1 }}</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 2)">
          <a class="cell">{{ startYear + 2 }}</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 3)">
          <a class="cell">{{ startYear + 3 }}</a>
        </td>
      </tr>
      <tr>
        <td class="available" :class="getCellStyle(startYear + 4)">
          <a class="cell">{{ startYear + 4 }}</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 5)">
          <a class="cell">{{ startYear + 5 }}</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 6)">
          <a class="cell">{{ startYear + 6 }}</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 7)">
          <a class="cell">{{ startYear + 7 }}</a>
        </td>
      </tr>
      <tr>
        <td class="available" :class="getCellStyle(startYear + 8)">
          <a class="cell">{{ startYear + 8 }}</a>
        </td>
        <td class="available" :class="getCellStyle(startYear + 9)">
          <a class="cell">{{ startYear + 9 }}</a>
        </td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { dateUtils } from '@/utils/DateUtils'
const datesInYear = (year: number) => {
  const numOfDays = dateUtils.getDayCountOfYear(year)
  const firstDay = new Date(year, 0, 1)
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
        return val === null || (val instanceof Date && dateUtils.isDate(val))
      }
    },
    date: {}
  }
})
export default class YearTable extends Vue {
  get startYear() {
    return Math.floor(this.$props.date.getFullYear() / 10) * 10
  }
  getCellStyle(year: number) {
    const style: any = {}
    const today = new Date()
    style.disabled =
      typeof this.$props.disabledDate === 'function'
        ? datesInYear(year).every(this.$props.disabledDate)
        : false
    style.current =
      dateUtils.arrayFindIndex(
        dateUtils.coerceTruthyValueToArray(this.$props.value),
        (date: Date) => date.getFullYear() === year
      ) >= 0
    style.today = today.getFullYear() === year
    style.default =
      this.$props.defaultValue &&
      this.$props.defaultValue.getFullYear() === year
    return style
  }
  handleYearTableClick(event: any) {
    const target = event.target
    if (target.tagName === 'A') {
      if (dateUtils.hasClass(target.parentNode, 'disabled')) return
      const year = target.textContent || target.innerText
      this.$emit('pick', Number(year))
    }
  }
}
</script>
