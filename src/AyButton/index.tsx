import React, { useState, useEffect } from 'react'
import { Button, Popconfirm, Modal, Tooltip } from 'antd'
import { AyButtonProps } from './ay-button'
import classNames from 'classnames'
import { AnyKeyProps } from 'lib'
import { omitObj } from '../utils'
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

let keys = [
  'confirm',
  'onConfirm',
  'confirmMsg',
  'tableFooterExtraOnly',
  'action',
  'api',
  'onFinish',
  '__simple',
  'deleteApi',
  'detailApi',
  'detailParams',
  'permission',
  'extra',
  'record',
  'confirmVisible',
  'sub'
]
export default function AyButton(props: AyButtonProps) {
  const [, setRefresh] = useState<number>(0)
  let params: AnyKeyProps = {
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
  params = omitObj(params, keys)

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
