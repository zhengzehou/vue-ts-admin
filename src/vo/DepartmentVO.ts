export class DepartmentVO {
  id?: string
  companyId?: string
  companyName?: string
  code?: string
  name?: string
  functionType?: string // 职能类型
  parentId?: string // 上级ID
  leader?: string // 部门领导
  deputy?: string // 部门副职
  secretary?: string // 部门秘书
  isOwn?: boolean // 是否在编制
  duty?: string // 部门职责
}
