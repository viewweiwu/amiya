import React, { ReactNode, SetStateAction, Dispatch } from 'react'
import { Modal } from 'antd'
import { ModalFuncProps, ModalProps } from 'antd/lib/modal'
const { ExclayationCircleOutlined } = require('@ant-design/icons')

interface AyDialogProps extends ModalProps {
  children: ReactNode
  title: ReactNode
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  onConfirm?(): void
  loading?: boolean
  footer?: ReactNode
  width?: number
}

interface AyConfirmProps extends ModalFuncProps {
  title: ReactNode
  content: ReactNode
  onConfirm(): void
}

export default function AyDialog(props: AyDialogProps) {
  const { title, children, setVisible, onConfirm, loading, footer, width } = props

  const handleCancel = () => {
    setVisible(false)
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
  }

  return (
    <Modal width={width} title={title} onOk={handleConfirm} onCancel={handleCancel} confirmLoading={loading} footer={footer} {...props}>
      {children}
    </Modal>
  )
}

export function AyConfirm(props: AyConfirmProps) {
  return Modal.confirm({
    title: props.title,
    icon: <ExclayationCircleOutlined />,
    content: props.content,
    okText: '确认',
    cancelText: '取消',
    ...props,
    onOk: () => {
      return props.onConfirm()
    }
  })
}
