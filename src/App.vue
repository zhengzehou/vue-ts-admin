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
  transform-origin: center top 0px;
  top: 46px;
  position: fixed;
  box-shadow: none;
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
.icon-load-a:before {
  content: '\f29a';
}
.icon-load-b:before {
  content: '\f29b';
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

.el-select > .el-input {
  display: block;
}
.el-input--suffix .el-input__inner {
  padding-right: 30px;
}
.el-select .el-input__inner {
  cursor: pointer;
  padding-right: 35px;
}
.el-popper[x-placement^='bottom'] {
  margin-top: 12px;
}
.el-select-dropdown {
  position: absolute;
  z-index: 1001;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
}
.el-scrollbar {
  overflow: hidden;
  position: relative;
}
.el-scrollbar__wrap {
  overflow: scroll;
  height: 100%;
}
.el-select-dropdown__wrap {
  max-height: 274px;
}
.el-select-dropdown__list {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #f5f7fa;
}
.el-select-dropdown__item {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected:after {
  position: absolute;
  right: 20px;
  font-family: Ionicons;
  content: '\f383';
  font-size: 12px;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-select-dropdown__item.selected {
  color: #409eff;
  font-weight: 700;
}
.el-scrollbar__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.12s ease-out;
}
.el-scrollbar__bar.is-horizontal {
  height: 6px;
  left: 2px;
}
.el-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: hsla(220, 4%, 58%, 0.3);
  transition: background-color 0.3s;
}
.el-scrollbar__bar.is-horizontal > div {
  height: 100%;
}
.el-scrollbar__bar.is-vertical {
  width: 6px;
  top: 2px;
}
.el-scrollbar__bar.is-vertical > div {
  width: 100%;
}
.el-popper[x-placement^='bottom'] .popper__arrow {
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}
.el-popper .popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}
.el-popper .popper__arrow,
.el-popper .popper__arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.el-popper[x-placement^='bottom'] .popper__arrow:after {
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
.el-popper .popper__arrow:after {
  content: ' ';
  border-width: 6px;
}

.el-input__suffix {
  position: absolute;
  height: 100%;
  right: 5px;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all 0.3s;
  pointer-events: none;
}
.el-input__suffix-inner {
  pointer-events: all;
}
.demo-block .source {
  padding: 24px;
}
.el-icon-arrow-up.is-reverse {
  transform: rotate(180deg);
  padding-top: 2px;
}
.el-select .el-input .el-select__caret {
  color: #c0c4cc;
  font-size: 14px;
  transition: transform 0.3s;
  transform: rotate(180deg);
  cursor: pointer;
}
.el-input__icon {
  width: 25px;
  line-height: 40px;
}
.el-input__icon,
.el-input__prefix {
  height: 100%;
  text-align: center;
  transition: all 0.3s;
}
.el-icon-arrow-up:before {
  content: '\F104';
}
.el-icon-arrow-down {
  transform: rotate(180deg);
}
.el-input__icon:after {
  content: '';
  height: 100%;
  width: 0;
  display: inline-block;
  vertical-align: middle;
}
.demo-form.demo-zh-CN .line {
  text-align: center;
}
.el-icon-date:before {
  content: '\E608';
}
.el-icon-time:before {
  content: '\E642';
}
.el-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
  margin-top: 10px;
}
.el-switch.is-disabled .el-switch__core,
.el-switch.is-disabled .el-switch__label {
  cursor: not-allowed;
}
.el-switch__input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
}
.el-switch__core {
  margin: 0;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  border: 1px solid #dcdfe6;
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  background: #dcdfe6;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  vertical-align: middle;
}
.el-switch__core:after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 100%;
  transition: all 0.3s;
  width: 16px;
  height: 16px;
  background-color: #fff;
}
.el-switch.is-checked .el-switch__core:after {
  left: 100%;
  margin-left: -17px;
}
.el-switch.is-checked .el-switch__core {
  border-color: #409eff;
  background-color: #409eff;
}

.el-form-item {
  margin-bottom: 22px;
}
.el-form-item:after,
.el-form-item:before {
  display: table;
  content: '';
}
.el-form-item__content:after,
.el-form-item__content:before {
  display: table;
  content: '';
}
.el-form-item:after,
.el-form-item:before {
  display: table;
  content: '';
}
.el-form-item__content:after {
  clear: both;
}
.el-form-item:after {
  clear: both;
}
.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
  width: 100%;
}
.el-select {
  display: inline-block;
  position: relative;
}
.el-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.el-textarea {
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;
}

