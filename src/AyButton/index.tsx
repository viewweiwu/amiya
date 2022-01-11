import React, { useState, useEffect } from 'react'
import { Button, Popconfirm, Modal } from 'antd'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { AyButtonProps } from './ay-button'

const refreshList: Array<any> = []

export const addRefresh = (setRefresh: any) => {
  refreshList.push(setRefresh)
}

export const removeRefresh = (setRefresh: any) => {
  let refreshIndex = refreshList.findIndex(item => item === setRefresh)
  if (refreshIndex >= 0) {
    refreshList.splice(refreshIndex, 1)
  }
}

// 权限列表
let permissionList: Array<string> = []

export const setPermissionList = (list: Array<string>) => {
  permissionList = list
  refreshList.forEach(setRefresh => {
    setRefresh(Math.random())
  })
}

export const hasPermission = (permission: string) => {
  if (!permission) {
    return true
  }
  if (permissionList.includes(permission)) {
    return true
  }
  return false
}

export default function AyButton(props: AyButtonProps) {
  const [, setRefresh] = useState<number>(0)
  let params = {
    ...props
  }

  useEffect(() => {
    addRefresh(setRefresh)
    return () => {
      removeRefresh(setRefresh)
    }
  }, [])

  if (params.permission && !permissionList.includes(params.permission)) {
    return null
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
  delete params.api
  delete params.onFinish
  delete params.__simple

  if (props.confirm && !props.disabled) {
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
    <Button className={`ay-button ${props.className || ''}`} {...params} style={style}>
      {props.children}
    </Button>
  )
}

AyButton.componentName = 'AyButton'
