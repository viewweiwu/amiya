import React from 'react'
import AyButton from '../AyButton'
import { Modal, Drawer, Space } from 'antd'
import { AyDialogProps, AyConfirmProps } from './ay-dialog'
import { AnyKeyProps } from '@/types/AnyKeyProps'
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
  const {
    title,
    titleBefore,
    titleAfter,
    children,
    visible,
    setVisible,
    onConfirm,
    footer,
    width,
    drawer,
    ...extraProps
  } = props

  const handleCancel = () => {
    setVisible(false)
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
  }

  const dialogProps: AnyKeyProps = drawer
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
        footer: footer === false ? null : AyDialogFooter(props, handleCancel, handleConfirm),
        ...extraProps
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
        visible,
        onCancel: handleCancel,
        footer: footer === false ? null : AyDialogFooter(props, handleCancel, handleConfirm),
        ...extraProps
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
    okText: '确定',
    cancelText: '关闭',
    ...props,
    onOk: () => {
      return props.onConfirm()
    }
  })
}
