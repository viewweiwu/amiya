import React, { useState, useEffect } from 'react'
import { Button, Popconfirm, Modal, Tooltip } from 'antd'
import { AyButtonProps } from './ay-button'
import classNames from 'classnames'
import './index.less'

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

  // 权限控制
  if (params.permission && !permissionList.includes(params.permission)) {
    return null
  }

  // 控制样式
  let className: string[] | string = [`ay-button`]

  // 是否在折叠按钮里面
  if (props.__simple) {
    className.push('simple')
  }

  // 是否是次级按钮
  if (props.sub) {
    className.push('sub')
  }

  // 是否有自定义样式
  if (props.className) {
    className.push(props.className)
  }

  className = classNames(className)

  // 删除一些没有用到的属性
  delete params.confirm
  delete params.onConfirm
  delete params.confirmMsg
  delete params.tableFooterExtraOnly
  delete params.action
  delete params.api
  delete params.onFinish
  delete params.__simple
  delete params.deleteApi
  delete params.detailApi
  delete params.detailParams
  delete params.permission
  delete params.extra
  delete params.record
  delete params.confirmVisible
  delete params.sub

  // 基础按钮
  let btn = (
    <Button className={className} {...params}>
      {props.children}
    </Button>
  )

  // 带悬浮提示
  if (props.tooltip) {
    btn = <Tooltip title={props.tooltip}>{btn}</Tooltip>
  }

  // 带确认提示
  if (props.confirm && !props.disabled) {
    if (!props.__simple) {
      return (
        <Popconfirm title={props.confirmMsg} onConfirm={() => props.onConfirm && props.onConfirm()}>
          {btn}
        </Popconfirm>
      )
    } else {
      return (
        <Button
          className={className}
          {...params}
          onClick={() => {
            Modal.confirm({
              content: props.confirmMsg,
              onOk: () => props.onConfirm && props.onConfirm()
            })
          }}
        >
          {props.children}
        </Button>
      )
    }
  }

  return btn
}

AyButton.componentName = 'AyButton'
