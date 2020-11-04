import { Button, Popconfirm, Modal } from 'antd'
import React from 'react'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { AyButtonProps } from './ay-button'

export default function AyButton(props: AyButtonProps) {
  let params = {
    ...props
  }

  const style: AnyKeyProps = { ...params.style }

  if (props.__simple) {
    style.width = '100%'
  }

  delete params.confirm
  delete params.onConfirm
  delete params.confirmMsg
  delete params.tableFooterExtraOnly
  delete params.action
  delete params.__simple

  if (props.confirm) {
    if (!props.__simple) {
      return (
        <Popconfirm title={props.confirmMsg} onConfirm={() => props.onConfirm && props.onConfirm()}>
          <Button className="ay-button" {...params} style={style} />
        </Popconfirm>
      )
    } else {
      return (
        <>
          <Button
            className="ay-button"
            {...params}
            style={style}
            onClick={() =>
              Modal.confirm({
                content: props.confirmMsg,
                onOk: () => props.onConfirm && props.onConfirm()
              })
            }
          />
        </>
      )
    }
  }
  return (
    <Button className="ay-button" {...params} style={style}>
      {props.children}
    </Button>
  )
}
