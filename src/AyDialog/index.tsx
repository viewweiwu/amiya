import React from 'react'
import AyButton from '../AyButton'
import { Modal, Drawer, Space } from 'antd'
import { AyDialogProps } from './ay-dialog'
import { AnyKeyProps } from '@/types/AnyKeyProps'
import locale from '../locale'

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
          {cancelText || locale.dialog.close}
        </AyButton>
      )}
      {cancelAfter}
      {confirmBefore}
      {confirmVisible !== false && (
        <AyButton type="primary" {...cancelProps} onClick={handleConfirm} loading={loading}>
          {confirmText || locale.dialog.confirm}
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
    onClose,
    footer,
    width,
    drawer,
    ...extraProps
  } = props

  const handleCancel = () => {
    setVisible && setVisible(false)
    onClose && onClose()
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
