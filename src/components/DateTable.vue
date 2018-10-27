<template>
  <table cellspacing="0" cellpadding="0" class="el-date-table" @click="handleClick" @mousemove="handleMouseMove" :class="{ 'is-week-mode': selectionMode === 'week' }">
    <tbody>
      <tr>
        <th v-if="showWeekNumber">{{ t('el.datepicker.week') }}</th>
        <th v-for="(week, key) in WEEKS" :key="key">{{ t('el.datepicker.weeks.' + week) }}</th>
      </tr>
      <tr class="el-date-table__row" v-for="(row, key) in rows" :class="{ current: isWeekActive(row[1]) }" :key="key">
        <td v-for="(cell, key) in row" :class="getCellClasses(cell)" :key="key">
          <div>
            <span>
              {{ cell.text }}
            </span>
          </div>
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
const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const clearHours = function(time: any) {
  const cloneDate = new Date(time)
  cloneDate.setHours(0, 0, 0, 0)
  return cloneDate.getTime()
}
const removeFromArray = function(arr: any, pred: any) {
  const idx =
    typeof pred === 'function' ? arrayFindIndex(arr, pred) : arr.indexOf(pred)
  return idx >= 0 ? [...arr.slice(0, idx), ...arr.slice(idx + 1)] : arr
}
const arrayFindIndex = function(arr: any, pred: any) {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i
    }
  }
  return -1
}

