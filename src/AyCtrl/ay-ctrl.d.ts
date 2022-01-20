import { ReactNode } from 'react'
import { AnyKeyProps } from '@/types/AnyKeyProps'

export interface AyCtrlProps extends AnyKeyProps {
  /** 超过多少个后折叠 */
  max?: number
  /** 折叠文案 */
  more?: ReactNode
  /** 分割元素 */
  split?: ReactNode
  /** 样式 */
  className?: string
  /** 行内样式 */
  style?: React.CSSProperties
  /** 是否使用灰色次级按钮 */
  sub?: boolean
  space?: any
  children: Array<ReactNode> | ReactNode
}
