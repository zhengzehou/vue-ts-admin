<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class MyComponent extends Vue {}
</script>

<style>
.row {
  position: relative;
  margin-left: 0;
  margin-right: 0;
  height: auto;
  zoom: 1;
  display: block;
}
.row:after,
.row:before {
  content: '';
  display: table;
  clear: both;
}
.col {
  position: relative;
  display: block;
  float: left;
  padding-left: 0;
  padding-right: 0;
}

.ivu-icon {
  display: inline-block;
  font-family: Ionicons;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  text-rendering: auto;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  color: #2d8cf0;
  background: 0 0;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}
.ivu-select-dropdown {
  width: inherit;
  max-height: 200px;
  overflow: auto;
  margin: 5px 0;
  padding: 5px 0;
  background-color: transparent;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 900;
}
.ivu-dropdown .ivu-select-dropdown {
  overflow: visible;
  max-height: none;
}
.ivu-dropdown-menu {
  min-width: 100px;
  padding: 0px;
  background: white;
  border-radius: 4px;
  box-shadow: 5px 5px 5px #dad5d5;
}
.ivu-dropdown-item {
  margin: 0;
  line-height: normal;
  padding: 1px 16px;
  clear: both;
  color: #495060;
  font-size: 12px !important;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  min-width: 100px;
}
.ivu-dropdown-item:hover {
  background-color: #d9dde6;
}
.dropdown-itemp {
  text-align: left;
  font-size: 15px;
  padding: 0px;
}
.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
.animated {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
ol,
ul {
  list-style: none;
}
.ivu-dropdown-item-divided {
  margin-top: 5px;
  border-top: 1px solid #e9eaec;
}
.ivu-icon-power:before {
  content: '\F2A9';
}
.ivu-icon-settings:before {
  content: '\F2F7';
}
.ivu-icon-contact:before {
  content: '\F2D8';
}
.ivu-icon-cloud:before {
  content: '\F37A';
}
.ivu-icon-ios-search:before {
  content: '\F4A5';
}

/**button css*/
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
.ivu-btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 6px 15px;
  font-size: 12px;
  border-radius: 4px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear;
  color: #495060;
  background-color: #f7f7f7;
  border-color: #dddee1;
}
.ivu-btn.disabled,
.ivu-btn[disabled] {
  cursor: not-allowed;
}
.ivu-btn-large {
  padding: 6px 15px 7px;
  font-size: 14px;
  border-radius: 4px;
}
.ivu-btn-small {
  padding: 2px 7px;
  font-size: 12px;
  border-radius: 3px;
}
.ivu-btn-primary {
  color: #fff;
  background-color: #2d8cf0;
  border-color: #2d8cf0;
}
.ivu-btn-large {
  padding: 6px 15px 7px;
  font-size: 14px;
  border-radius: 4px;
}
.ivu-btn-small {
  padding: 2px 7px;
  font-size: 12px;
  border-radius: 3px;
}
.ivu-btn-circle,
.ivu-btn-circle-outline {
  border-radius: 32px;
}
.ivu-btn.disabled,
.ivu-btn.disabled.active,
.ivu-btn.disabled:active,
.ivu-btn.disabled:focus,
.ivu-btn.disabled:hover,
.ivu-btn[disabled],
.ivu-btn[disabled].active,
.ivu-btn[disabled]:active,
.ivu-btn[disabled]:focus,
.ivu-btn[disabled]:hover,
fieldset[disabled] .ivu-btn,
fieldset[disabled] .ivu-btn.active,
fieldset[disabled] .ivu-btn:active,
fieldset[disabled] .ivu-btn:focus,
fieldset[disabled] .ivu-btn:hover {
  color: #bbbec4;
  background-color: #f7f7f7;
  border-color: #dddee1;
}
.ivu-btn-text {
  color: #495060;
  background-color: transparent;
  border-color: transparent;
}
.ivu-btn-info {
  color: #fff;
  background-color: #2db7f5;
  border-color: #2db7f5;
}
.ivu-btn-success {
  color: #fff;
  background-color: #19be6b;
  border-color: #19be6b;
}
.ivu-btn-warning {
  color: #fff;
  background-color: #f90;
  border-color: #f90;
}
.ivu-btn-error {
  color: #fff;
  background-color: #ed3f14;
  border-color: #ed3f14;
}
.ivu-btn-dashed {
  color: #495060;
  background-color: transparent;
  border-color: #dddee1;
  border-style: dashed;
}
.ivu-btn-ghost {
  color: #495060;
  background-color: transparent;
  border-color: #dddee1;
}
.ivu-btn-group {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.ivu-btn-group > .ivu-btn {
  position: relative;
  float: left;
  border-left: 0px;
  border-radius: 0;
}
.ivu-btn-group:not(.ivu-btn-group-vertical) > .ivu-btn:first-child {
  margin-left: 0;
  border-left: 1px solid #dddee1;
}
.ivu-btn,
.ivu-btn:active,
.ivu-btn:focus {
  outline: 0;
}
.ivu-icon-load-c:before {
  content: '\F29C';
}
.ivu-icon-checkmark-round:before {
  content: '\F121';
}
@keyframes b {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(1turn);
  }
}
.ivu-load-loop {
  animation: b 1s linear infinite;
}

