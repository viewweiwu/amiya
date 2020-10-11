import { ReactNode } from 'react'
import { Option } from '../AyForm/ay-form'

declare interface AyTableField {
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

declare interface AyTableCtrlField extends AyTableField {
  /** render 函数 */
  render(text: ReactNode, record: AnyKeyProps, index: number): ReactNode
}
