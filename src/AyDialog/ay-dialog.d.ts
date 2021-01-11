import { ReactNode, SetStateAction, Dispatch } from 'react'
import { ModalFuncProps, ModalProps } from 'antd/lib/modal'
import { AyButtonProps } from '../AyButton/ay-button'

export interface AyDialogProps extends ModalProps {
  /** 子元素 */
  children: ReactNode
  /** 标题 */
  title: ReactNode
  /** 显示 */
  visible: boolean
  /** 显示控制 */
  setVisible: Dispatch<SetStateAction<boolean>>
  /** 提交事件 */
  onConfirm?(): void
  /** 是否 loading */
  loading?: boolean
  /** 底部 */
  footer?: ReactNode
  /** 宽度 */
  width?: number
  /** 是否用抽屉展示 */
  drawer?: boolean
  /** 标题前置元素 */
  titleBefore?: ReactNode
  /** 标题后置元素 */
  titleAfter?: ReactNode
  /** 确定按钮是否展示 */
  confirmVisible?: boolean
  /** 关闭按钮是否展示 */
  cancelVisible?: boolean
  /** 确定按钮文字 */
  confirmText?: string
  /** 关闭按钮文字 */
  cancelText?: string
  /** 确定按钮样式 */
  confirmProps?: AyButtonProps
  /** 关闭按钮样式 */
  cancelProps?: AyButtonProps
  /** 确定按钮前置元素 */
  confirmBefore?: ReactNode
  /** 确定按钮后置元素 */
  confirmAfter?: ReactNode
  /** 关闭按钮前置元素 */
  cancelBefore?: ReactNode
  /** 关闭按钮后置元素 */
  cancelAfter?: ReactNode
  className?: string
  [key: string]: any
}

export interface AyConfirmProps extends ModalFuncProps {
  title: ReactNode
  content: ReactNode
  onConfirm(): void
}
