import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'

interface AmButtonProps extends ButtonProps {
  /** true 会有确认，false: 无确认 */
  confirm?: boolean
  /** 确认事件 */
  onConfirm?(): void
  /** 自定义确认消息 */
  confirmMsg?: React.ReactNode
  /** 指令 */
  directive?: 'batch-delete' | 'update' | 'add' | 'delete'
  /** 权限 */
  permission?: string
}

export default function AmButton(props: AmButtonProps) {
  return (
    <Button className="am-button" {...props}>
      {props.children}
    </Button>
  )
}
