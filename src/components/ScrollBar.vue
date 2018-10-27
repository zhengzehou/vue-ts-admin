<template>
<div class="el-time-spinner__wrapper el-scrollbar">
                <ul @mouseenter.native="emitSelectRange('hours')" @mousemove.native="adjustCurrentSpinner('hours')" class="el-time-spinner__wrapper el-scrollbar__view el-time-spinner__list" ref="hours">
                    <slot></slot>
                </ul>
            </div>
</template>

<script lang = "ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class ScrollBar extends Vue {}
</script>
