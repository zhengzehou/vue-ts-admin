<template>
  <div>
    <Card style="width:100%;">
      <form class="el-form">
        <div class="el-form-item col col-sm-12 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">所属公司</label>
          <Button type="text">{{pos.companyName}}=={{this.pos}}</Button>
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">职位名称</label>
          <Input placeholder="职位名称" v-model="pos.name" clearable class="col col-sm-10" />
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">职位编号</label>
          <Input placeholder="职位编号" v-model="pos.code" clearable class="col col-sm-10" />
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">职位级别</label>
          <Input placeholder="职位级别" v-model="pos.posLevel" clearable class="col col-sm-10" />
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">职能类型</label>
          <Select v-model="pos.functionType" placeholder="请选择" :list="dutyType" class="col col-sm-10"></Select>
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">上级岗位</label>
          <Select v-model="pos.parentId" placeholder="请选择" :list="options" class="col col-sm-10" filterable></Select>
          <Button @click="openDialog">Dialog</Button>
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">岗位职责</label>
          <Input v-model="pos.duty" label="岗位职责" type="textarea" placeholder="岗位职责" rows="3" class="col col-sm-10" />
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">入职要求</label>
          <Input v-model="pos.requirement" label="部门职责" type="textarea" placeholder="入职要求" rows="3" class="col col-sm-10" />
        </div>
        <div class="el-form-item col col-sm-24 col-xs-24">
          <label class="el-form-item__label " style="width: 80px; ">工作描述</label>
          <Input v-model="pos.workDesc" label="部门职责" type="textarea" placeholder="工作描述" rows="3" class="col col-sm-10" />
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
import { PositionVO, dutyType } from '@/vo/PositionVO'
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
export default class Position extends Vue {
  pos = new PositionVO()
  get dutyType() {
    return dutyType
  }
  openDialog() {
    let that: any = this
    that.$bizDialog('test', 'nihao')
  }
  created() {
    this.pos.companyName = '上海邮乐忘记技术有限公司'
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