.el-select__tags {
  position: absolute;
  line-height: normal;
  white-space: normal;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.el-select__tags .el-tag {
  box-sizing: border-box;
  border-color: transparent;
  background-color: #f0f2f5;
  float: left;
  /* position: absolute; */
  z-index: 999;
  margin-top: 2px;
  margin-left: 5px;
}
.el-tag--small {
  height: 24px;
  padding: 0 8px;
  line-height: 22px;
}
.el-tag--info {
  background-color: hsla(220, 4%, 58%, 0.1);
  border-color: hsla(220, 4%, 58%, 0.2);
  color: #909399;
}
/** date */
.el-picker-panel {
  color: #606266;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  border-radius: 4px;
  line-height: 30px;
  margin: 5px 0;
}
.el-popper .popper__arrow,
.el-popper .popper__arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.el-popper .popper__arrow:after {
  content: ' ';
  border-width: 6px;
}
.el-popper .popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}
.el-popper[x-placement^='top'] .popper__arrow:after {
  bottom: 1px;
  margin-left: -6px;
  border-top-color: #fff;
  border-bottom-width: 0;
}
.el-popper[x-placement^='bottom'] .popper__arrow:after {
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
.el-picker-panel__body-wrapper:after,
.el-picker-panel__body:after {
  content: '';
  display: table;
  clear: both;
}
.el-date-picker__header {
  margin: 12px;
  text-align: center;
}
.el-picker-panel__content {
  position: relative;
  margin: 15px;
}
.el-date-picker .el-picker-panel__content {
  width: 292px;
}
.el-date-picker__prev-btn {
  float: left;
}
.el-date-picker__next-btn {
  float: right;
}
.el-picker-panel__icon-btn {
  font-size: 12px;
  color: #303133;
  border: 0;
  background: transparent;
  cursor: pointer;
  outline: none;
  margin-top: 8px;
}
.el-date-picker__header-label {
  font-size: 16px;
  font-weight: 500;
  padding: 0 5px;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
  color: #606266;
}

.el-icon-d-arrow-left:before {
  content: '\f124';
}
.el-icon-arrow-left:before {
  content: '\f107';
}
.el-icon-d-arrow-right:before {
  content: '\f125';
}
.el-icon-arrow-right:before {
  content: '\f10a';
}
.el-date-table {
  font-size: 12px;
  user-select: none;
}
.el-date-picker table {
  table-layout: fixed;
  width: 100%;
}
.el-date-table th {
  padding: 5px;
  color: #606266;
  font-weight: 400;
  border-bottom: 1px solid #ebeef5;
}
.el-date-table td {
  width: 32px;
  height: 30px;
  padding: 4px 0;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  position: relative;
}
.el-date-table td.next-month,
.el-date-table td.prev-month {
  color: #c0c4cc;
}
.el-date-table td div {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}
.el-date-table td span {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.el-date-table td.today span {
  color: #409eff;
  font-weight: 700;
}
.el-date-table td.current:not(.disabled) span {
  color: #fff;
  background-color: #409eff;
}

.el-time-panel {
  margin: 5px 0;
  border: 1px solid #e4e7ed;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  position: absolute;
  width: 180px;
  left: 0;
  z-index: 1000;
  user-select: none;
}
.el-time-spinner__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #606266;
  margin-left: -38px;
  padding-left: 17px;
}
.el-time-spinner__wrapper {
  max-height: 190px;
  overflow: auto;
  display: inline-block;
  width: 50%;
  vertical-align: top;
  position: relative;
}
.el-scrollbar {
  overflow: hidden;
  position: relative;
}
.el-time-spinner.has-seconds .el-time-spinner__wrapper {
  width: 31%;
}
.el-time-panel__content.has-seconds:before {
  padding-left: 33.33333%;
}
.el-time-spinner__item:hover:not(.disabled):not(.active) {
  background: #f5f7fa;
  cursor: pointer;
}
.el-time-spinner__list {
  margin: 0;
  list-style: none;
}
.el-time-spinner__item.active:not(.disabled) {
  color: #303133;
  font-weight: 700;
}

.el-time-spinner__wrapper::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.el-time-spinner__wrapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  background: #fff;
}
.el-time-spinner__wrapper::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  /* border-radius: 10px; */
  background: #fff;
}
.el-time-spinner__wrapper:hover::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.div-scrollbar::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.div-scrollbar::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  background: #fff;
}
.div-scrollbar::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  /* border-radius: 10px; */
  background: #fff;
}
.div-scrollbar:hover::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.el-time-panel__footer {
  border-top: 1px solid #e4e4e4;
  padding: 4px;
  height: 36px;
  line-height: 25px;
  text-align: right;
  box-sizing: border-box;
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

/**dialog*/
.el-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
}
.el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  width: 50%;
}
.el-dialog__header {
  padding: 20px;
  padding-bottom: 10px;
}
.el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}
.el-dialog__headerbtn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #909399;
}
.el-icon-close:before {
  content: '\f2d7';
}
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
}
.el-dialog__footer {
  padding: 20px;
  padding-top: 10px;
  text-align: right;
  box-sizing: border-box;
}

