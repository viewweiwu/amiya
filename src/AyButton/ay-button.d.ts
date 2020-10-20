import { ButtonProps } from 'antd/lib/button'

export interface AyButtonProps extends ButtonProps {
  /** true 会有确认，false: 无确认 */
  confirm?: boolean
  /** 确认事件 */
  onConfirm?(): void
  /** 自定义确认消息 */
  confirmMsg?: React.ReactNode
  /** 权限 */
  permission?: string
  [key: string]: any
}
