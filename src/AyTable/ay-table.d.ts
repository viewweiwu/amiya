import { ReactNode } from 'react'
import { Option } from '../AyForm/ay-form'
import { TableRowSelection } from 'antd/lib/table/interface'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

export interface AyTableProps {
  title?: string | ReactNode
  children?: ReactNode
  header?: ReactNode
  size?: SizeType
  api?(params: AnyKeyProps): Promise<AnyKeyProps>
  /** 列表项 */
  fields: Array<AyTableField>
  /** 列表数据 */
  data?: Array<any>
  /** 操作列 */
  ctrl?: AyTableField
  /** 表格前面的 selection */
  rowSelection?: TableRowSelection<AnyKeyProps>
  /** 表格查询完成监听 */
  onLoad?(records: Array<AnyKeyProps>, data: any): void
  /** rowKey */
  rowKey?: string
  /** 横向滚动宽度 */
  scrollX?: number
  /** 表格高度 */
  height?: number
  /** 加载玩数据过滤 */
  filterData?(data: AnyKeyProps): AnyKeyProps
  /** 查询前过滤 */
  beforeSearch?(data: AnyKeyProps): AnyKeyProps
  /** 展开事件 */
  onExpand?(expanded: boolean, record: AnyKeyProps): void
  /** 分页参数 */
  pagination?: any
  className?: string
  /** talbe 其它属性 */
  tableExtend?: AnyKeyProps
  /** 默认查询数据 */
  defaultSearchValue?: AnyKeyProps
  /** 在导入前面插入按钮 */
  btnBefore?: ReactNode
  /** 统计数据，放在导入按钮前面 */
  dataAnalysis?: Array<Option>
  /** 是否展示导出按钮 */
  exportVisible?: boolean
  /** 更多查询数据, 额外带的查询数据用 */
  extendSearchParams?: AnyKeyProps
}

export interface AyTableField {
  /** 标题 */
  title?: string
  /** 唯一 key，dataIndex 默认会跟次值一样 */
  key?: string
  options?: Array<Option>
  /** render 函数 */
  render?(text: ReactNode, record: AnyKeyProps, index: number): ReactNode
  /** 控制列 */
  ctrl?: Array<ReactNode>
  /** 渲染方式 */
  renderType?: string
  /** 是否隐藏这一列 */
  hidden?: boolean | (() => boolean)
  __extraTouched?: boolean
  __hidden?: boolean
  __order?: number
  [key: string]: any
}

export interface AyTableCtrlField extends AyTableField {
  /** render 函数 */
  render(text: ReactNode, record: AnyKeyProps, index: number): ReactNode
}

export interface RenderProps {
  text: string
  record: AnyKeyProps
  index: number
  field: AnyKeyProps
}

export interface LoadParams {
  /** 分页参数 */
  pagination: {
    /** 当前第 n 页 */
    current: number
    /** 每页多少条 */
    pageSize: number
  }
  sorts: Array<AnyKeyProps>
  filters: AnyKeyProps
  /** 查询额外参数 */
  search: AnyKeyProps
}