.el-message {
  min-width: 150px;
  max-width: 380px;
  width: 80%;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity 0.3s, transform 0.4s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
}
.el-message.is-closable .el-message__content {
  padding-right: 16px;
}
.el-message--info .el-message__content {
  color: #909399;
}
.el-message p {
  margin: 0;
}
.el-message__content {
  padding: 0;
  font-size: 14px;
  line-height: 1;
}
.el-message__closeBtn {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #c0c4cc;
  font-size: 16px;
}
.el-message .el-icon-info {
  color: #909399;
}
.el-message--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.el-message .el-icon-success {
  color: #67c23a;
}
.el-message--success .el-message__content {
  color: #67c23a;
}
.el-icon-success:before {
  content: '\f3ff';
}
.el-message--warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.el-message .el-icon-warning {
  color: #e6a23c;
}
.el-icon-warning:before {
  content: '\f35b';
}
.el-message--warning .el-message__content {
  color: #e6a23c;
}
.el-message--error {
  background-color: #fef0f0;
  border-color: #fde2e2;
}
.el-message .el-icon-error {
  color: #f56c6c;
}
.el-message--error .el-message__content {
  color: #f56c6c;
}
.el-icon-error:before {
  content: '\f128';
}
.el-message__icon {
  margin-right: 10px;
}
.el-icon-close:before {
  content: '\f2d7';
}
.el-icon-info:before {
  content: '\f44d';
}

.el-message-box__wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2014;
}
.el-message-box {
  display: inline-block;
  width: 420px;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
  width: 80%;
  min-width: 200px;
  max-width: 420px;
}
.el-message-box__header {
  position: relative;
  padding: 15px;
  padding-bottom: 10px;
}
.el-message-box__title {
  padding-left: 0;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 1;
  color: #303133;
}
.el-message-box__headerbtn {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
}
.el-message-box__headerbtn .el-message-box__close {
  color: #909399;
}
.el-message-box__content {
  position: relative;
  padding: 10px 15px;
  color: #606266;
  font-size: 14px;
}
.el-message-box__message {
  margin: 0;
}
.el-message-box__input {
  padding-top: 15px;
}
.el-message-box__message p {
  margin: 0;
  line-height: 24px;
}
.el-message-box__errormsg {
  color: #f56c6c;
  font-size: 12px;
  min-height: 18px;
  margin-top: 2px;
}
.el-message-box__btns {
  padding: 5px 15px 0;
  text-align: right;
}
.el-message-box__wrapper:after {
  content: '';
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}
.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2013;
}

.el-loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: hsla(0, 0%, 100%, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
}
.el-loading-mask.is-fullscreen {
  position: fixed;
}
.el-loading-spinner {
  top: 50%;
  margin-top: -21px;
  width: 100%;
  text-align: center;
  position: absolute;
}
.el-loading-spinner i {
  color: #409eff;
}
.el-loading-spinner .el-loading-text {
  color: #409eff;
  margin: 3px 0;
  font-size: 14px;
}

/**icons*/
.ivu-icon-settings:before {
  content: '\f2f7';
}
.ivu-icon-scanner:before {
  content: '\f346';
}
.ivu-icon-navigate:before {
  content: '\f2a3';
}
.ivu-icon-social-instagram:before {
  content: '\f351';
}
.ivu-icon-locked:before {
  content: '\f458';
}
.ivu-icon-users:before {
  content: '\f212';
}
.ivu-icon-menu:before {
  content: '\f20d';
}
.ivu-icon-user-role:before {
  content: '\f211';
}
.ivu-icon-department:before {
  content: '\f229';
}
.ivu-icon-job:before {
  content: '\f357';
}
.ivu-icon-group:before {
  content: '\f484';
}
.ivu-icon-collapse:before {
  content: '\f393';
}
.ivu-icon-company:before {
  content: '\f390';
}
.ivu-icon-search:before {
  content: '\f2f5';
}
/**Card*/
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
.item {
  margin-bottom: 18px;
}
.text {
  font-size: 14px;
}
.el-button--text {
  border-color: transparent;
  color: #409eff;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
</style>
