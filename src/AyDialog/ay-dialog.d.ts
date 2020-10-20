import { ReactNode, SetStateAction, Dispatch } from 'react'
import { ModalFuncProps, ModalProps } from 'antd/lib/modal'

export interface AyDialogProps extends ModalProps {
  children: ReactNode
  title: ReactNode
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  onConfirm?(): void
  loading?: boolean
  footer?: ReactNode
  width?: number
}

export interface AyConfirmProps extends ModalFuncProps {
  title: ReactNode
  content: ReactNode
  onConfirm(): void
}
