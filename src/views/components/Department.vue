<template>
  <div>
    <Card style="width:100%;">
      <form class="el-form">
        <div class="el-form-item col col-sm-12 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">所属公司</label>
          <Button type="text">{{dept.companyName}}=={{this.dept}}</Button>
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">部门名称</label>
          <Input placeholder="部门名称" label="用户名" v-model="dept.name" clearable class="col col-sm-10" />
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">部门编号</label>
          <Input placeholder="部门编号" label="用户名" v-model="dept.code" clearable class="col col-sm-10" />
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">职能类型</label>
          <Select v-model="dept.functionType" placeholder="请选择" :list="options" class="col col-sm-10"></Select>
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">上级部门</label>
          <Select v-model="dept.parentId" placeholder="请选择" :list="options" class="col col-sm-10" filterable></Select>
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">部门正职</label>
          <Select v-model="dept.leader" placeholder="请选择" :list="options" class="col col-sm-10" filterable></Select>
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">部门副职</label>
          <Select v-model="dept.deputy" placeholder="请选择" :list="options" class="col col-sm-10" filterable></Select>
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">部门秘书</label>
          <Select v-model="dept.secretary" placeholder="请选择" :list="options" class="col col-sm-10" filterable></Select>
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">是否在编</label>
          <Switchs v-model="dept.isOwn" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></Switchs>
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">部门职责</label>
          <Input v-model="dept.duty" label="部门职责" type="textarea" placeholder="部门职责" rows="3" class="col col-sm-10" />
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
import { DepartmentVO } from '@/vo/DepartmentVO'
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
export default class Department extends Vue {
  dept = new DepartmentVO()
  created() {
    this.dept.companyName = '上海邮乐忘记技术有限公司'
  }
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
