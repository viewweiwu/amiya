import React, { useContext } from 'react'
import AyButton from '../AyButton'
import { AySearchTableContext } from '../AySearchTable'
import { success, info } from '../AyMessage'
import { Modal } from 'antd'
import { AyActionProps } from './ay-action'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { EditableContext } from '../AyTable/EditableTable'
const { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } = require('@ant-design/icons')

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
registerAction('add', (props, _record, searchTable) => {
  return {
    type: 'primary',
    icon: <PlusOutlined />,
    onClick: () => {
      searchTable.formRef?.current?.add().then((res: any) => {
        success(props.children + '成功')
        searchTable.tableRef.current.refresh()
        // 请求完成回调
        if (props.onFinish) {
          props.onFinish(res)
        }
      })
    },
    ...props
  }
})

/**
 * 注册【修改】事件
 */
registerAction('update', (props, record, searchTable) => {
  return {
    onClick: () => {
      searchTable.formRef?.current?.update(record).then((res: any) => {
        success(props.children + '成功')
        searchTable.tableRef.current.refresh()
        // 请求完成回调
        if (props.onFinish) {
          props.onFinish(res)
        }
      })
    },
    ...props
  }
})

/**
 * 注册【详情】事件
 */
registerAction('view', (props, record, searchTable) => {
  return {
    onClick: () => {
      searchTable.formRef?.current?.view(record)
    },
    ...props
  }
})

/**
 * 注册【删除】事件
 */
registerAction('delete', (props, record, searchTable) => {
  return {
    confirm: true,
    confirmMsg: '你确定要删除此行吗？',
    onConfirm: () => {
      if (searchTable?.deleteApi && record) {
        const params = [record[searchTable?.rowKey || 'id']]
        searchTable?.deleteApi(params).then((data: any) => {
          success('删除成功')
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
        info('请先选择一条数据')
        return
      }
      if (searchTable?.deleteApi) {
        Modal.confirm({
          title: '确定',
          content: `您勾选了 ${selection.length} 个，确定要删除吗？`,
          icon: <ExclamationCircleOutlined />,
          onOk: () => {
            let params: Array<string> = selection.map((row: any) => row[searchTable?.rowKey || 'id'])
            searchTable?.deleteApi(params).then((data: any) => {
              success('批量删除成功')
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
        record.editing = true
        searchTable.searchTableRef.current.doLayout()
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
        // 重新构建数组
        const newTableData = [...searchTable.tableRef.current.getTableData()]
        // 寻找到对应行
        const index = newTableData.findIndex(row => row.id === newRow.id)
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
        delete record.editing
        searchTable.searchTableRef.current.doLayout()
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
    confirmMsg: '你确定要删除此行吗？',
    onConfirm: () => {
      searchTable.tableRef.current.deleteRowByKey(record.id)
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
      searchTable.tableRef.current.addRow({ [searchTable.rowKey || 'id']: Date.now(), editing: true })
    },
    ...props
  }
})

/**
 * 获得转换后 action props
 * @param props 当前 props
 * @param searchTable searchTable 对象
 */
export const getActionProps = (props: AyActionProps, searchTable: any) => {
  const { action, record } = props
  const form = useContext(EditableContext)
  let targetAction = actionMap[action || '']
  if (targetAction) {
    let actionProps: AnyKeyProps = targetAction(props, record, searchTable, form)
    return actionProps
  }
  return props
}

export default function AyAction(props: AyActionProps) {
  const searchTable: any = useContext(AySearchTableContext)
  const actionProps = getActionProps(props, searchTable)
  return <AyButton {...actionProps} />
}
