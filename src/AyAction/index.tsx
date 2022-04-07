import React, { useContext, useState } from 'react'
import AyButton from '../AyButton'
import { AySearchTableContext } from '../AySearchTable/context'
import { success, info } from '../AyMessage'
import { Modal } from 'antd'
import { AyActionProps } from './ay-action'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { EditableContext } from '../AyTable/context'
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import locale from '../locale'
import { getKey, getRowKey } from '../utils'

export const actionMap: AnyKeyProps = {}

/**
 * 注册一个 action
 */
export const registerAction = function(
  actionName: string,
  action: (props: AnyKeyProps, record: AnyKeyProps, searchTable: AnyKeyProps, form?: AnyKeyProps) => AnyKeyProps
) {
  actionMap[actionName] = action
}

/**
 * 注册【新增】事件
 */
registerAction('add', (props, record, searchTable) => {
  return {
    type: 'primary',
    icon: <PlusOutlined />,
    onClick: () => {
      searchTable.formRef?.current?.add(
        { ...props.params, ...record },
        {
          onSuccess: (res: any) => {
            success(props.successMsg || props.children + locale.action.success)
            searchTable.tableRef.current.refresh()
            // 请求完成回调
            if (props.onFinish) {
              props.onFinish(res)
            }
          }
        }
      )
    },
    ...props
  }
})

/**
 * 注册【修改】事件
 */
