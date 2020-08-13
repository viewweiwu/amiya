import React, { ReactNode, MutableRefObject, ReactElement } from 'react'
import { success, info } from '../../AmMessage'
import AmButton from '../../AmButton'
import AmCtrl from '../../AmCtrl'
import { Row, TableRefProps, FormRefProps } from '../am-search-table'
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { AmTableCtrlField, AmTableField } from '../../AmTable/am-table'

interface UseDirectiveProps {
  children?: Array<ReactElement> | ReactElement
  tableRef: MutableRefObject<TableRefProps>
  formRef: MutableRefObject<FormRefProps>
  selection: Array<Row>
  ctrl?: AmTableCtrlField
  deleteApi?(params: any): Promise<any>
  clearSelection(): void
  rowKey?: string
  onFinish?(key: string, data?: any): void
}

interface UseDirectiveChildProps {
  child: ReactElement
  props: UseDirectiveProps
  renderParams: any
  originChildren: Array<ReactElement>
  i: number
  rowKey?: string
  onFinish?(key: string, data?: any): void
}

const getChild = (_props: UseDirectiveChildProps): ReactElement => {
  const { child, props, renderParams, originChildren, i, rowKey, onFinish } = _props
  const { formRef, tableRef, selection, deleteApi, clearSelection } = props
  if (child && typeof child.type === 'function') {
    // 指令添加额外参数
    if (child.props.directive) {
      let func: Function = () => {}
      // 扩展参数
      let extendProps: AnyKeyProps = {}
      switch (child.props.directive) {
        case 'add':
          func = () => {
            formRef.current.add().then((data) => {
              success('新增成功')
              tableRef.current.refresh()
              // 发布事件
              if (onFinish) {
                onFinish('add', data)
              }
            })
          }
          extendProps.onClick = func
          extendProps.type = 'primary'
          extendProps.icon = <PlusOutlined />
          break
        case 'batch-delete':
          func = () => {
            if (selection.length === 0) {
              info('请先选择一条数据')
            } else {
              if (deleteApi) {
                Modal.confirm({
                  title: '确定',
                  content: `您勾选了 ${selection.length} 个，确定要删除吗？`,
                  icon: <ExclamationCircleOutlined />,
                  onOk: () => {
                    let params: AnyKeyProps = {
                      [rowKey || 'id']: selection.map((row) => row[rowKey || 'id'])
                    }
                    deleteApi(params).then((data) => {
                      success('批量删除成功')
                      clearSelection()
                      tableRef.current.refresh()
                      // 发布事件
                      if (onFinish) {
                        onFinish('batch-delete', data)
                      }
                    })
                  }
                })
              }
            }
          }
          extendProps.onClick = func
          extendProps.icon = <DeleteOutlined />
          break
        case 'delete':
          func = () => {
            if (deleteApi) {
              let params: AnyKeyProps = {
                [rowKey || 'id']: [renderParams.record[rowKey || 'id']]
              }
              deleteApi(params).then((data) => {
                success('删除成功')
                tableRef.current.refresh()
                // 发布事件
                if (onFinish) {
                  onFinish('delete', data)
                }
              })
            }
          }
          extendProps.confirm = true
          extendProps.onConfirm = func
          break
        case 'update':
          func = () => {
            formRef.current.update(renderParams.record).then((data) => {
              success('编辑成功')
              tableRef.current.refresh()
              // 发布事件
              if (onFinish) {
                onFinish('update', data)
              }
            })
          }
          extendProps.onClick = func
          break
      }
      return <AmButton key="add" {...child.props} {...extendProps}></AmButton>
    } else {
      if (i >= 0) {
        return originChildren[i]
      } else {
        return child
      }
    }
  }
  return child
}

/** 获取 am-button 上的指令集 */
export default function useDirective(props: UseDirectiveProps): [Array<ReactNode> | ReactElement, AmTableField] {
  let { children, ctrl, rowKey, onFinish } = props
  let newChildren: Array<ReactNode> = []
  // 直接子元素的指令
  if (Array.isArray(children)) {
    newChildren = children.map((child) => {
      return getChild({ child, props, renderParams: {}, originChildren: [], i: -1, rowKey, onFinish })
    })
  }
  let newCtrl: AmTableField = {}
  if (ctrl) {
    let CtrlItem: any = ctrl.render('', {}, 0)
    let ctrlChildren: Array<ReactElement> = Array.isArray(CtrlItem.props.children) ? Array.from(CtrlItem.props.children) : [CtrlItem.props.children]
    if (Array.isArray(ctrlChildren)) {
      newCtrl = {
        ...ctrl,
        render: (text: ReactNode, record: AnyKeyProps, index: number) => {
          if (!ctrl) return
          // 执行一次原始的 render，也就是原始 ctrl
          let originRender: any = ctrl.render(text, record, index)
          // 获得原始 ctrl 的子元素
          let beforeoriginChildren = originRender.props.children
          let originChildren: Array<ReactElement> = Array.from(Array.isArray(beforeoriginChildren) ? beforeoriginChildren : [beforeoriginChildren])
          return (
            <AmCtrl>
              {ctrlChildren.map((child: ReactElement, i) => {
                return getChild({ child, props, renderParams: { text, record, index }, originChildren, i, rowKey, onFinish })
              })}
            </AmCtrl>
          )
        }
      }
    }
  }
  return [newChildren, newCtrl]
}
