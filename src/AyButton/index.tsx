import { Button, Popconfirm } from 'antd'
import React from 'react'
import { AyButtonProps } from './ay-button'

export default function AyButton(props: AyButtonProps) {
  let params = {
    ...props
  }
  delete params.confirm
  delete params.onConfirm
  delete params.confirmMsg
  delete params.tableFooterExtraOnly
  delete params.action
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
