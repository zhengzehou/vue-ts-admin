<template>
  <div>
    <div class="row">
      <div class="col col-span-24">
        <div class="demo-block demo-box demo-zh-CN demo-form">
          <div class="source">
            <form class="el-form">
              <div class="el-form-item ">
                <label class="el-form-item__label " style="width: 80px; ">用户名</label>
                <Input placeholder="输入框" label="用户名" v-model="inputVal" clearable style="margin-left: 80px; " />
              </div>
              <div class="el-form-item ">
                <label class="el-form-item__label " style="width: 80px; ">活动区域</label>
                <Select v-model="selectVal" placeholder="请选择" style="margin-left: 80px; " :list="options" clearable filterable readonly></Select>
              </div>
              <div class="el-form-item ">
                <label class="el-form-item__label " style="width: 80px; ">爱好</label>
                <Select v-model="hobby" placeholder="请选择" style="margin-left: 80px; " :list="options" multiple></Select>
              </div>
              <div class="el-form-item ">
                <label class="el-form-item__label " style="width: 80px; ">活动时间{{valueTime}}</label>
                <div class="el-form-item__content " style="margin-left: 80px; ">
                  <div class="col col-md-11 ">
                    <!-- <Input placeholder="选择日期" prefix-icon="icon-calendar" /> -->
                    <DateInput type="dates" v-model="valueDate" placeholder="选择一个或多个日期" clearable></DateInput>
                    <!-- <DatePicker type="dates" v-model="value5" placeholder="选择一个或多个日期"></DatePicker> -->
                  </div>
                  <div class="line col col-md-2 ">-</div>
                  <div class="col col-md-11 ">
                    <TimeInput placeholder="选择时间" v-model="valueTime" clearable></TimeInput>
                  </div>

                </div>
              </div>
              <div class="el-form-item ">
                <label class="el-form-item__label " style="width: 80px; ">即时配送{{value5}}</label>
                <!-- <div class="el-form-item__content " style="margin-left: 80px; ">
                  <div role="switch " class="el-switch "><input type="checkbox " name=" " true-value="true " class="el-switch__input ">

                    <span class="el-switch__core " style="width: 40px; "></span>

                  </div>

                </div> -->
                <Switchs v-model="value5" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" disabled></Switchs>
              </div>
              <div class="el-form-item ">
                <label class="el-form-item__label " style="width: 80px; ">活动性质</label>
                <div class="el-form-item__content " style="margin-left: 80px; ">
                  <div role="group " aria-label="checkbox-group " class="el-checkbox-group ">
                    <Checkbox v-model="formItem.checkbox[0]" true-label="美食/餐厅线上活动" false-label="">美食/餐厅线上活动</Checkbox>
                    <Checkbox v-model="formItem.checkbox[1]" true-label="地推活动" false-label="">地推活动</Checkbox>
                    <Checkbox v-model="formItem.checkbox[2]" true-label="线下主题活动" false-label="">线下主题活动</Checkbox>
                    <Checkbox v-model="formItem.checkbox[3]" true-label="单纯品牌曝光" false-label="">单纯品牌曝光</Checkbox>
                  </div>

                </div>
              </div>
              <div class="el-form-item ">
                <label class="el-form-item__label " style="width: 80px; ">特殊资源</label>
                <div class="el-form-item__content " style="margin-left: 80px; ">
                  <div role="radiogroup " class="el-radio-group ">
                    <Radio v-model="formItem.radio" name="formItem.radio" label="0">线上品牌商赞助</Radio>
                    <Radio v-model="formItem.radio" name="formItem.radio" label="1">线下场地免费</Radio>
                  </div>
                </div>
              </div>
              <div class="el-form-item ">
                <label class="el-form-item__label " style="width: 80px; ">活动形式</label>
                <Input label="活动形式" type="textarea" placeholder="活动形式" v-model="formItem.textarea" rows="3" style="margin-left: 80px; " />
              </div>

              <div class="el-form-item ">
                <div class="el-form-item__content " style="margin-left: 80px; ">
                  <button type="button " class="el-button el-button--primary ">
                    <span>立即创建</span>
                  </button>
                  <button type="button " class="el-button el-button--default ">
                    <span>取消</span>
                  </button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang = "ts">
