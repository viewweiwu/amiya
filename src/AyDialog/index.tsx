import React from 'react'
import AyButton from '../AyButton'
import { Modal, Drawer, Space } from 'antd'
import { AyDialogProps } from './ay-dialog'
import { AnyKeyProps } from '../types/AnyKeyProps'
import locale from '../locale'
import { omitObj } from '../utils'

const usedKeys = [
  'loading',
  'confirmVisible',
  'cancelVisible',
  'confirmText',
  'cancelText',
  'confirmProps',
  'cancelProps',
  'confirmBefore',
  'confirmAfter',
  'cancelBefore',
  'cancelAfter'
]

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
    onOk,
    onClose,
    onCancel,
    footer,
    width,
    drawer,
    ...extraProps
  } = props

  const handleCancel = () => {
    setVisible && setVisible(false)
    onClose && onClose()
    onCancel && onCancel()
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    if (onOk) {
      onOk()
    }
  }

  // 弹窗底部按钮
  const getDialogFooter = function() {
    if (footer === false || footer === null) {
      return null
    } else if (footer === undefined) {
      return AyDialogFooter(props, handleCancel, handleConfirm)
    }
    return footer
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
        footer: getDialogFooter(),
        ...omitObj(extraProps, usedKeys)
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
        footer: getDialogFooter(),
        ...omitObj(extraProps, usedKeys)
      }

  return drawer ? (
    <Drawer footerStyle={{ textAlign: 'right' }} {...dialogProps}>
      {children}
    </Drawer>
  ) : (
    <Modal {...dialogProps}>{children}</Modal>
  )
}
