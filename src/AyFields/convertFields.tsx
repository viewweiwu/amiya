import { Field } from '../AyForm/ay-form'
import { ReactElement, ReactNode } from 'react'

const getAyFieldsNode = (children: ReactNode) => {
  if (!Array.isArray(children)) {
    children = [children]
  }
  // @ts-ignore
  return children.find((node: ReactElement) => node?.type?.componentName === 'AyFields')
}

export const convertChildrenToField = (children: ReactNode) => {
  // 获得子元素名为 AyFields 的节点
  let ayFields = getAyFieldsNode(children)

  if (!ayFields) {
    return []
  }

  // 获得到子元素
  let ayFieldsChildren = ayFields?.props.children
  return loop(ayFieldsChildren)
}

function loop(children: ReactNode) {
  if (!Array.isArray(children)) {
    children = [children]
  }

  let newChildren: Field[] = []

  // @ts-ignore
  children.forEach(node => {
    if (node) {
      if (node?.type?.toString() === 'Symbol(react.fragment)' && node?.props?.children) {
        newChildren.push(...loop(node.props.children))
        return
      }
      let newNode = {
        ...node?.props,
        key: node.key
      }

      if (Array.isArray(newNode?.children)) {
        newNode.children = loop(newNode.children)
      }

      newChildren.push(newNode)
    }
  })
  return newChildren
}
