export class PositionVO {
  id?: string
  companyId?: string
  companyName?: string
  code?: string
  name?: string
  functionType?: string // 职能类型
  parentId?: string // 上级ID
  posLevel?: string // 岗位级别
  duty?: string // 职责
  workDesc?: string // 岗位工作描述
  requirement?: string // 入职要求
  remark?: string //其他备注
}

export const dutyType = [
  {
    value: 'manage',
    label: '管理'
  },
  {
    value: 'service',
    label: '服务'
  },
  {
    value: 'production',
    label: '生产'
  },
  {
    value: 'sale',
    label: '销售'
  }
]
