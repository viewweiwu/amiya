import { ReactElement, ReactNode } from 'react'

const getAyFieldsNode = (children: ReactNode) => {
  if (!Array.isArray(children)) {
    children = [children]
  }
  // @ts-ignore
  return children.find((node: ReactElement) => node?.type?.componentName === 'AyFields')
}

export const convertChildrenToAyFormField = (children: ReactNode) => {
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

  // @ts-ignore
  return children.map(node => {
    let newNode = {
      ...node?.props,
      key: node.key
    }

    if (newNode?.children) {
      newNode.children = loop(newNode.children)
    }

    return newNode
  })
}
