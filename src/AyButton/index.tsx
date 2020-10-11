import { Button, Popconfirm } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'

interface AmButtonProps extends ButtonProps {
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

export default function AmButton(props: AmButtonProps) {
  let params = {
    ...props
  }
  delete params.confirm
  delete params.onConfirm
  delete params.confirmMsg
  if (props.confirm) {
    return (
      <Popconfirm title={props.confirmMsg} onConfirm={() => props.onConfirm && props.onConfirm()}>
        <Button className="ay-button" {...params} />
      </Popconfirm>
    )
  }
  return (
    <Button className="ay-button" {...params}>
      {props.children}
    </Button>
  )
}
