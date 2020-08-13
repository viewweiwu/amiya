import { ReactNode } from 'react'
import { Option } from '../AmForm/am-form'

declare interface AmTableField {
  /** 标题 */
  title?: string
  /** 唯一 key，dataIndex 默认会跟次值一样 */
  key?: string
  options?: Array<Option>
  /** render 函数 */
  render?(text: ReactNode, record: AnyKeyProps, index: number): ReactNode
  /** 控制列 */
  ctrl?: Array<ReactNode>
  /** 渲染方式，可选值，'tag' */
  renderType?: 'tag'
  [key: string]: any
}

declare interface AmTableCtrlField extends AmTableField {
  /** render 函数 */
  render(text: ReactNode, record: AnyKeyProps, index: number): ReactNode
}
