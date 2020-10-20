import React from 'react'
import { Modal } from 'antd'
import { AyDialogProps, AyConfirmProps } from './ay-dialog'
const { ExclayationCircleOutlined } = require('@ant-design/icons')

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
