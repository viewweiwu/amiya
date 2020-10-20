import { ReactElement, ReactNode } from 'react'
import { AyTableCtrlField } from '../AyTable/ay-table'
import { AyDialogFormProps, AyDialogFormField } from '../AyDialog/ay-dialog'
import { AnyKeyProps } from '../types/AnyKeyProps'

export interface AySearchTableProps {
  /** 标题 */
  title?: string | ReactNode
  /** 配置项 */
  fields: Array<AySearchTableField>
  /** 子元素 */
  children?: Array<ReactElement> | ReactElement
  /** 请求列表接口 */
  api?(params: AnyKeyProps): Promise<AnyKeyProps>
  /** 删除接口 Api */
  deleteApi?(params: Array<string>): Promise<any>
  /** 表格数据（当不需要 api，由自己控制时使用） */
  data?: Array<AnyKeyProps>
  /** 表格操作列（写法跟正常的 filed 一致） */
  ctrl?: AyTableCtrlField
  /** 为空时表示没有选框 */
  selectionType?: 'checkbox' | 'radio'
  /** 选项改变事件 */
  onSelectionChange?(selection: Array<Row>): void
  /** 列表的 rowKey */
  rowKey?: string
  /** 选择时列表展示的 key */
  selectShowKey?: string
  /** dialog form 的配置 */
  dialogFormExtend?: AyDialogFormProps
  /** 弹窗表单的配置项 */
  formField?: Array<AyDialogFormField>
  /** 滚动的 X 轴数值 */
  scrollX?: number
  /** 列表过滤 */
  filterData?(data: AnyKeyProps): AnyKeyProps
  /** 提交前过滤 */
  beforeSearch?(data: AnyKeyProps): AnyKeyProps
  /** 展开事件 */
  onExpand?(expanded: boolean, record: AnyKeyProps): void
  /** 分页参数 */
  pagination?: any
  /** 节点插入在查询和表格之间 */
  center?: ReactNode
  /** 表格查询完成监听 */
  onLoad?(records: Array<AnyKeyProps>, data: any): void
  /** 查询区域是否展示 */
  searchVisible?: boolean
  /** talbe 其它属性 */
  tableExtend?: AnyKeyProps
  /** 指令完成事件 */
  onFinish?(key: string, data?: any): void
  /** 导出文件 */
  downloadApi?(params: AnyKeyProps): Promise<AnyKeyProps>
  /** 在导入前面插入按钮 */
  btnBefore?: ReactNode
  /** 统计数据，放在导入按钮前面 */
  dataAnalysis?: Array<Option>
  /** 是否展示导出按钮 */
  exportVisible?: boolean
}
export interface ExtendField extends Field, AyFormField {
  key?: string
  /**
   * 是否必填
   * 请(输入|选择)${label}
   * 例如，请输入用户名
   * */
  required?: boolean
  /** 默认值 */
  defaultValue?: any
  /** 属性 */
  props?: AnyKeyProps
  /** date-range 时有用，是否在提交时拆解多个属性并且转化成字符串 */
  startKey?: string
  /** date-range 时有用，是否在提交时拆解多个属性并且转化成字符串 */
  endKey?: string
  /** 隐藏列 */
  hiddenMode?: Array<ModeType>
}

export interface AySearchTableField extends Field {
  /** AySearch 需要的扩展参数，里面的属性比外面的属性优先级更高 */
  search?: ExtendField
  /** AyDialogForm 需要的扩展参数，里面的属性比外面的属性优先级更高 */
  dialog?: ExtendField
  /** AyTable 需要的扩展参数，里面的属性比外面的属性优先级更高 */
  table?: AyTableField
  [key: string]: any
}

export interface TableRefProps {
  refresh(): void
  reset(search: AnyKeyProps): void
}

export interface FormRefProps {
  add: (params?: AnyKeyProps | undefined) => Promise<AnyKeyProps>
  view: (params?: AnyKeyProps | undefined) => Promise<AnyKeyProps>
  update: (params?: AnyKeyProps | undefined) => Promise<AnyKeyProps>
}

export interface Row extends AnyKeyProps {}
