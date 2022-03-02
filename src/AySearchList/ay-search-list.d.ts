import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { ReactNode } from 'react'
import { AyTableCtrlField, AyTableField } from '../AyTable/ay-table'
import { AyFormField, Field } from '../AyForm/ay-form'
import { AyDialogFormProps, AyDialogFormField, ModeType } from '../AyDialogForm/ay-dialog-form'
import { AnyKeyProps } from '../types/AnyKeyProps'

export interface SearchListInitConfig extends AnyKeyProps {
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

export interface AySearchListProps extends SearchListInitConfig {
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
  onSelectionChange?(selection: Array<Row>): void
  /** rowKey */
  rowKey?: ((record: AnyKeyProps) => string) | string
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
  /** 在前面插入按钮 */
  btnBefore?: ReactNode
  /** 更多查询数据, 额外带的查询数据用 */
  extendSearchParams?: AnyKeyProps
  /** 表格底部插入按钮 */
  after?: ReactNode
  /** 选择功能的配置 */
  rowSelection?: AnyKeyProps
  /** 查询扩展 */
  searchExtend?: AnyKeyProps
}

export interface AySelectionProps {
  record: AnyKeyProps
  disabled?: boolean
}