registerAction('update', (props, record, searchTable) => {
  const [loading, setLoading] = useState(false)
  return {
    onClick: () => {
      let extraParams = {
        onSuccess: (res: any) => {
          success(props.successMsg || props.children + locale.action.success)
          searchTable.tableRef.current.refresh()
          // 请求完成回调
          if (props.onFinish) {
            props.onFinish(res)
          }
        }
      }
      if (props.detailApi) {
        setLoading(true)
        props
          .detailApi(props.detailParams)
          .then((res: AnyKeyProps) => {
            searchTable.formRef?.current?.update(
              props.detailApiFilter ? props.detailApiFilter(res) : res.data,
              extraParams
            )
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        searchTable.formRef?.current?.update({ ...props.params, ...record }, extraParams)
      }
    },
    loading,
    ...props
  }
})

/**
 * 注册【详情】事件
 */
registerAction('view', (props, record, searchTable) => {
  const [loading, setLoading] = useState(false)
  return {
    onClick: () => {
      if (props.detailApi) {
        setLoading(true)
        props
          .detailApi(props.detailParams)
          .then((res: AnyKeyProps) => {
            searchTable.formRef?.current?.view(props.detailApiFilter ? props.detailApiFilter(res) : res.data)
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        searchTable.formRef?.current?.view({ ...props.params, ...record })
      }
    },
    loading,
    ...props
  }
})

/**
 * 注册【删除】事件
 */
registerAction('delete', (props, record, searchTable) => {
  return {
    confirm: true,
    confirmMsg: locale.action.deleteConfirm,
    onConfirm: () => {
      if (searchTable?.deleteApi && record) {
        const params = [getKey(record, searchTable?.rowKey)]
        searchTable?.deleteApi(params).then((data: any) => {
          success(props.successMsg || locale.action.deleteSuccess)
          searchTable?.tableRef.current.refresh()
          // 请求完成回调
          if (props.onFinish) {
            props.onFinish({ data, params })
          }
        })
      }
    },
    ...props
  }
})

/**
 * 注册【批量删除】事件
 */
registerAction('batch-delete', (props, _record, searchTable) => {
  return {
    icon: <DeleteOutlined />,
    tableFooterExtraOnly: true,
    onClick: () => {
      let selection = searchTable?.selection || []
      if (!selection.length) {
        info(locale.action.noSelection)
        return
      }
      if (searchTable?.deleteApi) {
        Modal.confirm({
          title: locale.action.deleteConfirmTitle,
          content: `${locale.action.deleteConfirmBefore} ${selection.length} ${locale.action.deleteConfirmAfter}`,
          icon: <ExclamationCircleOutlined />,
          onOk: () => {
            let params: Array<string> = selection.map((row: any) => getKey(row, searchTable?.rowKey))
            searchTable?.deleteApi(params).then((data: any) => {
              success(props.successMsg || locale.action.deleteConfirmBatchSuccess)
              searchTable?.clearSelection()
              searchTable?.tableRef.current.refresh()
              // 请求完成回调
              if (props.onFinish) {
                props.onFinish({ data, params })
              }
            })
          }
        })
      }
    },
    ...props
  }
})

/**
 * 注册【可编辑表格】【编辑】事件
 */
registerAction('editable-update', (props, record, searchTable) => {
  return {
    onClick: () => {
      if (record) {
        // 将表单数据与行数据合并
        const newRow = { ...record, editing: true }
        // @ts-ignore 重新构建数组
        const newTableData = [...searchTable.tableRef.current.getTableData()]
        // 寻找到对应行
        const index = newTableData.findIndex(
          row => getKey(row, searchTable?.rowKey) === getKey(newRow, searchTable?.rowKey)
        )
        // 替换行
        newTableData.splice(index, 1, newRow)
        // 替换表格数据
        searchTable.tableRef.current.setTableData(newTableData)
      }
    },
    ...props
  }
})

/**
 * 注册【可编辑表格】【确定】事件
 */
registerAction('editable-confirm', (props, record, searchTable, form) => {
  return {
    onClick: async () => {
      if (record && form) {
        // 获取表单数据
        const values = await form.validateFields()
        // 将表单数据与行数据合并
        const newRow = { ...record, ...values }
        // 取消编辑模式
        delete newRow.editing
        // 删除新增标识
        delete newRow._isNew
        // @ts-ignore 重新构建数组
        const newTableData = [...searchTable.tableRef.current.getTableData()]
        // 寻找到对应行
        const index = newTableData.findIndex(
          row => getKey(row, searchTable?.rowKey) === getKey(newRow, searchTable?.rowKey)
        )
        // 替换行
        newTableData.splice(index, 1, newRow)
        // 替换表格数据
        searchTable.tableRef.current.setTableData(newTableData)
      }
    },
    ...props
  }
})

/**
 * 注册【可编辑表格】【取消】事件
 */
registerAction('editable-cancel', (props, record, searchTable) => {
  return {
    onClick: () => {
      if (record) {
        // 将表单数据与行数据合并
        let newRow = { ...record, editing: false }
        // @ts-ignore 重新构建数组
        const newTableData = [...searchTable.tableRef.current.getTableData()]
        // 寻找到对应行
        const index = newTableData.findIndex(
          row => getKey(row, searchTable?.rowKey) === getKey(newRow, searchTable?.rowKey)
        )
        if (record._isNew) {
          // 删除新增行
          newTableData.splice(index, 1)
        } else {
          // 替换行
          newTableData.splice(index, 1, newRow)
        }
        // 替换表格数据
        searchTable.tableRef.current.setTableData(newTableData)
      }
    },
    ...props
  }
})

/**
 * 注册【可编辑表格】【删除】事件
 */
registerAction('editable-delete', (props, record, searchTable) => {
  return {
    confirm: true,
    confirmMsg: locale.action.deleteConfirm,
    onConfirm: () => {
      searchTable.tableRef.current.deleteRowByKey(getKey(record, searchTable?.rowKey))
    },
    ...props
  }
})

/**
 * 注册【可编辑表格】【新增】事件
 */
registerAction('editable-add', (props, _record, searchTable) => {
  return {
    icon: <PlusOutlined />,
    type: 'dashed',
    block: true,
    style: {
      marginTop: 8,
      marginBottom: 8
    },
    onClick: () => {
      searchTable.tableRef.current.addRow({
        [getRowKey({}, searchTable?.rowKey)]: Date.now(),
        // 正在编辑
        editing: true,
        // 新增标识
        _isNew: true
      })
    },
    ...props
  }
})

/**
 * 获得转换后 action props
 * @param props 当前 props
 * @param searchTable searchTable 对象
 */
export const getActionProps = (props: AyActionProps, searchTable: any, form?: AnyKeyProps) => {
  const { action, record } = props
  let targetAction = actionMap[action || '']
  if (targetAction) {
    let actionProps: AnyKeyProps = targetAction(props, record, searchTable, form)
    return actionProps
  }
  return props
}

export default function AyAction(props: AyActionProps) {
  const searchTable: any = useContext(AySearchTableContext)
  const form = useContext(EditableContext)
  const actionProps = getActionProps(props, searchTable, form)
  return <AyButton {...actionProps} />
}

AyAction.componentName = 'AyAction'
