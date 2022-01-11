import React, { ReactNode, useEffect, useState } from 'react'
import { Divider, Dropdown, Menu, Space } from 'antd'
import AyButton, { addRefresh, hasPermission } from '../AyButton'
import AyAction from '../AyAction'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { AyCtrlProps } from './ay-ctrl'
import { CTRL_DEFAULT_MAX, CTRL_DEFAULT_MORE_TEXT } from '../constant'
import { DownOutlined } from '@ant-design/icons'
import './ay-ctrl.less'

/**
 * 返回一个控制项
 * @param node 节点
 * @param key key
 */
const getCtrlItem = (node: any, key?: any, defaultProps?: AnyKeyProps) => {
  let props = { ...node.props }

  if (node?.type?.name === 'AyAction' || node?.type?.name === 'AyButton') {
    return <AyAction key={key} type="link" {...defaultProps} {...props} />
  }
  return node
}

/**
 * 将子节点转化成 AyAction 按钮
 * @param children 子节点
 */
const getCtrlList = (children: Array<ReactNode>, props: AyCtrlProps): Array<ReactNode> => {
  const {
    max = CTRL_DEFAULT_MAX,
    more = (
      <>
        {CTRL_DEFAULT_MORE_TEXT} <DownOutlined />
      </>
    )
  } = props
  let ctrlList: Array<ReactNode> = []

  if (!children.length || (children.length === 1 && !children[0])) {
    return []
  }

  // 如果节点只有一个元素
  if (children.length === 1) {
    return [getCtrlItem(children[0], 'key')]
  }

  // 过滤掉无权限按钮和 null
  children = children.filter((node: any) => node !== null && hasPermission(node?.props?.permission))

  // 渲染没有折叠前的按钮
  for (let i = 0; i < (children.length <= max + 1 ? children.length : max); i++) {
    let node = children[i]
    if (!node) {
      continue
    }
    let CtrlItem: ReactNode
    // 正常节点
    CtrlItem = getCtrlItem(node, i)
    // 添加这个节点
    ctrlList.push(CtrlItem)
  }

  // 多余的按钮会变成下拉菜单
  if (children.length > max + 1) {
    const menuList = []

    for (let i = max; i < children.length; i++) {
      let node = children[i]
      if (!node) {
        continue
      }
      let CtrlItem: ReactNode
      // 正常节点
      CtrlItem = getCtrlItem(node, i, { __simple: true, type: 'text' })
      // 添加这个节点
      menuList.push(
        <Menu.Item style={{ padding: 0 }} key={max + i}>
          {CtrlItem}
        </Menu.Item>
      )
    }

    const menu = <Menu style={{ minWidth: 100 }}>{menuList}</Menu>

    ctrlList.push(
      <Dropdown key={max} overlay={menu} placement="bottomRight">
        <AyButton type="link">{more}</AyButton>
      </Dropdown>
    )
  }

  return ctrlList
}

export default function AyCtrl(props: AyCtrlProps) {
  const [, setRefresh] = useState<number>(0)
  let { children } = props
  if (!Array.isArray(children)) {
    children = [children]
  }
  const ctrlList = getCtrlList(children as Array<ReactNode>, props)

  useEffect(() => {
    addRefresh(setRefresh)
  }, [])

  return (
    <Space className="ay-ctrl" split={<Divider type="vertical" />}>
      {ctrlList}
    </Space>
  )
}
