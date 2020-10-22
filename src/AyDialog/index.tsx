import React from 'react'
import { Modal, Drawer, Space } from 'antd'
import { AyDialogProps, AyConfirmProps } from './ay-dialog'
import AyButton from '../AyButton'
const { ExclayationCircleOutlined } = require('@ant-design/icons')

export function AyDialogFooter(props: AyDialogProps, handleCancel: () => void, handleConfirm: () => void) {
  const {
    loading,
    confirmVisible,
    cancelVisible,
    confirmText,
    cancelText,
    confirmProps,
    cancelProps,
    confirmBefore,
    confirmAfter,
    cancelBefore,
    cancelAfter
  } = props

  return (
    <Space>
      {cancelBefore}
      {cancelVisible !== false && (
        <AyButton {...confirmProps} onClick={handleCancel}>
          {cancelText || '关闭'}
        </AyButton>
      )}
      {cancelAfter}
      {confirmBefore}
      {confirmVisible !== false && (
        <AyButton type="primary" {...cancelProps} onClick={handleConfirm} loading={loading}>
          {confirmText || '确定'}
        </AyButton>
      )}
      {confirmAfter}
    </Space>
  )
}

export default function AyDialog(props: AyDialogProps) {
  const { title, titleBefore, titleAfter, children, visible, setVisible, onConfirm, footer, width, drawer } = props

  const handleCancel = () => {
    setVisible(false)
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
  }

  const dialogProps = drawer
    ? {
        width: width || 500,
        title: (
          <Space>
            {titleBefore}
            {title}
            {titleAfter}
          </Space>
        ),
        visible,
        closable: true,
        onClose: handleCancel,
        footer: footer || AyDialogFooter(props, handleCancel, handleConfirm)
      }
    : {
        width: width || 500,
        title: (
          <Space>
            {titleBefore}
            {title}
            {titleAfter}
          </Space>
        ),
        visible: visible,
        onCancel: handleCancel,
        footer: footer || AyDialogFooter(props, handleCancel, handleConfirm)
      }

  return drawer ? (
    <Drawer footerStyle={{ textAlign: 'right' }} {...dialogProps}>
      {children}
    </Drawer>
  ) : (
    <Modal {...dialogProps}>{children}</Modal>
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