import Vue from 'vue'
import Input from '@/components/Input.vue'
import Checkbox from '@/components/Checkbox.vue'
import Radio from '@/components/Radio.vue'
import Select from '@/components/Select.vue'
import Option from '@/components/Option.vue'
import Switchs from '@/components/Switchs.vue'
import Dropdown from '@/components/Dropdown.vue'
import DateInput from '@/components/DateInput.vue'
import TimeInput from '@/components/TimeInput.vue'
import Component from 'vue-class-component'
@Component({
  components: {
    Input,
    Checkbox,
    Radio,
    Dropdown,
    Select,
    Option,
    Switchs,
    DateInput,
    TimeInput
  }
})
export default class Form extends Vue {
  inputVal = '123'
  selectVal = ''
  hobby = []
  checked = ''
  valueDate = '2018-10-23 09:45:00'
  valueTime = '09:45:00'
  value5 = ''
  options = [
    {
      value: '选项1',
      label: '黄金糕'
    },
    {
      value: '选项2',
      label: '双皮奶'
    },
    {
      value: '选项3',
      label: '蚵仔煎'
    },
    {
      value: '选项4',
      label: '龙须面'
    },
    {
      value: '选项5',
      label: '北京烤鸭'
    },
    {
      value: '选项6',
      label: '北京烤鸭6'
    },
    {
      value: '选项7',
      label: '北京烤鸭7'
    },
    {
      value: '选项8',
      label: '北京烤鸭8'
    },
    {
      value: '选项9',
      label: '北京烤鸭9'
    },
    {
      value: '选项10',
      label: '北京烤鸭10'
    }
  ]
  cloudDropdown = [
    {
      name: 'Linux'
    },
    {
      name: 'Mac OS X'
    },
    {
      name: 'Windows'
    },
    {
      name: 'Core OS'
    }
  ]
  formItem = {
    input: '',
    select: '',
    radio: '0',
    checkbox: [],
    switch: true,
    date: '',
    time: '',
    slider: [20, 50],
    textarea: ''
  }
  formInline = {
    user: '',
    password: ''
  }
  ruleInline = {
    user: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    password: [
      { required: true, message: '请填写密码', trigger: 'blur' },
      {
        type: 'string',
        min: 6,
        message: '密码长度不能小于6位',
        trigger: 'blur'
      }
    ]
  }
  formLeft = {
    input1: '',
    input2: '',
    input3: ''
  }
  formRight = {
    input1: '',
    input2: '',
    input3: ''
  }
  formTop = {
    input1: '',
    input2: '',
    input3: ''
  }
  formValidate = {
    name: '',
    mail: '',
    city: '',
    gender: '',
    interest: [],
    date: '',
    time: '',
    desc: ''
  }
  ruleValidate = {
    name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
    mail: [
      { required: true, message: '邮箱不能为空', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    city: [{ required: true, message: '请选择城市', trigger: 'change' }],
    gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
    interest: [
      {
        required: true,
        type: 'array',
        min: 1,
        message: '至少选择一个爱好',
        trigger: 'change'
      },
      { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
    ],
    date: [
      { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
    ],
    time: [
      { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
    ],
    desc: [
      { required: true, message: '请输入个人介绍', trigger: 'blur' },
      { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
    ]
  }
  formDynamic = {
    items: [
      {
        value: ''
      }
    ]
  }
  handleSubmit(name: string) {
    // this.$refs[name].validate((valid) => {
    //     if (valid) {
    //         this.$Message.success('提交成功!');
    //     } else {
    //         this.$Message.error('表单验证失败!');
    //     }
    // })
  }
  handleReset(name: string) {
    // this.$refs[name].resetFields();
  }
  handleAdd() {
    this.formDynamic.items.push({
      value: ''
    })
  }
  handleRemove(index: number) {
    this.formDynamic.items.splice(index, 1)
  }
}
</script>
<style>
.demo-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
}
.demo-form.demo-zh-CN .el-form {
  width: 460px;
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
.demo-form.demo-zh-CN .el-select .el-input {
  width: 380px;
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

.demo-form.demo-zh-CN .el-checkbox-group .el-checkbox {
  float: left;
  width: 160px;
  padding-right: 20px;
  margin: 0;
  padding: 0;
}
.demo-form.demo-zh-CN .el-checkbox-group {
  width: 320px;
  margin: 0;
  padding: 0;
  list-style: none;
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
.el-time-panel__footer {
  border-top: 1px solid #e4e4e4;
  padding: 4px;
  height: 36px;
  line-height: 25px;
  text-align: right;
  box-sizing: border-box;
}
</style>
