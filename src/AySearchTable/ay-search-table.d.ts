import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { ReactNode } from 'react'
import { AyTableCtrlField, AyTableField } from '../AyTable/ay-table'
import { AyFormField, Field } from '../AyForm/ay-form'
import { AyDialogFormProps, AyDialogFormField, ModeType } from '../AyDialogForm/ay-dialog-form'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { Record } from '../types/Record'
import { FormValues } from '../types/FormValues'

export interface SearchTableInitConfig extends AnyKeyProps {
  /** 扩展栏是否显示 */
  extraVisible?: boolean
  /** 扩展栏【刷新】按钮是否显示 */
  extraRefreshVisible?: boolean
  /** 扩展栏【密度】按钮是否显示 */
  extraSizeVisible?: boolean
  /** 扩展栏【密度】按钮默认值 */
  extraSizeDefaultValue?: SizeType
  /** 扩展栏【展示列】按钮是否显示 */
  extraSettingVisible?: boolean
  /** 扩展栏【全屏】按钮是否显示 */
  extraFullscreenVisible?: boolean
}

export interface AySearchTableProps extends SearchTableInitConfig {
  /** 标题 */
  title?: string | ReactNode
  /** 配置项 */
  fields?: Array<AySearchTableField>
  /** 子元素 */
  children?: Array<ReactNode> | ReactNode
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
  onSelectionChange?(selection: Array<Row>, selectionKeys: Array<string>): void
  /** rowKey */
  rowKey?: ((record: Record) => string) | string
  /** 选择时列表展示的 key */
  selectShowKey?: string
  /** dialog form 的配置 */
  dialogFormExtend?: AyDialogFormProps
  /** 弹窗表单的配置项 */
  formField?: Array<AyDialogFormField>
  /** 滚动的 X 轴数值 */
  scrollX?: number
  /** 表格高度 */
  height?: number
  /** 列表过滤 */
  filterData?(data: AnyKeyProps): AnyKeyProps
  /** 提交前过滤 */
  beforeSearch?(data: AnyKeyProps): AnyKeyProps
  /** 展开事件 */
  onExpand?(expanded: boolean, record: Record): void
  /** 分页参数 */
  pagination?: any
  /** 节点插入在查询和表格之间 */
  center?: ReactNode
  /** 表格查询完成监听 */
  onLoad?(records: Array<Record>, data: any): void
  /** 查询区域是否展示 */
  searchVisible?: boolean
  /** table 其它属性 */
  tableExtend?: AnyKeyProps
  /** 指令完成事件 */
  onFinish?(key: string, data?: any): void
  /** 在导入前面插入按钮 */
  btnBefore?: ReactNode
  /** 更多查询数据, 额外带的查询数据用 */
  extendSearchParams?: FormValues
  /** 表格底部插入元素 */
  after?: ReactNode
  /** 查询区域顶部插入元素 */
  before?: ReactNode
  /** 表格编辑模式 */
  editMode?: 'row' | 'col'
  /** 表格是否自动请求 */
  autoload?: boolean
  /** 选择功能的配置 */
  rowSelection?: AnyKeyProps
  /** 查询扩展 */
  searchExtend?: AnyKeyProps
  /** 请求数据变化事件 */
  onParamsChange?(values: FormValues): void
  /** 列表头部 */
  tableHeader?: ReactNode
  /** 是否使用紧凑样式 */
  compact?: boolean
  /** 是否使用 Table 自带的 Pagination */
  useOriginPagination?: boolean
}
export interface ExtendField extends Omit<AyFormField, 'key'> {
  key?: string
  /**
   * 是否必填
   * 请(输入|选择)${label}
   * 例如，请输入用户名
   * */
  required?: boolean
  /** 默认值 */
  defaultValue?: any
  /** 是否只读 */
  readonly?: boolean
  /** 属性 */
  props?: AnyKeyProps
  /** date-range 时有用，是否在提交时拆解多个属性并且转化成字符串 */
  startKey?: string
  /** date-range 时有用，是否在提交时拆解多个属性并且转化成字符串 */
  endKey?: string
  /** 隐藏列 */
  hiddenMode?: Array<ModeType>
}

export interface AySearchTableField extends Field, AyTableField {
  /** AySearch 需要的扩展参数，里面的属性比外面的属性优先级更高 */
  search?: ExtendField | boolean
  /** AyDialogForm 需要的扩展参数，里面的属性比外面的属性优先级更高 */
  dialog?: ExtendField | boolean
  /** AyTable 需要的扩展参数，里面的属性比外面的属性优先级更高 */
  table?: AyTableField | boolean
  [key: string]: any
}

export interface TableRefProps {
  refresh(): void
  reset(search: FormValues): void
  getTableData(): Array<Record>
  setTableData(data: Array<Record>): void
  clearFilters(keys: Array<string>): void
  setFiltersValue(filters: AnyKeyProps): void
  setSortsValue(sorts: Array<SortItem>): void
  clearSorts(keys: Array<string>): void
  getApiParams(): any
  deleteRowByKey(key: string): void
  addRow(record: Record, type: 'before' | 'after' = 'after'): void
}

export interface FormRefProps {
  add: (values?: FormValues | undefined) => Promise<AnyKeyProps>
  view: (values?: FormValues | undefined) => Promise<AnyKeyProps>
  update: (values?: FormValues | undefined) => Promise<AnyKeyProps>
}

export interface Row extends AnyKeyProps {}

export interface SortItem {
  /**
   * 要排序的 key
   */
  key: string
  /**
   * 排序方式
   */
  order: 'ascend' | 'descend'
  /**
   * 排序值，设置完值后，会被删除
   * */
  index?: number
}