const arrayFind = function(arr: any, pred: any) {
  const idx = arrayFindIndex(arr, pred)
  return idx !== -1 ? arr[idx] : undefined
}
@Component({
  props: {
    firstDayOfWeek: {
      default: 7,
      type: Number,
      validator: val => val >= 1 && val <= 7
    },
    value: {},
    defaultValue: {
      validator(val) {
        return (
          val === null ||
          dateUtils.isDate(val) ||
          (Array.isArray(val) && val.every(dateUtils.isDate))
        )
      }
    },
    date: { type: [String, Date] },
    selectionMode: {
      default: 'day'
    },
    showWeekNumber: {
      type: Boolean,
      default: false
    },
    disabledDate: {},
    minDate: {},
    maxDate: {},
    rangeState: {
      default() {
        return {
          endDate: null,
          selecting: false,
          row: null,
          column: null
        }
      }
    }
  }
})
export default class DateTable extends Vue {
  tableRows = [[], [], [], [], [], []]
  get offsetDay() {
    const week = this.$props.firstDayOfWeek
    // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
    return week > 3 ? 7 - week : -week
  }
  get WEEKS() {
    const week = this.$props.firstDayOfWeek
    return WEEKS.concat(WEEKS).slice(week, week + 7)
  }
  get year() {
    if (this.$props.date) return new Date(this.$props.date).getFullYear()
    else return new Date().getFullYear()
  }
  get month() {
    if (this.$props.date) return new Date(this.$props.date).getMonth()
    return new Date().getMonth()
  }
  get startDate() {
    return dateUtils.getStartDateOfMonth(this.year, this.month)
  }
  get rows() {
    // TODO: refactory rows / getCellClasses
    const date = new Date(this.year, this.month, 1)
    let day = dateUtils.getFirstDayOfMonth(date) // day of first day
    const dateCountOfMonth = dateUtils.getDayCountOfMonth(
      date.getFullYear(),
      date.getMonth()
    )
    const dateCountOfLastMonth = dateUtils.getDayCountOfMonth(
      date.getFullYear(),
      date.getMonth() === 0 ? 11 : date.getMonth() - 1
    )
    day = day === 0 ? 7 : day
    const offset = this.offsetDay
    const rows: any = this.tableRows
    let count = 1
    let firstDayPosition
    const startDate = this.startDate
    const disabledDate = this.$props.disabledDate
    const selectedDate =
      this.$props.selectionMode === 'dates'
        ? dateUtils.coerceTruthyValueToArray(this.$props.value)
        : []
    const now = clearHours(new Date())
    for (let i = 0; i < 6; i++) {
      const row: any = rows[i]
      if (this.$props.showWeekNumber) {
        if (!row[0]) {
          row[0] = {
            type: 'week',
            text: dateUtils.getWeekNumber(
              dateUtils.nextDate(startDate, i * 7 + 1)
            )
          }
        }
      }
      for (let j = 0; j < 7; j++) {
        let cell = row[this.$props.showWeekNumber ? j + 1 : j]
        if (!cell) {
          cell = {
            row: i,
            column: j,
            type: 'normal',
            inRange: false,
            start: false,
            end: false
          }
        }
        cell.type = 'normal'
        const index = i * 7 + j
        const time = dateUtils.nextDate(startDate, index - offset).getTime()
        cell.inRange =
          time >= clearHours(this.$props.minDate) &&
          time <= clearHours(this.$props.maxDate)
        cell.start =
          this.$props.minDate && time === clearHours(this.$props.minDate)
        cell.end =
          this.$props.maxDate && time === clearHours(this.$props.maxDate)
        const isToday = time === now
        if (isToday) {
          cell.type = 'today'
        }
        if (i >= 0 && i <= 1) {
          if (j + i * 7 >= day + offset) {
            cell.text = count++
            if (count === 2) {
              firstDayPosition = i * 7 + j
            }
          } else {
            cell.text =
              dateCountOfLastMonth - (day + offset - (j % 7)) + 1 + i * 7
            cell.type = 'prev-month'
          }
        } else {
          if (count <= dateCountOfMonth) {
            cell.text = count++
            if (count === 2) {
              firstDayPosition = i * 7 + j
            }
          } else {
            cell.text = count++ - dateCountOfMonth
            cell.type = 'next-month'
          }
        }
        let cellDate = new Date(time)
        cell.disabled =
          typeof disabledDate === 'function' && disabledDate(cellDate)
        cell.selected = arrayFind(
          selectedDate,
          (date: any) => date.getTime() === cellDate.getTime()
        )
        this.$set(row, this.$props.showWeekNumber ? j + 1 : j, cell)
      }
      if (this.$props.selectionMode === 'week') {
        const start = this.$props.showWeekNumber ? 1 : 0
        const end = this.$props.showWeekNumber ? 7 : 6
        const isWeekActive = this.isWeekActive(row[start + 1])
        row[start].inRange = isWeekActive
        row[start].start = isWeekActive
        row[end].inRange = isWeekActive
        row[end].end = isWeekActive
      }
    }
    rows.firstDayPosition = firstDayPosition
    return rows
  }
  cellMatchesDate(cell: any, date: any) {
    const value = new Date(date)
    return (
      this.year === value.getFullYear() &&
      this.month === value.getMonth() &&
      Number(cell.text) === value.getDate()
    )
  }
  getCellClasses(cell: any) {
    const selectionMode = this.$props.selectionMode
    const defaultValue = this.$props.defaultValue
      ? Array.isArray(this.$props.defaultValue)
        ? this.$props.defaultValue
        : [this.$props.defaultValue]
      : []
    let classes = []
    if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
      classes.push('available')
      if (cell.type === 'today') {
        classes.push('today')
      }
    } else {
      classes.push(cell.type)
    }
    if (
      cell.type === 'normal' &&
      defaultValue.some(date => this.cellMatchesDate(cell, date))
    ) {
      classes.push('default')
    }
    if (
      selectionMode === 'day' &&
      (cell.type === 'normal' || cell.type === 'today') &&
      this.cellMatchesDate(cell, this.$props.value)
    ) {
      classes.push('current')
    }
    if (
      cell.inRange &&
      (cell.type === 'normal' ||
        cell.type === 'today' ||
        this.$props.selectionMode === 'week')
    ) {
      classes.push('in-range')
      if (cell.start) {
        classes.push('start-date')
      }
      if (cell.end) {
        classes.push('end-date')
      }
    }
    if (cell.disabled) {
      classes.push('disabled')
    }
    if (cell.selected) {
      classes.push('selected')
    }
    return classes.join(' ')
  }
  getDateOfCell(row: any, column: number) {
    const offsetFromStart =
      row * 7 + (column - (this.$props.showWeekNumber ? 1 : 0)) - this.offsetDay
    return dateUtils.nextDate(this.startDate, offsetFromStart)
  }
  isWeekActive(cell: any) {
    if (this.$props.selectionMode !== 'week') return false
    const newDate = new Date(this.year, this.month, 1)
    const year = newDate.getFullYear()
    const month = newDate.getMonth()
    if (cell.type === 'prev-month') {
      newDate.setMonth(month === 0 ? 11 : month - 1)
      newDate.setFullYear(month === 0 ? year - 1 : year)
    }
    if (cell.type === 'next-month') {
      newDate.setMonth(month === 11 ? 0 : month + 1)
      newDate.setFullYear(month === 11 ? year + 1 : year)
    }
    newDate.setDate(parseInt(cell.text, 10))
    const valueYear = dateUtils.isDate(this.$props.value)
      ? this.$props.value.getFullYear()
      : null
    return (
      year === valueYear &&
      dateUtils.getWeekNumber(newDate) ===
        dateUtils.getWeekNumber(this.$props.value)
    )
  }
  markRange(maxDate: any) {
    const startDate = this.startDate
    if (!maxDate) {
      maxDate = this.$props.maxDate
    }
    const rows = this.rows
    const minDate = this.$props.minDate
    for (let i = 0, k = rows.length; i < k; i++) {
      const row = rows[i]
      for (let j = 0, l = row.length; j < l; j++) {
        if (this.$props.showWeekNumber && j === 0) continue
        const cell = row[j]
        const index = i * 7 + j + (this.$props.showWeekNumber ? -1 : 0)
        const time = dateUtils
          .nextDate(startDate, index - this.offsetDay)
          .getTime()
        if (maxDate && maxDate < minDate) {
          cell.inRange =
            minDate &&
            time >= clearHours(maxDate) &&
            time <= clearHours(minDate)
          cell.start = maxDate && time === clearHours(maxDate.getTime())
          cell.end = minDate && time === clearHours(minDate.getTime())
        } else {
          cell.inRange =
            minDate &&
            time >= clearHours(minDate) &&
            time <= clearHours(maxDate)
          cell.start = minDate && time === clearHours(minDate.getTime())
          cell.end = maxDate && time === clearHours(maxDate.getTime())
        }
      }
    }
  }
  handleMouseMove(event: any) {
    if (!this.$props.rangeState.selecting) return
    this.$emit('changerange', {
      minDate: this.$props.minDate,
      maxDate: this.$props.maxDate,
      rangeState: this.$props.rangeState
    })
    let target = event.target
    if (target.tagName === 'SPAN') {
      target = target.parentNode.parentNode
    }
    if (target.tagName === 'DIV') {
      target = target.parentNode
    }
    if (target.tagName !== 'TD') return
    const column = target.cellIndex
    const row = target.parentNode.rowIndex - 1
    const { row: oldRow, column: oldColumn } = this.$props.rangeState
    if (oldRow !== row || oldColumn !== column) {
      this.$props.rangeState.row = row
      this.$props.rangeState.column = column
      this.$props.rangeState.endDate = this.getDateOfCell(row, column)
    }
  }
  handleClick(event: any) {
    let target = event.target
    if (target.tagName === 'SPAN') {
      target = target.parentNode.parentNode
    }
    if (target.tagName === 'DIV') {
      target = target.parentNode
    }
    if (target.tagName !== 'TD') return
    // if (hasClass(target, 'disabled') || hasClass(target, 'week')) return;
    const selectionMode = this.$props.selectionMode
    if (selectionMode === 'week') {
      target = target.parentNode.cells[1]
    }
    let year = Number(this.year)
    let month = Number(this.month)
    const cellIndex = target.cellIndex
    const rowIndex = target.parentNode.rowIndex
    const cell = this.rows[rowIndex - 1][cellIndex]
    const text = cell.text
    const className = target.className
    const newDate = new Date(year, month, 1)
    if (className.indexOf('prev') !== -1) {
      if (month === 0) {
        year = year - 1
        month = 11
      } else {
        month = month - 1
      }
      newDate.setFullYear(year)
      newDate.setMonth(month)
    } else if (className.indexOf('next') !== -1) {
      if (month === 11) {
        year = year + 1
        month = 0
      } else {
        month = month + 1
      }
      newDate.setFullYear(year)
      newDate.setMonth(month)
    }
    newDate.setDate(parseInt(text, 10))
    if (this.$props.selectionMode === 'range') {
      if (this.$props.minDate && this.$props.maxDate) {
        const minDate = new Date(newDate.getTime())
        const maxDate = null
        this.$emit('pick', { minDate, maxDate }, false)
        this.$props.rangeState.selecting = true
        this.markRange(this.$props.minDate)
        this.$nextTick(() => {
          this.handleMouseMove(event)
        })
      } else if (this.$props.minDate && !this.$props.maxDate) {
        if (newDate >= this.$props.minDate) {
          const maxDate = new Date(newDate.getTime())
          this.$props.rangeState.selecting = false
          this.$emit('pick', {
            minDate: this.$props.minDate,
            maxDate
          })
        } else {
          const minDate = new Date(newDate.getTime())
          this.$props.rangeState.selecting = false
          this.$emit('pick', { minDate, maxDate: this.$props.minDate })
        }
      } else if (!this.$props.minDate) {
        const minDate = new Date(newDate.getTime())
        this.$emit('pick', { minDate, maxDate: this.$props.maxDate }, false)
        this.$props.rangeState.selecting = true
        this.markRange(this.$props.minDate)
      }
    } else if (selectionMode === 'day') {
      this.$emit('pick', newDate)
    } else if (selectionMode === 'week') {
      const weekNumber = dateUtils.getWeekNumber(newDate)
      const value = newDate.getFullYear() + 'w' + weekNumber
      this.$emit('pick', {
        year: newDate.getFullYear(),
        week: weekNumber,
        value: value,
        date: newDate
      })
    } else if (selectionMode === 'dates') {
      const value = this.$props.value || []
      const newValue = cell.selected
        ? removeFromArray(
            value,
            (date: any) => date.getTime() === newDate.getTime()
          )
        : [...value, newDate]
      this.$emit('pick', newValue)
    }
  }
  t(s: any) {
    return t(s)
  }
}
</script>
