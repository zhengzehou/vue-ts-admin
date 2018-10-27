export default class DateUtils {
  weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ]
  getWeekNumber(src: any) {
    if (!this.isDate(src)) return null
    const date = new Date(src.getTime())
    date.setHours(0, 0, 0, 0)
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4)
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    )
  }
  isDate(date: any) {
    if (date === null || date === undefined) return false
    if (isNaN(new Date(date).getTime())) return false
    if (Array.isArray(date)) return false // deal with `new Date([ new Date() ]) -> new Date()`
    return true
  }
  isTime(time: any) {
    if (time === null || time === undefined) return false
    let timeReg = /^((\d{4})-(\d{2})-(\d{2}) )?(\d{2}):(\d{2}):(\d{2})$/
    return timeReg.test(time.toString())
  }
  formatDate(date: any, format: string) {
    if (!format) format = 'yyyy-MM-dd'
    date = this.toDate(date)
    if (!date) return ''
    return this.formatMethod(date, format || 'yyyy-MM-dd')
  }
  formatTime(date: any, format: string) {
    if (!format) format = 'yyyy-MM-dd hh:mm:ss'
    if (this.isDate(date)) date = this.toDate(date)
    else if (this.isTime(date)) return date
    if (!date) return ''
    return this.formatMethod(date, format || 'yyyy-MM-dd hh:mm:ss')
  }
  formatMethod(dateObj: any, format: string) {
    if (typeof dateObj === 'number') {
      dateObj = new Date(dateObj)
    }
    if (
      Object.prototype.toString.call(dateObj) !== '[object Date]' ||
      isNaN(dateObj.getTime())
    ) {
      throw new Error('Invalid Date in fecha.format')
    }
    return this.formatToStr(dateObj, format)
  }
  formatToStr(date: any, fmt: string) {
    var o: any = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
    return fmt
  }

  toDate(date: any) {
    return this.isDate(date) ? new Date(date) : null
  }
  extractTimeFormat(format: string) {
    return format
      .replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g, '')
      .trim()
  }
  extractDateFormat(format: string) {
    return format
      .replace(/\W?m{1,2}|\W?ZZ/g, '')
      .replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, '')
      .trim()
  }
  clearMilliseconds(date: Date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      0
    )
  }
  clearTime(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }
  prevMonth(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    return month === 0
      ? this.changeYearMonthAndClampDate(date, year - 1, 11)
      : this.changeYearMonthAndClampDate(date, year, month - 1)
  }
  nextMonth(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    return month === 11
      ? this.changeYearMonthAndClampDate(date, year + 1, 0)
      : this.changeYearMonthAndClampDate(date, year, month + 1)
  }
  prevYear(date: Date, amount = 1) {
    const year = date.getFullYear()
    const month = date.getMonth()
    return this.changeYearMonthAndClampDate(date, year - amount, month)
  }
  nextYear(date: Date, amount = 1) {
    const year = date.getFullYear()
    const month = date.getMonth()
    return this.changeYearMonthAndClampDate(date, year + amount, month)
  }
  changeYearMonthAndClampDate(date: Date, year: number, month: number) {
    // clamp date to the number of days in `year`, `month`
    // eg: (2010-1-31, 2010, 2) => 2010-2-28
    const monthDate = Math.min(
      date.getDate(),
      this.getDayCountOfMonth(year, month)
    )
    return this.modifyDate(date, year, month, monthDate)
  }
  modifyDate(date: Date, y: number, m: number, d: number) {
    return new Date(
      y,
      m,
      d,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  }
  modifyTime(date: Date, h: number, m: number, s: number) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      h,
      m,
      s,
      date.getMilliseconds()
    )
  }
  getDayCountOfYear(year: number) {
    const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
    return isLeapYear ? 366 : 365
  }

  getFirstDayOfMonth(date: any) {
    const temp = new Date(date.getTime())
    temp.setDate(1)
    return temp.getDay()
  }

  prevDate(date: any, amount = 1) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - amount
    )
  }

  nextDate(date: any, amount = 1) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + amount
    )
  }

  getStartDateOfMonth(year: number, month: number) {
    const result = new Date(year, month, 1)
    const day = result.getDay()

    if (day === 0) {
      return this.prevDate(result, 7)
    } else {
      return this.prevDate(result, day)
    }
  }
  getDayCountOfMonth(year: number, month: number) {
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30
    }

    if (month === 1) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29
      } else {
        return 28
      }
    }

    return 31
  }
  parseDate(str: string, format: string) {
    return new Date(this.formatMethod(str, format || 'yyyy-MM-dd'))
  }
  modifyWithTimeString(date: any, time: any) {
    if (date == null || !time) {
      return date
    }
    time = this.parseDate(time, 'HH:mm:ss')
    return this.modifyTime(
      date,
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    )
  }
  arrayFindIndex(arr: Array<any>, pred: any) {
    for (let i = 0; i !== arr.length; ++i) {
      if (typeof arr[i] !== 'object') arr[i] = new Date(arr[i])
      if (pred(arr[i])) {
        return i
      }
    }
    return -1
  }
  coerceTruthyValueToArray(val: any) {
    if (Array.isArray(val)) {
      return val
    } else if (val) {
      return [val]
    } else {
      return []
    }
  }
  timeWithinRange(date: any, selectableRange: any, format: string) {
    const limitedDate = this.limitTimeRange(date, selectableRange, format)
    return limitedDate.getTime() === date.getTime()
  }
  limitTimeRange(date: any, ranges: any, format = 'HH:mm:ss') {
    // TODO: refactory a more elegant solution
    if (ranges.length === 0) return date
    const normalizeDate = (date: any) => this.formatDate(date, format)
    const ndate = normalizeDate(date)
    const nranges = ranges.map((range: any) => range.map(normalizeDate))
    if (nranges.some((nrange: any) => ndate >= nrange[0] && ndate <= nrange[1]))
      return date

    let minDate = nranges[0][0]
    let maxDate = nranges[0][0]

    nranges.forEach((nrange: any) => {
      minDate = new Date(Math.min(nrange[0], minDate))
      maxDate = new Date(Math.max(nrange[1], minDate))
    })

    const ret = ndate < minDate ? minDate : maxDate
    // preserve Year/Month/Date
    return this.modifyDate(
      ret,
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
  }
  hasClass(el: any, cls: any) {
    if (!el || !cls) return false
    if (cls.indexOf(' ') !== -1)
      throw new Error('className should not contain space.')
    if (el.classList) {
      return el.classList.contains(cls)
    } else {
      return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
    }
  }
  range(n: number) {
    return Array.apply(null, { length: n }).map((_: string, n: number) => n)
  }
  getRangeHours(ranges: Array<any>[]) {
    const hours = []
    let disabledHours: any = []
    ;(ranges || []).forEach(range => {
      const value = range.map(date => date.getHours())
      debugger
      disabledHours = disabledHours.concat(this.newArray(value[0], value[1]))
    })

    if (disabledHours.length) {
      for (let i = 0; i < 24; i++) {
        hours[i] = disabledHours.indexOf(i) === -1
      }
    } else {
      for (let i = 0; i < 24; i++) {
        hours[i] = false
      }
    }

    return hours
  }
  newArray(start: number, end: number) {
    let result = []
    for (let i = start; i <= end; i++) {
      result.push(i)
    }
    return result
  }
}
export const dateUtils = new DateUtils()
