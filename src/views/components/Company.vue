<template>
  <div>
    <Card style="width:100%;">
      <form class="el-form">
        <div class="el-form-item col col-sm-12 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">用户名</label>
          <Input placeholder="输入框" label="用户名" v-model="inputVal" clearable style="margin-left: 80px; " />
        </div>
        <div class="el-form-item col col-sm-12 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">活动区域</label>
          <Select v-model="selectVal" placeholder="请选择" style="margin-left: 80px; " :list="options" clearable filterable readonly></Select>
        </div>
        <div class="el-form-item col col-sm-12 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">爱好</label>
          <Select v-model="hobby" placeholder="请选择" style="margin-left: 80px; " :list="options" multiple></Select>
        </div>
        <div class="el-form-item col col-sm-12 col-xs-24">
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
        <div class="el-form-item col col-sm-12 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">即时配送{{value5}}</label>
          <Switchs v-model="value5" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" disabled></Switchs>
        </div>
        <div class="el-form-item col col-sm-12 col-xs-24">
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
        <div class="el-form-item col col-sm-12 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">特殊资源</label>
          <div class="el-form-item__content " style="margin-left: 80px; ">
            <div role="radiogroup " class="el-radio-group ">
              <Radio v-model="formItem.radio" name="formItem.radio" label="0">线上品牌商赞助</Radio>
              <Radio v-model="formItem.radio" name="formItem.radio" label="1">线下场地免费</Radio>
            </div>
          </div>
        </div>
        <div class="el-form-item col col-sm-12 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">活动形式</label>
          <Input label="活动形式" type="textarea" placeholder="活动形式" v-model="formItem.textarea" rows="3" style="margin-left: 80px; " />
        </div>

        <div class="el-form-item col col-sm-12 col-xs-24">
          <div class="el-form-item__content " style="margin-left: 80px; ">
            <Button type="primary" @click.prevent="handleSubmit">
              <span>立即创建</span>
            </Button>
            <Button type="default">
              <span>取消</span>
            </Button>

          </div>
        </div>
      </form>

    </Card>
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
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
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
    TimeInput,
    Card,
    Button
  }
})
export default class Company extends Vue {
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
    let that: any = this
    that.$message({ message: 'test', type: 'error' })
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
