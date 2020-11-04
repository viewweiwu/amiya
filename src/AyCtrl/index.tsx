import React, { ReactNode } from 'react'
import { Divider, Dropdown, Menu } from 'antd'
import { AyCtrlProps } from './ay-ctrl'
import AyAction from '../AyAction'
import AyButton from '../AyButton'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { CTRL_DEFAULT_MAX, CTRL_DEFAULT_MORE_TEXT } from '../constant'

const { DownOutlined } = require('@ant-design/icons')

/**
 * 返回一个控制项
 * @param node 节点
 * @param key key
 */
const getCtrlItem = (node: any, key?: any, defaultProps?: AnyKeyProps) => {
  let props = { ...node.props }
  return <AyAction key={key} type="link" {...defaultProps} {...props} />
}

/**
 * 将子节点转化成 AyAction 按钮
 * @param children 子节点
 */
const getCtrlList = (children: Array<ReactNode> | ReactNode, props: AyCtrlProps): Array<ReactNode> => {
  const {
    max = CTRL_DEFAULT_MAX,
    more = (
      <>
        {CTRL_DEFAULT_MORE_TEXT} <DownOutlined />
      </>
    )
  } = props
  let ctrlList: Array<ReactNode> = []
  if (!children) {
    return []
  }

  if (Array.isArray(children) && children.length === 0) {
    // 没有节点存在
    return []
  } else if (!Array.isArray(children)) {
    // 如果节点只有一个元素
    return [getCtrlItem(children, 'key')]
  }

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
    // 添加一个分割线
    ctrlList.push(<Divider key={'divider' + i} type="vertical" />)
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
    // 添加一个分割线
    ctrlList.push(<Divider key={'divider' + max} type="vertical" />)
  }

  // 删除最后一个分割线
  ctrlList.splice(ctrlList.length - 1, 1)

  return ctrlList
}

export default function AmCtrl(props: AyCtrlProps) {
  const { children } = props
  const ctrlList = getCtrlList(children, props)

  return <div className="ay-ctrl">{ctrlList}</div>
}