/**alert*/
.alert {
  position: relative;
  padding: 8px 48px 8px 16px;
  border-radius: 6px;
  color: #495060;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 10px;
}
.alert-with-desc {
  padding: 16px;
  position: relative;
  border-radius: 6px;
  margin-bottom: 10px;
  color: #495060;
  line-height: 1.5;
}
.alert-with-desc.alert-with-icon {
  padding: 16px 16px 16px 69px;
}
.alert-with-desc .alert-message {
  font-size: 14px;
  color: #1c2438;
  display: block;
}
.alert-with-desc .alert-icon {
  top: 50%;
  left: 24px;
  margin-top: -21px;
  font-size: 28px;
}

.alert-desc {
  font-size: 12px;
  color: #495060;
  line-height: 21px;
  display: none;
  text-align: justify;
}
.alert-with-desc .alert-desc {
  display: block;
}
.alert-info {
  border: 1px solid #d5e8fc;
  background-color: #eaf4fe;
}
.alert-success {
  border: 1px solid #d1f2e1;
  background-color: #e8f9f0;
}
.alert-warning {
  border: 1px solid #ffebcc;
  background-color: #fff5e6;
}
.alert-error {
  border: 1px solid #fbd9d0;
  background-color: #fdece8;
}
.alert.alert-with-icon {
  padding: 8px 48px 8px 38px;
}
.alert-with-desc.alert-with-icon {
  padding: 16px 16px 16px 69px;
}
.alert-info .alert-icon {
  color: #2d8cf0;
}
.alert-success .alert-icon {
  color: #19be6b;
}
.alert-warning .alert-icon {
  color: #f90;
}
.alert-error .alert-icon {
  color: #ed3f14;
}
.alert-icon {
  font-size: 14px;
  top: 8px;
  left: 16px;
  position: absolute;
}
.icon-information-circled:before {
  content: '\F149';
}
.icon-checkmark-circled:before {
  content: '\F120';
}
.icon-android-alert:before {
  content: '\F35B';
}
.icon-close-circled:before {
  content: '\F128';
}
.icon-lightbulb-outline:before {
  content: '\F451';
}

/**form*/
.form-item {
  margin-bottom: 24px;
  vertical-align: top;
  zoom: 1;
}
.form-item:after,
.form-item:before {
  content: '';
  display: table;
}
.form-item .form-item-label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 12px;
  color: #495060;
  line-height: 1;
  padding: 10px 12px 10px 0;
  box-sizing: border-box;
}
.form-item-content {
  position: relative;
  line-height: 32px;
  font-size: 12px;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.input-inner {
  display: inline-block;
  width: 100%;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 12px;
  box-sizing: border-box;
  border: 1px solid #dddee1;
  border-radius: 4px;
  color: #495060;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}
.input-wrapper {
  display: inline-block;
  width: 100%;
  position: relative;
  vertical-align: middle;
}
.input-icon {
  width: 32px;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  text-align: center;
  color: #80848f;
  position: absolute;
  right: 0;
  z-index: 3;
}
.icon-circle-close {
  cursor: pointer;
  width: 12px;
  height: 12px;
  display: inline-table;
  background-color: #c2c2cc;
  border-radius: 12px;
  color: white;
}
.icon-circle-close:before {
  content: '\f2d7';
}
.tag-icon .icon-circle-close:before {
  content: '\f2d7';
  margin-left: 2.5px;
}
.input-clear {
  line-height: 12px;
  cursor: pointer;
}
.input-clear:hover {
  color: white;
}
.input-suffix {
  position: absolute;
  height: 100%;
  right: 5px;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all 0.3s;
  pointer-events: none;
}
.input-prefix {
  height: 100%;
  text-align: center;
  transition: all 0.3s;
  position: absolute;
  left: 5px;
  top: 0;
  color: #c0c4cc;
}
.input--prefix .input-inner {
  padding-left: 20px;
}
.input--suffix .input-inner {
  padding-right: 20px;
}
.icon-calendar:before {
  font-size: 16px;
  color: #c72146;
  content: '\f3f3';
}
.icon-time:before {
  font-size: 16px;
  color: #c72146;
  content: '\f4be';
}
.input-suffix-inner {
  pointer-events: all;
}
/**checkbox radio*/
.checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
}
.checkbox__input {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}
.checkbox__inner {
  display: inline-block;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  background-color: #fff;
  z-index: 1;
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}
.checkbox__inner:after {
  box-sizing: content-box;
  content: '';
  border: 1px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 7px;
  left: 4px;
  position: absolute;
  top: 1px;
  transform: rotate(45deg) scaleY(0);
  width: 3px;
  transition: transform 0.15s ease-in 0.05s;
  transform-origin: center;
}
.checkbox__original {
  opacity: 0;
  outline: none;
  position: absolute;
  margin: 0;
  width: 0;
  height: 0;
  z-index: -1;
}
.checkbox__input.is-checked .checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}
.checkbox__input.is-checked + .checkbox__label {
  color: #409eff;
}
.checkbox__input.is-checked .checkbox__inner:after {
  transform: rotate(45deg) scaleY(1);
}
.radio-group {
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  font-size: 0;
}
.radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.radio__input {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}
.radio__inner {
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
}
.radio__inner:after {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #fff;
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.15s ease-in;
}
.radio__original {
  opacity: 0;
  outline: none;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
}
.radio__label {
  font-size: 14px;
  padding-left: 10px;
}
.radio + .radio {
  margin-left: 30px;
}
.radio__input.is-checked .radio__inner {
  border-color: #409eff;
  background: #409eff;
}
.radio__input.is-checked + .radio__label {
  color: #409eff;
}
.radio__input.is-checked .radio__inner:after {
  transform: translate(-50%, -50%) scale(1);
}

.el-card {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-card__header {
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
.el-card__body {
  padding: 20px;
}
</style>
