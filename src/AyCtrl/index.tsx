import React, { ReactNode } from 'react'
import { Divider, Popconfirm } from 'antd'
import AyAction from '../AyAction'

interface AmCtrlProps extends AnyKeyProps {
  children: Array<ReactNode> | ReactNode
}

/**
 * 返回一个控制项
 * @param node 节点
 * @param key key
 */
const getCtrlItem = (node: any, key?: any) => {
  let props = { ...node.props }
  // 删除原来的 confirm 属性
  delete props.confirm
  delete props.onConfirm
  delete props.confirmMsg
  return <AyAction key={key} type="link" {...props} />
}

/**
 * 将子节点转化成 AmButton 按钮
 * @param children 子节点
 */
const getCtrlList = (children: Array<ReactNode> | ReactNode): Array<ReactNode> => {
  let ctrlList: Array<ReactNode> = []
  if (!children) {
    return []
  }

  if (Array.isArray(children) && children.length === 0) {
    // 没有节点存在
    return []
  } else if (!Array.isArray(children)) {
    // 如果节点只有一个元素
    return [getCtrlItem(children, children)]
  }

  children.forEach((node: any, i) => {
    if (!node) {
      return node
    }
    let CtrlItem: ReactNode
    let props = node.props
    // 如果有 confirm 属性，添加气泡提示
    if (props.confirm) {
      CtrlItem = (
        <Popconfirm key={i} title={props.confirmMsg || `你确定要${props.children}此行吗？`} onConfirm={() => props.onConfirm && props.onConfirm()}>
          {getCtrlItem(node, i)}
        </Popconfirm>
      )
    } else {
      // 正常节点
      CtrlItem = getCtrlItem(node, i)
    }
    // 添加这个节点
    ctrlList.push(CtrlItem)
    // 添加一个分割线
    ctrlList.push(<Divider key={'divider' + i} type="vertical" />)
  })

  // 删除最后一个分割线
  ctrlList.splice(ctrlList.length - 1, 1)

  return ctrlList
}

export default function AmCtrl(props: AmCtrlProps) {
  const { children } = props
  const ctrlList = getCtrlList(children)

  return <div className="am-ctrl">{ctrlList}</div>
}
