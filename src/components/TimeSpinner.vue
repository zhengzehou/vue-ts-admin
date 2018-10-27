<template>
  <div class="el-time-spinner" :class="{ 'has-seconds': showSeconds }">
    <template v-if="!arrowControl">
      <div class="el-time-spinner__wrapper el-scrollbar">
        <ul @mouseenter.native="emitSelectRange('hours')" @mousemove.native="adjustCurrentSpinner('hours')" class="el-time-spinner__wrapper el-scrollbar__view el-time-spinner__list" ref="hours">
          <li v-for="a in 3" class="el-time-spinner__item"> </li>
          <li id="hoursActive" @click="handleClick('hours', { value: hour, disabled: disabled })" v-for="(disabled, hour) in hoursList" class="el-time-spinner__item" :class="{ 'active': hour === hours, 'disabled': disabled }">{{ ('0' + (amPmMode ? (hour % 12 || 12) : hour )).slice(-2) }}{{ amPm(hour) }}</li>
          <li v-for="a in 2" class="el-time-spinner__item"> </li>
        </ul>
      </div>
      <div class="el-time-spinner__wrapper el-scrollbar">
        <ul @mouseenter.native="emitSelectRange('hours')" @mousemove.native="adjustCurrentSpinner('hours')" class="el-time-spinner__wrapper el-scrollbar__view el-time-spinner__list" ref="minutes">
          <li v-for="a in 3" class="el-time-spinner__item"> </li>
          <li @click="handleClick('minutes', { value: key, disabled: false })" v-for="(minute, key) in 60" class="el-time-spinner__item" :class="{ 'active': key === minutes }">{{ ('0' + key).slice(-2) }}</li>
          <li v-for="a in 2" class="el-time-spinner__item"> </li>
        </ul>
      </div>
      <div class="el-time-spinner__wrapper el-scrollbar">
        <ul @mouseenter.native="emitSelectRange('hours')" @mousemove.native="adjustCurrentSpinner('hours')" class="el-time-spinner__wrapper el-scrollbar__view el-time-spinner__list" ref="seconds">
          <li v-for="a in 3" class="el-time-spinner__item"> </li>
          <li @click="handleClick('seconds', { value: key, disabled: false })" v-for="(second, key) in 60" class="el-time-spinner__item" :class="{ 'active': key === seconds }" :key="key">{{ ('0' + key).slice(-2) }}</li>
          <li v-for="a in 2" class="el-time-spinner__item"> </li>
        </ul>
      </div>
    </template>
    <template v-if="arrowControl">
      <div @mouseenter="emitSelectRange('hours')" class="el-time-spinner__wrapper is-arrow">
        <i v-repeat-click="decrease" class="el-time-spinner__arrow el-icon-arrow-up"></i>
        <i v-repeat-click="increase" class="el-time-spinner__arrow el-icon-arrow-down"></i>
        <ul class="el-time-spinner__list" ref="hours">
          <li class="el-time-spinner__item" :class="{ 'active': hour === hours, 'disabled': hoursList[hour] }" v-for="(hour, key) in arrowHourList" :key="key">{{ hour === undefined ? '' : ('0' + (amPmMode ? (hour % 12 || 12) : hour )).slice(-2) + amPm(hour) }}</li>
        </ul>
      </div>
      <div @mouseenter="emitSelectRange('minutes')" class="el-time-spinner__wrapper is-arrow">
        <i v-repeat-click="decrease" class="el-time-spinner__arrow el-icon-arrow-up"></i>
        <i v-repeat-click="increase" class="el-time-spinner__arrow el-icon-arrow-down"></i>
        <ul class="el-time-spinner__list" ref="minutes">
          <li class="el-time-spinner__item" :class="{ 'active': minute === minutes }" v-for="(minute, key) in arrowMinuteList" :key="key">
            {{ minute === undefined ? '' : ('0' + minute).slice(-2) }}
          </li>
        </ul>
      </div>
      <div @mouseenter="emitSelectRange('seconds')" class="el-time-spinner__wrapper is-arrow" v-if="showSeconds">
        <i v-repeat-click="decrease" class="el-time-spinner__arrow el-icon-arrow-up"></i>
        <i v-repeat-click="increase" class="el-time-spinner__arrow el-icon-arrow-down"></i>
        <ul class="el-time-spinner__list" ref="seconds">
          <li v-for="(second, key) in arrowSecondList" class="el-time-spinner__item" :class="{ 'active': second === seconds }" :key="key">
            {{ second === undefined ? '' : ('0' + second).slice(-2) }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { dateUtils } from '@/utils/DateUtils'
import ScrollBar from './ScrollBar.vue'
@Component({
  components: { ScrollBar },
  props: {
    date: {},
    defaultValue: {}, // reserved for future use
    showSeconds: {
      type: Boolean,
      default: true
    },
    arrowControl: Boolean,
    amPmMode: {
      type: String,
      default: '' // 'a': am/pm; 'A': AM/PM
    }
  }
})
export default class TimeSpinner extends Vue {
  selectableRange = []
  currentScrollbar = ''
  displayHours = -1
  displayMinutes = -1
  displaySeconds = -1
  get hours() {
    let h = this.$props.date.getHours()
    if (this.displayHours === h) return this.displayHours
    if (this.displayHours > -1) return this.displayHours
    return h
  }
  get minutes() {
    let m = this.$props.date.getMinutes()
    if (this.displayMinutes === m) return this.displayMinutes
    if (this.displayMinutes > -1) return this.displayMinutes
    return m
  }
  get seconds() {
    let s = this.$props.date.getSeconds()
    if (this.displaySeconds === s) return this.displaySeconds
    if (this.displaySeconds > -1) return this.displaySeconds
    return this.$props.date.getSeconds()
  }
  get hoursList() {
    return dateUtils.getRangeHours(this.selectableRange)
  }
  get arrowHourList() {
    const hours = this.hours
    return [
      hours > 0 ? hours - 1 : undefined,
      hours,
      hours < 23 ? hours + 1 : undefined
    ]
  }
  get arrowMinuteList() {
    const minutes = this.minutes
    return [
      minutes > 0 ? minutes - 1 : undefined,
      minutes,
      minutes < 59 ? minutes + 1 : undefined
    ]
  }
  get arrowSecondList() {
    const seconds = this.seconds
    return [
      seconds > 0 ? seconds - 1 : undefined,
      seconds,
      seconds < 59 ? seconds + 1 : undefined
    ]
  }
  mounted() {
    this.$nextTick(() => {
      !this.$props.arrowControl &&
        dateUtils.isDate(this.$props.date) &&
        this.bindScrollEvent()
    })
  }
  @Watch('date')
  date2(val: any) {
    this.bindScrollEvent()
  }
  increase() {
    this.scrollDown(1)
  }
  decrease() {
    this.scrollDown(-1)
  }
  modifyDateField(type: string, value: any) {
    switch (type) {
      case 'hours':
        this.$emit(
          'change',
          dateUtils.modifyTime(
            this.$props.date,
            value,
            this.minutes,
            this.seconds
          )
        )
        break
      case 'minutes':
        this.$emit(
          'change',
          dateUtils.modifyTime(
            this.$props.date,
            this.hours,
            value,
            this.seconds
          )
        )
        break
      case 'seconds':
        this.$emit(
          'change',
          dateUtils.modifyTime(
            this.$props.date,
            this.hours,
            this.minutes,
            value
          )
        )
        break
    }
  }
  handleClick(type: string, value: any, disabled: boolean) {
    if (!value.disabled) {
      this.modifyDateField(type, value.value)
      this.emitSelectRange(type)
      this.adjustSpinner(type, value)
      this.adjustCurrentSpinner(type, value.value)
    }
  }
  emitSelectRange(type: string) {
    if (type === 'hours') {
      this.$emit('select-range', 0, 2)
    } else if (type === 'minutes') {
      this.$emit('select-range', 3, 5)
    } else if (type === 'seconds') {
      this.$emit('select-range', 6, 8)
    }
    this.currentScrollbar = type
  }
  bindScrollEvent() {
    const bindFuntion = (type: string, n: number) => {
      let scrollEl: any = this.$refs[type]
      this.handleScroll(type, n)
      //绑定事件
      //   scrollEl.addEventListener('scroll', function() {
      //     console.log(scrollEl.scrollTop);
      //   });
      
      scrollEl.onscroll = (e: any) => {
        // let container: any = this.$refs[type]
        // let p=0,t=0
        // p = scrollEl.scrollTop
        // t = container.querySelector('.active').offsetHeight
        // const value = Math.min(
        //   Math.floor((scrollEl.scrollTop - 80) / 32 + 6),
        //   type === 'hours' ? 23 : 59
        // )
        // console.log(scrollEl.scrollTop + '>>>>' + value + '' + type)
        // this.modifyDateField(type, value)
      }
    }
    bindFuntion('hours', this.hours)
    bindFuntion('minutes', this.minutes)
    bindFuntion('seconds', this.seconds)
  }
  handleScroll(type: string, n: number) {
    let container: any = this.$refs[type]
    // const value = Math.min(
    //   Math.floor((container.scrollTop - 80) / 32 + 6),
    //   type === 'hours' ? 23 : 59
    // )
    var h = (container.querySelector('.active').offsetHeight - 80) / 32 + n * 32
    container.scrollTop = h //container.querySelector('.active').offsetHeight+ n*29
    this.modifyDateField(type, n)
  }
  adjustCurrentSpinner(type: string, value: number) {
    if (type === 'hours') {
      this.handleScroll(type, value)
      this.displayHours = value
    } else if (type === 'minutes') {
      this.handleScroll(type, value)
      this.displayMinutes = value
    } else if (type === 'seconds') {
      this.handleScroll(type, value)
      this.displaySeconds = value
    }
  }
  adjustSpinner(type: string, value: number) {
    if (this.$props.arrowControl) return
    const tt: any = this.$refs[type]
    const el = tt.$el
    if (el) {
      el.scrollTop = Math.max(0, (value - 2.5) * 32 + 80)
    }
  }
  scrollDown(step: number) {
    if (!this.currentScrollbar) {
      this.emitSelectRange('hours')
    }
    const label = this.currentScrollbar
    const hoursList = this.hoursList
    let now = 1 //this[label];
    if (this.currentScrollbar === 'hours') {
      let total = Math.abs(step)
      step = step > 0 ? 1 : -1
      let length = hoursList.length
      while (length-- && total) {
        now = (now + step + hoursList.length) % hoursList.length
        if (hoursList[now]) {
          continue
        }
        total--
      }
      if (hoursList[now]) return
    } else {
      now = (now + step + 60) % 60
    }
    this.modifyDateField(label, now)
    this.adjustSpinner(label, now)
  }
  amPm(hour: number) {
    let shouldShowAmPm = this.$props.amPmMode.toLowerCase() === 'a'
    if (!shouldShowAmPm) return ''
    let isCapital = this.$props.amPmMode === 'A'
    let content = hour < 12 ? ' am' : ' pm'
    if (isCapital) content = content.toUpperCase()
    return content
  }
}
</script>
